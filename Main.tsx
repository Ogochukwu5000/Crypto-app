import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PostAuthenticationNav from './src/Navigations/PostAuthenticationNav';
import PreAuthenticationNav from './src/Navigations/PreAuthenticationNav';

function Main(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <View style={styles.container}>
      {isLoggedIn ? <PostAuthenticationNav /> : <PreAuthenticationNav />}
      {/* {isLoggedIn ? <Text> Hi There </Text> : <Text> Bye There </Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    height: '100%',
    width: '100%',
  },
});

export default Main;
