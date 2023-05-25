import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PinVerification from '../components/PinVerificationScreen Component/PinVerificationScreen';
import ForgotPassword from '../components/ForgotPasswordScreen Component/ForgotPasswordScreen';
import CheckEmailScreen from '../components/CheckEmailScreen Component/CheckEmailScreen';
import CreateNewPassword from '../components/CreateNewPasswordScreen Component/CreateNewPassword';

function PreAuthenticationNav(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="PinVerification"
        component={PinVerification}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="CheckEmail"
        component={CheckEmailScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default PreAuthenticationNav;
