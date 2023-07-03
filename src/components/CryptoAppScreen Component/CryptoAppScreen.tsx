import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseRecipientScreen from './ChooseRecipientScreen';
import PostAuthenticationNav from '../../Navigations/PostAuthenticationNav';
import ConfirmTransactionScreen from './ConfirmTransactionScreen';
import TransactionDetails from './TransactionDetails';
import RecipientsAmount from './RecipientsAmount';
import Profile from './Profile';
import PersonalInformation from './PersonalInformation';
import Security from './Security';
import ChangePassword from './ChangePassword';
import CurrentPin from './CurrentPin';
import CreatePin from './CreatePin';
import ConfirmPin from './ConfirmPin';
import Wallet from './Wallet';

function CryptoApp(): JSX.Element {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CryptoAppMainScreen"
                component={PostAuthenticationNav}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChooseRecipientScreen"
                component={ChooseRecipientScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ConfirmTransactionScreen"
                component={ConfirmTransactionScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RecipientsAmount"
                component={RecipientsAmount}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Security"
                component={Security}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CurrentPin"
                component={CurrentPin}
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
                name="ConnectWallet"
                component={Wallet}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}



export default CryptoApp;