import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen1 from '../components/OnboardingScreen Component/OnboardingScreen1';
import OnboardingScreen2 from '../components/OnboardingScreen Component/OnboardingScreen2';
import OnboardingScreen3 from '../components/OnboardingScreen Component/OnboardingScreen3';
import OnboardingScreen4 from '../components/OnboardingScreen Component/OnboardingScreen4';

type GettingStartedProps = {
    setGettingStarted: (value: boolean) => void;
};

function GettingStarted({ setGettingStarted }: GettingStartedProps): JSX.Element {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OnboardingScreen1"
                component={() => <OnboardingScreen1 />}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OnboardingScreen2"
                component={OnboardingScreen2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OnboardingScreen3"
                component={OnboardingScreen3}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OnboardingScreen4"
                component={() => <OnboardingScreen4 setGettingStarted={setGettingStarted} />}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default GettingStarted;