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
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

function OnboardingScreen4({ setGettingStarted }: { setGettingStarted: (value: boolean) => void }): JSX.Element {
    //change firstTime value to false
    const changeFirstTimeValue = async () => {
        await AsyncStorage.setItem('firstTime', 'false');
        setGettingStarted(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.headerContainer} onPress={changeFirstTimeValue}><Text style={styles.Header}>Skip</Text></TouchableOpacity>
            <Image
                source={require('../../assets/idea.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={[styles.bottomHalfModal]}>
                <Image
                    source={require('../../assets/step4.png')}
                    resizeMode="contain"
                    style={{ marginTop: 40 }}
                />
                <Text style={{ fontSize: !isSmallScreen ? 45 : 41, fontWeight: '600', marginTop: !isSmallScreen ? 45 : 30, textAlign: "center" }}>A One Stop Shop For All Your Wallets.</Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: !isSmallScreen ? 30 : 30, textAlign: "center", width: "80%" }}>
                    Store all your wallet in crypto app and make transaction seamlessly, yes we’re serious!</Text>
                <TouchableOpacity style={styles.nextButton} onPress={changeFirstTimeValue}>
                    <Text style={styles.NextButtonText}>Lets GO!</Text>
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
        height: !isSmallScreen ? '30%' : '27%',
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


export default OnboardingScreen4;