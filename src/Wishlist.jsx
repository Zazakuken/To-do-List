// src/Wishlist.jsx
import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const addItem = () => {
    if (newItem.trim()) {
      const newItemObj = {
        id: Date.now(),
        text: newItem,
        completed: false
      };
      const updatedList = [...wishlistItems, newItemObj];
      setWishlistItems(updatedList);
      localStorage.setItem('wishlist', JSON.stringify(updatedList));
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    const updatedList = wishlistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setWishlistItems(updatedList);
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
  };

  const deleteItem = (id) => {
    const updatedList = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedList);
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
  };

  return (
    <div className="wishlist-panel">
      <h3>🎯 My Goals for This Year</h3>
      
      {/* Add new goal */}
      <div className="wishlist-add">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new goal..."
          className="wishlist-input"
        />
        <button onClick={addItem} className="add-goal-btn">Add</button>
      </div>

      {/* Goal list */}
      <ul className="wishlist-list">
        {wishlistItems.length === 0 ? (
          <li className="empty-wishlist">No goals yet! Add your dreams here 💭</li>
        ) : (
          wishlistItems.map(item => (
            <li key={item.id} className={`wishlist-item ${item.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="wishlist-checkbox"
              />
              <span
                onClick={() => toggleItem(item.id)}
                className="wishlist-text"
                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
              >
                {item.text}
              </span>
              <button
                onClick={() => deleteItem(item.id)}
                className="delete-goal-btn"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Wishlist;