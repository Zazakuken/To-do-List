// src/DateTime.jsx
import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="datetime-panel">
      <h3>📅 Today</h3>
      <p className="date">{formattedDate}</p>
      <p className="time">{formattedTime}</p>
    </div>
  );
};

export default DateTime;