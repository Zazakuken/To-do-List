// src/QuickNotes.jsx
import React, { useState, useEffect } from 'react';

const QuickNotes = () => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('quickNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleNoteChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem('quickNotes', newNotes);
  };

  return (
    <div className="quick-notes-panel">
      <h3>📝 Quick Notes</h3>
      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Write down your thoughts, ideas, or reminders..."
        className="notes-textarea"
      />
    </div>
  );
};

export default QuickNotes;