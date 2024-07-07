import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customQuestions from './customQuestions';

const Quiz = ({ userName, onEnd }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Shuffle the questions array
    const shuffledQuestions = [...customQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (answer) => {
    const correct = answer === questions[currentQuestion].correctAnswer;
    if (correct) {
      setScore(score + 1);
    }
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onEnd(score + (correct ? 1 : 0), questions.length);
      }
    }, 1500);
  };

  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
  }

  const question = questions[currentQuestion];
  const answers = [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5);

  return (
    <motion.div
      key={currentQuestion}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {answers.map((answer, index) => (
          <motion.button
            key={index}
            className="btn btn-secondary w-full text-left"
            onClick={() => handleAnswer(answer)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {answer}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-4 p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;