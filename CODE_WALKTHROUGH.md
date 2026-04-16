# 🎯 Code Walkthrough - Understanding Each Part

This document walks you through the key code sections so you understand exactly how everything works.

---

## 🔧 Backend Walkthrough (`server.js`)

### 1. Server Setup
```javascript
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());           // Allow requests from frontend
app.use(express.json());   // Parse incoming JSON
```

**What's happening:**
- Import Express framework
- Import CORS middleware (allows cross-origin requests)
- Create Express app
- Enable CORS so frontend at localhost:3000 can talk to backend at localhost:5000
- Enable JSON body parser

### 2. In-Memory Database

```javascript
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
    // ... more lists
  ]
};
```

**What's happening:**
- JavaScript object holds all board data
- Lists array contains all lists
- Each list has cards array
- Data structure matches what frontend expects
- When server restarts, data resets to this initial state

### 3. ID Generation

```javascript
let cardIdCounter = 5;
let listIdCounter = 4;

const generateCardId = () => `card-${cardIdCounter++}`;
const generateListId = () => `list-${listIdCounter++}`;
```

**What's happening:**
- Counters keep track of next available ID
- Each new card gets unique ID like "card-5", "card-6"
- Each new list gets unique ID like "list-4", "list-5"
- Post-increment (++) increases counter after use

### 4. GET /board Endpoint

```javascript
app.get('/board', (req, res) => {
  res.json(board);
});
```

**What's happening:**
- When frontend requests GET /board
- Server responds with entire board object
- Frontend receives all lists and cards
- Frontend can display complete state

### 5. POST /list Endpoint (Create List)

```javascript
app.post('/list', (req, res) => {
  const { title } = req.body;  // Get title from request

  // Validation
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newList = {
    id: generateListId(),
    title: title.trim(),
    cards: []
  };

  board.lists.push(newList);      // Add to board
  res.status(201).json(newList);  // Return new list
});
```

**What's happening:**
1. Frontend sends `{ title: "My List" }`
2. Extract title from request body
3. Validate that title exists and is string
4. If invalid, return 400 error
5. Create new list object with unique ID
6. Add list to board.lists
7. Return new list with 201 (Created) status

### 6. DELETE /list/:id Endpoint

```javascript
app.delete('/list/:id', (req, res) => {
  const { id } = req.params;  // Get ID from URL

  const listIndex = board.lists.findIndex(list => list.id === id);

  if (listIndex === -1) {
    return res.status(404).json({ error: 'List not found' });
  }

  const deletedList = board.lists.splice(listIndex, 1);
  res.json(deletedList[0]);
});
```

**What's happening:**
1. Frontend sends DELETE to `/list/list-1`
2. Extract ID from URL parameter
3. Find index of list with that ID
4. If not found, return 404 error
5. Use splice() to remove list at that index
6. Return deleted list (for confirmation)

### 7. POST /card Endpoint (Add Card)

```javascript
app.post('/card', (req, res) => {
  const { listId, title } = req.body;

  if (!listId || !title || typeof title !== 'string') {
    return res.status(400).json({ error: 'ListId and title required' });
  }

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
```

**What's happening:**
1. Frontend sends `{ listId: "list-1", title: "My Task" }`
2. Validate both listId and title are provided
3. Find the list with matching ID
4. If list doesn't exist, return 404
5. Create new card with unique ID
6. Add card to list's cards array
7. Return new card

### 8. PUT /card/:id Endpoint (Update Card)

```javascript
app.put('/card/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title required' });
  }

  // Search through all lists to find the card
  for (const list of board.lists) {
    const card = list.cards.find(c => c.id === id);
    if (card) {
      card.title = title.trim();
      return res.json(card);
    }
  }

  res.status(404).json({ error: 'Card not found' });
});
```

**What's happening:**
1. Frontend sends PUT to `/card/card-1` with `{ title: "Updated Title" }`
2. Loop through all lists
3. Find card with matching ID
4. Update its title
5. Return updated card
6. If not found, return 404

### 9. DELETE /card/:id Endpoint

