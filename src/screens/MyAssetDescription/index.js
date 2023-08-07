//import liraries
import { Component, useState, useRef, useEffect } from 'react';
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Platform,
    Image,
    Linking
} from 'react-native';

import { deviceWidth, fp, hp, wp } from '../../shared/utils/responsive-screen';
import { COLOURS } from '../../shared/themes/color';
import { FONTS } from '../../shared/themes/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSelector, useDispatch } from 'react-redux';
// import { LoginAttempt, clearErrorField } from '../../shared/store/redux/actions/users';
// import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { MARGIN } from '../../components/Config';
import firestore from '@react-native-firebase/firestore';

// create a component

const MyAssetDescription = ({ route, navigation }) => {

    const [ownerInfo, setOwnerInfo] = useState({})

    const { AssetInfo } = route.params
    //   const { user } = route.params
    const Descp = {
        name: 'IPhone 5 Pro Max',
        Description:
            'Iphone 14 pro jv space black  storage 128Gb, Battery Health 97%,Scratchless Condition,Box Accessories pack as New',
        Price: 'Rs 250,000',
        Sellername: 'Sher Ali Khan',
        phonenumber: '92-345-2659874',
        location: 'Gulshan e Iqbal',
    };

    const entityRef = firestore().collection('users')

    return (
        <>
            <View style={styles.mainCont}>
                <View>
                    <Image source={{ uri: AssetInfo.assetInfo.Image }} style={styles.headerComp} />
                    <View style={{ marginTop: 15, height: hp(45) }}>
                        <Text style={styles.TextStyle}>{AssetInfo.assetInfo.AssetName}</Text>
                    </View>

                    <View style={{ marginTop: 2 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.TextStyle2}>Description:</Text>
                        </View>
                        <Text
                            style={[
                                styles.TextStyle2,
                                { fontFamily: FONTS.Medium, color: COLOURS.black },
                            ]}>
                            {AssetInfo.assetInfo.AssetDescription}
                        </Text>
                    </View>
                    <View style={{ marginTop: 12, height: hp(45) }}>
                        <Text style={styles.TextStyle2}>Price:</Text>
                        <Text style={[styles.TextStyle3, { fontSize: fp(20) }]}>
                            Rs {AssetInfo.assetInfo.MinPrice}
                        </Text>
                    </View>

                    <Text style={styles.offerT}>{AssetInfo.bids.length} offers recieved!</Text>

                </View>
            </View>

            <View style={styles.Buttoncont}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                    <View>
                        <TouchableOpacity style={[styles.Button, { backgroundColor: COLOURS.lightGrey }]} activeOpacity={0.72} onPress={() => { Linking.openURL(`tel:${ownerInfo.phoneNumber}`) }}>
                            <Text style={[styles.ButtonText, { color: COLOURS.black }]}>Close Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={styles.Button} activeOpacity={0.72} onPress={() => navigation.navigate("ViewAllOffers", { assetInfo: AssetInfo })}>
                            <Text style={styles.ButtonText}>View Offers</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    headerComp: {
        height: hp(210),
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: COLOURS.boxColour,
        borderRadius: 17,
    },
    headerTextStyle: {
        fontSize: fp(22),
        color: COLOURS.darkInk,
        fontFamily: FONTS.bold,
    },
    mainCont: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },

    Button: {
        height: hp(50),
        width: wp(140),
        backgroundColor: COLOURS.blue,
        borderRadius: 10,
        // elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontSize: fp(22),
        color: COLOURS.black,
        fontFamily: FONTS.bold,
    },
    TextStyle2: {
        fontSize: fp(15),
        color: COLOURS.black,
        fontFamily: FONTS.regular,
    },
    TextStyle3: {
        fontSize: fp(13),
        color: COLOURS.black,
        fontFamily: FONTS.semibold,
    },
    Buttoncont: {
        position: 'absolute',
        // alignSelf: 'center',
        bottom: 0,
        // paddingRight: 50,

        // backgroundColor: 'red',
        height: hp(80),
        borderTopWidth: 0.8,
        borderTopColor: COLOURS.seperatorGrey,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
        // flexDirection: 'row',
    },
    ButtonText: {
        color: COLOURS.white,
        fontSize: fp(14),
        fontFamily: FONTS.semibold
    },

    offerT: {
        fontFamily: FONTS.semibold,
        marginTop: 16,
        fontSize: fp(14),
        color: COLOURS.blue
    }
});

//make this component available to the app
export default MyAssetDescription;
