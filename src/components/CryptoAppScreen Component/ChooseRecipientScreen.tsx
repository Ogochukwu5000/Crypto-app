import React, { useState, useEffect } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

type Recipient = {
    id: string;
    fullName: string;
    cryptoTag: string;
    profilePicture: string;
};

function ChooseRecipientScreen({ route }: any): JSX.Element {
    const [cryptoTag, setCryptoTag] = useState('');
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (cryptoTag) {
            axios.get(`http://10.0.0.174:8000/user/search-user?crypto_tag=${cryptoTag}`)
                .then(response => {
                    setRecipients(response.data);
                    console.log(`Recipients: ${JSON.stringify(response.data)}`)
                })
                .catch(error => {
                    console.error(`Error: ${JSON.stringify(error)}`);
                });
        }
    }, [cryptoTag]);

    const renderItem = ({ item }: { item: Recipient }) => (
        <TouchableOpacity
            style={styles.recipientItem}
            onPress={() => {
                navigation.navigate('ConfirmTransactionScreen' as never);
            }}
        >
            <Image
                source={{ uri: item.profilePicture }}
                style={styles.recipientProfilePicture}
                resizeMode="contain"
            />
            <View style={styles.recipientInfo}>
                <Text style={styles.recipientFullName}>{item.fullName}</Text>
                <Text style={styles.recipientCryptoTag}>{item.cryptoTag}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Image */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={require('../../assets/back.png')}
                        style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text
                        style={[
                            styles.Header,
                            isSmallScreen && styles.smallScreenHeader,
                        ]}>
                        Choose Recipient
                    </Text>
                    <Text
                        style={[
                            styles.SubHeader,
                            isSmallScreen && styles.smallScreenSubHeader,
                        ]}>
                        {/* 0.0096BTC ($1,655 USD) */}
                        {route.params.cryptoAmount.toFixed(5)} {route.params.selectedCrypto === "ethereum" ? "ETH" : null} (${route.params.amount} USD)
                    </Text>
                </View>
            </View>
            <KeyboardAvoidingView
                style={[styles.bottomHalfModal]}
            >
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter crypto tag"
                        onChangeText={setCryptoTag}
                        value={cryptoTag}
                        placeholderTextColor={'#3D4C63'}
                    />
                </View>
                <FlatList
                    data={recipients}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.recipientList}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        height: '85%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    focusedInput: {
        height: '90%',
    },
    input: {
        width: '100%',
        height: 50,
        marginTop: '5%',
        borderBottomWidth: 1,
        borderColor: '#D8D8D8',
        fontSize: 20,
    },
    Input: {
        width: '90%',
        display: 'flex',
        marginTop: '5%',
    },
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        width: '100%',
    },
    smallScreenHeader: {
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
    },
    SubHeader: {
        color: '#fff',
        fontSize: 15,
        width: '80%',
        marginTop: '2%',
        textAlign: 'center',
        marginLeft: '1%',
    },
    smallScreenSubHeader: {
        fontSize: 13,
        marginLeft: '3%',
        width: '70%',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '3%',
    },
    recipientList: {
        width: '100%',
        marginTop: '5%',
    },
    recipientItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    recipientProfilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    recipientInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    recipientFullName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipientCryptoTag: {
        fontSize: 14,
        color: '#3D4C63',
    },
});

export default ChooseRecipientScreen;