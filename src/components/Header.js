//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { hp, wp, fp } from '../shared/utils/responsive-screen';
import { FONTS } from '../shared/themes/fonts';
import { COLOURS } from '../shared/themes/color';
import Ionicons from 'react-native-vector-icons/Ionicons';


// create a component
const Header = ({ item, showBackIcon, navigation, navigateTo, isGoBack }) => {
    return (
        <View style={styles.headerComp}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={isGoBack ? () => navigation.goBack() : () => navigation.goBack()}>
                {showBackIcon && (
                    <Ionicons name={'ios-arrow-back-sharp'} color={'black'} size={22} style={{ marginLeft: 15 }} />

                )}
            </TouchableOpacity>
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.headerTextStyle}>{item}</Text>
            </View>
            <View style={{ flex: 1 }}></View>

        </View>
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

    headerComp: {
        width: '100%',
        height: hp(60),
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 5
    },

    headerTextStyle: {
        fontSize: fp(18),
        color: COLOURS.black,
        fontFamily: FONTS.bold
    }
});

//make this component available to the app
export default Header;
