import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const questions = [
  {
    question: "What color is the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    correctAnswer: "Blue"
  },
  {
    question: "How many legs does a cat have?",
    options: ["2", "4", "6", "8"],
    correctAnswer: "4"
  }
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.option}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});