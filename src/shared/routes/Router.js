import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FONTS } from '../themes/fonts';
import { COLOURS } from '../themes/color';
import BuyAsset from '../../screens/BuyAsset';
import SellAsset from '../../screens/SellAsset';

import { Image } from 'react-native';



const Tab = createBottomTabNavigator();

function BottomTabs({ route }) {
    console.log(route.params, 'this')
    // console.log(route.params)
    return (
        <Tab.Navigator initialRouteName='BuyAsset' screenOptions={{ headerShown: false, tabBarLabelStyle: { fontFamily: FONTS.Medium, color: COLOURS.black }, tabBarShowLabel: true, tabBarHideOnKeyboard: true }}>
            {/* <Tab.Screen name="OrdersNavigator" component={OrdersNavigator} options={{ tabBarIcon: ({ size }) => <AntDesign name={'home'} size={size} color={'black'} />, tabBarLabel: 'Orders' }} /> */}
            <Tab.Screen name="BuyAsset" initialParams={route.params.user ? route.params.user : route.params} component={BuyAsset} options={{
                tabBarLabel: 'Buy Asset',
                tabBarIcon: ({ size, focused }) =>
                    <Image
                        style={{ marginTop: 6, height: size, width: size }}
                        source={focused ? require('../../assets/icons/ordersFocused.png') : require('../../assets/icons/orders.png')}
                    />



            }} />
            <Tab.Screen name="SellAsset" component={SellAsset} initialParams={route.params.user ? route.params.user : route.params} options={{
                tabBarLabel: 'Sell Asset', tabBarIcon: ({ size, focused }) =>
                    <Image
                        style={{ marginTop: 6, height: size, width: size }}
                        source={focused ? require('../../assets/icons/listFocused.png') : require('../../assets/icons/list.png')}
                    />
            }} />
        </Tab.Navigator>
    );
}

export default BottomTabs;