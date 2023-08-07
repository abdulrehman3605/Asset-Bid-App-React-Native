//import liraries
import { Component } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { deviceWidth, fp } from '../shared/utils/responsive-screen';
import { COLOURS } from '../shared/themes/color';
import { IMAGES } from '../shared/Themes/Images';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../shared/themes/fonts';
import { TextInput } from 'react-native-gesture-handler';

// create a component
const TextInputComponent = ({
    placeholder,
    handleTextChange,
    defaultValue,
    onSubmitEditing,
    keyboardType,
    refValue,
    secureTextEntry,
    handleTextInputFocus,
    returnKeyType,
    props,
    handleBlur,
    heightfigure,
    widthFigure,
    multiline,
    length,
    editable,
    capitalize = 'none',
    paddingLeft = 16
}) => {
    return (
        <TextInput
            style={[
                styles.textInput,
                { height: heightfigure, width: widthFigure, paddingLeft: paddingLeft },
                props
            ]}
            blurOnSubmit={false}
            placeholder={placeholder}
            placeholderTextColor={COLOURS.lightGrey2}
            onChangeText={handleTextChange}
            underlineColor={'white'}
            defaultValue={defaultValue && defaultValue.trim()}
            ref={refValue}
            onFocus={handleTextInputFocus}
            onBlur={handleBlur}
            onSubmitEditing={onSubmitEditing}
            returnKeyLabel={'Next'}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={capitalize}
            multiline={multiline}
            editable={editable}
            //clearButtonMode={"always"}
            textAlignVertical={multiline ? 'top' : null}
            maxLength={length}
        />
    );
};

// define your styles
const styles = StyleSheet.create({
    textInput: {
        backgroundColor: COLOURS.white,
        paddingLeft: 16,
        color: 'black',
        borderWidth: 1.2,
        borderRadius: 10,
        fontSize: fp(15),
        alignSelf: 'center',
        fontFamily: FONTS.regular
        //letterSpacing: -0.4,
    }
});

//make this component available to the app
export default TextInputComponent;
