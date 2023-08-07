//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLOURS } from '../../shared/themes/color';
import { fp, hp, wp } from '../../shared/utils/responsive-screen';
import { FONTS } from '../../shared/themes/fonts';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// create a component
const SellAsset = ({ route, navigation }) => {

    const entityRef = firestore().collection('assetsFinal')
    console.log(route.params)
    const userID = route.params["0"].id
    console.log(userID, 'this is user Id')
    // const userID = props.extraData.id

    const [assetsForSale, setAssetsForSale] = useState([])

    useEffect(() => {
        entityRef
            .where("OwnerId", "==", userID)
            .onSnapshot(
                async querySnapshot => {
                    const dataArr = []
                    querySnapshot.forEach(async documentSnapshot => {
                        fetchBidsOnAsset(documentSnapshot.data()).then((data) => {
                            dataArr.push({ assetInfo: documentSnapshot.data(), bids: data })
                        })
                    });
                    // setAssetsForSale([...assetsForSale, { assetInfo: documentSnapshot.data(), bids: data }])
                    setAssetsForSale(dataArr)

                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const fetchBidsOnAsset = async (item) => {
        const entityRef = firestore().collection('bids')

        let data = []
        return new Promise(async (resolve, reject) => {
            entityRef
                .where("AssetId", "==", item.AssetId)
                // .orderBy("OfferedPrice", 'desc')  // item.AssetId
                .onSnapshot(
                    querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            data.push(documentSnapshot.data())
                        });
                        resolve(data);

                        console.log(data, 'bids')
                        // return dataArr
                    },
                    error => {
                        console.log(error)
                    }
                )
        });
    }

    const renderItem = ({ item }) => {
        // console.log(item, 'kk')
        return (
            <TouchableOpacity style={styles.gridBoxCont} onPress={() => navigation.navigate("MyAssetDescription", { AssetInfo: item })}>
                <View style={{ height: '78%', width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: `${item.assetInfo.Image}` }} style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                    </View>
                    <View style={{ flex: 1.1, paddingLeft: 6 }}>
                        <View style={{ flex: 1.2 }}>
                            <Text style={styles.aNameT}>{item.assetInfo.AssetName}</Text>
                        </View>
                        <View style={{ flex: 2.5 }}>
                            <Text style={styles.subHeadCont}>Description</Text>
                            <Text style={styles.descriptionT}>{item.assetInfo.AssetDescription}</Text>
                        </View>
                        <View style={{ flex: 1.3 }}>
                            <Text style={styles.subHeadCont}>Price</Text>
                            <Text style={[styles.aNameT, { fontSize: fp(17) }]}>RS {item.assetInfo.MinPrice}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxLowerCont}>
                    <Text style={styles.offerT}>{item.bids.length} offers recieved!</Text>
                    <View style={styles.activeCont}>
                        <Text style={styles.activeT}>{item.assetInfo.isActive ? 'Active' : 'Closed'}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    // console.log(route.params)
    const user = route.params
    return (
        <View style={styles.container}>
            <View style={styles.greetingCont}>
                <Text style={styles.HiT}>My Assets</Text>
            </View>
            <View style={styles.gridCont}>
                <FlatList renderItem={(props) => renderItem(props)} data={assetsForSale} />
            </View>
            <View
                style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    bottom: 20,
                    paddingRight: 20,
                }}>
                <TouchableOpacity
                    style={{
                        height: hp(60),
                        width: wp(160),
                        backgroundColor: COLOURS.blue,
                        borderRadius: 30,
                        elevation: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'

                    }}
                    activeOpacity={0.72}
                    onPress={() => navigation.navigate('ListProduct', { user: route.params["0"] })}>
                    <MaterialIcons name={'add'} color={'white'} size={25} />
                    <Text style={{ fontFamily: FONTS.semibold, marginLeft: 10, fontSize: fp(16), color: COLOURS.white }}>List Asset</Text>
                </TouchableOpacity>
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
        height: hp(50)
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
        height: hp(210),
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

    boxLowerCont: { height: '17%', width: '100%', justifyContent: 'space-between', paddingTop: 12, flexDirection: 'row', paddingHorizontal: 6, alignItems: 'center' },

    offerT: { fontFamily: FONTS.semibold, color: COLOURS.black, fontSize: fp(12) },

    activeCont: { height: hp(25), width: wp(75), backgroundColor: COLOURS.blue, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },

    activeT: { fontFamily: FONTS.semibold, color: COLOURS.white, fontSize: fp(10) }
});

//make this component available to the app
export default SellAsset;
