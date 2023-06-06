import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/HomeScreen Component/HomeScreen';
import CryptoApp from '../components/CryptoAppScreen Component/CryptoAppScreen';
import Search from '../components/SearchScreen Component/SearchScreen';
import Activity from '../components/ActivityScreen Component/ActivityScreen';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

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

const homeSvgNotFocused = `
<svg width="45" height="34" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_30_2425)">
<path d="M1.25 19.2857L17.5 5.35715L33.75 19.2857" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.25 15V28.9286H28.75V15" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 28.9286V20.3572" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_30_2425">
<rect width="35" height="30" fill="#B3B3B3"/>
</clipPath>
</defs>
</svg>
`

const homeSvgFocused = `
<svg width="45" height="34" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_30_2425)">
<path d="M1.25 19.2857L17.5 5.35715L33.75 19.2857" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.25 15V28.9286H28.75V15" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 28.9286V20.3572" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_30_2425">
<rect width="35" height="30" fill="white"/>
</clipPath>
</defs>
</svg>
`

const homeSvgFocusedBlack = `
<svg width="45" height="34" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_30_2425)">
<path d="M1.25 19.2857L17.5 5.35715L33.75 19.2857" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.25 15V28.9286H28.75V15" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 28.9286V20.3572" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_30_2425">
<rect width="35" height="30" fill="black"/>
</clipPath>
</defs>
</svg>
`

const searchSvgFocused = `
<svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_30_2431)">
<path d="M10.9943 19.44C16.5534 19.44 21.06 15.2801 21.06 10.1486C21.06 5.01706 16.5534 0.857147 10.9943 0.857147C5.43513 0.857147 0.928558 5.01706 0.928558 10.1486C0.928558 15.2801 5.43513 19.44 10.9943 19.44Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.0714 23.1429L18.1071 16.7143" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_30_2431">
<rect width="26" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`

const searchSvgFocusedBlack = `
<svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_30_2431)">
<path d="M10.9943 19.44C16.5534 19.44 21.06 15.2801 21.06 10.1486C21.06 5.01706 16.5534 0.857147 10.9943 0.857147C5.43513 0.857147 0.928558 5.01706 0.928558 10.1486C0.928558 15.2801 5.43513 19.44 10.9943 19.44Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.0714 23.1429L18.1071 16.7143" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_30_2431">
<rect width="26" height="24" fill="black"/>
</clipPath>
</defs>
</svg>
`

const searchSvgNotFocused = `
<svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_30_2431)">
<path d="M10.9943 19.44C16.5534 19.44 21.06 15.2801 21.06 10.1486C21.06 5.01706 16.5534 0.857147 10.9943 0.857147C5.43513 0.857147 0.928558 5.01706 0.928558 10.1486C0.928558 15.2801 5.43513 19.44 10.9943 19.44Z" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.0714 23.1429L18.1071 16.7143" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/> 
</g>
<defs>
<clipPath id="clip0_30_2431">
<rect width="26" height="24" fill="#B3B3B3"/>
</clipPath>
</defs>
</svg>
`

const activitySvgFocused = `
<svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 29C23.732 29 30 22.9558 30 15.5C30 8.04416 23.732 2 16 2C8.26801 2 2 8.04416 2 15.5C2 22.9558 8.26801 29 16 29Z" stroke="#EEEEEE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 10.3077V15.5L21.4708 21.6477" stroke="#EEEEEE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const activitySvgFocusedBlack = `
<svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 29C23.732 29 30 22.9558 30 15.5C30 8.04416 23.732 2 16 2C8.26801 2 2 8.04416 2 15.5C2 22.9558 8.26801 29 16 29Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 10.3077V15.5L21.4708 21.6477" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const activitySvgNotFocused = `
<svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 29C23.732 29 30 22.9558 30 15.5C30 8.04416 23.732 2 16 2C8.26801 2 2 8.04416 2 15.5C2 22.9558 8.26801 29 16 29Z" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 10.3077V15.5L21.4708 21.6477" stroke="#B3B3B3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

function PostAuthenticationNav(): JSX.Element {
  const cryptoAppScreen = useSelector((state: RootState) => state.navigateReducer.cryptoAppScreen);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="cryptoapp" screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: `${route.name === 'cryptoapp' ? '#3447F0' : '#FFFFFF'}`,
      },
      tabBarActiveTintColor: `${route.name === 'cryptoapp' ? '#3447F0' : '#FFFFFF'}`,
      tabBarInactiveTintColor: `${route.name === 'cryptoapp' ? '#3447F0' : '#FFFFFF'}`,
    })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => {
            const svgXmlData = focused ? !cryptoAppScreen ? homeSvgFocusedBlack : homeSvgFocused : homeSvgNotFocused;
            return <SvgXml xml={svgXmlData} width={40} height={70} fill={color} />;
          },
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
        tabBarIcon: ({ focused, color, size }) => {
          const svgXmlData = focused ? !cryptoAppScreen ? searchSvgFocusedBlack : searchSvgFocused : searchSvgNotFocused;
          return <SvgXml xml={svgXmlData} width={30} height={70} fill={color} />;
        }
      }} name="Search" component={Search} />
      <Tab.Screen options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused, color, size }) => {
          const svgXmlData = focused ? !cryptoAppScreen ? activitySvgFocusedBlack : activitySvgFocused : activitySvgNotFocused;
          return <SvgXml xml={svgXmlData} width={40} height={70} fill={color} />;
        }
      }} name="Activity" component={Activity} />
    </Tab.Navigator>
  );
}

export default PostAuthenticationNav;