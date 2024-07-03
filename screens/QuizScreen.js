import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';
import { quizQuestions } from '../quizQuestions';

const QuizScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === quizQuestions[topic][currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions[topic].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', { score, total: quizQuestions[topic].length });
    }
  };

  const currentQuestion = quizQuestions[topic][currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.answerButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
     );
    };
    
    export default QuizScreen;