import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../styles';

const AnimatedLetter = ({ letter, delay }) => {
  const positionX = useSharedValue(Math.random() * 300 - 150);
  const positionY = useSharedValue(Math.random() * 300 - 150);
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 2, stiffness: 80 })
    );

    positionX.value = withDelay(
      delay,
      withSequence(
        ...Array(3).fill(0).flatMap(() => [
          withTiming(Math.random() * 300 - 150, { duration: 500 }),
          withTiming(Math.random() * 300 - 150, { duration: 500 }),
        ]),
        withTiming(0, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      )
    );

    positionY.value = withDelay(
      delay,
      withSequence(
        ...Array(3).fill(0).flatMap(() => [
          withTiming(Math.random() * 300 - 150, { duration: 500 }),
          withTiming(Math.random() * 300 - 150, { duration: 500 }),
        ]),
        withTiming(0, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value !== undefined ? positionY.value : 0 },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.Text style={[styles.letter, animatedStyle]}>{letter}</Animated.Text>
  );
};

const AnimatedLogo = () => {
  return (
    <View style={styles.container}>
      {'MONKEY'.split('').map((letter, index) => (
        <AnimatedLetter key={index} letter={letter} delay={index * 200} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 20,
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.text,
  },
});

export default AnimatedLogo;
