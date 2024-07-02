import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * HomeScreen component
 * Displays the welcome screen and start quiz button
 * 
 * @param {object} navigation - Navigation object for screen transitions
 */

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Brain Blasters!</Text> 
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87CEEB', // Sky blue background
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#FFD700', // Golden yellow button
      padding: 15,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 'bold',
    },
  });