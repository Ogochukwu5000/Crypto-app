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
} from 'react-native';
import Loading from '../LoadingScreen Component/LoadingScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function ChooseCryptoTag(): JSX.Element {
    const [cryptoTag, setCryptoTag] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        axios
            .post('http://10.0.0.174:8000/user/check-crypto-tag', {
                crypto_tag: !cryptoTag.startsWith('#') ? '#' + cryptoTag : cryptoTag,
            })
            .then((response) => {
                if (response.data.cryptoTag) {
                    dispatch({ type: 'SIGNUP', payload: { cryptoTag: !cryptoTag.startsWith('#') ? '#' + cryptoTag : cryptoTag } });
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false); // hide loading screen
                        navigation.navigate('CreatePin' as never); // navigate to next screen
                    }, 2000); // delay for 2 seconds
                    console.log('User: ', user);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Crypto Tag already exists.',
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Something went wrong. ${error}.`,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            })
    };


    return (
        <SafeAreaView style={styles.container}>
            {!isLoading ?
                (<>
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
                                Choose a #Cryptotag
                            </Text>
                            <Text
                                style={[
                                    styles.verificationSubHeader,
                                    isSmallScreen && styles.smallScreenVerificationSubHeader,
                                ]}>
                                Here’s the fun part! show us what you’ve got, create your unique crypto tag :)
                            </Text>
                        </View>
                    </View>
                    {/* Bottom half  log in modal */}
                    <KeyboardAvoidingView
                        style={[styles.bottomHalfLoginModal, isFocused && styles.focusedInput]}>
                        <View style={styles.emailInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Crypto Tag (e.g. #CryptoKing)"
                                onChangeText={setCryptoTag}
                                value={cryptoTag}
                                // specify type
                                keyboardType="email-address"
                                placeholderTextColor={'#3D4C63'}
                                textContentType="emailAddress"
                                onFocus={handleFocus}
                                onSubmitEditing={handleBlur}
                            />
                        </View>
                        <TouchableOpacity style={styles.resetButton} onPress={handleNext}>
                            <Text style={styles.resetButtonText}>Next</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </>
                ) :
                <View>
                    <Loading />
                </View>
            }
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
        height: '63%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },

    focusedInput: {
        height: '93%',
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
        marginLeft: '5%',
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

export default ChooseCryptoTag;
