import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';
import { quizQuestions } from '../quizQuestions';

const TopicsScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container}>
      {Object.keys(quizQuestions).map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={styles.topicButton}
          onPress={() => navigation.navigate('Quiz', { topic })}
        >
          <Text style={styles.topicButtonText}>{topic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TopicsScreen;