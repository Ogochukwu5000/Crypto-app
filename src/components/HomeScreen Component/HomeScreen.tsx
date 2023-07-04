import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import CoinDetailedScreen from './CoinDetailedScreen';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Home(): JSX.Element {
    const coinId = 'bitcoin';
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <CoinDetailedScreen coinId={coinId}
            />
            {/* Bottom half  log in modal */}
            <KeyboardAvoidingView
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal]}>

            </KeyboardAvoidingView>
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
});

export default Home;