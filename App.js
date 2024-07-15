// App.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './ThemeContext';
import { UserProvider } from './UserContext';
import { QuizStructureProvider } from './quizStructureContext';
import HomeScreen from './screens/HomeScreen';
import TopicsScreen from './screens/TopicsScreen';
import QuizScreen from './screens/QuizScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopicUnitsScreen from './screens/TopicUnitsScreen';
import UnitQuestionsScreen from './screens/UnitQuestionsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const TopicsStack = () => {
  const { colors } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="TopicsList" component={TopicsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TopicUnits" component={TopicUnitsScreen} options={({ route }) => ({ title: route.params.topic })} />
      <Stack.Screen name="UnitQuestions" component={UnitQuestionsScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={({ route }) => ({ title: `Quiz: ${route.params.unit}` })} />
    </Stack.Navigator>
  );
};

const ThemeToggleButton = () => {
  const { toggleTheme, theme, colors } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Icon
        name={theme === 'light' ? 'weather-night' : 'white-balance-sunny'}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const { colors } = useTheme();
  
  return (
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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.quaternary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.quaternary,
          height: 60,
          paddingBottom: 5,
        },
        tabBarShowLabel: false,
        headerRight: () => <ThemeToggleButton />,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' }
        }}
      />
      <Tab.Screen 
        name="Topics" 
        component={TopicsStack}
        options={{
          tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' }
        }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{
          tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' }
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' }
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <QuizStructureProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </QuizStructureProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;