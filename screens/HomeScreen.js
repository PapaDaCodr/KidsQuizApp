import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Computer Science Quiz</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Topics')}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;