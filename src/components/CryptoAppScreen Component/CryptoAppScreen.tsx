import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

function CryptoApp(): JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>This is the cryptoapp screen</Text>
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
});

export default CryptoApp;