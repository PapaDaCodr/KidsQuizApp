// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';
import { QuizStructureProvider } from './quizStructureContext';
import HomeScreen from './screens/HomeScreen';
import TopicsScreen from './screens/TopicsScreen';
import QuizScreen from './screens/QuizScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TopicsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TopicsList" component={TopicsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <QuizStructureProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = 'home';
                  } else if (route.name === 'Topics') {
                    iconName = 'book-open-variant';
                  } else if (route.name === 'Leaderboard') {
                    iconName = 'trophy';
                  } else if (route.name === 'Profile') {
                    iconName = 'account';
                  }

                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Topics" component={TopicsStack} />
              <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </QuizStructureProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;