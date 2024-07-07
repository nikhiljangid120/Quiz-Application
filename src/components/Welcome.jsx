import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Quiz!</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="input w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Start Quiz
        </button>
      </form>
    </motion.div>
  );
};

export default Welcome;