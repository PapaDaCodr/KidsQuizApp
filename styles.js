import { StyleSheet } from 'react-native';

const Colors = {
  primary: '#7FDBFF',  // Light Blue (background)
  secondary: '#00BFFF', // Blue
  accent: '#FF69B4',    // Pink
  text: '#000000',      // Black
  textLight: '#FFFFFF', // White
};

export const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDarkMode ? Colors.text : Colors.primary,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkMode ? Colors.textLight : Colors.text,
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: 18,
  },
  topicButton: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  topicButtonText: {
    color: Colors.textLight,
    fontSize: 18,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: isDarkMode ? Colors.textLight : Colors.text,
  },
  answerButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  answerButtonText: {
    color: Colors.textLight,
    fontSize: 16,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
    color: isDarkMode ? Colors.textLight : Colors.text,
  },
});

export { Colors };