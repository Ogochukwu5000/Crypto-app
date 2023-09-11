import React, { useEffect, useState } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Alert,
    LayoutAnimation,
    LogBox
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useNavigation } from '@react-navigation/native';
import Loading from '../LoadingScreen Component/LoadingScreen';
import { StackActions } from '@react-navigation/native';
import { BASE_URL } from '../../constants/config';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

LogBox.ignoreAllLogs();

function VerifyEmailScreen(): JSX.Element {
    const user = useSelector((state: RootState) => state.userReducer.user);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = React.useState(false);
    const [otp, setOtp] = useState('');

    useEffect(() => {
        axios.post(`${BASE_URL}user/sendverification`, {
            email: user?.email,
        }).then((response) => {
            // console.log('Response: ', response.data);
            setOtp(response.data.otp);
        }
        ).catch((error) => {
            console.log('Error: ', error);
        }
        );
    }, []);

    const handleEnterCode = () => {
        let code = '';
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        Alert.prompt(
            'Enter Code',
            'Please enter the code you received in your email:',
            (text) => {
                code = text;
                if (code === otp) {
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        navigation.dispatch(StackActions.replace('Welcome' as never));
                    }, 2000);
                } else {
                    Alert.alert('Error', 'Invalid code');
                }
            },
            undefined,
            ''
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                !isLoading ? (
                    <>
                        {/* Image */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => {
                                navigation.goBack();
                            }}>
                                <Image
                                    source={require('../../assets/back.png')}
                                    style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <View style={styles.headerText}>
                                <Text
                                    style={[
                                        styles.checkScreenHeader,
                                        isSmallScreen && styles.smallScreenCheckScreenHeader,
                                    ]}>
                                    Verify Email
                                </Text>
                                <Text
                                    style={[
                                        styles.checkScreenSubHeader,
                                        isSmallScreen && styles.smallScreenCheckScreenSubHeader,
                                    ]}>
                                    We sent you a code, lets verify that gorgeous email of yours!{' '}
                                </Text>
                            </View>
                        </View>
                        <Image
                            source={require('../../assets/email.png')}
                            style={[
                                styles.emailImage,
                                isSmallScreen && styles.smallScreenEmailImage,
                            ]}
                            resizeMode="contain"
                        />
                        <TouchableOpacity
                            onPress={handleEnterCode}
                            style={[
                                styles.enterCodeButton,
                                isSmallScreen && styles.smallScreenEnterCodeButton,
                            ]}>
                            <Text style={styles.enterCodeButtonText}>Enter Code</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View>
                        <Loading />
                    </View>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3447F0',
        alignItems: 'center',
    },

    enterCodeButton: {
        backgroundColor: '#fff',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    enterCodeButtonText: {
        color: '#347AF0',
        fontSize: 20,
        fontWeight: 'bold',
    },

    smallScreenEnterCodeButton: {
        marginTop: '20%',
    },
    checkScreenHeader: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '17%',
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
        width: '80%',
        alignItems: 'center',
        textAlign: 'center',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '6%',
    },
    emailImage: {
        width: responsiveWidth(70),
        height: responsiveHeight(50),
        marginTop: '10%',
        marginLeft: '10%',
    },
    smallScreenEmailImage: {
        width: responsiveWidth(70),
        height: responsiveHeight(50),
        marginTop: '10%',
        marginLeft: '10%',
    },
});

export default VerifyEmailScreen;