import React from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

function OnboardingScreen2(): JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.headerContainer}><Text style={styles.Header}>Skip</Text></TouchableOpacity>
            <Image
                source={require('../../assets/social.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={[styles.bottomHalfModal]}>
                <Image
                    source={require('../../assets/step1.png')}
                    resizeMode="contain"
                    style={{ marginTop: 40 }}
                />
                <Text style={{ fontSize: 45, fontWeight: '600', marginTop: 45, textAlign: "center" }}>Create Your Unique Crypto Tag</Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 30, textAlign: "center", width: "80%" }}>Connect with people and send crypto anywhere with your unique Crypto tag.</Text>
                <TouchableOpacity style={styles.nextButton}>
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
        marginTop: '15%',
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