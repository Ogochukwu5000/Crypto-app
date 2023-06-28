import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, Image } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Welcome(): JSX.Element {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user);
    useEffect(() => {
        axios.post('http://10.0.0.174:8000/user/register', {
            email: user?.email,
            first_name: user?.firstName,
            last_name: user?.lastName,
            password: user?.password,
            pin: user?.pin,
            crypto_tag: user?.cryptoTag,
        }).then((response) => {
            console.log('Response: ', response.data);
                dispatch({ type: 'AUTHENTICATE' });
        }
        ).catch((error) => {
            console.log('Error: ', error);
        }
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../../assets/check.png')}
                    style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Welcome to Crypto App!</Text>
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