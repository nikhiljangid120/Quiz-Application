import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Result = ({ userName, score, totalQuestions, onRestart }) => {
  const percentage = (score / totalQuestions) * 100;

  React.useEffect(() => {
    if (percentage > 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-xl mb-2">Great job, {userName}!</p>
      <p className="text-2xl font-semibold mb-4">
        Your score: {score} / {totalQuestions}
      </p>
      <motion.div
        className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
      <p className="text-lg mb-6">
        {percentage >= 70
          ? "Excellent work! You're a quiz master!"
          : percentage >= 50
          ? "Good effort! Keep practicing to improve your score."
          : "Keep learning and try again to improve your score!"}
      </p>
      <button onClick={onRestart} className="btn btn-primary">
        Restart Quiz
      </button>
    </motion.div>
  );
};

export default Result;