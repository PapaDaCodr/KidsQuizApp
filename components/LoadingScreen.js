import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import styles from './LoadingScreenStyles'; // Import styles from the separate file

const LoadingScreen = ({ onLoadingComplete }) => {
  const [fontsLoaded] = useFonts({
    'YourCustomFont': require('C:\\Users\\Duke\\Documents\\All Projects\\javascript\\QuizApp\\KidsQuizApp\\assets\\fonts\\RobotoSlab-VariableFont_wght.ttf'), // Replace with your font path
  });

  const bubbleAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const progress = useSharedValue(0);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(bubbleAnimation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
          }),
          Animated.timing(bubbleAnimation, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000, // Adjust duration to match your loading time
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate loading time
    setTimeout(() => {
      onLoadingComplete();
    }, 3000);
  }, []);

  const bubbleStyle = {
    transform: [
      {
        scale: bubbleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  if (!fontsLoaded) {
    return null; // Or show a placeholder while fonts are loading
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnimation }]}>
      <Image source={require('C:\\Users\\Duke\\Documents\\All Projects\\javascript\\QuizApp\\KidsQuizApp\\assets\\Monkey.Logo.png')} style={styles.logo} />
      <Animated.View style={[styles.bubble, animatedStyle]}>
        <MaterialCommunityIcons name="brain" size={60} color="#FFF" />
      </Animated.View>
      <Text style={styles.text}>Loading Quiz...</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
    </Animated.View>
  );
};



export default LoadingScreen;