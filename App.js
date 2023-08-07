
// import 'react-native-gesture-handler';
import * as React from 'react';
import { Component, useState, useRef, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';
import { AppStack } from "./src/shared/routes/RootNavigation";
// import Login from './src/screens/Login/index.js';
// import { Provider } from 'react-redux';
// // import { store } from './src/shared/store/redux/store';
// // import SplashScreen from "react-native-splash-screen"
// import { AddItem } from './src/screens/AddItem';
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './src/shared/store/redux/store';
// import RiderOrderDispatch from './src/screens/RiderOrderDispatch';



const App = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={<ActivityIndicator style={{ alignSelf: 'center' }} />} persistor={persistor}>
    <AppStack />
    // {/* <RiderOrderDispatch /> */}
    //   </PersistGate>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
