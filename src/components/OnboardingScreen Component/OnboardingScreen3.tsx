import React from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

function OnboardingScreen3(): JSX.Element {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.headerContainer}><Text style={styles.Header}>Skip</Text></TouchableOpacity>
            <Image
                source={require('../../assets/login.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={[styles.bottomHalfModal]}>
                <Image
                    source={require('../../assets/step1.png')}
                    resizeMode="contain"
                    style={{ marginTop: 40 }}
                />
                <Text style={{ fontSize: !isSmallScreen ? 45 : 40, fontWeight: '600', marginTop: !isSmallScreen ? 45 : 30, textAlign: "center" }}>Goodbye To Long Wallet Address</Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 30, textAlign: "center", width: "80%" }}>Say goodbye to long wallet addresses and hello to your unique Crypto tag the future of transactions!</Text>
                <TouchableOpacity style={styles.nextButton} onPress={() => {
                    navigation.navigate('OnboardingScreen4' as never);
                }}>
                    <Text style={styles.NextButtonText}>One More 😎</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3447F0',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '30%',
    },
    Header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        padding: 10,
    },
    headerContainer: {
        alignSelf: 'flex-end',
    },
    bottomHalfModal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '63%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    nextButton: {
        backgroundColor: '#3447F0',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: !isSmallScreen ? '15%' : '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    NextButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default OnboardingScreen3;