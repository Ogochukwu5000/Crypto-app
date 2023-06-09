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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

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
            {/* Bottom half  log in modal */}
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
});

export default ChooseRecipientScreen;