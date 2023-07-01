import React, { useEffect } from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GettingStarted from "./src/Navigations/GettingStarted"

function App(): JSX.Element {
  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTimeValue = await AsyncStorage.getItem('firstTime');
      if (firstTimeValue === null || firstTimeValue === undefined) {
        await AsyncStorage.setItem('firstTime', 'true');
      }
    };

    checkFirstTime();
  }, []);

  const [showGettingStarted, setShowGettingStarted] = React.useState(false);

  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTimeValue = await AsyncStorage.getItem('firstTime');
      setShowGettingStarted(firstTimeValue === 'true');
    };

    checkFirstTime();
  }, [
    showGettingStarted,
  ]);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
          {showGettingStarted ? <GettingStarted setGettingStarted={setShowGettingStarted}/> : <Main />}
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
}

export default App;