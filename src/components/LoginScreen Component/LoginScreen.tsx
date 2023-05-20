import React, {useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function LoginScreen(): JSX.Element {
  const [emailOrCtag, setEmailOrCtag] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordHidden = () => {
    setPasswordHidden(!passwordHidden);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <Text style={styles.welcomeHeader}>Welcome Back!</Text>
      <Image
        source={require('../../assets/social.png')}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Bottom half  log in modal */}
      <KeyboardAvoidingView
        style={[styles.bottomHalfLoginModal, isFocused && styles.focusedInput]}>
        <View style={styles.emailInput}>
          <TextInput
            style={styles.input}
            placeholder="Email address or Crypto tag"
            onChangeText={setEmailOrCtag}
            value={emailOrCtag}
            // specify type
            keyboardType="email-address"
            placeholderTextColor={'#3D4C63'}
            textContentType="emailAddress"
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordBottonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.loginFooter}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {/* Dont have an account sign up */}
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Don't have an account?</Text>
            <Text style={styles.signUpLinkText}> Sign up</Text>
          </TouchableOpacity>
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
  image: {
    width: '90%',
    height: '35%',
    marginTop: '5%',
  },
  welcomeHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  bottomHalfLoginModal: {
    backgroundColor: '#fff',
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  focusedInput: {
    height: '95%',
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

  passwordInput: {
    width: '90%',
    display: 'flex',
    marginTop: '5%',
  },

  passwordEye: {
    width: '10%',
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

  loginButton: {
    backgroundColor: '#3447F0',
    width: 200,
    height: 50,
    borderRadius: 25,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  loginFooter: {
    marginTop: '25%',
  },

  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  signUpButtonText: {
    color: '#3D4C63',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpLinkText: {
    color: '#3447F0',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
