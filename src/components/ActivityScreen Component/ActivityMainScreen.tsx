import React from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';

type Transaction = {
    id: string;
    amount: string;
    cryptoAmount: string;
    type: string;
    date: string;
    image: any;
};

const transactions: Transaction[] = [
    {
        id: '1',
        amount: '$ 100',
        cryptoAmount: '0.0001 BTC',
        type: 'Sent',
        date: 'Aug 19, 2023',
        image: require('../../assets/arrow-up-right-circle.png'),
    },
    {
        id: '2',
        amount: '$ 50',
        cryptoAmount: '0.00005 BTC',
        type: 'Sent',
        date: 'Aug 18, 2023',
        image: require('../../assets/arrow-up-right-circle.png'),
    },
    {
        id: '3',
        amount: '$ 200',
        cryptoAmount: '0.0002 BTC',
        type: 'Sent',
        date: 'Aug 17, 2023',
        image: require('../../assets/arrow-up-right-circle.png'),
    },
];

function ActivityMain(): JSX.Element {

    const renderItem = ({ item }: { item: Transaction }) => (
        <TouchableOpacity style={styles.transactionContainer}>
            <View style={styles.transactionImage}>
                <Image
                    source={item.image}
                    style={[styles.image]}
                    resizeMode="contain"
                />
            </View>
            <View>
                <Text style={styles.transactionAmount}>{item.amount}</Text>
                <Text style={styles.transactionCryptoAmount}>{item.cryptoAmount}</Text>
            </View>
            <View>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>All Activity</Text>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
        width: '90%',
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
});

export default ActivityMain;