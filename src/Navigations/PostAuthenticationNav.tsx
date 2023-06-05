import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/HomeScreen Component/HomeScreen';
import CryptoApp from '../components/CryptoAppScreen Component/CryptoAppScreen';
import Search from '../components/SearchScreen Component/SearchScreen';
import Activity from '../components/ActivityScreen Component/ActivityScreen';
import { SvgXml } from 'react-native-svg';

const cryptoAppSvgFocused = `
<svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.3552 6.05C25.3452 6.05 27.0252 6.23 29.3952 6.59L30.4752 6.725L30.3402 9.47C27.9402 9.2 26.1702 9.065 25.0302 9.065C22.4802 9.065 20.7402 9.68 19.8102 10.91C18.9102 12.11 18.4602 14.36 18.4602 17.66C18.4602 20.93 18.8802 23.21 19.7202 24.5C20.5902 25.79 22.3752 26.435 25.0752 26.435L30.3852 26.03L30.5202 28.82C27.7302 29.24 25.6452 29.45 24.2652 29.45C20.7552 29.45 18.3252 28.55 16.9752 26.75C15.6552 24.95 14.9952 21.92 14.9952 17.66C14.9952 13.37 15.7152 10.37 17.1552 8.66C18.5952 6.92 20.9952 6.05 24.3552 6.05Z" fill="white"/>
<line x1="24" y1="2" x2="24" y2="8" stroke="white" stroke-width="4"/>
<line x1="24" y1="28" x2="24" y2="34" stroke="white" stroke-width="4"/>
</svg>
`

const cryptoAppSvgNotFocused = `
<svg width="45" height="34" viewBox="0 0 45 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.3552 6.05C25.3452 6.05 27.0252 6.23 29.3952 6.59L30.4752 6.725L30.3402 9.47C27.9402 9.2 26.1702 9.065 25.0302 9.065C22.4802 9.065 20.7402 9.68 19.8102 10.91C18.9102 12.11 18.4602 14.36 18.4602 17.66C18.4602 20.93 18.8802 23.21 19.7202 24.5C20.5902 25.79 22.3752 26.435 25.0752 26.435L30.3852 26.03L30.5202 28.82C27.7302 29.24 25.6452 29.45 24.2652 29.45C20.7552 29.45 18.3252 28.55 16.9752 26.75C15.6552 24.95 14.9952 21.92 14.9952 17.66C14.9952 13.37 15.7152 10.37 17.1552 8.66C18.5952 6.92 20.9952 6.05 24.3552 6.05Z" fill="#B3B3B3"/>
<line x1="24" y1="2" x2="24" y2="8" stroke="#B3B3B3" stroke-width="4"/>
<line x1="24" y1="28" x2="24" y2="34" stroke="#B3B3B3" stroke-width="4"/>
</svg>
`
function PostAuthenticationNav(): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="cryptoapp" screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: `#3447F0`,
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#B3B3B3',
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen options={
        {
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => {
            const svgXmlData = focused ? cryptoAppSvgFocused : cryptoAppSvgNotFocused;
            return <SvgXml xml={svgXmlData} width={50} height={70} fill={color} />;
          },
        }
      } name="cryptoapp" component={CryptoApp} />
      <Tab.Screen options={{
        tabBarLabel: () => null,
      }} name="Search" component={Search} />
      <Tab.Screen options={{
        tabBarLabel: () => null,
      }} name="Activity" component={Activity} />
    </Tab.Navigator>
  );
}

export default PostAuthenticationNav;