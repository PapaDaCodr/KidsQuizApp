// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    streak: 0,
    lastLoginDate: null,
    xp: 0,
    completedUnits: [],
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async (newUserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
      setUserData(newUserData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const newUserData = { ...userData };

    if (userData.lastLoginDate !== today) {
      if (new Date(userData.lastLoginDate).getTime() + 86400000 >= new Date().getTime()) {
        newUserData.streak += 1;
      } else {
        newUserData.streak = 1;
      }
      newUserData.lastLoginDate = today;
      saveUserData(newUserData);
    }
  };

  const addXP = (points) => {
    const newUserData = { ...userData, xp: userData.xp + points };
    saveUserData(newUserData);
  };

  const completeUnit = (topic, unitIndex) => {
    const newCompletedUnits = [...userData.completedUnits, { topic, unitIndex }];
    const newUserData = { ...userData, completedUnits: newCompletedUnits };
    saveUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateStreak, addXP, completeUnit }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);