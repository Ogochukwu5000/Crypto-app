import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, SafeAreaView } from 'react-native';
import Home from '../components/HomeScreen Component/HomeScreen';
import CryptoApp from '../components/CryptoAppScreen Component/CryptoAppScreen';
import Search from '../components/SearchScreen Component/SearchScreen';
import Activity from '../components/ActivityScreen Component/ActivityScreen';

function PostAuthenticationNav(): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="cryptoapp" component={CryptoApp} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="activity" component={Activity} />
    </Tab.Navigator>
  );
}

export default PostAuthenticationNav;
