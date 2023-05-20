import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function PinVerification(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/back.png')}
          style={[styles.image, isSmallScreen && styles.smallScreenImage]}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text
            style={[
              styles.verificationHeader,
              isSmallScreen && styles.smallScreenVerificationHeader,
            ]}>
            Verification Required
          </Text>
          <Text
            style={[
              styles.verificationSubHeader,
              isSmallScreen && styles.smallScreenVerificationSubHeader,
            ]}>
            Please enter your PIN to proceed
          </Text>
        </View>
      </View>
      {/* four white circles for pin */}
      <View
        style={[
          styles.pinContainer,
          isSmallScreen && styles.smallScreenPinContainer,
        ]}>
        <View style={styles.pin}></View>
        <View style={styles.pin}></View>
        <View style={styles.pin}></View>
        <View style={styles.pin}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3447F0',
    alignItems: 'center',
  },
  verificationHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '5%',
    width: '100%',
  },
  smallScreenVerificationHeader: {
    fontSize: 25,
  },
  image: {
    width: 30,
    height: 100,
  },
  smallScreenImage: {
    width: 30,
    height: 80,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%',
  },
  verificationSubHeader: {
    color: '#fff',
    fontSize: 15,
    marginLeft: '13%',
    width: '100%',
    marginTop: '2%',
  },
  smallScreenVerificationSubHeader: {
    fontSize: 13,
    marginLeft: '10%',
  },
  headerText: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '5%',
  },
  pinContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    gap: 25,
    justifyContent: 'center',
    height: '40%',
    marginLeft: '3%',
  },
  smallScreenPinContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    gap: 20,
    justifyContent: 'center',
    height: '40%',
    marginLeft: '3%',
  },
  pin: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

export default PinVerification;
