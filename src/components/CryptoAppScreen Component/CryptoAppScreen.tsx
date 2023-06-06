import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoAppMain from './CryptoAppMain';

function CryptoApp(): JSX.Element {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CryptoAppMainScreen"
                component={CryptoAppMain}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}



export default CryptoApp;