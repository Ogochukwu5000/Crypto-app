import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

function CryptoAppMain(): JSX.Element {
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

    const handleCryptoPress = (crypto: string) => {
        setSelectedCrypto(crypto);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.profileImage}>
                <Image source={require('../../assets/profile.png')} />
            </TouchableOpacity>
            <ScrollView horizontal={true} style={styles.cryptoButtonContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'ethereum' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('ethereum')}
                >
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'ethereum' && styles.selectedCryptoButtonText]}>
                        Ethereum
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'bitcoin' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('bitcoin')}
                >
                    <Text style={[styles.cryptoButtonText, selectedCrypto === 'bitcoin' && styles.selectedCryptoButtonText]}>
                        Bitcoin
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cryptoButton, selectedCrypto === 'stellar' && styles.selectedCryptoButton]}
                    onPress={() => handleCryptoPress('stellar')}
                >
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
                    $0
                </Text>
                <Text style={styles.cryptoToSend}>
                    0.00
                </Text>
            </View>
            <TouchableOpacity style={styles.chooseRecipientContainer}>
                <Text style={styles.chooseRecipientText}>
                    Choose Recipient
                </Text>
            </TouchableOpacity>
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
    chooseRecipientText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
        alignItems: 'center',
    },
});

export default CryptoAppMain;