
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';
import Footer from './Footer';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome to Language Quiz!</Text>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Topics')}
        >
          <Text style={styles.primaryButtonText}>Start Learning</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Challenge</Text>
          <Text style={styles.cardText}>Complete today's challenge to earn extra XP!</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Start Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Progress</Text>
          <Text style={styles.cardText}>You've completed 5 lessons this week. Keep it up!</Text>
        </View>
      </ScrollView>
      <Footer navigation={navigation} activeTab="Home" />
    </View>
  );
};

export default HomeScreen;