```javascript
app.delete('/card/:id', (req, res) => {
  const { id } = req.params;

  for (const list of board.lists) {
    const cardIndex = list.cards.findIndex(c => c.id === id);
    if (cardIndex !== -1) {
      const deletedCard = list.cards.splice(cardIndex, 1);
      return res.json(deletedCard[0]);
    }
  }

  res.status(404).json({ error: 'Card not found' });
});
```

**What's happening:**
1. Frontend sends DELETE to `/card/card-1`
2. Loop through all lists
3. Find index of card in that list
4. If found (index !== -1), remove it
5. Return deleted card
6. If not found anywhere, return 404

### 10. POST /board/reorder Endpoint

```javascript
app.post('/board/reorder', (req, res) => {
  const { updatedBoard } = req.body;

  if (!updatedBoard || !updatedBoard.lists) {
    return res.status(400).json({ error: 'Invalid board structure' });
  }

  // Replace entire board with new structure
  board.lists = updatedBoard.lists;
  res.json(board);
});
```

**What's happening:**
1. Frontend sends drag-dropped board structure
2. Validate it has correct structure
3. Replace board.lists with new order
4. Return updated board
5. Keeps card order after drag & drop

---

## ⚛️ Frontend Walkthrough

### Board Component (`Board.jsx`)

#### Import & Setup
```javascript
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_URL = 'http://localhost:5000';

const Board = () => {
  const [board, setBoard] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
  const [newListTitle, setNewListTitle] = useState('');
```

**What's happening:**
- Import React hooks (useState, useEffect)
- Import drag-drop components from react-beautiful-dnd
- Set API_URL constant for backend communication
- Initialize three pieces of state:
  - `board`: Holds all lists and cards
  - `loading`: Track if data is being fetched
  - `newListTitle`: Track input for new list form

#### Fetch Board on Mount
```javascript
useEffect(() => {
  fetchBoard();
}, []);

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
  } finally {
    setLoading(false);
  }
};
```

**What's happening:**
- `useEffect` with empty dependency array runs once on mount
- Calls `fetchBoard()` function
- `fetchBoard()` makes GET request to `/board`
- Sets loading state while fetching
- Parses JSON response
- Updates board state with received data
- Try-catch handles any errors
- Finally always sets loading to false

#### Create List Function
```javascript
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

    setBoard(prev => ({
      ...prev,
      lists: [...prev.lists, newList]
    }));

    setNewListTitle('');
  } catch (err) {
    alert('Error creating list');
  }
};
```

**What's happening:**
1. Validate input isn't empty
2. Make POST request to `/list` with title
3. Check response is OK (200-299)
4. Parse returned new list
5. Update board state by adding new list
6. Clear input field
7. Catch and display errors

**State update pattern:**
```javascript
setBoard(prev => ({
  ...prev,           // Keep existing board properties
  lists: [...prev.lists, newList]  // Add new list
}))
```

This uses spread operator to create new object (not mutate original).

#### Delete List Function
```javascript
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
  }
};
```

**What's happening:**
1. Show confirmation dialog
2. If user cancels, return early
3. Send DELETE request
4. Update state by filtering out deleted list
5. `filter()` keeps lists with different IDs

