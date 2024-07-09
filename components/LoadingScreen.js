import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import styles from './LoadingScreenStyles';
import AnimatedLogo from './AnimatedLogo';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [fontsLoaded] = useFonts({
    'RobotoSlab': require('../assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
  });

  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 8000, easing: Easing.linear });
    opacity.value = withTiming(1, { duration: 1000 });

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
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