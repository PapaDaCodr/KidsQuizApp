import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Alert, Text, AsyncStorage } from 'react-native';
import { questions } from './quizData';
import { QuizButton, QuestionText } from './QuizComponents';

export default function QuizScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Load saved progress when component mounts
  useEffect(() => {
    loadProgress();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleAnswer(null);
    }
  }, [timeLeft]);

  /**
   * Loads saved quiz progress from AsyncStorage
   */
  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('quizProgress');
      if (savedProgress !== null) {
        const { currentQuestion, score } = JSON.parse(savedProgress);
        setCurrentQuestion(currentQuestion);
        setScore(score);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  /**
   * Saves current quiz progress to AsyncStorage
   */
  const saveProgress = async () => {
    try {
      const progress = JSON.stringify({ currentQuestion, score });
      await AsyncStorage.setItem('quizProgress', progress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  /**
   * Handles user's answer selection
   * @param {string} selectedAnswer - The answer selected by the user
   */
  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
      saveProgress(); // Save progress after each question
    } else {
      endQuiz();
    }
  };

  /**
   * Ends the quiz and shows the final score
   */
  const endQuiz = () => {
    Alert.alert(
      "Quiz Completed",
      `Your score: ${score}/${questions.length}`,
      [
        { text: "Try Again", onPress: () => resetQuiz() },
        { text: "Home", onPress: () => navigation.navigate('Home') }
      ]
    );
  };

  /**
   * Resets the quiz to initial state
   */
  const resetQuiz = async () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    await AsyncStorage.removeItem('quizProgress');
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.scoreText}>Score: {score}/{questions.length}</Text>
        <Text style={styles.timerText}>Time: {timeLeft}s</Text>
      </View>
      <View style={styles.questionContainer}>
        <QuestionText text={questions[currentQuestion].question} />
      </View>
      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <QuizButton
            key={index}
            text={option}
            onPress={() => handleAnswer(option)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});