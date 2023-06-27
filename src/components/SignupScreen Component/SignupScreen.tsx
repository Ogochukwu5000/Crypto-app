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
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function SignupScreen(): JSX.Element {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const togglePasswordHidden = () => {
        setPasswordHidden(!passwordHidden);
    };

    const user = useSelector((state: RootState) => state.userReducer.user);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPassword(user.password);
        }
    }, [user]);

    const handleSignup = () => {
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long.');
        }

        if (!firstName || !lastName || !email || !password) {
            Alert.alert('Error', 'Please fill out all fields.');
        }

        if (firstName && lastName && email && password) {
            dispatch({ type: 'SIGNUP', payload: { firstName, lastName, email, password } });
            navigation.navigate('ChooseCryptoTag' as never);
        }

    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Image */}
            <Text style={styles.Header}>Create Account</Text>
            <Image
                source={require('../../assets/office.png')}
                style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                resizeMode="contain"
            />
            {/* Bottom half  log in modal */}
            <KeyboardAvoidingView
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal, isFocused && styles.focusedInput]}>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholderTextColor={'#3D4C63'}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                    />
                </View>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        onChangeText={setLastName}
                        value={lastName}
                        placeholderTextColor={'#3D4C63'}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                    />
                </View>
                <View style={styles.Input}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        onChangeText={setEmail}
                        value={email}
                        // specify type
                        keyboardType="email-address"
                        placeholderTextColor={'#3D4C63'}
                        textContentType="emailAddress"
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                    />
                </View>
                <View style={styles.passwordInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        keyboardType="default"
                        placeholderTextColor={'#3D4C63'}
                        secureTextEntry={passwordHidden}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                    />
                    <TouchableOpacity
                        style={styles.passwordEye}
                        onPress={togglePasswordHidden}>
                        {
                            // if password is hidden show text "show" else show text "hide"
                            passwordHidden ? (
                                <Text style={styles.passwordEyeText}>Show</Text>
                            ) : (
                                <Text style={styles.passwordEyeText}>Hide</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
                <View style={[styles.Footer, isSmallScreen && styles.isSmallScreenFooter]}>
                    <TouchableOpacity style={styles.getStartedButton} onPress={handleSignup}>
                        <Text style={styles.getStartedButtonText}>Let Get Started</Text>
                    </TouchableOpacity>
                    {/* Dont have an account sign up */}
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        navigation.navigate('Login' as never);
                    }}>
                        <Text style={styles.loginButtonText}>Already have an account?</Text>
                        <Text style={styles.loginLinkText}> Login</Text>
                    </TouchableOpacity>
                </View>
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
    image: {
        width: '90%',
        height: '30%',
        marginTop: '8%',
    },

    smallScreenImage: {
        width: '100%',
        height: '20%',
        marginTop: '8%',
    },

    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
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

    focusedInput: {
        height: '99%',
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

    passwordInput: {
        width: '90%',
        display: 'flex',
        marginTop: '5%',
    },

    passwordEye: {
        position: 'relative',
    },

    passwordEyeText: {
        color: '#3D4C63',
        zIndex: 100000,
    },

    forgotPasswordButton: {
        marginTop: '3%',
        marginLeft: '60%',
    },

    forgotPasswordBottonText: {
        color: '#3447F0',
        fontSize: 15,
    },

    getStartedButton: {
        backgroundColor: '#3447F0',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    getStartedButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    Footer: {
        marginTop: '10%',
    },

    isSmallScreenFooter: {
        marginTop: '2%',

    },

    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    loginButtonText: {
        color: '#3D4C63',
        fontSize: 16,
        textAlign: 'center',
    },
    loginLinkText: {
        color: '#3447F0',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SignupScreen;