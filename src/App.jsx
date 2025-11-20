import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Quotes from './Quotes'; // Add this import
import Wishlist from './Wishlist'; // Add this import
import './App.css';
import DateTime from   './DateTime';
import QuickNotes from './QuickNotes';

function App() {
  // Load todos from localStorage on component mount
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // all
  });

  // Calculate progress
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // after calculating overall progress
  const today = new Date().toDateString();
  const todayTasks = todos.filter(todo => {
    if (!todo.dueDate) return false;
    const dueDate = new Date(todo.dueDate).toDateString();
    return dueDate === today;
  });

  const todayCompleted = todayTasks.filter(todo => todo.completed).length;
  const todayProgress = todayTasks.length > 0 ? Math.round((todayCompleted / todayTasks.length) * 100) : 0;

  const addTodo = (taskData) => {
    const newTodo = {
      id: Date.now(),
      text: taskData.text,
      completed: false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
  <div className="App">
    <div className="app-container">
      {/* Left Side - To-Do List */}
      <div className="left-side">
        <h1>My To-Do List</h1>
        
        {/* Filter buttons */}
        <div className="filter-buttons">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active-filter' : ''}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')} 
            className={filter === 'active' ? 'active-filter' : ''}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={filter === 'completed' ? 'active-filter' : ''}
          >
            Completed
          </button>
        </div>

        {/* Task stats */}
        <div className="task-stats">
          <p>Active: {todos.filter(todo => !todo.completed).length}</p>
          <p>Completed: {completedTasks}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
      
      {/* Right Side Panels (Quotes + Goals) */}
      <div className="right-side-panels">
        <div className="right-side-panel">
          <Quotes />
          <Wishlist />
        </div>
      </div>
      
      {/* Plain Right Side (Time + Notes) */}
      <div className="plain-right-side">
        <DateTime />
        <QuickNotes />
      </div>
    </div>
  </div>
  );
}

export default App;