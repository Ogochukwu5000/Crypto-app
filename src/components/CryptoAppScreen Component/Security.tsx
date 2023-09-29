import React from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Security(): JSX.Element {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const dispatch = useDispatch();
    const handleDeleteAccount = () => {
        Alert.alert(
            'Confirm Account Deletion',
            'Are you sure you want to delete your account?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        Alert.alert(
                            'Confirm Account Deletion',
                            'This action is irreversible. Are you sure you want to delete your account?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Delete',
                                    onPress: () => {
                                        axios
                                            .post(`${BASE_URL}user/delete`, {
                                                cryptoTag: user?.cryptoTag,
                                            })
                                            .then((res) => {
                                                Alert.alert('Account Deleted Successfully');
                                                dispatch({ type: 'LOGOUT' });
                                                dispatch({ type: 'CLEAR_REDUX' });
                                                navigation.navigate('Login' as never);
                                            })
                                            .catch((err) => {
                                                console.log(JSON.stringify(err));
                                                Alert.alert('Error', err.message);
                                            });
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={
                    () => navigation.goBack()
                }>
                    <Image
                        source={require('../../assets/back.png')}
                        style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Text
                        style={[
                            styles.Header,
                            isSmallScreen && styles.smallScreenHeader,
                        ]}>
                        Security
                    </Text>
                </View>
            </View>
            <Image
                source={require('../../assets/security.png')}
                style={[styles.image, isSmallScreen && styles.smallScreenSecurityImage]}

            />
            {/* Bottom half  log in modal */}
            <View
                style={[styles.bottomHalfModal, isSmallScreen && styles.isSmallBottomHalfModal]}>
                <TouchableOpacity style={styles.profileItemContainer} onPress={
                    () => {
                        navigation.navigate('ChangePassword' as never);
                    }
                }>
                    <Text style={styles.profileItemText}>Change Password</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={[styles.arrow, { marginLeft: 'auto' }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemContainer} onPress={
                    () => {
                        navigation.navigate('CurrentPin' as never);
                    }
                }>
                    <Text style={styles.profileItemText}>Change PIN</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={[styles.arrow, { marginLeft: 'auto' }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemContainer} onPress={handleDeleteAccount}>
                    <Text style={styles.profileItemText}>Delete Account</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={[styles.arrow, { marginLeft: 'auto' }]}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3447F0',
        alignItems: 'center',
    },
    image: {
        // width: '90%',
        // height: '30%',
        // marginTop: '8%',
        marginTop: '10%',
    },
    smallScreenImage: {
        width: 30,
        height: 80,
    },
    smallScreenSecurityImage: {
        width: 300,
        height: 100,
    },
    bottomHalfModal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '67%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    isSmallBottomHalfModal: {
        height: '65%',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
    },
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '20%',
        width: '100%',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    smallScreenHeader: {
        fontSize: 25,
    },
    profileItemContainer: {
        width: '90%',
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: '8%',
        backgroundColor: '#F0F0F0',
        padding: 25,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    profileItemText: {
        fontSize: 20,
        fontWeight: '500',
    },
    arrow: {
        width: 20,
        height: 20,
    },
});

export default Security;