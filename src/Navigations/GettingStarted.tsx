import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen1 from '../components/OnboardingScreen Component/OnboardingScreen1';

function GettingStarted(): JSX.Element {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OnboardingScreen1"
                component={OnboardingScreen1}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default GettingStarted;