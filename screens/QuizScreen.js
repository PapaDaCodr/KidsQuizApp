import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useUser } from '../UserContext';
import { useQuizStructure } from '../quizStructureContext';
import { getStyles } from '../styles';

const QuizScreen = ({ route, navigation }) => {
  const { topic, unitIndex } = route.params;
  const { theme } = useTheme();
  const { user, updateUser } = useUser();
  const { quizStructure, updateQuizStructure } = useQuizStructure();
  const styles = getStyles(theme);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const unitQuestions = quizStructure[topic][unitIndex].questions;
    setQuestions(unitQuestions);
  }, [quizStructure, topic, unitIndex]);

  const currentQuestion = questions[currentQuestionIndex];

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
  const finishQuiz = () => {
    const xpGained = score * 10;
    const newXP = user.xp + xpGained;
    updateUser({ ...user, xp: newXP });

    const newProgress = Math.min(100, Math.round((score / questions.length) * 100));
    const updatedUnits = [...quizStructure[topic]];
    updatedUnits[unitIndex] = {
      ...updatedUnits[unitIndex],
      progress: Math.max(updatedUnits[unitIndex].progress || 0, newProgress),
    };

    updateQuizStructure(topic, updatedUnits);

    Alert.alert(
      "Quiz Completed",
      `You scored ${score} out of ${questions.length} and gained ${xpGained} XP!`,
      [{ text: "OK", onPress: () => navigation.navigate('Topics') }]
    );
  };


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