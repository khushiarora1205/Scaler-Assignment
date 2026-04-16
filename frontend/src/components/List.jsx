import React, { useState } from 'react';
import Card from './Card';
import '../styles/List.css';

const List = ({ list, onDeleteList, onAddCard, onDeleteCard, onUpdateCard }) => {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = () => {
    if (!newCardTitle.trim()) {
      alert('Please enter a card title');
      return;
    }

    onAddCard(list.id, newCardTitle);
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div className="list">
      {/* List Header */}
      <div className="list-header">
        <h2 className="list-title">{list.title}</h2>
        <button
          className="list-delete-btn"
          onClick={() => onDeleteList(list.id)}
          title="Delete list"
        >
          ✕
        </button>
      </div>

      {/* Cards Container */}
      <div className="cards-container">
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDeleteCard={onDeleteCard}
            onUpdateCard={onUpdateCard}
          />
        ))}
      </div>

      {/* Add Card Section */}
      <div className="add-card">
        {isAddingCard ? (
          <div className="add-card-form">
            <input
              type="text"
              placeholder="Enter card title..."
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleAddCard()}
            />
            <div className="add-card-actions">
              <button className="btn-confirm" onClick={handleAddCard}>
                Add
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setIsAddingCard(false);
                  setNewCardTitle('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn-add-card"
            onClick={() => setIsAddingCard(true)}
          >
            + Add Card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
