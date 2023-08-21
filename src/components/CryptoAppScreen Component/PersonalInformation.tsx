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
    Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/reducers";
import axios from 'axios';
import { BASE_URL } from '../../constants/config';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function PersonalInformation(): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [cryptoTag, setCryptoTag] = useState(user?.cryptoTag);
    const [bio, setBio] = useState(user?.bio);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleSubmit = () => {
        if (!firstName || !lastName || !cryptoTag) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }
        if (firstName === user?.firstName && lastName === user?.lastName && cryptoTag === user?.cryptoTag && bio === user?.bio) {
            Alert.alert('Error', 'Please change at least one field');
            return;
        }
        axios
            .post(`${BASE_URL}user/update-personal-info`, {
                firstName,
                lastName,
                cryptoTag,
                bio,
                email: user?.email,
            })
            .then((res) => {
                //console.log(res);
                // SET_PERSONAL_INFO
                dispatch({
                    type: 'SET_PERSONAL_INFO',
                    payload: {
                        firstName,
                        lastName,
                        cryptoTag,
                        bio,
                    },
                });
                navigation.goBack();
                Alert.alert('Success', 'Your personal information has been updated');
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Something went wrong, please try again');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={
                    () => navigation.goBack()
                }>
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
                        Personal Information
                    </Text>
                    <Text
                        style={[
                            styles.SubHeader,
                            isSmallScreen && styles.smallScreenSubHeader,
                        ]}>
                        We would love to know you more, we think you’re amazing so why not tell us a bit about yourself :)
                    </Text>
                </View>
            </View>
            {/* Bottom half  log in modal */}
            <KeyboardAvoidingView
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal, isFocused && styles.focusedInput]}>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={'#3D4C63'}
                        value={firstName}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                        onChangeText={(text) => setFirstName(text)}
                    />
                </View>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={'#3D4C63'}
                        value={lastName}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                        onChangeText={(text) => setLastName(text)}
                    />
                </View>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Crypto Tag"
                        placeholderTextColor={'#3D4C63'}
                        value={cryptoTag}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                        onChangeText={(text) => setCryptoTag(text)}
                    />
                </View>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Bio (Why do you love crypto ?)"
                        placeholderTextColor={'#3D4C63'}
                        onFocus={handleFocus}
                        value={bio}
                        onSubmitEditing={handleBlur}
                        onChangeText={(text) => setBio(text)}
                    />
                </View>
                <TouchableOpacity onPress={
                    () => handleSubmit()
                } style={[styles.saveButton, isSmallScreen && styles.smallScreenSaveButton]}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
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
    focusedInput: {
        height: '98%',
    },
    bottomHalfModal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '75%',
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
    image: {
        width: 30,
        height: 100,
    },
    smallScreenImage: {
        width: 30,
        height: 80,
    },
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '5%',
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
    saveButton: {
        backgroundColor: '#3447F0',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallScreenSaveButton: {
        marginTop: '5%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PersonalInformation;