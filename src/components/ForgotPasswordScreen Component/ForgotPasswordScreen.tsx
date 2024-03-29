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
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../constants/config';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleResetPassword = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    axios
      .post(`${BASE_URL}user/forgot-password`, {
        email: email.toLowerCase(),
      }).
      then((response) => {
        if (response.data.status) {
          // console.log('Response: ', response.data);
          dispatch({
            type: 'VERIFY_OTP',
            payload: {
              otp: response.data.otp,
              email: response.data.email,
            },
          });
          navigation.navigate('CheckEmail' as never);
        } else {
          Alert.alert('Error', response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            Forgot Password
          </Text>
          <Text
            style={[
              styles.SubHeader,
              isSmallScreen && styles.smallScreenSubHeader,
            ]}>
            Enter your registered email address to receive password reset instruction
          </Text>
        </View>
      </View>
      {/* Bottom half  log in modal */}
      <KeyboardAvoidingView
        style={[styles.bottomHalfModal, isFocused && styles.focusedInput]}>
        <View style={styles.emailInput}>
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
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
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
  bottomHalfModal: {
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
    marginLeft: '5%',
  },
  SubHeader: {
    color: '#fff',
    fontSize: 15,
    marginLeft: '3%',
    width: '80%',
    marginTop: '2%',
    textAlign: 'center',
  },
  smallScreenSubHeader: {
    fontSize: 13,
    marginLeft: '1%',
  },
  headerText: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '5%',
  },
});

export default ForgotPassword;
