import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

function LoginScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Text style={styles.welcomeHeader}>Welcome Back!</Text>
      <Image source={require('../../assets/social.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3447F0',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '40%',
    alignSelf: 'center',
    marginTop: '5%',
    objectFit: 'contain',
  },
  welcomeHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '20%',
  },
});

export default LoginScreen;
