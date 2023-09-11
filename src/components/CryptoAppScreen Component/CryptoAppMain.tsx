import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { Alchemy, Network } from "alchemy-sdk";
import axios from 'axios';
import web3 from 'web3';
import { useDispatch } from 'react-redux';
import { COIN_GECO_API } from '../../constants/config';
import { Notifications } from 'react-native-notifications';

interface KeypadButtonProps {
    value: string;
    onPress: () => void;
    isHighlighted: boolean;
}

const { width } = Dimensions.get('window');
const isSmallScreen = width < 430; // Adjust the width value based on the screen size you consider as small

function KeypadButton({ value, onPress, isHighlighted }: KeypadButtonProps): JSX.Element {
    return (
        <TouchableOpacity
            style={[styles.keypadButton, isHighlighted && styles.keypadButtonHighlighted]}
            onPress={onPress}
        >
            <Text style={[styles.keypadButtonText, isHighlighted && styles.keypadButtonTextHighlighted]}>{value}</Text>
        </TouchableOpacity>
    );
}

function CryptoAppMain(): JSX.Element {
    const [selectedCrypto, setSelectedCrypto] = useState('ethereum');
    const [amount, setAmount] = useState('0');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { address, isConnected } = useWalletConnectModal();
    const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT contract address
    const usdcContractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC contract address
    const [ethBalance, setEthBalance] = useState<any>(null);
    const [formattedEthBalance, setFormattedEthBalance] = useState<any>(null);
    const [formattedUsdtBalance, setFormattedUsdtBalance] = useState<any>(null);
    const [formattedUsdcBalance, setFormattedUsdcBalance] = useState<any>(null);
    const [usdtBalance, setUsdtBalance] = useState<any>(null);
    const [usdcBalance, setUsdcBalance] = useState<any>(null);
    const [cryptoAmount, setCryptoAmount] = useState<any>("0.00");
    const [currentEthPrice, setCurrentEthPrice] = useState<any>(null);
    const usdToEth = (1 / currentEthPrice) as any;
    const settings = {
        apiKey: "U9HkfdvfM9qNbYWbyeHxMsaG0jzgqp8E",
        network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);

    const getEthBalance = async () => {
        const balance = await alchemy.core.getBalance(address as any);
        const formattedEthBalance = web3.utils.fromWei(balance as any, 'ether');
        setEthBalance(String(Number(formattedEthBalance).toFixed(5)));
    };

    const getUsdtBalance = async () => {
        const usdtBalance = await alchemy.core.getTokenBalances(address as any, [usdtContractAddress]);
        const balance = usdtBalance.tokenBalances[0].tokenBalance;
        const decBalance = parseInt(balance as any, 16);
        const formattedNumber = (decBalance / 1000000);
        setUsdtBalance(formattedNumber);
    };

    const getUsdcBalance = async () => {
        const usdcBalance = await alchemy.core.getTokenBalances(address as any, [usdcContractAddress]);
        const balance = usdcBalance.tokenBalances[0].tokenBalance;
        const decBalance = parseInt(balance as any, 16);
        const formattedNumber = (decBalance / 1000000);
        setUsdcBalance(formattedNumber);
    };

    // const handleCryptoPress = (crypto: string) => {
    //     setSelectedCrypto(crypto);
    // };

    const handleKeypadPress = (value: string) => {
        if (amount === '0') {
            setAmount(value);
        }
        else {
            if (amount.length < 5) {
                setAmount(amount + value);
            }
        }
    };

    const handleDeletePress = () => {
        if (amount.length > 1) {
            setAmount(amount.slice(0, -1));
        } else {
            setAmount('0');
        }
    };

    const handleAmountChange = (amount: string) => {
        //convert amount to float
        if (amount === '0') {
            setCryptoAmount('0.00');
            return;
        }
        const amountNumber = parseFloat(amount);
        let equivalentCryptoAmount = 0.00
        if (selectedCrypto === 'ethereum') {
            equivalentCryptoAmount = amountNumber * usdToEth;
        }
        else if (selectedCrypto === 'tether') {
            equivalentCryptoAmount = (amountNumber * 1).toFixed(2) as any;
        }
        else {
            equivalentCryptoAmount = (amountNumber * 1).toFixed(2) as any;
        }

        setCryptoAmount(equivalentCryptoAmount);
    };

    const handleNavigateToChooseRecipient = () => {
        if (!isConnected) {
            return Alert.alert(
                "Connect Wallet",
                "Please connect your wallet to continue",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Connect",
                        onPress: () => {
                            navigation.navigate('Profile' as never);
                        }
                    }
                ]
            );
        }
        if (!ethBalance) return Alert.alert(
            "Balance Loading",
            "Please wait while your balance loads",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ]
        );
        if (amount !== '0' && cryptoAmount !== '0.00') {
            if (isConnected) {
                const params = {
                    weiAmount: parseInt(web3.utils.toWei(cryptoAmount, "ether")).toString(16),
                    cryptoAmount: cryptoAmount ? cryptoAmount : '0.00',
                    selectedCrypto: selectedCrypto,
                    fromAddress: address,
                    amount: amount,
                };
                // @ts-ignore
                navigation.navigate('ChooseRecipientScreen', params);
            } else {
                Alert.alert(
                    "Connect Wallet",
                    "Please connect your wallet to continue",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "Connect",
                            onPress: () => {
                                navigation.navigate('Profile' as never);
                            }
                        }
                    ]
                );
            }
        } else {
            Alert.alert(
                "Enter Amount",
                "Please enter amount to continue",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }
                ]
            );
        }
    };

    useEffect(() => {
        setCryptoAmount('0.00');
        setAmount('0');
    }, [selectedCrypto]);

    useEffect(() => {
        handleAmountChange(amount);
    }, [amount]);

    useEffect(() => {
        if (isConnected) {
            const intervalId = setInterval(() => {
                getEthBalance();
                getUsdtBalance();
                getUsdcBalance();
                axios
                    .get(`${COIN_GECO_API}simple/price?ids=ethereum&vs_currencies=usd`, {
                        headers: { 'x-cg-pro-api-key': 'CG-j4iM5vibsMDL2DwEzT2ww4No' },
                    })
                    .then((response) => {
                        const ethPrice = response.data.ethereum.usd;
                        setCurrentEthPrice(ethPrice);
                        const usdBalance = ethBalance as any * ethPrice;
                        setFormattedEthBalance(usdBalance.toFixed(2));
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                axios
                    .get(`${COIN_GECO_API}simple/price?ids=tether&vs_currencies=usd`, {
                        headers: { 'x-cg-pro-api-key': 'CG-j4iM5vibsMDL2DwEzT2ww4No' },
                    })
                    .then((response) => {
                        const usdtPrice = response.data.tether.usd;
                        const usdBalance = usdtBalance as any * usdtPrice;
                        setFormattedUsdtBalance(usdBalance.toFixed(2));
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                axios
                    .get(`${COIN_GECO_API}simple/price?ids=usd-coin&vs_currencies=usd`, {
                        headers: { 'x-cg-pro-api-key': 'CG-j4iM5vibsMDL2DwEzT2ww4No' },
                    })
                    .then((response) => {
                        const usdcPrice = response.data['usd-coin'].usd;
                        const usdBalance = usdcBalance as any * usdcPrice;
                        setFormattedUsdcBalance(usdBalance.toFixed(2));
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                const updatedBalance = {
                    eth: {
                        tokenBalance: ethBalance,
                        usdBalance: formattedEthBalance,
                    },
                    usdt: {
                        tokenBalance: usdtBalance,
                        usdBalance: formattedUsdtBalance,
                    },
                    usdc: {
                        tokenBalance: usdcBalance,
                        usdBalance: formattedUsdcBalance,
                    },
                };
                dispatch({
                    type: 'SET_BALANCE',
                    payload: updatedBalance,
                });
            }, 10000);
            return () => clearInterval(intervalId);
        }
    }, [isConnected, ethBalance, getEthBalance, formattedEthBalance]);

    useEffect(() => {
        if (Notifications) {
            // Request permissions on iOS, refresh token on Android
            // Notifications.registerRemoteNotifications();

            // Notifications.events().registerRemoteNotificationsRegistered((event) => {
            // TODO: Send the token to my server so it could send back push notifications...
            //     console.log("Device Token Received", event.deviceToken);
            // });
            // Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
            //     console.error(event);
            // });
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.profileImage} onPress={() => {
                navigation.navigate('Profile' as never);
            }}>
                <Image source={require('../../assets/profile.png')} />
            </TouchableOpacity>
            {/* <ScrollView horizontal={true} style={styles.cryptoButtonContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'ethereum' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('ethereum')}
                >
                    <Image source={require('../../assets/Ethereum.png')} style={styles.cryptoButtonImage} />
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'ethereum' && styles.selectedCryptoButtonText]}>
                        Ethereum
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'tether' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('tether')}
                >
                    <Image source={require('../../assets/Tether.png')} style={styles.cryptoButtonImage} />
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'tether' && styles.selectedCryptoButtonText]}>
                        Tether
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'usdCoin' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('usdCoin')}
                >
                    <Image source={require('../../assets/usd-coin.png')} style={styles.cryptoButtonImage} />
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'usdCoin' && styles.selectedCryptoButtonText]}>
                        USD Coin
                    </Text>
                </TouchableOpacity>
            </ScrollView> */}
            <View style={styles.cryptoAvailableContainer}>
                <Text style={styles.cryptoAvailableText}>
                    {isConnected ? (
                        selectedCrypto === 'ethereum' ? `${ethBalance || (ethBalance === 0 ? 0 : 'Loading')} ETH Available` : selectedCrypto === 'tether' ? `${usdtBalance || (usdtBalance === 0 ? 0 : 'Loading')} USDT Available` : `${usdcBalance || (usdcBalance === 0 ? 0 : 'Loading')} USDC Available`) : (
                        'Connect Wallet'
                    )}
                </Text>
            </View>
            <View style={styles.cryptoToSendContainer}>
                <Text style={styles.cashToSend}>
                    ${amount}
                </Text>
                <Text style={styles.cryptoToSend}>
                    {cryptoAmount} {selectedCrypto === 'ethereum' ? 'ETH' : selectedCrypto === 'tether' ? 'USDT' : 'USDC'}
                </Text>
            </View>
            <TouchableOpacity onPress={
                handleNavigateToChooseRecipient
            }
                style={[styles.chooseRecipientContainer, isSmallScreen && styles.chooseRecipientContainerSmallScreen
                ]}>
                <Text style={styles.chooseRecipientText}>
                    Choose Recipient
                </Text>
            </TouchableOpacity>
            <View style={[styles.keypadContainer, isSmallScreen && styles.keypadContainerSmallScreen
            ]}>
                <View style={[styles.keypadRow, isSmallScreen && styles.smallScreenKeypadRow]}>
                    <KeypadButton value="1" onPress={() => handleKeypadPress('1')} isHighlighted={false} />
                    <KeypadButton value="2" onPress={() => handleKeypadPress('2')} isHighlighted={false} />
                    <KeypadButton value="3" onPress={() => handleKeypadPress('3')} isHighlighted={false} />
                </View>
                <View style={[styles.keypadRow, isSmallScreen && styles.smallScreenKeypadRow]}>
                    <KeypadButton value="4" onPress={() => handleKeypadPress('4')} isHighlighted={false} />
                    <KeypadButton value="5" onPress={() => handleKeypadPress('5')} isHighlighted={false} />
                    <KeypadButton value="6" onPress={() => handleKeypadPress('6')} isHighlighted={false} />
                </View>
                <View style={[styles.keypadRow, isSmallScreen && styles.smallScreenKeypadRow]}>
                    <KeypadButton value="7" onPress={() => handleKeypadPress('7')} isHighlighted={false} />
                    <KeypadButton value="8" onPress={() => handleKeypadPress('8')} isHighlighted={false} />
                    <KeypadButton value="9" onPress={() => handleKeypadPress('9')} isHighlighted={false} />
                </View>
                <View style={[styles.keypadRow, isSmallScreen && styles.smallScreenKeypadRow]}>
                    <KeypadButton value="." onPress={() => handleKeypadPress('.')} isHighlighted={false} />
                    <KeypadButton value="0" onPress={() => handleKeypadPress('0')} isHighlighted={false} />
                    <TouchableOpacity style={styles.keypadButton} onPress={handleDeletePress}>
                        <Image source={require('../../assets/keypadDelete.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3447F0',
        flex: 1,
    },
    profileImage: {
        alignItems: 'flex-end',
        padding: 10,
        paddingRight: 20,
    },
    cryptoButton: {
        width: 150,
        padding: 10,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    selectedCryptoButton: {
        backgroundColor: '#FFFFFF',
    },
    cryptoButtonText: {
        color: '#0D1F3C',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    selectedCryptoButtonText: {
        color: '#000000',
    },
    cryptoButtonContainer: {
        flexDirection: 'row',
    },
    cryptoAvailableContainer: {
        padding: 5,
        alignItems: 'center',
    },
    cryptoAvailableText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
    cryptoToSendContainer: {
        padding: 10,
        alignItems: 'center',
        gap: 4,
    },
    cashToSend: {
        color: '#FFFFFF',
        fontSize: 60,
        fontWeight: 'bold',
    },
    cryptoToSend: {
        color: '#B5BBC9',
        fontSize: 18,
    },
    chooseRecipientContainer: {
        padding: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#B5BBC9',
        borderRadius: 20,
        width: 200,
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 20,
    },
    chooseRecipientContainerSmallScreen: {
        marginTop: 0,
    },
    chooseRecipientText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
        alignItems: 'center',
    },
    keypadContainer: {
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    keypadContainerSmallScreen: {
        marginTop: 0,
        padding: 0,
        height: 300,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
        marginBottom: 10,
    },
    smallScreenKeypadRow: {
        width: '75%',
        marginBottom: -25,
    },
    keypadButton: {
        width: 70,
        height: 102,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keypadButtonText: {
        fontSize: 30,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    keypadButtonHighlighted: {
        backgroundColor: '#B5BBC9',
    },
    keypadButtonTextHighlighted: {
        color: '#FFFFFF',
    },
    cryptoButtonImage: {
        marginRight: 5,
        width: 20,
        height: 20,
    },
});

export default CryptoAppMain;