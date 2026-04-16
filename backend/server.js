import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== IN-MEMORY DATABASE ====================
// Simple data structure to store board state
const board = {
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', title: 'Build Kanban board' },
        { id: 'card-2', title: 'Add drag and drop' }
      ]
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', title: 'Design UI' }
      ]
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [
        { id: 'card-4', title: 'Setup project structure' }
      ]
    }
  ]
};

// Helper to generate unique IDs
let cardIdCounter = 5;
let listIdCounter = 4;

const generateCardId = () => `card-${cardIdCounter++}`;
const generateListId = () => `list-${listIdCounter++}`;

// ==================== API ROUTES ====================

// GET /board - Get entire board with all lists and cards
app.get('/board', (req, res) => {
  res.json(board);
});

// POST /list - Create a new list
app.post('/list', (req, res) => {
  const { title } = req.body;

  // Validation
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }

  const newList = {
    id: generateListId(),
    title: title.trim(),
    cards: []
  };

  board.lists.push(newList);
  res.status(201).json(newList);
});

// DELETE /list/:id - Delete a list
app.delete('/list/:id', (req, res) => {
  const { id } = req.params;

  const listIndex = board.lists.findIndex(list => list.id === id);

  if (listIndex === -1) {
    return res.status(404).json({ error: 'List not found' });
  }

  const deletedList = board.lists.splice(listIndex, 1);
  res.json(deletedList[0]);
});

// POST /card - Add a card to a list
app.post('/card', (req, res) => {
  const { listId, title } = req.body;

  // Validation
  if (!listId || !title || typeof title !== 'string') {
    return res.status(400).json({ error: 'ListId and title are required' });
  }

  // Find the list
  const list = board.lists.find(l => l.id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  const newCard = {
    id: generateCardId(),
    title: title.trim()
  };

  list.cards.push(newCard);
  res.status(201).json(newCard);
});

// PUT /card/:id - Update a card title
app.put('/card/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // Validation
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }

  // Find and update the card
  for (const list of board.lists) {
    const card = list.cards.find(c => c.id === id);
    if (card) {
      card.title = title.trim();
      return res.json(card);
    }
  }

  res.status(404).json({ error: 'Card not found' });
});

// DELETE /card/:id - Delete a card
app.delete('/card/:id', (req, res) => {
  const { id } = req.params;

  // Find and delete the card
  for (const list of board.lists) {
    const cardIndex = list.cards.findIndex(c => c.id === id);
    if (cardIndex !== -1) {
      const deletedCard = list.cards.splice(cardIndex, 1);
      return res.json(deletedCard[0]);
    }
  }

  res.status(404).json({ error: 'Card not found' });
});

// POST /board/reorder - Reorder cards and lists (for drag and drop)
app.post('/board/reorder', (req, res) => {
  const { updatedBoard } = req.body;

  if (!updatedBoard || !updatedBoard.lists) {
    return res.status(400).json({ error: 'Invalid board structure' });
  }

  // Update the entire board with the new structure
  board.lists = updatedBoard.lists;
  res.json(board);
});

// ==================== SERVER STARTUP ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📋 Board API: http://localhost:${PORT}/board`);
});
