import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
} from 'react-native-reanimated';
import { useFonts } from 'expo-font'; 
import styles from './LoadingScreenStyles'; 

const LoadingScreen = ({ onLoadingComplete }) => {
  const bubbleAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

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

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnimation }]}> 
      <Animated.View style={[styles.bubble, bubbleStyle]}>
        <MaterialCommunityIcons name="brain" size={60} color="#FFF" />
      </Animated.View>
      <Text style={styles.text}>Loading Quiz...</Text>
    </Animated.View>
  );
};

export default LoadingScreen;