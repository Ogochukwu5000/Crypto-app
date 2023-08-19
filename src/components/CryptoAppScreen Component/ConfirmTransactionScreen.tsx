import {
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400; // Adjust the width value based on the screen size you consider as small

function ConfirmTransactionScreen({ route }: any): JSX.Element {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const { provider } = useWalletConnectModal();

    console.log(route.params);

    const handleSendTransaction = async () => {
        // Create the transaction object
        const tx = {
            from: user?.walletAddress,
            // to: route.params.recipient.wallet_address,
            to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
            value: route.params.weiAmount,
        };

        try {
            // Send the transaction using WalletConnect
            const transaction = await provider?.request({
                method: 'eth_sendTransaction',
                params: [tx],
            });

            console.log(`Transaction: ${transaction}`);
        } catch (error: any) {
            console.error(`Error: ${JSON.stringify(error, null, 4)}`);
            if (error.code === 5000) {
                // User rejected request
                navigation.navigate('CryptoAppMainScreen' as never);
                Alert.alert('Transaction Cancelled');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Image */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CryptoAppMainScreen' as never)
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
                            styles.Header,
                            isSmallScreen && styles.smallScreenHeader,
                        ]}>
                        Send to Your Friend
                    </Text>
                    <Text
                        style={[
                            styles.SubHeader,
                            isSmallScreen && styles.smallScreenSubHeader,
                        ]}>
                        Confirm your transaction
                    </Text>
                </View>
            </View>
            {/* Bottom half modal */}
            <SafeAreaView
                style={[styles.bottomHalfModal]}
            >
                <View
                    style={[styles.recipientItem, isSmallScreen && styles.smallScreenRecipientItem]}
                >
                    <Image
                        source={{
                            uri: route.params.recipient.profile_picture
                                ? `http://10.0.0.174:8000/${route.params.recipient.profile_picture}`
                                : `https://ui-avatars.com/api/?name=${route.params.recipient.first_name}+${route.params.recipient.last_name}&color=fff&size=30&font-size=0.7`,
                        }}
                        style={styles.recipientProfilePicture}
                        resizeMode="cover"
                    />
                    <View style={styles.recipientInfo}>
                        <Text style={styles.recipientCryptoTag}>
                            {route.params.recipient.crypto_tag}
                        </Text>
                        <Text style={styles.recipientFullName}>
                            {`${route.params.recipient.first_name} ${route.params.recipient.last_name}`}
                        </Text>
                    </View>

                </View>
                {/* add a horizonal dotted line */}
                <View style={[styles.dottedLine, isSmallScreen && styles.smallScreenDottedLines]} />

                <Image
                    source={require("../../assets/emoji.png")}
                    style={styles.emoji}
                />

                <Text style={styles.confirmationText}>
                    On behalf of crypto app, we love you (pss, this is visible to only you :)
                </Text>


                {/* add a horizonal dotted line */}
                <View style={[styles.dottedLine, isSmallScreen && styles.smallScreenDottedLines]} />

                <View style={styles.amountInBtc}>
                    <Text style={styles.amountInBtcText}>
                        Amount
                    </Text>
                    <Text style={styles.amountInBtcValue}>
                        {`${route.params.cryptoAmount.toFixed(5)} ETH`}
                    </Text>
                </View>

                <View style={styles.amountInUsd}>
                    <Text style={styles.amountInUsdText}>
                        Amount($)
                        {route.params.amount}
                    </Text>
                    <Text style={styles.amountInUsdValue}>
                        ${route.params.amount}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleSendTransaction} style={[styles.confirmButton, isSmallScreen && styles.smallScreenConfirmButton]}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
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
        height: '70%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    focusedInput: {
        height: '90%',
    },
    input: {
        width: '100%',
        height: 50,
        marginTop: '5%',
        borderBottomWidth: 1,
        borderColor: '#D8D8D8',
        fontSize: 20,
    },
    Input: {
        width: '90%',
        display: 'flex',
        marginTop: '5%',
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
    SubHeader: {
        color: '#fff',
        fontSize: 15,
        width: '80%',
        marginTop: '2%',
        textAlign: 'center',
    },
    smallScreenSubHeader: {
        fontSize: 13,
        marginLeft: '3%',
        width: '70%',
    },
    headerText: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    recipientList: {
        width: '100%',
        marginTop: '5%',
    },
    recipientItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 50,
    },
    smallScreenRecipientItem: {
        marginTop: 20,
    },
    recipientProfilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    recipientInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    recipientFullName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipientCryptoTag: {
        fontSize: 14,
        color: '#3D4C63',
    },
    dottedLine: {
        width: '90%',
        height: 1,
        backgroundColor: '#D8D8D8',
        marginTop: '8%',
    },
    smallScreenDottedLines: {
        marginTop: '3%',
    },
    emoji: {
        width: 60,
        height: 50,
        marginTop: '4%',
    },
    confirmationText: {
        fontSize: 15,
        color: '#485068',
        marginTop: '5%',
        textAlign: 'center',
        width: '80%',
    },
    amountInBtc: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: '3%',
    },
    amountInBtcText: {
        fontSize: 15,
        color: '#B5BBC9',
        fontWeight: 'bold',
    },
    amountInBtcValue: {
        fontSize: 20,
        color: '#3D4C63',
        fontWeight: 'bold',
    },
    amountInUsd: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: '3%',
    },
    amountInUsdText: {
        fontSize: 15,
        color: '#B5BBC9',
        fontWeight: 'bold',
    },
    amountInUsdValue: {
        fontSize: 20,
        color: '#3D4C63',
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#3447F0',
        width: 200,
        height: 50,
        borderRadius: 25,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallScreenConfirmButton: {
        marginTop: '5%',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ConfirmTransactionScreen;