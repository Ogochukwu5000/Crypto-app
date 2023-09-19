import React, { useState, useEffect } from 'react';
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
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Wallet(): JSX.Element {
    const navigation = useNavigation();
    const [selectedWallet, setSelectedWallet] = useState('');
    const projectId = '68a720495e3c0321e66a2ecca9dd75db';
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const { open, close, provider, isConnected, address } = useWalletConnectModal();

    const providerMetadata = {
        name: 'Crypto App',
        description: 'Crypto App is a decentralized application that allows you send and receive eth with your crypto tag.',
        url: 'https://cryptoapplabs.com/',
        icons: ["https://lh3.googleusercontent.com/a-/ALV-UjXnie1aEliI-h0aOdCcn5nz9V8dtEILFgitaw_8yZz82Pn0mEzQS1izJEGTOFYgFKRBvYYkxOyoLwjBXDtBCOWsYHIUWDm02UduA1fyI6GIgR7VY3XgbB-pIOg2jNlUhssOGl3xILbwjxpZBafk2Z-BSPAsfqrh2eko_4tR2rsTs9F6B-2Mo6729Qcpjw7Io1hUWRpBTny42wZj-5cibUhM_j8iyrjkZjUq3N75-ZfMfrTgfEkabURDnLgt7VfhhugwZChQpGvbCkoYolhZzagTlKjMTHp4h2IHciz5wAYTuk5LE_zGXx8DCOIrWATlxFDqmreXRCGLNxfuYv1Qu3p_0WA1vNCnkiByHW7YHZvIBVFJmLBAQM86Z-gP6TM-vPfN4CkWjqGuzd5pu6lCjC__tFyWuW-Fac8-BUN140Va24hY5ru3_9QRTdHJmwDbp8gpcZGQI3fFQiEerJj3WgMbOB6UeGCfi4XyMqzSGYvGUw9BPdcqX-zmxVOj1tQouGLBOEJ2rVOESY-TOoDtDbNiKQkq_sHYcQvIOVyi4GvueOIBYanBktc0nVTnBu3r_KdSCzedeIStclOrrFeee7oezNeeFavbaEfTodn4p1ln4rFE85VahjVbPn3NP5B3corAU1kAsoyig5A7xUPtucEevv-j_7dXO6qHLLDgalLgwCPmBk2vQh4I68htZb-S1nzcKZSQY5YV1Emokqvfj3PhDx9nmoonvAQ_HqRuBeex-he_pzUuBGpRHMrtXcgDEZJFjrghzOPrQD0kd_WVOUfEBN9eBWPxMNSlrf9gctTzX6fkwAQW9-L3b1lVw0WOOvk7kdFn_CLWIRwmxBcpLohlADBPLmE4MftwPIQ2DlyegbaMoVyxDwAx21n2p-M-JseVmrPuUWn1GGipJyfwykQEOaq9IZuQ0fniMIYXoIj7oWOT9HGWxwYNzLItsYi2XA=s576-c-no"],
        redirect: {
            native: 'cryptoapp://',
            universal: 'https://cryptoapplabs.com/',
        },
        textEncoder: new TextEncoder(),
        textDecoder: new TextDecoder(),
    };

    const sessionParams = {
        namespaces: {
            eip155: {
                methods: [
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData",
                ],
                chains: ["eip155:44787"],
                events: ["chainChanged", "accountsChanged"],
                rpcMap: {},
            },
        },
    };

    const wallets = [
        // { name: 'Metamask', address: '', image: require('../../assets/metamask.png') },
        // { name: 'Coinbase Wallet', address: '', image: require('../../assets/coinbase.png') },
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
                        onPress: () => {
                            setSelectedWallet(name);
                            if (name === 'Wallet Connect') {
                                open();
                                if (isConnected) {
                                    close();
                                }
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            setSelectedWallet('');
        }
    };

    const handleWalletDisconnect = (name: any) => {
        const confirmMessage = `Are you sure you want to disconnect from ${name}?`;
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
                    onPress: () => {
                        setSelectedWallet('');
                        if (name === 'Wallet Connect') {
                            provider?.disconnect();
                            // clean up
                            close();
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderWalletButton = (wallet: any) => {
        if (wallet.name === 'Wallet Connect') {
            if (isConnected) {
                return (
                    <TouchableOpacity
                        style={styles.disconnectButton}
                        onPress={
                            () => handleWalletDisconnect(wallet.name)
                        }>
                        <Text style={styles.disconnectButtonText}>Disconnect</Text>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        style={styles.connectButton}
                        onPress={() => handleWalletSelection(wallet.name)}>
                        <Text style={styles.connectButtonText}>Connect</Text>
                    </TouchableOpacity>
                );
            }
        }
        else {
            if (selectedWallet === wallet.name) {
                return (
                    <TouchableOpacity
                        style={styles.disconnectButton}
                        onPress={() => handleWalletDisconnect(wallet.name)}>
                        <Text style={styles.disconnectButtonText}>Disconnect</Text>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        style={styles.connectButton}
                        onPress={() => handleWalletSelection(wallet.name)}>
                        <Text style={styles.connectButtonText}>Connect</Text>
                    </TouchableOpacity>
                );
            }
        }

    };


    useEffect(() => {
        if (address) {
            axios.post(`${BASE_URL}user/add-wallet-address`, {
                wallet_address: address,
                email: user?.email,
            }).then((res) => {
                // console.log(res.data);
                dispatch({
                    type: 'SET_PERSONAL_INFO',
                    payload: {
                        walletAddress: address,
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [address]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                style={[
                    styles.bottomHalfModal,
                    isSmallScreen && styles.isSmallBottomHalfModal,
                ]}>
                <View style={styles.walletList}>
                    {wallets.map((wallet) => (
                        <View
                            key={wallet.name}
                            style={[
                                styles.walletItem,
                                selectedWallet === wallet.name && styles.selectedWalletItem,
                            ]}>
                            <Image source={wallet.image} style={styles.walletImage} />
                            <View style={styles.walletInfo}>
                                <Text style={styles.walletName}>{wallet.name}</Text>
                                {
                                    isConnected ?
                                        <Text style={{
                                            color: 'green',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}>{provider?.session?.peer.metadata.name}</Text>
                                        :
                                        <Text style={{
                                            color: 'red',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}>Not Connected</Text>
                                }
                            </View>
                            {renderWalletButton(wallet)}
                        </View>
                    ))}
                    <WalletConnectModal
                        projectId={projectId}
                        providerMetadata={providerMetadata}
                        sessionParams={sessionParams}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        height: '83%',
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
    connectButton: {
        backgroundColor: '#3447F0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    connectButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
    },
    disconnectButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    disconnectButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
    },
});

export default Wallet;