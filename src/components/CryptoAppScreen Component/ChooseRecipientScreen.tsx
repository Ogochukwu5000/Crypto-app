import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

type Recipient = {
    id: string;
    fullName: string;
    cryptoTag: string;
    profilePicture: string;
};

const recipients: Recipient[] = [
    {
        id: '1',
        fullName: 'John Doe',
        cryptoTag: 'jdoe',
        profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&color=fff&size=30&font-size=0.7',
    },
    {
        id: '2',
        fullName: 'Jane Smith',
        cryptoTag: 'janySmitha',
        profilePicture: 'https://ui-avatars.com/api/?name=Jane+Smith&color=fff&size=30&font-size=0.7',
    },
    {
        id: '3',
        fullName: 'Bob Johnson',
        cryptoTag: 'BobJ',
        profilePicture: 'https://ui-avatars.com/api/?name=Bob+Johnson&color=fff&size=30&font-size=0.7',
    },
];

function ChooseRecipientScreen(): JSX.Element {
    const [cryptoTag, setCryptoTag] = useState('');
    const navigation = useNavigation();



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
                        0.0096BTC ($1,655 USD)
                    </Text>
                </View>
            </View>
            <KeyboardAvoidingView
                style={[styles.bottomHalfModal]}
            >
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter crypto tag or name"
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
        marginLeft: '13%',
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
        marginLeft: '5%',
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