import React from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';

function ActivityMain(): JSX.Element {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>All Activity</Text>
            <View style={styles.transactionContainer}>
                <View style={styles.transactionImage}>
                    <Image
                        source={require('../../assets/arrow-up-right-circle.png')}
                        style={[styles.image]}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <Text style={styles.transactionAmount}>$ 100</Text>
                    <Text style={styles.transactionCryptoAmount}>0.0001 BTC</Text>
                </View>
                <View>
                    <Text style={styles.transactionType}>Sent</Text>
                    <Text style={styles.transactionDate}>Aug 19, 2023</Text>
                </View>
            </View>
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
    transactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginTop: 20,
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
        fontSize: 15,
    },
    transactionCryptoAmount: {
        fontSize: 15,
        color: '#AFAFAF',
    },
    transactionType: {
        fontWeight: 'bold',
        color: '#3447F0',
        fontSize: 15,
    },
    transactionDate: {
        color: '#AFAFAF',
        fontSize: 15,
    },
});


export default ActivityMain;