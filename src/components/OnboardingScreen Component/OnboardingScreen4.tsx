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

function OnboardingScreen4(): JSX.Element {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.headerContainer}><Text style={styles.Header}>Skip</Text></TouchableOpacity>
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
                <Text style={{ fontSize: !isSmallScreen ? 45 : 40, fontWeight: '600', marginTop: !isSmallScreen ? 45 : 30, textAlign: "center" }}>A One Stop Shop For All Your Wallets.</Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: !isSmallScreen ? 30 : 20, textAlign: "center", width: "80%" }}>
                    Store all your wallet in crypto app and make transaction seamlessly, yes we’re serious!</Text>
                <TouchableOpacity style={styles.nextButton} onPress={() => {
                    navigation.navigate('OnboardingScreen4' as never);
                }}>
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
        marginTop: !isSmallScreen ? '15%' : '5%',
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