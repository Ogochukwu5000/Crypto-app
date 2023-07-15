import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';


interface KeypadButtonProps {
    value: string;
    onPress: () => void;
    isHighlighted: boolean;
}

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

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
    const { provider, address } = useWalletConnectModal();
    const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT contract address
    const usdcContractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC contract address
    const handleCryptoPress = (crypto: string) => {
        setSelectedCrypto(crypto);
    };

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

    const getERC20Balance = async (tokenContractAddress: any, walletAddress: any) => {
        try {
            const balance = await provider?.request({
                method: 'eth_call',
                params: [
                    {
                        to: tokenContractAddress,
                        data: `0x70a08231000000000000000000000000${walletAddress.slice(2)}`,
                    },
                    'latest',
                ],
            });

            console.log(`Balance of ${tokenContractAddress}: ${balance}`);

            //const balanceInWei = ethers.from(balance).toString();
            // const balanceInEther = ethers.utils.formatEther(balanceInWei);

            // console.log(`Balance of ${tokenContractAddress}: ${balanceInEther}`);
        } catch (error) {
            console.error(`Error getting balance of ${tokenContractAddress}:`, error);
        }
    };

    // Call the function to get the balances
    getERC20Balance(usdtContractAddress, address);
    getERC20Balance(usdcContractAddress, address);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.profileImage} onPress={() => {
                navigation.navigate('Profile' as never);
            }}>
                <Image source={require('../../assets/profile.png')} />
            </TouchableOpacity>
            <ScrollView horizontal={true} style={styles.cryptoButtonContainer} showsHorizontalScrollIndicator={false}>
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
            </ScrollView>
            <View style={styles.cryptoAvailableContainer}>
                <Text style={styles.cryptoAvailableText}>
                    4.7845 BTC Available
                </Text>
            </View>
            <View style={styles.cryptoToSendContainer}>
                <Text style={styles.cashToSend}>
                    ${amount}
                </Text>
                <Text style={styles.cryptoToSend}>
                    0.00
                </Text>
            </View>
            <TouchableOpacity onPress={
                () => navigation.navigate('ChooseRecipientScreen' as never)
            } style={[styles.chooseRecipientContainer, isSmallScreen && styles.chooseRecipientContainerSmallScreen
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
        marginBottom: -35,
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