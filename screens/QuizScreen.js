import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';
import { quizQuestions } from '../quizQuestions';

const QuizScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const handleAnswer = (selectedAnswer) => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions[topic].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = calculateScore(newAnswers);
      navigation.navigate('Result', { score: finalScore, total: quizQuestions[topic].length });
    }
  };

  const calculateScore = (userAnswers) => {
    return userAnswers.reduce((score, answer, index) => {
      if (answer === quizQuestions[topic][index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
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