import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * QuizButton component
 * Reusable button component for quiz options
 * 
 * @param {object} props - Component props
 * @param {string} props.text - Button text
 * @param {function} props.onPress - Function to call when button is pressed
 */
export const QuizButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

/**
 * QuestionText component
 * Displays the question text
 * 
 * @param {object} props - Component props
 * @param {string} props.text - Question text to display
 */
export const QuestionText = ({ text }) => (
  <Text style={styles.questionText}>{text}</Text>
);

// Styles for the components
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});