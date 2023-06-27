import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  SkypeIndicator,
} from 'react-native-indicators';

function Loading(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <SkypeIndicator color="white" size={100} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3447F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
    transform: [{ scale: 0.6 }],
  },
});

export default Loading;
