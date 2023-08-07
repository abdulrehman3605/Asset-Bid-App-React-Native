import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { hp, wp, fp } from "../shared/utils/responsive-screen";

import { MARGIN, SIZE } from "./Config";
import { COLOURS } from "../shared/themes/color";
import Header from "./Header";
import { FONTS } from "../shared/themes/fonts";

const styles = StyleSheet.create({
  container: {
    width: wp(230),
    height: hp(100),
    // alignSelf: "center",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    // position: "absolute",
    // alignItems: "center",
    backgroundColor: COLOURS.boxColour,
    flexDirection: "row"
    // marginLeft: 100
  },

  nameT: {
    fontFamily: FONTS.bold,
    fontSize: fp(14),
    color: COLOURS.black
  },
  nameT2: {
    fontFamily: FONTS.Medium,
    fontSize: fp(14),
    color: COLOURS.black
  }
});
interface TileProps {
  // id: string;
  // uri: string;
  name: string;
  id: string;
  phoneNumber: string;
  deliveryState: string;
  onLongPress: () => void;
  index: number;
  setState: () => void;
  state: [];
  riderInfo: {}
  navigation: any

}

const removeItem = (idx, state, setState) => {
  // console.log(idx, 'idx')
  const newArray = [...state];

  newArray.splice(idx, 1);
  setState(newArray);
}

const Tile = ({ name, id, phoneNumber, deliveryState, index, setState, state }: TileProps) => {
  // console.log(name, 'item')
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.container} pointerEvents="none">
        <View style={{ flex: 0.8, alignItems: "center", justifyContent: "center" }}>
          <Image
            style={{ marginTop: 6, height: 25, width: 25 }}
            source={require('../assets/icons/selecthandIcon.png')}
          />
        </View>
        <View style={{ flex: 3.2, marginVertical: 14, marginLeft: 5 }}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={styles.nameT}>{name}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.nameT2}>{phoneNumber}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Text style={styles.nameT}>{deliveryState}</Text>
          </View>
        </View>

      </View>

      <View style={{ width: wp(70), height: hp(100), justifyContent: "center", borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: COLOURS.boxColour }} pointerEvents="box-none">
        <TouchableOpacity onPress={() => removeItem(index, state, setState)}>
          <Text style={{ fontFamily: FONTS.Medium, color: COLOURS.black, fontSize: fp(11) }}>Remove</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};



export default Tile;
