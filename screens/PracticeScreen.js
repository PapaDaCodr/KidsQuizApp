// PracticeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useUser } from '../UserContext';
import { getStyles } from '../styles';
import { quizStructure } from '../quizQuestions';

const PracticeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const { userData } = useUser();

  const completedUnits = userData.completedUnits.map(unit => ({
    ...unit,
    unitName: quizStructure[unit.topic][unit.unitIndex].unitName
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.practiceUnitButton}
      onPress={() => navigation.navigate('Quiz', { topic: item.topic, unitIndex: item.unitIndex, isPractice: true })}
    >
      <Text style={styles.practiceUnitText}>{item.topic} - {item.unitName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.practiceTitle}>Practice Completed Units</Text>
      <FlatList
        data={completedUnits}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PracticeScreen;