import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

function OnboardingScreen3(): JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            <Text>OnboardingScreen3</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        height: '100%',
        width: '100%',
    },
});


export default OnboardingScreen3;