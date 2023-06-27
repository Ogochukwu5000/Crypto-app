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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
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
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.userReducer.user);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleNext = () => {
    };

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
                            styles.verificationHeader,
                            isSmallScreen && styles.smallScreenVerificationHeader,
                        ]}>
                        Choose Recipient
                    </Text>
                    <Text
                        style={[
                            styles.verificationSubHeader,
                            isSmallScreen && styles.smallScreenVerificationSubHeader,
                        ]}>
                        0.0096BTC ($1,655 USD)
                    </Text>
                </View>
            </View>
            <KeyboardAvoidingView
                style={[styles.bottomHalfLoginModal]}
            >
                <View style={styles.emailInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter crypto tag or name"
                        onChangeText={setCryptoTag}
                        value={cryptoTag}
                        placeholderTextColor={'#3D4C63'}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
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
    bottomHalfLoginModal: {
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
    emailInput: {
        width: '90%',
        display: 'flex',
        marginTop: '5%',
    },
    resetButton: {
        backgroundColor: '#3447F0',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    verificationHeader: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '13%',
        width: '100%',
    },
    smallScreenVerificationHeader: {
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
    verificationSubHeader: {
        color: '#fff',
        fontSize: 15,
        width: '80%',
        marginTop: '2%',
        textAlign: 'center',
    },
    smallScreenVerificationSubHeader: {
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