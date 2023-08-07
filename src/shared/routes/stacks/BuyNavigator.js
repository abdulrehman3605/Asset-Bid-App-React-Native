import * as React from 'react'; import { createStackNavigator } from '@react-navigation/stack';
// import Login from '../../screens/Login';

// import Orders from '../../screens/Orders';
// import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import BuyAsset from '../../../screens/BuyAsset';
import Productdescription from '../../../screens/Productdescription';


const Stack = createStackNavigator();

export function BuyNav({ route }) {

    return (
        // <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='BuyAsset'>

            <Stack.Screen name="BuyAsset" component={BuyAsset} initialParams={route.params} />
            <Stack.Screen name="Productdescription" component={Productdescription} initialParams={route.params.user} />
            {/* <Stack.Screen
                name="SetItemBottomSheet"
                component={SetItemBottomSheet}
                options={{
                    animationEnabled: true,
                    presentation: 'transparentModal',
                    cardOverlayEnabled: false

                }}

            /> */}



        </Stack.Navigator>
        // </NavigationContainer >
    );
}

export default BuyNav;