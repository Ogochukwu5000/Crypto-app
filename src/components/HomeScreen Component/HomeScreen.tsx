import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import CoinDetailedScreen from './CoinDetailedScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/reducers";
import axios from 'axios';
import { COIN_GECO_API, prod } from '../../constants/config';


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
    const { isConnected } = useWalletConnectModal();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const [ethcoin, setEthCoin] = useState<Coin | null>(null);
    const [usdtcoin, setUsdtCoin] = useState<Coin | null>(null);
    const [usdccoin, setUsdCoin] = useState<Coin | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Load data here
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000); // Set a delay of 2 seconds (2000 milliseconds)
        }
    };

    const fetchEthCoinData = async () => {
        try {
            const response = await axios.get(`${COIN_GECO_API}coins/${`ethereum`}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
                headers: prod ? { 'x-cg-pro-api-key': 'CG-XwxgJwWcS3H6hG4c9AfLXSbL' } : undefined,
            });
            setEthCoin(response.data);
        } catch (e: any) {
            console.log(e.response.data);
        }
    };

    const fetchUsdtCoinData = async () => {
        try {
            const response = await axios.get(`${COIN_GECO_API}coins/${`tether`}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
                headers: prod ? { 'x-cg-pro-api-key': 'CG-XwxgJwWcS3H6hG4c9AfLXSbL' } : undefined,
            });
            setUsdtCoin(response.data);
        } catch (e: any) {
            console.log(e.response.data);
        }
    };

    const fetchUsdcCoinData = async () => {
        try {
            const response = await axios.get(`${COIN_GECO_API}coins/${`usd-coin`}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
                headers: prod ? { 'x-cg-pro-api-key': 'CG-XwxgJwWcS3H6hG4c9AfLXSbL' } : undefined,
            });
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


    useEffect(() => {
        if (isConnected) {
            loadData();
        }
    }, [isConnected]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <CoinDetailedScreen coinId={coinId}
            />
            {/* Bottom half  log in modal */}
            <View
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal]}>
                {
                    isConnected ? (
                        isLoading ? (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ) : (
                            <>
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
                            </>
                        ))
                        : (
                            <>
                                <Text style={styles.connectWalletText}>Connect Wallet</Text>
                                <Text>
                                    To view your assets, please connect your wallet.
                                </Text>
                            </>)
                }
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    assetText: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: '8%',
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
    connectWalletText: {
        fontSize: 30,
        fontWeight: '500',
        // move to center
        marginTop: '25%',
    },
});

export default Home;