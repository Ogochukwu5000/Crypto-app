import React, { useState } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function ChangePassword(): JSX.Element {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordHidden, setNewPasswordHidden] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

    const togglePasswordHidden = () => {
        setPasswordHidden(!passwordHidden);
    };

    const toggleNewPasswordHidden = () => {
        setNewPasswordHidden(!newPasswordHidden);
    };

    const toggleConfirmPasswordHidden = () => {
        setConfirmPasswordHidden(!confirmPasswordHidden);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={
                    () => navigation.navigate('Profile' as never)
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
                        Change Password
                    </Text>
                </View>
            </View>
            {/* Bottom half  log in modal */}
            <View
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal, isFocused && styles.focusedInput]}>
                <View style={styles.passwordInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
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
                <View style={styles.passwordInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        onChangeText={setNewPassword}
                        value={newPassword}
                        keyboardType="default"
                        placeholderTextColor={'#3D4C63'}
                        secureTextEntry={newPasswordHidden}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                    />
                    <TouchableOpacity
                        style={styles.passwordEye}
                        onPress={toggleNewPasswordHidden}>
                        {
                            // if password is hidden show text "show" else show text "hide"
                            newPasswordHidden ? (
                                <Text style={styles.passwordEyeText}>Show</Text>
                            ) : (
                                <Text style={styles.passwordEyeText}>Hide</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        keyboardType="default"
                        placeholderTextColor={'#3D4C63'}
                        secureTextEntry={confirmPasswordHidden}
                        onFocus={handleFocus}
                        onSubmitEditing={handleBlur}
                    />
                    <TouchableOpacity
                        style={styles.passwordEye}
                        onPress={toggleConfirmPasswordHidden}>
                        {
                            // if password is hidden show text "show" else show text "hide"
                            confirmPasswordHidden ? (
                                <Text style={styles.passwordEyeText}>Show</Text>
                            ) : (
                                <Text style={styles.passwordEyeText}>Hide</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
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
        height: '99%',
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
    isSmallBottomHalfModal: {
        height: '80%',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
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
        marginLeft: '10%',
    },
    smallScreenHeader: {
        fontSize: 25,
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
    input: {
        width: '100%',
        height: 50,
        marginTop: '5%',
        borderBottomWidth: 1,
        borderColor: '#D8D8D8',
        fontSize: 20,
    },
});

export default ChangePassword;