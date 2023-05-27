import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PinVerification from '../components/PinVerificationScreen Component/PinVerificationScreen';
import ForgotPassword from '../components/ForgotPasswordScreen Component/ForgotPasswordScreen';
import CheckEmailScreen from '../components/CheckEmailScreen Component/CheckEmailScreen';
import CreateNewPassword from '../components/CreateNewPasswordScreen Component/CreateNewPassword';
import SignupScreen from '../components/SignupScreen Component/SignupScreen';
import ChooseCryptoTag from '../components/ChooseCryptoTagScreen Component/ChooseCryptoTag';
import CreatePin from '../components/CreatePinScreen Component/CreatePinScreen';
import ConfirmPin from '../components/ConfirmPinScreen Component/ConfirmPinScreen';
import VerifyEmailScreen from '../components/VerifyEmailScreen Component/VerifyEmailScreen';
import LoginScreen from '../components/LoginScreen Component/LoginScreen';
import Welcome from '../components/WelcomeScreen Component/WelcomeScreen';

function PreAuthenticationNav(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PinVerification"
        component={PinVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckEmail"
        component={CheckEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseCryptoTag"
        component={ChooseCryptoTag}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePin"
        component={CreatePin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmPin"
        component={ConfirmPin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default PreAuthenticationNav;
