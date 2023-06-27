import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseRecipientScreen from './ChooseRecipientScreen';
import PostAuthenticationNav from '../../Navigations/PostAuthenticationNav';
import ConfirmTransactionScreen from './ConfirmTransactionScreen';

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
        </Stack.Navigator>
    );
}



export default CryptoApp;