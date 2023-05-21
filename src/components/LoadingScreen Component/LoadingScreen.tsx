import React, {useMemo, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const {width} = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

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
    transform: [{scale: 0.6}],
  },
});

export default Loading;
