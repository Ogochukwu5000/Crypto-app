import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityMain from './ActivityMainScreen';
import ActivityDetails from './ActivityTransactionDetails';

function Activity(): JSX.Element {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ActivityMainScreen"
                component={ActivityMain}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ActivityTransactionDetails"
                component={ActivityDetails}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Activity;