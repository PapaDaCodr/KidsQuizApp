// styles.js
import { StyleSheet } from 'react-native';

export const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.textColor,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: theme.textColor,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: theme.primaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: theme.secondaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: theme.textColor,
    fontSize: 16,
  },
  inputField: {
    backgroundColor: theme.inputBackgroundColor,
    color: theme.textColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: theme.cardBackgroundColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textColor,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: theme.textColor,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.footerBackgroundColor,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.borderColor,
  },
  footerTab: {
    alignItems: 'center',
  },
  footerTabText: {
    color: theme.textColor,
    fontSize: 12,
    marginTop: 5,
  },
  // Add more custom styles as needed
});