import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../../screens/SignUp';
import BuyAsset from '../../screens/BuyAsset';
import BottomTabs from './Router';
import Productdescription from '../../screens/Productdescription';
import BidAsset from '../../screens/BidAssetBottomSheet';
import ListProduct from '../../screens/ListProduct';
import MyAssetDescription from '../../screens/MyAssetDescription';
import ViewAllOffers from '../../screens/ViewAllOffers';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Stack = createStackNavigator();

export function AppStack() {

    const [user, setUser] = React.useState()

    React.useEffect(() => {
        const usersRef = firestore().collection('users');
        auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        console.log(userData)
                        setUser(userData)
                    })
                    .catch((error) => {
                        // setLoading(false)
                        console.log('error')
                    });
            } else {
                // setLoading(false)
                console.log('error2')
            }
        });
    }, []);


    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? "BottomTabs" : "Login"}>

                {!user ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                ) : (
                    <>

                        <Stack.Screen name="BottomTabs" component={BottomTabs} initialParams={[user, setUser]} />
                        <Stack.Screen name="Productdescription" component={Productdescription} />
                        <Stack.Screen name="ListProduct" component={ListProduct} />
                        <Stack.Screen name="MyAssetDescription" component={MyAssetDescription} />
                        <Stack.Screen name="ViewAllOffers" component={ViewAllOffers} />
                        <Stack.Screen
                            name="BidAsset"
                            component={BidAsset}
                            options={{
                                animationEnabled: true,
                                presentation: 'transparentModal',
                                cardOverlayEnabled: true

                            }}

                        />


                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer >
    );
}
