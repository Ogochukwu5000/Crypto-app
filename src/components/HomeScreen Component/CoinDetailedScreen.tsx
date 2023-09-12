import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Dimensions,
} from "react-native";
import styles from "./styles";
import { LineChart } from "react-native-wagmi-charts";
import FilterComponent from "./FilterComponent";
import axios from "axios";
import { COIN_GECO_API } from '../../constants/config';

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

interface CoinDetailedScreenProps {
    coinId: string;
}

interface CoinMarketData {
    prices: [number, number][];
}

interface CandleChartData {
    [timestamp: number]: [number, number, number, number];
}

const filterDaysArray = [
    { filterDay: "1", filterText: "1D" },
    { filterDay: "7", filterText: "1W" },
    { filterDay: "30", filterText: "1M" },
    { filterDay: "365", filterText: "1Y" },
    //{ filterDay: "max", filterText: "All" },
];

const { width } = Dimensions.get('window');
const isSmallScreen = width < 430; // Adjust the width value based on the screen size you consider as small

const CoinDetailedScreen = ({ coinId }: CoinDetailedScreenProps): JSX.Element => {
    const [coin, setCoin] = useState<Coin | null>(null);
    const [coinMarketData, setCoinMarketData] = useState<CoinMarketData | null>(null);
    const [coinCandleChartData, setCoinCandleChartData] = useState<CandleChartData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRange, setSelectedRange] = useState<string>("1");
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const memoOnSelectedRangeChange = useCallback((range: string) => onSelectedRangeChange(range), []);

    const fetchCoinData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
            setCoin(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchMarketCoinData = async (selectedRangeValue: string) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRangeValue}`);
            // console.log(response.data);
            setCoinMarketData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchCandleStickChartData = async (selectedRangeValue: string) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${selectedRangeValue}`);
            setCoinCandleChartData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    // const fetchCoinData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(`${COIN_GECO_API}coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
    //             headers: { 'x-cg-pro-api-key': 'CG-j4iM5vibsMDL2DwEzT2ww4No' },
    //         });
    //         setCoin(response.data);
    //     } catch (e: any) {
    //         console.log(e.response.data);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const fetchMarketCoinData = async (selectedRangeValue: string) => {
    //     try {
    //         const response = await axios.get(`${COIN_GECO_API}coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRangeValue}&interval=hourly`, {
    //             headers: { 'x-cg-pro-api-key': 'CG-j4iM5vibsMDL2DwEzT2ww4No' },
    //         });
    //         setCoinMarketData(response.data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const fetchCandleStickChartData = async (selectedRangeValue: string) => {
    //     try {
    //         const response = await axios.get(`${COIN_GECO_API}coins/${coinId}/ohlc?vs_currency=usd&days=${selectedRangeValue}`, {
    //             headers: { 'x-cg-pro-api-key': 'CG-j4iM5vibsMDL2DwEzT2ww4No' },
    //         });
    //         setCoinCandleChartData(response.data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    const onSelectedRangeChange = (selectedRangeValue: string) => {
        setSelectedRange(selectedRangeValue);
        fetchMarketCoinData(selectedRangeValue);
        fetchCandleStickChartData(selectedRangeValue);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCoinData();
        fetchMarketCoinData(selectedRange);
        fetchCandleStickChartData(selectedRange);
        setRefreshing(false);
    }, [selectedRange]);

    useEffect(() => {
        fetchCoinData();
        fetchMarketCoinData("1");
        fetchCandleStickChartData("1");
    }, [coinId]);


    if (loading || !coin || !coinMarketData || !coinCandleChartData) {
        return <ActivityIndicator size="large" />;
    }

    const {
        name,
        market_data: {
            current_price,
            price_change_percentage_24h,
        },
    } = coin;

    const { prices } = coinMarketData;

    const percentageColor =
        price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
    const chartColor = current_price.usd > prices[0][1] ? "black" : "black";
    const screenWidth = Dimensions.get("window").width;

    const formatCurrency = ({ value }: { value: string }) => {
        "worklet";
        if (value === "") {
            if (current_price.usd < 1) {
                return `$${current_price.usd}`;
            }
            return `$${current_price.usd.toFixed(2)}`;
        }
        if (current_price.usd < 1) {
            return `$${parseFloat(value)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={{ paddingHorizontal: 10 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <LineChart.Provider
                        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
                    >
                        <View style={styles.priceContainer}>
                            <View>
                                <Text style={styles.name}>{name}</Text>
                                <LineChart.PriceText
                                    format={formatCurrency}
                                    style={styles.currentPrice}
                                />
                            </View>
                            <View
                                style={{
                                    // backgroundColor: percentageColor,
                                    paddingHorizontal: 3,
                                    paddingVertical: 8,
                                    borderRadius: 5,
                                    flexDirection: "row",
                                }}
                            >
                                {/* price_change_percentage_24h < 0 ? "caretdown" : "caretup" */}
                                <Text style={[styles.priceChange, {
                                    color: percentageColor,
                                }]}>
                                    {price_change_percentage_24h < 0 ? "↓" : "↑"} {price_change_percentage_24h?.toFixed(2)}%
                                </Text>
                            </View>
                        </View>
                        <LineChart height={!isSmallScreen ? screenWidth / 2 : screenWidth / 3.2} width={screenWidth}>
                            <LineChart.Path color={chartColor} />
                            <LineChart.CursorCrosshair color={chartColor} />
                        </LineChart>
                        <View style={styles.filtersContainer}>
                            {filterDaysArray.map((day) => (
                                <FilterComponent
                                    filterDay={day.filterDay}
                                    filterText={day.filterText}
                                    selectedRange={selectedRange}
                                    setSelectedRange={memoOnSelectedRangeChange}
                                    key={day.filterText}
                                />
                            ))}
                        </View>
                    </LineChart.Provider>
                </ScrollView>
                {/* Add your modal component here */}
            </View>
        </SafeAreaView>
    );
};

export default CoinDetailedScreen;