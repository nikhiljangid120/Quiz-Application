import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ score, totalQuestions }) => {
  const progress = (score / totalQuestions) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700">Progress</span>
        <span className="text-sm font-medium text-blue-700">{`${score}/${totalQuestions}`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;