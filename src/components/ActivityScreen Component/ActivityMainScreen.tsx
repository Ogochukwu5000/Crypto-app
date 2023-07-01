import React, { useState, useEffect } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function ActivityMain(): JSX.Element {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>All Activity</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: '500',
        marginTop: 20,
    },
});


export default ActivityMain;