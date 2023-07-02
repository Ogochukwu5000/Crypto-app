import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Discover from './DiscoverScreen';

function Search(): JSX.Element {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DiscoverScreen"
                component={Discover}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Search;