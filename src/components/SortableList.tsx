import React, { ReactElement, useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Item from "./Item";
import { COL, Positions, SIZE } from "./Config";
import { useSharedValue } from "react-native-reanimated";
import { wp, hp, fp } from "../shared/utils/responsive-screen";
import { COLOURS } from "../shared/themes/color";
import { FONTS } from "../shared/themes/fonts";
import { dispatchOrdersWithPriority, getOrders } from '../shared/store/redux/actions/orders';
import { useDispatch } from "react-redux";
import moment from 'moment';
import { useSelector } from 'react-redux';
import { LoadingModal } from "../screens/ItemFulfillment/IndividualFulfillment";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


interface ListProps {
  children: ReactElement<{ id: string }>[];
}



const List = ({ children }: ListProps) => {
  const { postOrderDispatchLoading } = useSelector(state => state.OrdersReducer);
  const dispatch = useDispatch()


  const goDispatch = (positions, riderId) => {
    const ids = Object.keys(positions)
    let payload = ids.map((id) => {
      return (
        {
          orderId: id,
          riderId: riderId,
          position: positions[id]
        }
      )
    })
    children[0].props.children.props.navigation.navigate("Dispatch", { showToast: true })


    dispatch(dispatchOrdersWithPriority(payload)).then(async () => {
      const startDate = await moment().format('YYYY-MM-DD');
      // console.log(startDate, 'startdate')
      const endDate = await moment().add(1, 'days').format("YYYY-MM-DD");
      console.log(startDate, endDate, 'check this')
      Toast.show({
        type: 'success',
        text1: 'Orders Dispatched Successfully!'
      });
      dispatch(getOrders(startDate, endDate))
    })


    console.log(payload, 'payload')
  }
  // console.log(children, 'children')


  // console.log('rendered', positions.value)

  const SortableComponent = useCallback(() => {
    console.log('renders')
    const positions = useSharedValue<Positions>(
      Object.assign(
        {},
        ...children.map((child, index) => ({ [child.props.children.props.id]: index }))
      )
    )
    return (
      <ScrollView
        contentContainerStyle={{
          height: (Math.ceil(children.length / COL) * SIZE) > Dimensions.get("window").height ? (Math.ceil(children.length / COL) * SIZE) : Dimensions.get("window").height,
          width: '100%',
          backgroundColor: 'white'
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        style={{}}
      >
        <View style={{ flex: 1, marginTop: 15 }}>
          {children.map((child) => {
            // console.log(child.props, 'child')
            return (
              <Item key={child.props.children.props.id} id={child.props.children.props.id} positions={positions} count={children.length} childrens={children} riderInfo={child.props.children.props.riderInfo} >
                {child}
              </Item>
            );
          })}
          <>
            {children.length > 0 && (
              <TouchableOpacity style={{ height: hp(50), width: wp(300), backgroundColor: COLOURS.blue, alignSelf: "center", marginTop: (Math.ceil(children.length / COL) * SIZE) * 1.4, borderRadius: 30, alignItems: "center", justifyContent: "center" }} onPress={() => goDispatch(positions.value, children[0].props.children.props.riderInfo.id)}>
                <Text style={{ fontFamily: FONTS.semibold, fontSize: fp(14), color: COLOURS.white }}>Dispatch</Text>
              </TouchableOpacity>
            )}
          </>

        </View>
        {/* <Toast
          position='bottom'
          bottomOffset={20}
          config={toastConfig}
        /> */}

      </ScrollView>
    )
  }, [children])

  // console.log(positions.value, 'potsss')
  return (
    <>
      <LoadingModal isModalVisible={postOrderDispatchLoading} />
      <SortableComponent />
    </>
  );
};

export default List;
