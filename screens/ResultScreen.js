import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  useEffect(() => {
    saveScore(score);
  }, []);

  const saveScore = async (score) => {
    try {
      const highScore = await AsyncStorage.getItem('highScore');
      if (highScore === null || score > parseInt(highScore)) {
        await AsyncStorage.setItem('highScore', score.toString());
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your Score: {score}/{total}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;