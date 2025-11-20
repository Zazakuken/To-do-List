import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium'); // Default to medium
  const [dueDate, setDueDate] = useState('');

  const sampleTasks = [
    {
      id: 'sample-1',
      text: 'Plan weekly sprint',
      completed: false,
      priority: 'high',
      dueDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 'sample-2',
      text: 'Review pull requests',
      completed: false,
      priority: 'medium',
      dueDate: null,
    },
    {
      id: 'sample-3',
      text: 'Read 10 pages of a book',
      completed: false,
      priority: 'low',
      dueDate: null,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd({
        text: input,
        priority: priority,
        dueDate: dueDate || null, // Store null if no date provided
      });
      setInput('');
      setPriority('medium'); // Reset to default
      setDueDate(''); // Reset date
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
        required
      />
      
      {/* Priority Selector */}
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      
      {/* Due Date Picker */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="due-date-input"
      />
      
      <button type="submit" className="add-btn">Add</button>
      <button
        type="button"
        className="ghost-btn"
        onClick={() => sampleTasks.forEach(onAdd)}
      >
        Quick sample
      </button>
    </form>
  );
};

export default AddTodo;