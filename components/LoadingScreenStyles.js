import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Replace with your brand color
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  bubble: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Slabo', // Use your custom font
    color: '#FFF', 
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
});