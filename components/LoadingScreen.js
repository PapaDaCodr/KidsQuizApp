import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import styles from './LoadingScreenStyles';
import AnimatedLogo from './AnimatedLogo';
import { Colors } from '../styles';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [fontsLoaded] = useFonts({
    'RobotoSlab': require('../assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
  });

  const fadeAnimation = useSharedValue(0);
  const progress = useSharedValue(0);
  const breathe = useSharedValue(1);

  useEffect(() => {
    fadeAnimation.value = withTiming(1, { duration: 1000 });
    progress.value = withTiming(1, { duration: 8000 });
    breathe.value = withRepeat(
      withTiming(1.1, { duration: 1000, easing: Easing.sine }),
      -1,
      true
    );

    setTimeout(() => {
      onLoadingComplete();
    }, 8000);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeAnimation.value,
    transform: [{ scale: breathe.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <AnimatedLogo />
      <Text style={styles.text}>Loading Quiz...</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
    </Animated.View>
  );
};

export default LoadingScreen;
