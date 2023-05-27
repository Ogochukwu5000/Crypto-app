import React from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function VerifyEmailScreen(): JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            {/* Image */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/back.png')}
                    style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                    resizeMode="contain"
                />
                <View style={styles.headerText}>
                    <Text
                        style={[
                            styles.checkScreenHeader,
                            isSmallScreen && styles.smallScreenCheckScreenHeader,
                        ]}>
                        Verify Email
                    </Text>
                    <Text
                        style={[
                            styles.checkScreenSubHeader,
                            isSmallScreen && styles.smallScreenCheckScreenSubHeader,
                        ]}>
                        Just one last thing, lets verify that gorgeous email of yours!{' '}
                    </Text>
                </View>
            </View>
            <Image
                source={require('../../assets/email.png')}
                style={[
                    styles.emailImage,
                    isSmallScreen && styles.smallScreenEmailImage,
                ]}
                resizeMode="contain"
            />
            <TouchableOpacity
                style={[
                    styles.resetButton,
                    isSmallScreen && styles.smallScreenResetButton,
                ]}>
                <Text style={styles.resetButtonText}>Open Email App</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3447F0',
        alignItems: 'center',
    },

    resetButton: {
        backgroundColor: '#fff',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    resetButtonText: {
        color: '#347AF0',
        fontSize: 20,
        fontWeight: 'bold',
    },

    smallScreenResetButton: {
        marginTop: '20%',
    },
    checkScreenHeader: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '17%',
        width: '100%',
        alignItems: 'center',
    },
    smallScreenCheckScreenHeader: {
        fontSize: 25,
    },
    image: {
        width: 30,
        height: 100,
    },
    smallScreenImage: {
        width: 30,
        height: 80,
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
        paddingTop: '3%',
    },
    checkScreenSubHeader: {
        color: '#fff',
        fontSize: 15,
        width: '80%',
        marginTop: '2%',
        alignItems: 'center',
        textAlign: 'center',
    },
    smallScreenCheckScreenSubHeader: {
        fontSize: 13,
        width: '80%',
        alignItems: 'center',
        textAlign: 'center',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '6%',
    },
    emailImage: {
        width: 300,
        height: 500,
        marginTop: '10%',
        marginLeft: '10%',
    },
    smallScreenEmailImage: {
        width: 300,
        height: 300,
        marginTop: '10%',
        marginLeft: '10%',
    },
});

export default VerifyEmailScreen;
