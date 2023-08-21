import React, { useEffect, useState } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootState } from '../../../store/reducers';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../constants/config';

/*
    {
    "transactions": [
        {
            "_id": "64e27c3c59d408f4dcedb53b",
            "amount_crypto": 0.004148049824004172,
            "amount_usd": 7,
            "transaction_hash": "0xd89cd6997f8c7a893ce33e26334a7db8c0ed8f64a598e322e13ca08d36f1ad90",
            "from_crypto_tag": "Hmoney",
            "to_crypto_tag": "Hmoney",
            "from_name": "Haruna Oseni",
            "to_name": "Haruna Oseni",
            "date": "Aug 20, 2023",
            "time": "03:49 PM",
            "is_sender": true,
            "profile_picture": "32F1633C-28CE-4AD7-A13E-8DD549BD6D1E.jpg",
            "from_profile_picture": "32F1633C-28CE-4AD7-A13E-8DD549BD6D1E.jpg",
            "to_profile_picture": "32F1633C-28CE-4AD7-A13E-8DD549BD6D1E.jpg"
        }
    ],
    "status": true
}
*/

function ActivityMain(): JSX.Element {
    const [transactions, setTransactions] = useState();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Add refreshing state
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.transactionContainer} onPress={() => {
            // @ts-ignore
            navigation.navigate('ActivityTransactionDetails', {
                transaction: item,
            });
        }}>
            <View style={styles.transactionImage}>
                {
                    item.is_sender ? (
                        <Image
                            source={require(`../../assets/${`send`}.png`)}
                            style={[styles.image]}
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require(`../../assets/${`Receive`}.png`)}
                            style={[styles.image]}
                            resizeMode="cover"
                        />
                    )
                }
            </View>
            <View>
                <Text style={styles.transactionAmount}>${item.amount_usd}</Text>
                <Text style={styles.transactionCryptoAmount}>{item.amount_crypto.toFixed(5)}</Text>
            </View>
            <View>
                <Text style={styles.transactionType}>{item.time}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );
    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}transaction/${user?.cryptoTag}`).then(response => {
            setTransactions(response.data.transactions);
            setLoading(false);
        }).catch(error => {
            console.error(JSON.stringify(error));
            setLoading(false);
        });
    }, []);

    const onRefresh = () => {
        setRefreshing(true); // Set refreshing state to true when the user pulls down the list
        axios.get(`${BASE_URL}transaction/${user?.cryptoTag}`).then(response => {
            setTransactions(response.data.transactions);
            setRefreshing(false); // Set refreshing state to false after the API call is complete
        }).catch(error => {
            console.error(JSON.stringify(error));
            setRefreshing(false); // Set refreshing state to false if there is an error
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>All Activity</Text>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshControl={ // Add refreshControl prop to the FlatList component
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#3447F0']}
                        tintColor={'#3447F0'}
                    />
                }
            />
            {loading && !refreshing && ( // Display the loading spinner if loading state is true and refreshing state is false
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3447F0" />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 50,
    },
    listContainer: {
        alignItems: 'center',
    },
    transactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '95%',
        height: 80,
        backgroundColor: '#EDF1F9',
        borderRadius: 50,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    transactionImage: {
        width: 50,
    },
    image: {
        width: 30,
        height: 50,
        objectFit: 'contain',
    },
    transactionAmount: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    transactionCryptoAmount: {
        fontSize: 18,
        color: '#AFAFAF',
    },
    transactionType: {
        fontWeight: 'bold',
        color: '#3447F0',
        fontSize: 18,
    },
    transactionDate: {
        color: '#AFAFAF',
        fontSize: 18,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1,
    },
});

export default ActivityMain;