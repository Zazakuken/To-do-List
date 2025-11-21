// src/Quotes.jsx
import React, { useState, useEffect } from 'react';

const quotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "You don't have to be great to start, but you have to start to be great. — Zig Ziglar",
  "Success is no accident. It's hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do. — Pele",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "The harder you work for something, the greater you'll feel when you achieve it. — Unknown",
  "Dream big and dare to fail. — Norman Vaughan",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "The only man who never makes a mistake is the man who never does anything. — Theodore Roosevelt",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "If there is no struggle, there is no progress. — Frederick Douglass",
  "You don't have to see the whole staircase, just take the first step. — Martin Luther King, Jr",
  "Champions keep playing until they get it right. — Billie Jean King",
];

const Quotes = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Get today's date to ensure same quote each day
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('quoteDate');
    const storedQuote = localStorage.getItem('quote');

    if (storedDate === today && storedQuote) {
      setQuote(storedQuote);
    } else {
      // Pick random quote
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const newQuote = quotes[randomIndex];
      setQuote(newQuote);
      localStorage.setItem('quote', newQuote);
      localStorage.setItem('quoteDate', today);
    }
  }, []);

  return (
    <div className="quotes-panel">
      <h3>✨ Today's Motivation</h3>
      <p className="quote-text">"{quote}"</p>
    </div>
  );
};

export default Quotes;