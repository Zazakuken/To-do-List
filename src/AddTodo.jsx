import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium'); // Default to medium
  const [dueDate, setDueDate] = useState('');

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
  // A sample or example of a task
    const loadSampleData = () => {
  const sampleTasks = [
    { id: 1, text: "Try this app!", completed: false, priority: "high", dueDate: "2025-10-25" },
    { id: 2, text: "Add your own tasks", completed: false, priority: "medium", dueDate: null }
  ];
  setTodos(sampleTasks);
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
    </form>
  );
};

export default AddTodo;