import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function Profile(): JSX.Element {
    const navigation = useNavigation();

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
                        source={{ uri: "https://pbs.twimg.com/profile_images/1645598180111728643/Twg6kxMT_400x400.jpg" }}
                        style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.cryptoTag}>Hmoney</Text>
                    <Text style={styles.fullName}>Haruna Oseni</Text>
                </View>
                <TouchableOpacity style={styles.profileItemContainer}>
                    <Text style={styles.profileItemText}>Personal Information</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileItemContainer}>
                    <Text style={styles.profileItemText}>Connect Wallet</Text>
                    <Image
                        source={require('../../assets/arrow.png')}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
                <Text style={styles.settingsText}>
                    Settings
                </Text>
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