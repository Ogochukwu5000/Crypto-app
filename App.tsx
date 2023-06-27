import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

function App(): JSX.Element {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
}

export default App;
