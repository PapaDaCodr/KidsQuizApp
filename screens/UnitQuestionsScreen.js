// UnitQuestionsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useQuizStructure } from '../quizStructureContext';

const UnitQuestionsScreen = ({ route }) => {
  const { colors } = useTheme();
  const { quizStructure } = useQuizStructure();
  const { topic, unitName } = route.params;

  const unit = quizStructure[topic].find(u => u.unitName === unitName);
  const questions = unit ? unit.questions : [];

  const renderQuestionItem = ({ item, index }) => (
    <View style={[styles.questionItem, { backgroundColor: colors.card }]}>
      <Text style={[styles.questionText, { color: colors.text }]}>
        {index + 1}. {item.question}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.unitTitle, { color: colors.text }]}>Questions for: {unitName}</Text>
      <FlatList
        data={questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item, index) => index.toString()}
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
  unitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  questionItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
  },
});

export default UnitQuestionsScreen;