import React, { useState, useEffect } from 'react';
import List from './List';
import '../styles/Board.css';

const API_URL = 'http://localhost:5001';

const Board = () => {
  const [board, setBoard] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newListTitle, setNewListTitle] = useState('');

  // Fetch board data on mount
  useEffect(() => {
    fetchBoard();
  }, []);

  // Fetch board from backend
  const fetchBoard = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/board`);
      if (!response.ok) throw new Error('Failed to fetch board');
      const data = await response.json();
      setBoard(data);
      setError(null);
    } catch (err) {
      setError('Error loading board');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new list
  const handleCreateList = async () => {
    if (!newListTitle.trim()) {
      alert('Please enter a list title');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newListTitle })
      });

      if (!response.ok) throw new Error('Failed to create list');
      const newList = await response.json();

      // Add the new list to board
      setBoard(prev => ({
        ...prev,
        lists: [...prev.lists, newList]
      }));

      setNewListTitle('');
    } catch (err) {
      alert('Error creating list');
      console.error(err);
    }
  };

  // Delete a list
  const handleDeleteList = async (listId) => {
    if (!confirm('Are you sure you want to delete this list?')) return;

    try {
      const response = await fetch(`${API_URL}/list/${listId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete list');

      setBoard(prev => ({
        ...prev,
        lists: prev.lists.filter(list => list.id !== listId)
      }));
    } catch (err) {
      alert('Error deleting list');
      console.error(err);
    }
  };

  // Add card to a list
  const handleAddCard = async (listId, cardTitle) => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, title: cardTitle })
      });

      if (!response.ok) throw new Error('Failed to add card');
      const newCard = await response.json();

      // Update board state
      setBoard(prev => ({
        ...prev,
        lists: prev.lists.map(list =>
          list.id === listId
            ? { ...list, cards: [...list.cards, newCard] }
            : list
        )
      }));
    } catch (err) {
      alert('Error adding card');
      console.error(err);
    }
  };

  // Delete a card
  const handleDeleteCard = async (cardId) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      const response = await fetch(`${API_URL}/card/${cardId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete card');

      setBoard(prev => ({
        ...prev,
        lists: prev.lists.map(list => ({
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        }))
      }));
    } catch (err) {
      alert('Error deleting card');
      console.error(err);
    }
  };

  // Update card title
  const handleUpdateCard = async (cardId, newTitle) => {
    try {
      const response = await fetch(`${API_URL}/card/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });

      if (!response.ok) throw new Error('Failed to update card');

      setBoard(prev => ({
        ...prev,
        lists: prev.lists.map(list => ({
          ...list,
          cards: list.cards.map(card =>
            card.id === cardId ? { ...card, title: newTitle } : card
          )
        }))
      }));
    } catch (err) {
      alert('Error updating card');
      console.error(err);
    }
  };

  // Handle drag and drop removed - keeping basic version

  if (loading) return <div className="board-loading">Loading board...</div>;
  if (error) return <div className="board-error">{error}</div>;

  return (
    <div className="board">
      <div className="board-header">
        <h1>📋 Kanban Board</h1>
      </div>

      <div className="board-container">
        <div className="lists-container">
          {board.lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onDeleteList={handleDeleteList}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onUpdateCard={handleUpdateCard}
            />
          ))}
        </div>

        {/* Add New List Section */}
        <div className="add-list">
          <input
            type="text"
            placeholder="+ Add new list"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
          />
          <button onClick={handleCreateList}>Add List</button>
        </div>
      </div>
    </div>
  );
};

export default Board;
