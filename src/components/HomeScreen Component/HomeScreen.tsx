import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Home(): JSX.Element {
    const coinId = 'bitcoin';

    const [address, setAddress] = useState('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
    const [cryptoTag, setCryptoTag] = useState('BTC');

    const handleReceivePress = () => {
        Alert.alert(
            'Receive',
            `Address: ${address}\nCrypto Tag: ${cryptoTag}`,
            [
                {
                    text: 'Copy Tag',
                    onPress: () => {
                        // TODO: Implement copy tag functionality
                        
                    },
                },
                {
                    text: 'Copy Address',
                    onPress: () => {
                        // TODO: Implement copy address functionality
                    },
                },
                {
                    text: 'Thanks',
                    onPress: () => {},
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
                        <Text>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleReceivePress}>
                        <Image source={require('../../assets/Receive.png')} />
                        <Text>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={require('../../assets/send.png')} />
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.assetText}>Asset</Text>
                <ScrollView style={styles.assetContainer}>
                    <TouchableOpacity style={styles.asset}>
                        <Image style={styles.assetIcon} source={require('../../assets/Bitcoin.png')} />
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetName}>Bitcoin</Text>
                            <Text style={styles.assetCryptoPrice}>0.8934 BTC</Text>
                        </View>
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetPrice}>$ 5,000</Text>
                            <Text style={styles.assetPercent}>+ 5.24%</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.asset}>
                        <Image style={styles.assetIcon} source={require('../../assets/ethereumIcon.png')} />
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetName}>Ethereum</Text>
                            <Text style={styles.assetCryptoPrice}>0.8934 ETH</Text>
                        </View>
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetPrice}>$ 2,000</Text>
                            <Text style={styles.assetPercent}>+ 2.44%</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.asset}>
                        <Image style={styles.assetIcon} source={require('../../assets/Stellar.png')} />
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetName}>Stellar</Text>
                            <Text style={styles.assetCryptoPrice}>0.8934 XLM</Text>
                        </View>
                        <View style={
                            styles.assetTextContainer
                        }>
                            <Text style={styles.assetPrice}>$ 3,450</Text>
                            <Text style={styles.assetPercent}>+ 2.34%</Text>
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
});

export default Home;