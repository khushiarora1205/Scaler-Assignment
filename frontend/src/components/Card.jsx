import React, { useState } from 'react';
import '../styles/Card.css';

const Card = ({ card, onDeleteCard, onUpdateCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      alert('Card title cannot be empty');
      return;
    }

    if (editedTitle !== card.title) {
      onUpdateCard(card.id, editedTitle);
    }

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(card.title);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <div className="card-edit">
          <input
            type="text"
            className="card-edit-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
          />
          <div className="card-edit-actions">
            <button className="btn-save" onClick={handleSaveEdit}>
              ✓
            </button>
            <button className="btn-cancel-edit" onClick={handleCancelEdit}>
              ✕
            </button>
          </div>
        </div>
      ) : (
        <div className="card-content">
          <p
            className="card-title"
            onClick={() => setIsEditing(true)}
            title="Click to edit"
          >
            {card.title}
          </p>
          <button
            className="card-delete-btn"
            onClick={() => onDeleteCard(card.id)}
            title="Delete card"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
