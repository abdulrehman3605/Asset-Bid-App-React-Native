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
  Dimensions,
  Keyboard,
  TextInput,
  PermissionsAndroid,
  ScrollView
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextInputComponent from '../../components/TextInputComponent';
import { deviceWidth, fp, hp, wp } from '../../shared/utils/responsive-screen';
import { COLOURS } from '../../shared/themes/color';
import { FONTS } from '../../shared/themes/fonts';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LottieView from 'lottie-react-native';



// create a component

const ListProduct = ({ route, navigation }) => {

  const [assetName, setAssetName] = useState('')
  const [assetDescription, setAssetDescription] = useState('')
  const [assetMinPrice, setAssetMinPrice] = useState()
  const [showOptionsForSelection, setshowOptionsForSelection] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [image, setImage] = useState('')

  const { user } = route.params

  const entityRef = firestore().collection('assetsFinal')


  const onSubmit = () => {


    const data = {
      AssetDescription: assetDescription,
      AssetName: assetName,
      MinPrice: assetMinPrice,
      OwnerContact: user.phoneNumber, // needs to be created
      OwnerId: user.id,
      isActive: true,
      Image: image

    };
    console.log(data)

    entityRef
      .add(data)
      .then(_doc => {

        // setEntityText('')
        console.log('succ')
        entityRef
          .doc(_doc.id)
          .update({
            AssetId: _doc.id,
          })
        setShowSuccessModal(true)


      })
      .catch((error) => {
        Alert.alert(error)
      });
  }

  const requestCameraPermission = async () => {

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    // console.log('reached WRITE')
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };


  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true

    };
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // setFilePath(response);
      // cloudinaryUpload(response?.assets[0])
      console.log(response)
      setImage('data:image/jpeg;base64,' + response.assets[0].base64)


    });
  };


  const captureImage = async (type) => {
    // console.log('progress')
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      // quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    // let isCameraPermitted = true
    // let isStoragePermitted = true
    // if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // setFilePath(response);
      // cloudinaryUpload(response?.assets[0])
      setImage('data:image/jpeg;base64,' + response.assets[0].base64)
      // console.log(response.assets[0].base64, ';camera response')
    });
    // }

  };
  return (
    // <ScrollView style={{ flex: 1 }}>
    <View style={styles.mainCont}>
      <View>
        <View style={styles.headerComp}>
          <Text style={styles.headerTextStyle}>List your Asset</Text>
        </View>
      </View>
      {/* <ScrollView style={{width: '100%', backgroundColor: 'red'}}> */}


      <View style={{ marginTop: 35, height: hp(100) }}>
        <Text style={styles.TextStyle}>Asset Name</Text>
        <View style={styles.textInput}>
          <TextInput
            style={styles.searchCont}
            onChangeText={text => setAssetName(text)}
          //   value={companyName}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.TextStyle}>Description</Text>
          <View style={styles.textInput2}>
            <TextInput
              style={styles.searchCont}
              multiline={true}
              textAlignVertical='top'
              onChangeText={text => setAssetDescription(text)}

            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.TextStyle}> Set Price</Text>
          <View style={styles.textInput3}>
            <TextInput
              style={styles.searchCont}
              onChangeText={text => setAssetMinPrice(text)}
              //   value={companyName}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.AddImageButton}
            onPress={() => setshowOptionsForSelection(true)}
          >
            <Text
              style={{
                color: COLOURS.white,
                fontSize: fp(13),
                fontFamily: FONTS.semibold,
              }}>
              Add Image
            </Text>
          </TouchableOpacity>
        </View>

        {image.length > 0 &&
          <View style={{ width: '100%', height: 100 }}>
            <Image
              style={{ borderRadius: 8, flex: 1, width: '20%', height: '50%', marginLeft: 0, marginTop: 10, opacity: 0.5 }}
              source={{
                uri: image,
              }}
            />
          </View>
        }
        <View>
          <TouchableOpacity
            style={styles.ListAssetButton}
            onPress={() => onSubmit()}
          >
            <Text
              style={{
                color: COLOURS.white,
                fontSize: fp(16),
                fontFamily: FONTS.semibold,
              }}>
              List My Asset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}

      {showSuccessModal && (
        <View>
          <Modal isVisible={showSuccessModal} onBackdropPress={() => setShowSuccessModal(false)}>
            <View style={{ height: hp(400), marginHorizontal: 20, backgroundColor: COLOURS.white, borderRadius: 15, alignItems: 'center' }}>
              <LottieView source={require('../../assets/icons/success.json')} style={{ height: 300, width: 300, zIndex: 10 }} loop={false} autoPlay={true} />
              <Text style={{ fontFamily: FONTS.bold, fontSize: fp(25), color: COLOURS.blue }}>Congratulations!</Text>
              <Text style={{ fontFamily: FONTS.semibold, fontSize: fp(10), color: COLOURS.black, marginHorizontal: 20, textAlign: 'center' }}>Congratulations on listing the your asset and making it visible to the million others!</Text>

            </View>
          </Modal>
        </View>
      )
      }

      {
        showOptionsForSelection && (
          <View>
            <Modal isVisible={showOptionsForSelection} style={{
              justifyContent: 'flex-end',
              margin: 0,
            }} onBackdropPress={() => setshowOptionsForSelection(false)}>
              <View style={{ backgroundColor: 'white', height: 150, flexDirection: 'row' }}>
                <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center', marginLeft: 40 }} onPress={() => {
                  setshowOptionsForSelection(false)
                  captureImage('photo')
                }}>
                  <EvilIcons name='camera' color={'black'} size={40} />
                  <Text style={{ fontFamily: FONTS.Medium, color: 'black' }}>Launch Camera</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center', marginLeft: 70 }} onPress={() => {
                  setshowOptionsForSelection(false)
                  chooseFile('photo')
                }}>
                  <MaterialCommunityIcons name='view-gallery-outline' color={'black'} size={35} />
                  <Text style={{ fontFamily: FONTS.Medium, color: 'black' }}>Gallery</Text>

                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )
      }

    </View >
    // </ScrollView>
  );

}

const styles = StyleSheet.create({
  headerComp: {
    //   width: '100%',
    height: hp(30),

    //   flex:2,
    flexDirection: 'row',
    marginTop: 15,
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
  textInput: {
    borderWidth: 1,
    height: hp(48),
    // backgroundColor: 'red',
    borderRadius: 8,
    borderColor: '#E3E5E5',

  },
  textInput2: {
    borderWidth: 1,
    height: hp(170),
    borderRadius: 8,
    borderColor: '#E3E5E5',

    marginTop: 8,
  },
  textInput3: {
    borderWidth: 1,
    height: hp(48),
    width: '40%',
    borderRadius: 8,
    borderColor: '#E3E5E5',
    marginTop: 8,
  },

  searchCont: {
    // flex: 11,
    fontFamily: FONTS.Medium,
    fontSize: fp(14),
    paddingBottom: 14,
    color: COLOURS.darkInk,
    marginHorizontal: 5,
    flex: 1,

    // marginTop: 8,
  },
  AddImageButton: {
    width: wp(110),
    height: 40,
    marginTop: 15,
    backgroundColor: '#6B4EFF',
    // bottom: 0,
    // marginEnd: 0,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontSize: fp(14),
    color: COLOURS.darkInk,
    fontFamily: FONTS.regular,
  },
  ListAssetButton: {
    width: wp(300),
    height: 50,
    marginTop: 50,
    backgroundColor: '#6B4EFF',
    // bottom: 0,
    // marginEnd: 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
});

//make this component available to the app
export default ListProduct;
