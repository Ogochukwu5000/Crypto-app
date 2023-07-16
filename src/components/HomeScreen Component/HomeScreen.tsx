import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import CoinDetailedScreen from './CoinDetailedScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/reducers"
import { Share } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: {
        small: string;
        large: string;
        thumb: string;
    };
    market_data: {
        current_price: {
            usd: number;
        };
        price_change_percentage_24h: number;
    };
}

function Home(): JSX.Element {
    const [coinId, setCoinId] = useState('ethereum');
    const { address } = useWalletConnectModal();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const cryptoTag = user?.cryptoTag;
    const [ethcoin, setEthCoin] = useState<Coin | null>(null);
    const [usdtcoin, setUsdtCoin] = useState<Coin | null>(null);
    const [usdccoin, setUsdCoin] = useState<Coin | null>(null);
    // const percentageColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

    const fetchEthCoinData = async () => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${`ethereum`}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
            setEthCoin(response.data);
        } catch (e: any) {
            console.log(e.response.data);
        }
    };

    const fetchUsdtCoinData = async () => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${`tether`}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
            setUsdtCoin(response.data);
        } catch (e: any) {
            console.log(e.response.data);
        }
    };

    const fetchUsdcCoinData = async () => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${`usd-coin`}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
            setUsdCoin(response.data);
        } catch (e: any) {
            console.log(e.response.data);
        }
    };

    useEffect(() => {
        fetchEthCoinData();
        fetchUsdtCoinData();
        fetchUsdcCoinData();
    }, [coinId]);



    const handleReceivePress = () => {
        Alert.alert(
            'Receive',
            `Address:\n ${address}\n\nCrypto Tag: ${cryptoTag}`,
            [
                {
                    text: 'Share Tag',
                    onPress: () => {
                        Share.share({
                            message: `Check out my Crypto Tag: ${cryptoTag}`,
                        });
                    },
                },
                {
                    text: 'Share Address',
                    onPress: () => {
                        Share.share({
                            message: `Check out my Crypto Address: ${address}`,
                        });
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <CoinDetailedScreen coinId={coinId}
            />
            {/* Bottom half  log in modal */}
            <View
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal]}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Image source={require('../../assets/deposit.png')} />
                        <Text>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleReceivePress}>
                        <Image source={require('../../assets/Receive.png')} />
                        <Text>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={require('../../assets/send.png')} />
                        <Text>Withdraw</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.assetText}>Asset</Text>
                <ScrollView style={styles.assetContainer}>
                    <TouchableOpacity style={styles.asset}
                        onPress={() => {
                            setCoinId('ethereum');
                        }}
                    >
                        <Image style={styles.assetIcon} source={require('../../assets/Ethereum.png')} />
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetName}>Ethereum</Text>
                            <Text style={styles.assetCryptoPrice}>{user?.balance?.eth?.tokenBalance} ETH</Text>
                        </View>
                        <View style={
                            [styles.assetTextContainer]
                        }>
                            <Text style={styles.assetPrice}>$ {user?.balance?.eth.usdBalance}</Text>
                            <Text style={[styles.assetPercent, ethcoin?.market_data && ethcoin?.market_data.price_change_percentage_24h > 0 ? styles.positive : styles.negative
                            ]}>{
                                    ethcoin?.market_data && ethcoin?.market_data.price_change_percentage_24h > 0 ? `${ethcoin?.market_data.price_change_percentage_24h.toFixed(2)}%` : `${ethcoin?.market_data.price_change_percentage_24h.toFixed(2)}%`
                                }</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.asset}
                        onPress={() => {
                            setCoinId('tether');
                        }}
                    >
                        <Image style={styles.assetIcon} source={require('../../assets/Tether.png')} />
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetName}>Tether</Text>
                            <Text style={styles.assetCryptoPrice}>{user?.balance?.usdt?.tokenBalance} USDT</Text>
                        </View>
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetPrice}>$ {user?.balance?.usdt.usdBalance}</Text>
                            <Text style={[styles.assetPercent, usdtcoin?.market_data && usdtcoin?.market_data.price_change_percentage_24h > 0 ? styles.positive : styles.negative
                            ]}>
                                {
                                    usdtcoin?.market_data && usdtcoin?.market_data.price_change_percentage_24h > 0 ? `${usdtcoin?.market_data.price_change_percentage_24h.toFixed(2)}%` : `${usdtcoin?.market_data.price_change_percentage_24h.toFixed(2)}%`
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.asset}
                        onPress={() => {
                            setCoinId('usd-coin');
                        }}
                    >
                        <Image style={styles.assetIcon} source={require('../../assets/usd-coin.png')} />
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetName}>USD Coin</Text>
                            <Text style={styles.assetCryptoPrice}>{user?.balance?.usdc?.tokenBalance ? user?.balance?.usdc?.tokenBalance : 0} USDC</Text>
                        </View>
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetPrice}>$ {user?.balance?.usdc.usdBalance}</Text>
                            <Text style={[styles.assetPercent, usdccoin?.market_data && usdccoin?.market_data.price_change_percentage_24h > 0 ? styles.positive : styles.negative
                            ]}>
                                {
                                    usdccoin?.market_data && usdccoin?.market_data.price_change_percentage_24h > 0 ? `${usdccoin?.market_data.price_change_percentage_24h.toFixed(2)}%` : `${usdccoin?.market_data.price_change_percentage_24h.toFixed(2)}%`
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
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
        height: '52%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    isSmallBottomHalfModal: {
        height: '55%',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
        marginTop: '3%',
    },
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '30%',
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
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
        justifyContent: 'space-around',
    },
    button: {
        width: '20%',
        backgroundColor: '#EDF1F9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 10,
        gap: 3,
    },
    assetText: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: '2%',
        display: 'flex',
        alignItems: 'flex-start',
        width: '85%',
    },
    assetContainer: {
        width: '100%',
        marginTop: '2%',
    },
    asset: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '2%',
        marginBottom: '5%',
    },
    assetName: {
        fontSize: 16,
        fontWeight: '500',
    },
    assetCryptoPrice: {
        fontSize: 15,
        fontWeight: '300',
    },
    assetPrice: {
        fontSize: 16,
        fontWeight: '500',
    },
    assetPercent: {
        fontSize: 15,
        fontWeight: '400',
        color: '#00BFA6',
    },
    assetTextContainer: {
        display: 'flex',
        gap: 5,
    },
    assetIcon: {
        width: 40,
        height: 40,
    },
    positive: {
        color: '#00BFA6',
    },
    negative: {
        color: '#FF0000',
    },
});

export default Home;