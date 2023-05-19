import React from 'react';
import {Text, Image, SafeAreaView, StyleSheet} from 'react-native';

function LoginScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <Text style={styles.welcomeHeader}>Welcome Back!</Text>
      <Image
        source={require('../../assets/social.png')}
        style={styles.image}
        resizeMode="contain"
      />
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
    height: '40%',
    marginTop: '5%',
  },
  welcomeHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '5%',
  },
});

export default LoginScreen;
