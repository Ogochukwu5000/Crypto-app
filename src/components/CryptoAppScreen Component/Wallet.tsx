import React, { useState } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Wallet(): JSX.Element {
    const navigation = useNavigation();
    const [selectedWallet, setSelectedWallet] = useState('');

    const wallets = [
        { name: 'Metamask', address: '', image: require('../../assets/metamask.png') },
        { name: 'Coinbase Wallet', address: '', image: require('../../assets/coinbase.png') },
        { name: 'Wallet Connect', address: '', image: require('../../assets/WalletConnect.png') },
    ];

    const handleWalletSelection = (name: any) => {
        if (name !== selectedWallet) {
            const confirmMessage = `Are you sure you want to connect with ${name}?`;
            Alert.alert(
                `${name}`,
                confirmMessage,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => setSelectedWallet(name),
                    },
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={
                    () => {
                        navigation.goBack();
                    }
                }>
                    <Image
                        source={require('../../assets/back.png')}
                        style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text
                        style={[
                            styles.Header,
                            isSmallScreen && styles.smallScreenHeader,
                        ]}>
                        Wallets
                    </Text>
                    <Text
                        style={[
                            styles.SubHeader,
                            isSmallScreen && styles.smallScreenSubHeader,
                        ]}>
                        Connect your wallet and enjoy the best of cryptoapp
                    </Text>
                </View>
            </View>
            {/* Bottom half  log in modal */}
            <KeyboardAvoidingView
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal]}>
                <View style={styles.walletList}>
                    {wallets.map((wallet) => (
                        <TouchableOpacity
                            key={wallet.name}
                            style={[
                                styles.walletItem,
                                selectedWallet === wallet.name && styles.selectedWalletItem,
                            ]}
                            onPress={() => handleWalletSelection(wallet.name)}>
                            <Image
                                source={wallet.image}
                                style={styles.walletImage}
                            />
                            <View style={styles.walletInfo}>
                                <Text style={styles.walletName}>{wallet.name}</Text>
                                {/* <Text style={styles.walletSymbol}>{wallet.symbol}</Text> */}
                            </View>
                            {selectedWallet === wallet.name && (
                                <Image
                                    source={require('../../assets/checkmark.png')}
                                    style={styles.checkmark}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3447F0',
        alignItems: 'center',
    },
    bottomHalfModal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '85%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    isSmallBottomHalfModal: {
        height: '80%',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
        marginTop: '3%',
    },
    image: {
        width: 30,
        height: 100,
    },
    smallScreenImage: {
        width: 30,
        height: 80,
    },
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '25%',
        width: '100%',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    smallScreenHeader: {
        fontSize: 25,
    },
    SubHeader: {
        color: '#fff',
        fontSize: 15,
        width: '80%',
        marginTop: '2%',
        textAlign: 'center',
    },
    smallScreenSubHeader: {
        fontSize: 13,
        marginLeft: '3%',
        width: '70%',
    },
    walletList: {
        width: '100%',
        marginTop: '10%',
        paddingHorizontal: '5%',
    },
    walletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 25,
        marginBottom: 20,
        height: 80,
    },
    selectedWalletItem: {
        backgroundColor: '#F0F0F0',
    },
    walletImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    walletInfo: {
        flex: 1,
    },
    walletName: {
        fontSize: 20,
        fontWeight: '500',
    },
    walletSymbol: {
        fontSize: 14,
        color: '#666',
    },
    checkmark: {
        width: 30,
        height: 30,
        marginLeft: 'auto',

    },
});

export default Wallet;