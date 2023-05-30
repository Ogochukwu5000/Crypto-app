import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PostAuthenticationNav from './src/Navigations/PostAuthenticationNav';
import PreAuthenticationNav from './src/Navigations/PreAuthenticationNav';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducers';

function Main(): JSX.Element {
  const user = useSelector((state: RootState) => state.userReducer.user);
  return (
    <View style={styles.container}>
      {user?.authenticated ? <PostAuthenticationNav /> : <PreAuthenticationNav />}
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
