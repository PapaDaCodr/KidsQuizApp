
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useQuizStructure } from '../quizStructureContext';
import { getStyles } from '../styles';
import Footer from './Footer';

const TopicsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { quizStructure } = useQuizStructure();
  const styles = getStyles(theme);

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicUnits', { topic: topic });
  };  

  const renderTopic = ({ item: topic }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TopicUnits', { topic })}
    >
      <Text style={styles.cardTitle}>{topic}</Text>
      <Text style={styles.cardText}>{`${quizStructure[topic].length} units`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.container}
        data={Object.keys(quizStructure)}
        renderItem={renderTopic}
        keyExtractor={(item) => item}
        ListHeaderComponent={<Text style={styles.title}>Topics</Text>}
      />
      <Footer navigation={navigation} activeTab="Topics" />
    </View>
  );
};

export default TopicsScreen;