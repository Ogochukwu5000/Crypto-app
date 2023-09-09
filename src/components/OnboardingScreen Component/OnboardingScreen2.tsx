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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

function OnboardingScreen2({ setGettingStarted }: { setGettingStarted: (value: boolean) => void }): JSX.Element {
    const navigation = useNavigation();
    //change firstTime value to false
    const changeFirstTimeValue = async () => {
        await AsyncStorage.setItem('firstTime', 'false');
        setGettingStarted(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.headerContainer} onPress={changeFirstTimeValue}><Text style={styles.Header}>Skip</Text></TouchableOpacity>
            <Image
                source={require('../../assets/social.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={[styles.bottomHalfModal]}>
                <Image
                    source={require('../../assets/step2.png')}
                    resizeMode="contain"
                    style={{ marginTop: 40 }}
                />
                <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '600', marginTop: !isSmallScreen ? 45 : 30, textAlign: "center", color: "black" }}>Create Your Unique Crypto Tag</Text>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '300', marginTop: 30, textAlign: "center", width: "80%", color: "black" }}>Connect with people and send eth anywhere with your unique Crypto tag.</Text>
                <TouchableOpacity style={styles.nextButton} onPress={() => {
                    navigation.navigate('OnboardingScreen3' as never);
                }}>
                    <Text style={styles.NextButtonText}>Next</Text>
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
        width: responsiveWidth(100),
        height: responsiveHeight(35),
    },
    Header: {
        color: '#fff',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        padding: 10,
    },
    headerContainer: {
        alignSelf: 'flex-end',
    },
    bottomHalfModal: {
        backgroundColor: '#fff',
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    nextButton: {
        backgroundColor: '#3447F0',
        width: responsiveWidth(50),
        height: 50,
        borderRadius: 25,
        marginTop: responsiveHeight(5),
        alignItems: 'center',
        justifyContent: 'center',
    },

    NextButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default OnboardingScreen2;