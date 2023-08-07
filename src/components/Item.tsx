import React, { ReactNode } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp, fp } from "../shared/utils/responsive-screen";
import { COL, Positions, SIZE, animationConfig, getOrder, getPosition } from "./Config";
import Animated, { useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

interface ItemProps {
  children: ReactNode;
  childrens: ReactNode[]
  id: string;
  positions: Animated.SharedValue<Positions>;
  count: number;
  riderInfo: {}

}

const Item = ({ children, positions, id, count, childrens, riderInfo, }: ItemProps) => {
  console.log('rendered')
  // console.log(riderInfo, 'riderInfo')
  // console.log(positions.value, 'posoitons')
  const keyvaluesOfPositions = Object.keys(positions.value)
  const reducedkeys = childrens.map((child) => child.props.children.props.id)
  // console.log(reducedkeys, 'reducedkeys')

  // console.log(keyvaluesOfPositions, 'keyss')
  // if (Object.keys(positions.value).length != count) {

  const mappedObject = reducedkeys.reduce((acc, child, index) => {
    acc[child] = index
    return acc
  }, {});
  console.log(mappedObject, 'removed')
  positions.value = mappedObject
  // setWithPriority(mappedObject)

  // console.log(Object.keys(positions.value).length, 'leeeee')

  const inset = useSafeAreaInsets();
  // const containerHeight = Dimensions.get("window").height - inset.top - inset.bottom;
  // const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions.value[id])
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y);
  // console.log(getOrder(0, 112, 500), 'checkk')
  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig)
      translateY.value = withTiming(newPosition.y, animationConfig)
    }

  );
  const isGestureActive = useSharedValue(false);
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number, y: number }>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value,
        ctx.y = translateY.value
    },
    onActive: (({ translationX, translationY }, ctx) => {
      isGestureActive.value = true
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY
      const oldOrder = positions.value[id]
      const newOrder = getOrder(
        translateX.value,
        translateY.value,
        Object.keys(positions.value).length - 1
      );
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(key => positions.value[key] === newOrder)
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions
        }
      }
    }),
    onEnd: () => {
      const destination = getPosition(positions.value[id])
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false;
      })
      translateY.value = withTiming(destination.y, animationConfig)

    }
  })
  // console.log(position, 'ppppppp')
  const styles = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    // const zIndex = 100
    const scale = isGestureActive.value ? 1.1 : 1
    return {
      position: "absolute",
      // top: 0,
      // left: 10,
      marginLeft: 30,
      alignSelf: 'flex-start',
      // alignItems: 'center',
      width: 50,
      height: 100,
      zIndex,
      // backgroundColor: 'green',
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }]
    }


  })


  return (
    <Animated.View style={styles}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
};

export default Item;
