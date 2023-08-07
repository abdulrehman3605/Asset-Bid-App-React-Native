//import liraries
import React, { Component, useRef, useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLOURS } from '../../shared/themes/color';
import { FONTS } from '../../shared/themes/fonts';
import { fp, hp, wp } from '../../shared/utils/responsive-screen';
import firestore from '@react-native-firebase/firestore';

// create a component
const BidAsset = ({ route, navigation }) => {

    const [offerPrice, setOfferPrice] = useState()

    const { user, assetInfo } = route.params
    console.log(assetInfo, 'assetInfo')

    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['90%'], []);

    const entityRef = firestore().collection('bids')

    const onSubmit = () => {
        console.log(assetInfo.AssetId)

        if (parseInt(offerPrice) < parseInt(assetInfo.MinPrice)) {
            Alert.alert(`You cannot bid lower than ${assetInfo.MinPrice}`)
        } else {
            const data = {
                AssetId: assetInfo.AssetId,
                ContactNo: user.phoneNumber,
                Location: user.Address,
                OfferedPrice: offerPrice, // needs to be created
                ProspectId: user.id,
                ProspectName: user.username

            };

            console.log(data, 'this is data')

            entityRef
                .add(data)
                .then(_doc => {

                    // setEntityText('')
                    console.log('succ')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }

    }



    return (
        <BottomSheet
            ref={bottomSheetRef}
            // index={1}
            stackBehavior={'push'}
            snapPoints={snapPoints}
            backgroundStyle={{
                elevation: 40,
                shadowOffset: [10, 10],
                borderWidth: 1,
                borderColor: COLOURS.seperatorGrey,
            }}
            // onChange={handleSheetChanges}
            enablePanDownToClose={true}
            onClose={() => navigation.goBack()}>

            <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 15 }}>
                <Text style={styles.heading}>Offer the Price!</Text>
                <TextInput style={styles.inputCont} keyboardType='numeric' onChangeText={(text) => setOfferPrice(text)} />
            </View>

            <TouchableOpacity style={styles.LoginButton} onPress={() => onSubmit()}>

                <Text style={{ color: 'white', fontFamily: FONTS.Medium, fontSize: 15 }}>Send Offer</Text>

            </TouchableOpacity>


        </BottomSheet>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },

    heading: {
        fontFamily: FONTS.bold,
        fontSize: fp(20),
        color: COLOURS.black
    },

    inputCont: {
        width: '100%',
        height: hp(40),
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: COLOURS.seperatorGrey,
        marginTop: 20,
        paddingHorizontal: 15,
        fontFamily: FONTS.semibold,
        color: COLOURS.black,
        fontSize: fp(13)
    },

    LoginButton: {
        width: wp(300),
        height: hp(45),
        marginTop: 8,
        backgroundColor: '#6B4EFF',
        // bottom: 0,
        // marginEnd: 0,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 70
    }
});

//make this component available to the app
export default BidAsset;
