// TopicUnitsScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../ThemeContext';

const TopicUnitsScreen = ({ route }) => {
  const { colors } = useTheme();
  const { topic } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Units for topic: {topic}</Text>
    </View>
  );
};

export default TopicUnitsScreen;