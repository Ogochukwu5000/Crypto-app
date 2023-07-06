import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, Image } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useNavigation } from '@react-navigation/native';
import Loading from '../LoadingScreen Component/LoadingScreen';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Welcome(): JSX.Element {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://10.0.0.174:8000/user/register', {
                email: user?.email,
                first_name: user?.firstName,
                last_name: user?.lastName,
                password: user?.password,
                pin: user?.pin,
                crypto_tag: user?.cryptoTag,
            });
            //console.log('Response: ', response.data);
            dispatch({ type: 'AUTHENTICATE' });
            navigation.navigate('CryptoAppMainScreen' as never);
        } catch (error: any) {
            console.log('Error: ', error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            registerUser();
        }, 2500); // Wait for 2 seconds before registering the user
    }, []);

    console.log('User: ', user);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {
                    !isLoading ? (
                        <>
                            <Image
                                source={require('../../assets/check.png')}
                                style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                                resizeMode="contain"
                            />
                            <Text style={styles.text}>Welcome to Crypto App!</Text>
                        </>
                    ) :
                        (
                            <Loading />
                        )
                }
            </View>
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
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    smallScreenImage: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Welcome;