import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

function LoginScreen(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <SafeAreaView>
      <Text>This is the The login screen</Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
