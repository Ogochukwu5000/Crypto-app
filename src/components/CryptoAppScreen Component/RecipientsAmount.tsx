import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

function RecipientsAmount(): JSX.Element {
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
    const [amount, setAmount] = useState('0');
    const navigation = useNavigation();

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

    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity style={styles.profileImage}>
                <Image source={require('../../assets/profile.png')} />
            </TouchableOpacity> */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={require('../../assets/back.png')}
                        style={styles.backButton}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text
                        style={[
                            styles.Header,
                            isSmallScreen && styles.smallScreenHeader,
                        ]}>
                        Alex McCady
                    </Text>
                </View>
            </View>
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
                    style={[styles.cryptoButton, selectedCrypto === 'bitcoin' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('bitcoin')}
                >
                    <Image source={require('../../assets/Bitcoin.png')} style={styles.cryptoButtonImage} />
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'bitcoin' && styles.selectedCryptoButtonText]}>
                        Bitcoin
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'stellar' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('stellar')}
                >
                    <Image source={require('../../assets/Stellar.png')} style={styles.cryptoButtonImage} />
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'stellar' && styles.selectedCryptoButtonText]}>
                        Stellar
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
                () => navigation.navigate('ConfirmTransactionScreen' as never)
            } style={[styles.chooseRecipientContainer, isSmallScreen && styles.chooseRecipientContainerSmallScreen
            ]}>
                <Text style={styles.chooseRecipientText}>
                    Continue
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
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '13%',
        width: '100%',
    },
    smallScreenHeader: {
        fontSize: 25,
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
    },
    backButton: {
        width: 30,
        height: 30,
    },
    cryptoButton: {
        width: 150,
        padding: 10,
        margin: 10,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 40,
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
        padding: isSmallScreen ? 27 : 10,
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
        marginBottom: 10,
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

export default RecipientsAmount;