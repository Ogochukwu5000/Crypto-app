import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

function PostAuthenticationNav(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <SafeAreaView>
      <View>
        <Text>This is the POST AUTH NAV</Text>
      </View>
    </SafeAreaView>
  );
}

export default PostAuthenticationNav;
