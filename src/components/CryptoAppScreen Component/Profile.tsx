import React, { useState } from 'react';
import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import axios from 'axios';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Profile(): JSX.Element {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const [image, setImage] = useState<ImageOrVideo | null>(null);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch({ type: 'LOGOUT' });
                        navigation.navigate('Login' as never);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // function that alerts users of contact and email as soon as they click on Help & Support
    const alertUser = () => {
        Alert.alert(
            'Contact Us',
            'Email: hoseni@cryptoapplabs.com',
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };

    // function that allows users to upload a photo from their camera roll
    const uploadPhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            Alert.alert(
                'Are you sure?',
                'Do you want to select this image?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            setImage(image);
                            // name of file is profile_picture
                            const data = new FormData();
                            data.append('profile_picture', {
                                name: 'profile_picture',
                                type: image.mime,
                                uri: image.path,
                            });
                            data.append('crypto_tag', user?.cryptoTag as string);
                            axios
                                .post(`http://10.0.0.174:8000/user/profile-picture`, data, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                }).then((response) => {
                                    
                                })
                        },
                    },
                ],
                { cancelable: false }
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Image */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerText} onPress={
                    () => {
                        navigation.goBack();
                    }
                }>
                    <Image
                        source={require('../../assets/back.png')}
                        style={styles.backImage}
                    />
                </TouchableOpacity>
            </View>
            {/* Bottom half modal */}
            <SafeAreaView
                style={[styles.bottomHalfModal, isSmallScreen && styles.smallScreenBottomHalfModal]}
            >
                <View style={styles.profileHeader}>
                    <Image
                        // source={require('../../assets/Oval.png')}
                        source={image ? { uri: image.path } : { uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                        style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                        // resize to scale
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.uploadPhotoContainer} onPress={
                        () => {
                            uploadPhoto();
                        }
                    } >
                        <Text style={styles.uploadPhoto}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.cryptoTag}>{user?.cryptoTag}</Text>
                    <Text style={styles.fullName}>{user?.firstName} {user?.lastName}</Text>
                </View>
                <TouchableOpacity style={styles.profileItemContainer} onPress={
                    () => {
                        navigation.navigate('PersonalInformation' as never);
                    }
                }>
                    <Text style={styles.profileItemText}>Personal Information</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemContainer} onPress={
                    () => {
                        navigation.navigate('ConnectWallet' as never);
                    }
                }>
                    <Text style={styles.profileItemText}>Connect Wallet</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
                <Text style={styles.settingsText}>
                    Settings
                </Text>
                <TouchableOpacity style={styles.profileItemContainer} onPress={
                    () => {
                        navigation.navigate('Security' as never);
                    }
                }>
                    <Text style={styles.profileItemText}>Security</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemContainer} onPress={alertUser}>
                    <Text style={styles.profileItemText}>Help & Support</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemContainer} onPress={handleLogout}>
                    <Text style={styles.profileItemText}>Logout</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3447F0',
        alignItems: 'center',
    },
    bottomHalfModal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    smallScreenBottomHalfModal: {
        height: "88%"
    },
    Header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        width: '100%',
    },
    smallScreenHeader: {
        fontSize: 25,
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#F0F0F0',
    },
    uploadPhotoContainer: {
        width: '10%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '100%',
        left: '57%',
        backgroundColor: '#F0F0F0',
        borderRadius: 30,
        padding: 10,
    },
    uploadPhoto: {
        color: 'black',
        fontSize: 17,
        fontWeight: '700',
    },
    smallScreenImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#F0F0F0',
    },
    profileHeader: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '200%',
        marginLeft: '5%',
        position: 'absolute',
        bottom: '95%',
    },
    backImage: {
        width: 30,
        height: 30,
    },
    nameContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '19%',
    },
    cryptoTag: {
        fontSize: 14,
        fontWeight: '500',
        color: "#485068"
    },
    fullName: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: isSmallScreen ? '0%' : '5%',
    },
    profileItemContainer: {
        width: '85%',
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: '5%',
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileItemText: {
        fontSize: 20,
        fontWeight: '500',
    },
    arrow: {
        width: 20,
        height: 20,
    },
    settingsText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#485068',
        marginTop: '3%',
        textAlign: "left",
        width: "80%",
    },
});

export default Profile;