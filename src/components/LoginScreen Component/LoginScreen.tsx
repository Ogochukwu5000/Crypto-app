import React, {useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function LoginScreen(): JSX.Element {
  const [emailOrCtag, setEmailOrCtag] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);

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
      <View style={styles.bottomHalfLoginModal}>
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
          />
        </View>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            // specify type
            keyboardType="default"
            placeholderTextColor={'#3D4C63'}
            secureTextEntry={passwordHidden}
          />
          <TouchableOpacity style={styles.passwordEye}>
            <Image
              source={require('../../assets/eye.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
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

  passwordEye: {position: 'absolute', right: 20, bottom: 15},
});

export default LoginScreen;
