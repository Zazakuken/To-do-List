import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Quotes from './Quotes';
import Wishlist from './Wishlist';
import './App.css';
import DateTime from './DateTime';
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
  const activeTasks = totalTasks - completedTasks;
  
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
      <div className="app-shell">
        <header className="app-hero">
          <div className="hero-copy">
            <p className="hero-kicker">Plan • Focus • Celebrate</p>
            <h1>My To-Do Command Center</h1>
            <p className="hero-subtitle">
              Stay on top of priorities and keep your momentum throughout the day.
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span>Total tasks</span>
              <strong>{totalTasks}</strong>
            </div>
            <div className="hero-stat">
              <span>Active</span>
              <strong>{activeTasks}</strong>
            </div>
            <div className="hero-stat">
              <span>Today's focus</span>
              <strong>{todayProgress}%</strong>
            </div>
          </div>
        </header>

        <main className="dashboard-grid">
          <section className="panel-card tasks-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Tasks</p>
                <h2>Today's Flow</h2>
              </div>
              <span className="task-chip">
                {totalTasks ? `${completedTasks}/${totalTasks} done` : 'Let’s get started'}
              </span>
            </div>

            <AddTodo onAdd={addTodo} />

            <div className="tasks-controls">
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

              <div className="task-stats">
                <div>
                  <p className="stat-label">Active</p>
                  <span className="stat-value">{activeTasks}</span>
                </div>
                <div>
                  <p className="stat-label">Completed</p>
                  <span className="stat-value">{completedTasks}</span>
                </div>
                <div>
                  <p className="stat-label">Due today</p>
                  <span className="stat-value">{todayTasks.length}</span>
                </div>
              </div>

              <div className="progress-container">
                <div className="progress-header">
                  <span>Overall progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="progress-subtext">
                  {todayCompleted}/{todayTasks.length || 0} tasks completed today
                </p>
              </div>
            </div>

            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </section>

          <aside className="side-panel">
            <Quotes />
            <Wishlist />
            <DateTime />
            <QuickNotes />
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;