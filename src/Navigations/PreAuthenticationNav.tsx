import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen Component/LoginScreen';

function PreAuthenticationNav(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default PreAuthenticationNav;