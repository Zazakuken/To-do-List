import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  // Function to format due date
  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    if (isToday) return 'Due: Today';
    if (isTomorrow) return 'Due: Tomorrow';
    return `Due: ${date.toLocaleDateString()}`;
  };

  // Check if task is overdue
  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        {isEditing ? (
          <div className="edit-input">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              autoFocus
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className="todo-text-container">
            <span
              onDoubleClick={() => setIsEditing(true)}
              className="todo-text"
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            
            {/* Priority and Due Date Info */}
            <div className="todo-meta">
              {todo.dueDate && (
                <span className={`due-date ${isOverdue ? 'overdue-date' : ''}`}>
                  {formatDueDate(todo.dueDate)}
                </span>
              )}
              <span className={`priority-badge priority-${todo.priority}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;