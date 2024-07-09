// LeaderboardScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useUser } from '../UserContext';
import { getStyles } from '../styles';

const LeaderboardScreen = () => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const { userData } = useUser();

  // This is a mock leaderboard. In a real app, you'd fetch this data from a server.
  const leaderboardData = [
    { id: '1', name: 'User 1', xp: 1000 },
    { id: '2', name: 'User 2', xp: 950 },
    { id: '3', name: 'User 3', xp: 900 },
    // ... more users
    { id: 'current', name: 'You', xp: userData.xp },
  ].sort((a, b) => b.xp - a.xp);

  const renderItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.leaderboardRank}>{index + 1}</Text>
      <Text style={styles.leaderboardName}>{item.name}</Text>
      <Text style={styles.leaderboardXP}>{item.xp} XP</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.leaderboardTitle}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LeaderboardScreen;