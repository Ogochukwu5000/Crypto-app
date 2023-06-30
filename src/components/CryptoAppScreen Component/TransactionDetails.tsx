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

function TransactionDetails(): JSX.Element {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Image */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text
                        style={[
                            styles.Header,
                            isSmallScreen && styles.smallScreenHeader,
                        ]}>
                        Transaction Details
                    </Text>
                </View>
            </View>
            {/* Bottom half modal */}
            <SafeAreaView
                style={[styles.bottomHalfModal]}
            >
                <View style={styles.transactionHeader}>
                    <Image
                        source={require('../../assets/sent.png')}
                        style={[styles.image, isSmallScreen && styles.smallScreenImage]}
                        resizeMode="contain"
                    />
                    <Text style={styles.sentText}>Sent</Text>
                </View>
                <View style={styles.timeContainer}>
                    <View style={styles.date}>
                        <Text style={styles.dateLabel}>Date</Text>
                        <Text style={styles.dateValue}>Aug 19, 2019</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={styles.timeLabel}>Time</Text>
                        <Text style={styles.timeValue}>10:30 AM</Text>
                    </View>
                </View>
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
        width: 80,
    },
    smallScreenImage: {
        width: 60,
    },
    sentText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#347AF0',
    },
    transactionHeader: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '5%',
        marginLeft: '5%',
        position: 'absolute',
        bottom: '91%',
    },
    timeContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '25%',
    },
    dateLabel: {
        color: "#B5BBC9"
    },
    timeLabel: {
        color: "#B5BBC9"
    },
    dateValue: {
        color: "#000",
        fontWeight: '600',
        fontSize: 15,
    },
    timeValue: {
        color: "#000",
        fontWeight: '600',
        fontSize: 15,
    }
});

export default TransactionDetails;