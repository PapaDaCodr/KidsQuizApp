import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const AnimatedLogo = () => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text 
        style={[
          styles.text, 
          { 
            opacity: opacity,
            transform: [{ scale: scale }]
          }
        ]}
      >
        MONKEY
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EA51DA', // You can change this to your desired color
  },
});

export default AnimatedLogo;