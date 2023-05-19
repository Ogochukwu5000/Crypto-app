import React from 'react';
import {Text, View} from 'react-native';
import Main from './Main';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;
