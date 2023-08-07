//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { COLOURS } from '../../shared/themes/color';
import { fp, hp, wp } from '../../shared/utils/responsive-screen';
import { FONTS } from '../../shared/themes/fonts';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// create a component
const BuyAsset = ({ route, navigation }) => {

    const entityRef = firestore().collection('assetsFinal')
    console.log(route.params)
    // const userID = props.extraData.id

    const [assetsForSale, setAssetsForSale] = useState([])

    useEffect(() => {
        entityRef
            .where("OwnerId", "!=", route.params["0"].id)
            .onSnapshot(
                querySnapshot => {
                    const dataArr = []
                    querySnapshot.forEach(documentSnapshot => {
                        // console.log(documentSnapshot.data(), 'see');
                        dataArr.push(documentSnapshot.data())
                    });
                    setAssetsForSale(dataArr)
                    // console.log(assetsForSale, 'assets')
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.gridBoxCont} onPress={() => navigation.navigate("Productdescription", { AssetInfo: item, user: route.params["0"], setUser: route.params["1"] })}>
                <View style={{ height: '78%', width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: `${item.Image}` }} style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                    </View>
                    <View style={{ flex: 1.1, paddingLeft: 6 }}>
                        <View style={{ flex: 1.2 }}>
                            <Text style={styles.aNameT}>{item.AssetName}</Text>
                        </View>
                        <View style={{ flex: 2.5 }}>
                            <Text style={styles.subHeadCont}>Description</Text>
                            <Text style={styles.descriptionT}>{item.AssetDescription}</Text>
                        </View>
                        <View style={{ flex: 1.3 }}>
                            <Text style={styles.subHeadCont}>Price</Text>
                            <Text style={[styles.aNameT, { fontSize: fp(17) }]}>RS {item.MinPrice}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxLowerCont}>
                    {/* <Text style={styles.offerT}>9 offers recieved!</Text> */}
                    <View style={styles.activeCont}>
                        <Text style={styles.activeT}>{item.isActive ? 'Active' : 'Closed'}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    const logOutUser = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('user signed out')
                navigation.navigate("Login")
                route.params["1"](null)
            });
    }

    // console.log(route.params)
    const user = route.params["0"]
    return (
        <View style={styles.container}>
            <View style={styles.greetingCont}>
                <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.HiT}>Hi {user.name}</Text>
                    <TouchableOpacity onPress={() => logOutUser()}>
                        <MaterialIcons name='logout' size={22} color={COLOURS.black} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.HiT, { fontFamily: FONTS.Medium }]}>What are you looking for?</Text>
            </View>
            <View style={styles.gridCont}>
                <FlatList renderItem={renderItem} data={assetsForSale} />
            </View>
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

    },

    greetingCont: {
        width: '85%',
        alignSelf: 'center',
        marginTop: 25,
        // backgroundColor: 'red',
        height: hp(80)
    },

    HiT: {
        fontFamily: FONTS.bold,
        fontSize: fp(19),
        color: COLOURS.black,

    },

    gridCont: {
        width: '90%',
        alignSelf: 'center',

    },

    gridBoxCont: {
        height: hp(180),
        backgroundColor: COLOURS.boxColour,
        // flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    },

    aNameT: {
        fontFamily: FONTS.bold,
        fontSize: fp(16),
        color: COLOURS.black
    },

    subHeadCont: {
        fontFamily: FONTS.Medium,
        fontSize: fp(11),
        color: COLOURS.black
    },

    descriptionT: {
        fontFamily: FONTS.semibold,
        fontSize: fp(11),
        color: COLOURS.black,
        // marginTop: 2
    },

    boxLowerCont: { height: '20%', width: '100%', paddingTop: 12, flexDirection: 'row', paddingHorizontal: 6, alignItems: 'center', justifyContent: 'flex-end' },

    offerT: { fontFamily: FONTS.semibold, color: COLOURS.black, fontSize: fp(12) },

    activeCont: { height: hp(25), width: wp(75), backgroundColor: COLOURS.blue, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },

    activeT: { fontFamily: FONTS.semibold, color: COLOURS.white, fontSize: fp(10) }
});

//make this component available to the app
export default BuyAsset;
