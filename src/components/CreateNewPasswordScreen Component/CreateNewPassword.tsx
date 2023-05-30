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
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function CreateNewPassword(): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordConfirmHidden, setPasswordConfirmHidden] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordHidden = () => {
    setPasswordHidden(!passwordHidden);
  };

  const togglePasswordConfirmHidden = () => {
    setPasswordConfirmHidden(!passwordConfirmHidden);
  };


  const handleCreateNewPassword = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    axios.post(`http://10.0.0.174:8000/user/reset-password/${user?.email}`, {
      password,
    }).then((response) => {
      if (response.status) {
        console.log('Response: ', response.data);
        Alert.alert('Success', 'Password reset successfully');
        navigation.navigate('Login' as never);
      }
    }).catch((error) => {
      console.log(error);
      Alert.alert('Error', 'Something went wrong try again, pretty please');
    }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/back.png')}
          style={[styles.image, isSmallScreen && styles.smallScreenImage]}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text
            style={[
              styles.topHeader,
              isSmallScreen && styles.smallScreentopHeader,
            ]}>
            Create New Password
          </Text>
          <Text
            style={[
              styles.topSubHeader,
              isSmallScreen && styles.smallScreentopSubHeader,
            ]}>
            Your new password must be different from a previously used password
          </Text>
        </View>
      </View>
      {/* Bottom half  log in modal */}
      <KeyboardAvoidingView
        style={[styles.bottomHalfLoginModal, isFocused && styles.focusedInput]}>
        <View style={styles.emailInput}>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
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
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              keyboardType="default"
              placeholderTextColor={'#3D4C63'}
              secureTextEntry={passwordConfirmHidden}
              onFocus={handleFocus}
              onSubmitEditing={handleBlur}
            />
            <TouchableOpacity
              style={styles.passwordEye}
              onPress={togglePasswordConfirmHidden}>
              {
                // if password is hidden show text "show" else show text "hide"
                passwordConfirmHidden ? (
                  <Text style={styles.passwordEyeText}>Show</Text>
                ) : (
                  <Text style={styles.passwordEyeText}>Hide</Text>
                )
              }
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleCreateNewPassword}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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

  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  topHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '5%',
    width: '100%',
    alignItems: 'center',
  },
  smallScreentopHeader: {
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
    paddingTop: '3%',
  },
  topSubHeader: {
    color: '#fff',
    fontSize: 15,
    width: '80%',
    marginTop: '2%',
    alignItems: 'center',
    textAlign: 'center',
  },
  smallScreentopSubHeader: {
    fontSize: 13,
    width: '80%',
    alignItems: 'center',
    textAlign: 'center',
  },
  headerText: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '5%',
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
});

export default CreateNewPassword;
