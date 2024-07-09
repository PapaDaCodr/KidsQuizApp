// quizStructureContext.js
import React, { createContext, useState, useContext } from 'react';
import { quizStructure as initialQuizStructure } from './quizQuestions';

const QuizStructureContext = createContext();

export const QuizStructureProvider = ({ children }) => {
  const [quizStructure, setQuizStructure] = useState(initialQuizStructure);

  const updateQuizStructure = (topic, updatedUnits) => {
    setQuizStructure(prevStructure => ({
      ...prevStructure,
      [topic]: updatedUnits
    }));
  };

  return (
    <QuizStructureContext.Provider value={{ quizStructure, updateQuizStructure }}>
      {children}
    </QuizStructureContext.Provider>
  );
};

export const useQuizStructure = () => useContext(QuizStructureContext);