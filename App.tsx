import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GettingStarted from "./src/Navigations/GettingStarted"

function App(): JSX.Element {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
          {
            AsyncStorage.getItem('firstTime') === null ? <GettingStarted /> : <Main />
          }
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
}

export default App;