#### Add Card Function
```javascript
const handleAddCard = async (listId, cardTitle) => {
  try {
    const response = await fetch(`${API_URL}/card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listId, title: cardTitle })
    });

    if (!response.ok) throw new Error('Failed to add card');
    const newCard = await response.json();

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
  }
};
```

**What's happening:**
1. POST new card to backend
2. Map through all lists
3. For matching list, add new card
4. For other lists, keep unchanged
5. Creates new state object (immutable)

#### Drag & Drop Handler
```javascript
const handleDragEnd = async (result) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;  // Dropped outside

  if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
    return;  // Dropped in same spot
  }

  // Move card in state
  const sourceList = newLists.find(l => l.id === source.droppableId);
  const destList = newLists.find(l => l.id === destination.droppableId);

  const [movedCard] = sourceList.cards.splice(source.index, 1);
  destList.cards.splice(destination.index, 0, movedCard);

  setBoard({ lists: newLists });

  // Sync with backend
  try {
    await fetch(`${API_URL}/board/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedBoard: { lists: newLists } })
    });
  } catch (err) {
    fetchBoard();  // Revert on error
  }
};
```

**What's happening:**
1. Get drag result info (source, destination, dragged item)
2. If no destination, user cancelled drag
3. If dropped in same spot, no change needed
4. Find source and destination lists
5. Remove card from source using splice()
6. Add card to destination at new position
7. Update local state immediately (optimistic update)
8. Send new board to backend to persist
9. If error, fetch board again to revert

### List Component (`List.jsx`)

```javascript
const List = ({ list, onDeleteList, onAddCard, onDeleteCard, onUpdateCard }) => {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = () => {
    if (!newCardTitle.trim()) {
      alert('Please enter a card title');
      return;
    }

    onAddCard(list.id, newCardTitle);  // Call parent function
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div className="list">
      {/* List header with title and delete button */}
      <div className="list-header">
        <h2 className="list-title">{list.title}</h2>
        <button onClick={() => onDeleteList(list.id)}>✕</button>
      </div>

      {/* Droppable area for cards */}
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {list.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                  <Card
                    card={card}
                    onDeleteCard={onDeleteCard}
                    onUpdateCard={onUpdateCard}
                  />
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>

      {/* Add card section */}
      {isAddingCard ? (
        <form onSubmit={handleAddCard}>
          <input value={newCardTitle} onChange={...} />
          <button type="submit">Add</button>
        </form>
      ) : (
        <button onClick={() => setIsAddingCard(true)}>+ Add Card</button>
      )}
    </div>
  );
};
```

**What's happening:**
1. Receives list and callback functions as props
2. Manages local state for add-card form
3. Renders list header with delete button
4. Droppable marks this as drop zone
5. Maps cards to Card components inside Draggable
6. Shows form or button based on isAddingCard state
7. Calls parent function when card added

### Card Component (`Card.jsx`)

```javascript
const Card = ({ card, onDeleteCard, onUpdateCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      alert('Card title cannot be empty');
      return;
    }

    if (editedTitle !== card.title) {
      onUpdateCard(card.id, editedTitle);  // Call parent
    }

    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        // Edit mode
        <div className="card-edit">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleSaveEdit}>✓</button>
          <button onClick={() => setIsEditing(false)}>✕</button>
        </div>
      ) : (
        // Display mode
        <div className="card-content">
          <p onClick={() => setIsEditing(true)}>{card.title}</p>
          <button onClick={() => onDeleteCard(card.id)}>✕</button>
        </div>
      )}
    </div>
  );
};
```

**What's happening:**
1. Receives card and callback functions
2. Manages edit state and edited title locally
3. Renders differently based on isEditing
4. Click title to enter edit mode
5. Validate before saving
6. Call parent function to update in backend
7. Exit edit mode after save

---

## 🎨 CSS Organization

### CSS Variables (index.css)
```css
:root {
  --primary-color: #0079bf;
  --primary-dark: #026aa7;
  --text-color: #172b4d;
  --bg-white: #ffffff;
  /* ... more variables */
}
```

**Benefits:**
- Consistent colors throughout app
- Easy to implement themes
- Central place to change colors

### BEM Naming Convention
```css
.card { }                   /* Block */
.card-content { }           /* Element */
.card.dragging { }         /* Modifier */
.card-delete-btn { }       /* Element */
```

**Benefits:**
- Clear relationship between classes
- Avoid naming conflicts
- Easy to find related styles

### Flexbox Layouts
```css
.board-container {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}
```

**Benefits:**
- Responsive without media queries
- Easy alignment
- Gap spacing between items

---

## 🔄 Common Patterns Used

### 1. Async/Await Pattern
```javascript
const result = await fetch(url);
const data = await result.json();
```

### 2. Immutable State Updates
```javascript
setBoard(prev => ({
  ...prev,
  lists: [...prev.lists, newItem]
}))
```

### 3. Conditional Rendering
```javascript
{condition ? <ComponentA /> : <ComponentB />}
```

### 4. Map & Filter
```javascript
lists.map((list, idx) => <List key={list.id} ... />)
lists.filter(list => list.id !== deleteId)
```

### 5. Find & FindIndex
```javascript
const list = lists.find(l => l.id === id)
const idx = cards.findIndex(c => c.id === id)
```

---

This walkthrough should help you understand exactly how every piece works! 🎯
