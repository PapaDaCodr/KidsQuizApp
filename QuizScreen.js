import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { questions } from './quizData';

const { width, height } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadProgress();
    fadeIn();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleAnswer(null);
    }
  }, [timeLeft]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

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

  const saveProgress = async () => {
    try {
      const progress = JSON.stringify({ currentQuestion, score });
      await AsyncStorage.setItem('quizProgress', progress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
      saveProgress();
      fadeIn();
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    navigation.navigate('QuizResult', { score, total: questions.length });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.scoreText}>Score: {score}/{questions.length}</Text>
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={24} color="white" />
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
        </View>
        
        <View style={styles.questionContainer}>
          <Animated.Text style={[styles.questionText, { opacity: fadeAnim }]}>
            {questions[currentQuestion].question}
          </Animated.Text>
        </View>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    minHeight: height * 0.2,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  progressContainer: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});