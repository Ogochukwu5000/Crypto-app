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
    <View>
      {/* Image */}
      <Image source={require('../../assets/social.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '70%',
    alignSelf: 'center',
    marginTop: '5%',
    objectFit: 'contain',
  },
});

export default LoginScreen;
