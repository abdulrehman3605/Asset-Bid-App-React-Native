//import liraries
import { Component, useState, useRef, useEffect } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, Image, Dimensions, ScrollView, Keyboard, TextInput } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextInputComponent from '../../components/TextInputComponent';
import { deviceWidth, fp, hp, wp } from '../../shared/utils/responsive-screen';
import { COLOURS } from '../../shared/themes/color';
import { FONTS } from '../../shared/themes/fonts';
// import { useSelector, useDispatch } from 'react-redux';
// import { LoginAttempt, clearErrorField } from '../../shared/store/redux/actions/users';
// import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


// create a component

const Register = ({ navigation }) => {

    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [name, setName] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);
    // // console.log(email, 'email')

    // const { user, loginLoading, error } = useSelector(state => state.userReducer);
    // const dispatch = useDispatch();
    // // error == null ? setErrorFlag(false) : setErrorFlag(true)   // causing re renders check this

    // const handleEmail = (text) => {
    //     setEmail(text);
    // };

    // const handlePassword = (text) => {
    //     setPassword(text);
    // };

    const onSubmit = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    name: name,
                    username: email,
                    password: password,
                    phoneNumber: contactNo,
                    Address: address

                };
                const usersRef = firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        // navigation.navigate('Home', { user: data })
                        Alert.alert("Success", "User Created Successfully")
                        setContactNo('')
                        setPassword('')
                        setEmail('')
                        setAddress('')
                        Keyboard.dismiss()
                    })
                    .catch((error) => {
                        Alert.alert('Error:', error.message)
                        // console.log(error)
                    });
            })
            .catch((error) => {
                // Alert.alert('Error:', error.message)
                Alert.alert("Error", "User Already Exists")

                console.log(error)
            });
    }


    const renderInputFields = () => {
        return (
            <>
                <TextInput placeholder='Enter Name' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setName(text)} keyboardType='email-address' autoCapitalize='none' value={name} returnKeyType='next' />
                <View style={{ marginTop: 15 }}></View>
                <TextInput placeholder='Enter Username' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setEmail(text)} keyboardType='email-address' autoCapitalize='none' onSubmitEditing={() => passwordRef.current.focus()} value={email} returnKeyType='next' />
                <View style={{ marginTop: 15 }}></View>
                <TextInput placeholder='Enter Password' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setPassword(text)} autoCapitalize='none' onSubmitEditing={() => onSubmit()} value={password} returnKeyType='next' secureTextEntry={true} ref={passwordRef} />
                <View style={{ marginTop: 15 }}></View>
                <TextInput placeholder='Enter your phone contact' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setContactNo(text)} autoCapitalize='none' onSubmitEditing={() => onSubmit()} value={contactNo} returnKeyType='next' keyboardType='number-pad' />
                <View style={{ marginTop: 15 }}></View>
                <TextInput placeholder='Enter your Address' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setAddress(text)} autoCapitalize='none' onSubmitEditing={() => onSubmit()} value={address} returnKeyType='next' keyboardType='default' />
            </>
        )
    }


    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
            {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}

            <View style={{ flex: 9 }}>
                <View style={styles.headerComp}>
                    <Text style={styles.LoginT}>Register</Text>
                </View>
                <View style={styles.inputCont}>
                    <View style={{ alignItems: 'center' }}>
                        {renderInputFields()}
                    </View>
                    {/* <TouchableOpacity>
                        <Text style={styles.forgetPass}>Forgot Password?</Text>
                    </TouchableOpacity> */}
                </View>

            </View>

            <View style={{ flex: 1.5, alignItems: 'center', width: '85%' }}>
                {/* <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ marginTop: 6, width: 395.23 * 0.85, height: 66.64 * 0.85 }}
                        source={require('../../assets/icons/MESSAGE.png')}
                        resizeMode='cover'
                    />
                </View> */}
                <TouchableOpacity style={styles.LoginButton} onPress={() => onSubmit()}>
                    <Text style={{ color: 'white', fontFamily: FONTS.Medium, fontSize: 16 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: Platform.OS === 'ios' ? 22 : 0
    },

    headerComp: {
        width: '100%',
        height: 70,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        alignSelf: 'center'
    },
    LoginT: {
        color: 'black',
        fontSize: 20,
        fontFamily: FONTS.Medium
    },
    inputCont: {
        width: hp(300),
        height: '30%',
        // backgroundColor: 'red',
        // alignItems: 'center',
        paddingTop: 30
    },
    inputbox: {
        width: '100%',
        height: 55,
        // backgroundColor: 'blue',
        // margin: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#E3E5E5',
        // opacity: 0.5,
        paddingLeft: 20,
        fontSize: fp(15),
        // alignSelf: 'center',
        fontFamily: FONTS.regular
    },
    forgetPass: {
        fontSize: 16,
        color: '#6B4EFF',
        marginTop: 10,
        fontFamily: FONTS.Medium
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
        justifyContent: 'center'
    }
});

//make this component available to the app
export default Register;
