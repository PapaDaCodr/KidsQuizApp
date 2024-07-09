
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { getStyles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = ({ navigation, activeTab }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const tabs = [
    { name: 'Home', icon: 'home', screen: 'Home' },
    { name: 'Topics', icon: 'book-open-variant', screen: 'Topics' },
    { name: 'Leaderboard', icon: 'trophy', screen: 'Leaderboard' },
    { name: 'Profile', icon: 'account', screen: 'Profile' },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.footerTab}
          onPress={() => navigation.navigate(tab.screen)}
        >
          <Icon 
            name={tab.icon} 
            size={24} 
            color={activeTab === tab.name ? theme.primaryColor : theme.textColor} 
          />
          <Text 
            style={[
              styles.footerTabText, 
              { color: activeTab === tab.name ? theme.primaryColor : theme.textColor }
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;