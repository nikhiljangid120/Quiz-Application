import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Result from './components/Result';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const [userName, setUserName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [error, setError] = useState(null);

  const startQuiz = (name) => {
    setUserName(name);
    setQuizStarted(true);
    setError(null);
  };

  const endQuiz = (finalScore, total) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setQuizEnded(true);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizEnded(false);
    setScore(0);
    setTotalQuestions(0);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setQuizStarted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
            <button onClick={restartQuiz} className="btn btn-primary mt-2">
              Try Again
            </button>
          </div>
        )}
        {!quizStarted && !quizEnded && !error && (
          <Welcome onStart={startQuiz} />
        )}
        {quizStarted && !quizEnded && (
          <>
            <ProgressBar score={score} totalQuestions={totalQuestions} />
            <Quiz userName={userName} onEnd={endQuiz} onError={handleError} />
          </>
        )}
        {quizEnded && (
          <Result
            userName={userName}
            score={score}
            totalQuestions={totalQuestions}
            onRestart={restartQuiz}
          />
        )}
      </div>
    </motion.div>
  );
};

export default App;