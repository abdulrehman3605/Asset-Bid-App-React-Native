import * as firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyADsYtXYvWpk2OZ4PfWC9vnqKMChkiPrrI',
    authDomain: '415793473082-8fie7og5bgqledmc76tq6ah1bmvo0qm6.apps.googleusercontent.com',
    // databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'bid-application---testtask',
    storageBucket: 'bid-application---testtask.appspot.com',
    // messagingSenderId: '12345-insert-yourse',
    appId: '1:415793473082:android:e050e9f0316fa5c6ab7703',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };