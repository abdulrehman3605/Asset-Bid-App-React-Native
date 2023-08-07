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
// import { LoaderButtonComponent } from '../../components/LoadingButton';
import LoadingButton from '../../components/LoadingButton';


// create a component

const Login = ({ navigation }) => {
    // const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    // useEffect(() => {

    //     const keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         () => {
    //             setKeyboardVisible(true); // or some other action
    //         }
    //     );
    //     const keyboardDidHsideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         () => {
    //             setKeyboardVisible(false); // or some other action
    //         }
    //     );

    //     return () => {
    //         keyboardDidHideListener.remove();
    //         keyboardDidShowListener.remove();
    //     };

    // }, [])

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
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
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            Alert.alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        console.log(firestoreDocument, 'userr')
                        navigation.navigate('BottomTabs', { user })
                        setEmail('')
                        setPassword('')
                    })
                    .catch(error => {
                        // Alert.alert(error)
                        console.log('error1', error)
                    });
            })
            .catch(error => {
                console.log('error2', error)
            })
    }


    const renderInputFields = () => {
        return (
            <>
                <TextInput placeholder='Email' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setEmail(text)} keyboardType='email-address' autoCapitalize='none' onSubmitEditing={() => passwordRef.current.focus()} value={email} returnKeyType='next' />
                <View style={{ marginTop: 15 }}></View>
                <TextInput placeholder='Password' style={styles.inputbox} placeholderTextColor={COLOURS.lightGrey2} onChangeText={(text) => setPassword(text)} autoCapitalize='none' onSubmitEditing={() => onSubmit()} value={password} returnKeyType='next' secureTextEntry={true} ref={passwordRef} />
            </>
        )
    }

    var loadingButtonRef = useRef();

    const showLoader = () => {
        console.log('hello')
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
            {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}
            <View style={{ flex: 1.2 }}></View>
            <View style={{ flex: 3 }}>
                <View style={styles.headerComp}>
                    <Text style={styles.LoginT}>Log in</Text>
                </View>
                <View style={styles.inputCont}>
                    <View style={{ alignItems: 'center' }}>
                        {renderInputFields()}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.forgetPass}>Sign Up Instead</Text>
                    </TouchableOpacity>
                </View>
                {/* {error != null && (
                    Alert.alert('Error', 'Incorrect username or password! Please try again.', [{
                        text: 'OK', onPress: () => {
                            dispatch(clearErrorField())

                            setEmail("")
                            setPassword("")
                        }
                    }])
                    // Alert.alert('Error', `${error}`)
                )} */}
            </View>

            <View style={{ flex: Platform.OS == 'ios' && isKeyboardVisible ? 5 : 1.5, alignItems: 'center', width: '85%' }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ marginTop: 6, width: 395.23 * 0.85, height: 66.64 * 0.85 }}
                        source={require('../../assets/icons/MESSAGE.png')}
                        resizeMode='cover'
                    />
                </View>

                <LoadingButton onpress={onSubmit} title={"Login"} />
            </View>
            {/* </KeyboardAwareScrollView> */}
            {/* </ScrollView> */}
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
        fontFamily: FONTS.regular
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
export default Login;
