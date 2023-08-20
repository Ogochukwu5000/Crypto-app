import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PreAuthenticationNav from './src/Navigations/PreAuthenticationNav';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducers';
import CryptoApp from './src/components/CryptoAppScreen Component/CryptoAppScreen';

function Main(): JSX.Element {
  const user = useSelector((state: RootState) => state.userReducer.user);

  useEffect(() => {
    // console.log('User: ', user);
  }, [user?.authenticated]);

  return (
    <View style={styles.container}>
      {user?.authenticated ? <CryptoApp /> : <PreAuthenticationNav />}
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
