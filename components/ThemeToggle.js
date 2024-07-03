import React from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [animation] = React.useState(new Animated.Value(isDarkMode ? 1 : 0));

  const toggleTheme = () => {
    const toValue = isDarkMode ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsDarkMode(!isDarkMode);
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 28],
  });

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <View style={styles.container}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={24}
            color={isDarkMode ? '#f1c40f' : '#f39c12'}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#34495e',
    padding: 4,
  },
  slider: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;