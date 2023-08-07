//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { COLOURS } from '../../shared/themes/color';
import { FONTS } from '../../shared/themes/fonts';
import { fp, hp } from '../../shared/utils/responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

// create a component
const ViewAllOffers = ({ route, navigation }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [offersData, setOffersData] = useState([])

    const { assetInfo } = route.params

    useEffect(() => {
        let bids = assetInfo?.bids?.sort((a, b) => a.OfferedPrice > b.OfferedPrice)
        setOffersData(bids)

    }, [])

    const acceptOffer = (id) => {
        const entityRef = firestore().collection('assetsFinal')


        entityRef
            .doc(id)
            .update({
                isActive: false,
            })
            .then(() => console.log('fone'))
        setShowSuccessModal(true)

    }

    const renderItem = ({ item }) => {
        console.log(item, 'iii')
        return (
            <View style={styles.boxCont}>
                <View style={{ marginHorizontal: 18, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textS}>{item.ProspectName}</Text>
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.ContactNo}`) }}>
                            <Ionicons name='call' size={20} color={COLOURS.black} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.textS, { fontFamily: FONTS.Medium }]}>Contact No: {item.ContactNo}</Text>
                    <Text style={[styles.textS, { fontFamily: FONTS.Medium }]}>Location: {item.Location}</Text>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 7 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textS}>Offered Price: </Text>
                            <Text style={[styles.textS, { fontFamily: FONTS.bold, fontSize: fp(16) }]}>{item.OfferedPrice}</Text>
                        </View>
                        {assetInfo.assetInfo.isActive &&
                            <View style={{ flex: 2, flexDirection: 'row', paddingVertical: 5, marginLeft: 7 }}>
                                <TouchableOpacity style={{ flex: 1.7, backgroundColor: COLOURS.lightGrey, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: FONTS.semibold, color: COLOURS.black, fontSize: fp(12) }}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 2, marginLeft: 6, backgroundColor: COLOURS.blue, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => acceptOffer(item.AssetId)}>
                                    <Text style={{ fontFamily: FONTS.semibold, color: COLOURS.white, fontSize: fp(12) }}>Accept Offer</Text>

                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Potential Buyers</Text>
            <View>
                <FlatList renderItem={renderItem} data={offersData} />
            </View>

            {showSuccessModal && (
                <View>
                    <Modal isVisible={showSuccessModal} onBackdropPress={() => setShowSuccessModal(false)}>
                        <View style={{ height: hp(400), marginHorizontal: 20, backgroundColor: COLOURS.white, borderRadius: 15, alignItems: 'center' }}>
                            <LottieView source={require('../../assets/icons/party.json')} style={{ height: 300, width: 300, zIndex: 10 }} loop={false} autoPlay={true} />
                            <LottieView source={require('../../assets/icons/PartyPopper.json')} style={{ height: 400, width: 500, zIndex: 10, position: 'absolute' }} loop={false} autoPlay={true} />
                            <Text style={{ fontFamily: FONTS.bold, fontSize: fp(25), color: COLOURS.blue }}>Congratulations!</Text>
                            <Text style={{ fontFamily: FONTS.semibold, fontSize: fp(10), color: COLOURS.black, marginHorizontal: 20, textAlign: 'center' }}>We made it! Congrate on the contract!</Text>

                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLOURS.white,
        paddingHorizontal: 20
    },

    headText: {
        fontFamily: FONTS.bold,
        color: COLOURS.black,
        marginTop: 25,
        fontSize: fp(19)
    },

    boxCont: {
        height: hp(150),
        width: '100%',
        backgroundColor: COLOURS.boxColour,
        marginTop: 14,
        borderRadius: 14
    },

    textS: {
        fontFamily: FONTS.semibold,
        color: COLOURS.black,
        fontSize: fp(13)
    }
});

//make this component available to the app
export default ViewAllOffers;
