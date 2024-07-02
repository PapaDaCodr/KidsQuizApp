import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';

const Stack = createStackNavigator();

/**
 * Main App component
 * Sets up the navigation structure for the app
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Brain Blasters' }} /> 
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}