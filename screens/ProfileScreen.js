import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useUser } from '../UserContext';
import { getStyles } from '../styles';
import Footer from './Footer';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const styles = getStyles(theme);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>XP: {user.xp}</Text>
        <View style={styles.userStatsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.lessonsCompleted}</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.daysStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} activeTab="Profile" />
    </View>
  );
};

export default ProfileScreen;