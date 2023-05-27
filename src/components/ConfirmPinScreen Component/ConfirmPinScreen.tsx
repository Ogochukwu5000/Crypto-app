import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Loading from '../LoadingScreen Component/LoadingScreen';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function ConfirmPin(): JSX.Element {
    const [pin, setPin] = useState('');
    const [pinCount, setPinCount] = useState(0);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(true);
    const [isPinWrong, setIsPinWrong] = useState(false);

    const handlePinKeyPress = (digit: string) => {
        if (digit === 'X') {
            // Clear the pin
            setPin('');
            setPinCount(0);
        } else {
            // Append the digit to the pin
            setPinCount(prevPinCount => prevPinCount + 1);
            setPin(prevPin => prevPin + digit);
        }
    };

    const shakePinContainer = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Animation completed, clear the pin
            setPin('');
            setPinCount(0);
        });
    };

    useEffect(() => {
        if (pin.length === 4 && pin !== '1234') {
            setIsPinWrong(true);
            shakePinContainer();
        } else {
            setIsPinWrong(false);
            setIsLoading(false);
        }
    }, [pin, isLoading]);

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading ? (
                <>
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
                                Confirm PIN
                            </Text>
                            <Text
                                style={[
                                    styles.verificationSubHeader,
                                    isSmallScreen && styles.smallScreenVerificationSubHeader,
                                ]}>
                                Repeat a PIN code to continue
                            </Text>
                        </View>
                    </View>
                    <Animated.View
                        style={[
                            styles.pinContainer,
                            isSmallScreen && styles.smallScreenPinContainer,
                            isPinWrong && {
                                transform: [{ translateX: shakeAnimation }],
                            },
                        ]}>
                        <View style={[styles.pin, pinCount >= 1 && styles.pinFilled]} />
                        <View style={[styles.pin, pinCount >= 2 && styles.pinFilled]} />
                        <View style={[styles.pin, pinCount >= 3 && styles.pinFilled]} />
                        <View style={[styles.pin, pinCount >= 4 && styles.pinFilled]} />
                    </Animated.View>
                    {/* Pin key pad */}
                    <View
                        style={[
                            styles.pinKeyPad,
                            isSmallScreen && styles.smallScreenPinKeyPad,
                        ]}>
                        <View style={styles.pinKeyPadRow}>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('1')}>
                                <Text style={styles.pinKeyPadButtonText}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('2')}>
                                <Text style={styles.pinKeyPadButtonText}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('3')}>
                                <Text style={styles.pinKeyPadButtonText}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pinKeyPadRow}>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('4')}>
                                <Text style={styles.pinKeyPadButtonText}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('5')}>
                                <Text style={styles.pinKeyPadButtonText}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('6')}>
                                <Text style={styles.pinKeyPadButtonText}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pinKeyPadRow}>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('7')}>
                                <Text style={styles.pinKeyPadButtonText}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('8')}>
                                <Text style={styles.pinKeyPadButtonText}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('9')}>
                                <Text style={styles.pinKeyPadButtonText}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pinKeyPadRow}>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('.')}>
                                <Text style={styles.pinKeyPadButtonText}>.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('0')}>
                                <Text style={styles.pinKeyPadButtonText}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pinKeyPadButton}
                                onPress={() => handlePinKeyPress('X')}>
                                <Text style={styles.pinKeyPadButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <View>
                    <Loading />
                </View>
            )}
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
        marginLeft: '20%',
        width: '100%',
    },
    smallScreenVerificationHeader: {
        fontSize: 25,
        marginLeft: '23%',
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
        marginLeft: '1%',
        width: '80%',
        marginTop: '2%',
        textAlign: 'center',
    },
    smallScreenVerificationSubHeader: {
        fontSize: 13,
        marginLeft: '1%',
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
        marginTop: '5%',
        gap: 25,
        justifyContent: 'center',
        height: '30%',
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
        height: '20%',
        marginLeft: '3%',
    },
    pin: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#9EA5B1',
    },
    pinFilled: {
        backgroundColor: '#fff',
    },
    pinKeyPad: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
        height: '50%',
        marginLeft: '3%',
    },
    smallScreenPinKeyPad: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10%',
        gap: 10,
        justifyContent: 'center',
        height: '50%',
        marginLeft: '3%',
    },

    pinKeyPadRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
        justifyContent: 'center',
    },

    pinKeyPadButton: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pinKeyPadButtonText: {
        color: '#3447F0',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ConfirmPin;