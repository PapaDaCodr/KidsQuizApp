// TopicUnitsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useQuizStructure } from '../quizStructureContext';
import { useNavigation } from '@react-navigation/native';

const TopicUnitsScreen = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { quizStructure } = useQuizStructure();
  const { topic } = route.params;

  const units = quizStructure[topic] || [];

  const renderUnitItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.unitItem, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('UnitQuestions', { topic, unitName: item.unitName })}
    >
      <Text style={[styles.unitText, { color: colors.text }]}>{item.unitName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.topicTitle, { color: colors.text }]}>Units for topic: {topic}</Text>
      <FlatList
        data={units}
        renderItem={renderUnitItem}
        keyExtractor={(item) => item.unitName}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  unitItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  unitText: {
    fontSize: 16,
  },
});

export default TopicUnitsScreen;