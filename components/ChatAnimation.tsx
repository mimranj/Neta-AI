import { COLORS } from '@/constants';
import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

export default function TypingAnimation() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot:any, delay:any) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1.5,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    setTimeout(() => animateDot(dot2, 500), 500);
    setTimeout(() => animateDot(dot3, 1000), 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 2,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    // borderRadius: 1,
    backgroundColor: COLORS.gray,
  },
});
