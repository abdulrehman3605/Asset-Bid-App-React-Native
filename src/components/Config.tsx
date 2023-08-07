import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";

export interface Positions {
  [id: string]: number;
}

const { width } = Dimensions.get("window");
export const MARGIN = 8;
// export const SIZE = width / 2 - MARGIN;
export const SIZE = width / 3 - MARGIN;
console.log(SIZE)
export const COL = 1;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};


export const getPosition = (order: number) => {
  "worklet";
  // console.log(order, 'order>>')
  return {
    x: (order % COL) * SIZE,
    y: Math.floor(order / COL) * SIZE
  }
}

// export const removeDeletedSelectedOrders = (children:  ,) => {
//   "worklet";
//   // console.log(order, 'order>>')
//   return {
//     x: (order % COL) * SIZE,
//     y: Math.floor(order / COL) * SIZE
//   }
// }

export const getOrder = (tx: number, ty: number, max: number) => {
  "worklet";
  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};


// understand how the getOrder is working 