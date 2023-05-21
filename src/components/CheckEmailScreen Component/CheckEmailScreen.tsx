import React from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function CheckEmailScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/back.png')}
          style={[styles.image, isSmallScreen && styles.smallScreenImage]}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text
            style={[
              styles.checkScreenHeader,
              isSmallScreen && styles.smallScreenCheckScreenHeader,
            ]}>
            Check Your Email
          </Text>
          <Text
            style={[
              styles.checkScreenSubHeader,
              isSmallScreen && styles.smallScreenCheckScreenSubHeader,
            ]}>
            Follow a password recovery instructions we have just sent to your
            email address{' '}
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3447F0',
    alignItems: 'center',
  },

  resetButton: {
    backgroundColor: '#3447F0',
    width: 200,
    height: 50,
    borderRadius: 25,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkScreenHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '10%',
    width: '100%',
    alignItems: 'center',
  },
  smallScreenCheckScreenHeader: {
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
    paddingTop: '3%',
  },
  checkScreenSubHeader: {
    color: '#fff',
    fontSize: 15,
    width: '80%',
    marginTop: '2%',
    alignItems: 'center',
    textAlign: 'center',
  },
  smallScreenCheckScreenSubHeader: {
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
});

export default CheckEmailScreen;
