// styles.js
import { StyleSheet } from 'react-native';

export const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#121212' : '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#FFFFFF' : '#000000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#FFFFFF' : '#000000',
  },
  cardText: {
    fontSize: 14,
    color: theme === 'dark' ? '#B0B0B0' : '#666666',
    marginTop: 5,
  },
  // Add more styles as needed
});