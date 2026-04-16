# 📋 Kanban Board Application

A simple, beginner-friendly full-stack Kanban board application built with React, Express, and in-memory storage.

## 🎯 Features

### Core Features
- ✅ **Single Default Board** - Pre-loaded with sample lists
- ✅ **Create Lists** - Add new lists to organize your tasks
- ✅ **Delete Lists** - Remove lists you no longer need
- ✅ **Add Cards** - Create cards within lists
- ✅ **Edit Cards** - Click on a card to update its title
- ✅ **Delete Cards** - Remove cards from lists
- ✅ **Drag & Drop** - Move cards within or between lists using react-beautiful-dnd
- ✅ **Beautiful UI** - Clean, modern design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **Vite** - Fast build tool and dev server
- **react-beautiful-dnd** - Drag and drop library
- **Plain CSS** - Styling with CSS variables for theming

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **In-Memory Storage** - Simple array-based database

## 📁 Project Structure

```
Scaler-Assignment/
├── backend/
│   ├── package.json
│   └── server.js          # Express server with REST APIs
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── components/
        │   ├── Board.jsx   # Main board component
        │   ├── List.jsx    # List component
        │   └── Card.jsx    # Card component
        └── styles/
            ├── index.css
            ├── Board.css
            ├── List.css
            └── Card.css
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js v16+ and npm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   - The server runs on `http://localhost:5000`
   - Default board loads with sample data

   **For development with auto-reload:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   - The app opens automatically at `http://localhost:3000`
   - Hot reload is enabled for development

## 🎮 How to Use

### Creating a List
1. Click the "Add new list" input field at the bottom right
2. Enter a list title
3. Press Enter or click "Add List"

### Deleting a List
1. Hover over a list header
2. Click the "✕" button to delete the list and all its cards

### Adding a Card
1. Click "+ Add Card" button in any list
2. Enter the card title
3. Click "Add" or press Enter

### Editing a Card
1. Click on the card title to enter edit mode
2. Modify the title
3. Click "✓" to save or "✕" to cancel

### Deleting a Card
1. Hover over a card to reveal the delete button
2. Click "✕" to delete the card

### Drag & Drop
1. **Within a List** - Drag cards up/down to reorder them
2. **Between Lists** - Drag cards to different lists
3. Smooth animations and visual feedback during dragging

## 📡 Backend API Endpoints

### GET /board
Returns the entire board with all lists and cards.
```bash
curl http://localhost:5000/board
```
**Response:**
```json
{
  "lists": [
    {
      "id": "list-1",
      "title": "To Do",
      "cards": [
        { "id": "card-1", "title": "Task 1" }
      ]
    }
  ]
}
```

### POST /list
Create a new list.
```bash
curl -X POST http://localhost:5000/list \
  -H "Content-Type: application/json" \
  -d '{"title": "My List"}'
```

### DELETE /list/:id
Delete a list and all its cards.
```bash
curl -X DELETE http://localhost:5000/list/list-1
```

### POST /card
Add a card to a list.
```bash
curl -X POST http://localhost:5000/card \
  -H "Content-Type: application/json" \
  -d '{"listId": "list-1", "title": "My Card"}'
```

### PUT /card/:id
Update a card title.
```bash
curl -X PUT http://localhost:5000/card/card-1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### DELETE /card/:id
Delete a card.
```bash
curl -X DELETE http://localhost:5000/card/card-1
```

### POST /board/reorder
Sync board state after drag and drop operations.
```bash
curl -X POST http://localhost:5000/board/reorder \
  -H "Content-Type: application/json" \
  -d '{"updatedBoard": {"lists": [...]}}'
```

## 💾 Data Storage

- **In-Memory Storage**: All data is stored in a JavaScript array
- **No Persistence**: Data resets when the server restarts
- **Perfect for**: Learning, prototyping, and local development

## 🎨 UI Components

### Board Component
- Main component managing the entire board state
- Handles API communication
- Manages drag and drop context

### List Component
- Displays individual list with cards
- "Add Card" form with validation
- Delete button for list removal

### Card Component
- Individual card display
- Edit mode with inline editing
- Delete button with confirmation

## 🎯 Code Quality

- **Clean Code**: Well-organized, readable files
- **Comments**: Clear comments explaining logic
- **Error Handling**: Try-catch blocks with user-friendly alerts
- **Validation**: Input validation on all forms
- **Responsive**: Works on different screen sizes

## 🔧 Troubleshooting

### Backend won't start
- Ensure port 5000 is not in use
- Check Node.js is installed: `node --version`

### Frontend can't connect to backend
- Make sure backend is running on `http://localhost:5000`
- Check CORS is enabled in server.js

### Drag and drop not working
- Ensure react-beautiful-dnd is installed: `npm install`
- Browser might need refresh if installation just completed

### Port conflicts
- **Change backend port**: Edit `PORT` in `server.js`
- **Change frontend port**: Edit `server.port` in `vite.config.js`

## 📝 Example Usage Flow

1. Start backend server
2. Start frontend dev server
3. See pre-loaded "To Do", "In Progress", "Done" lists
4. Create a new list: "Backlog"
5. Add cards to lists
6. Drag cards between lists
7. Edit card titles by clicking them
8. Delete cards or lists as needed

## 🚀 Production Build

### Frontend Build
```bash
cd frontend
npm run build
```
Creates optimized build in `frontend/dist/`

### Running Backend in Production
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

## 🎓 Learning Points

This project teaches:
- React hooks (useState, useEffect)
- REST API design
- Drag and drop implementation
- Component composition
- CSS styling with variables
- Error handling
- Async/await with fetch API

## 📦 Dependencies

### Backend
- `express` - Web framework
- `cors` - Enable CORS

### Frontend
- `react` - UI library
- `react-dom` - React DOM utilities
- `react-beautiful-dnd` - Drag and drop
- `vite` - Build tool
- `@vitejs/plugin-react` - React support for Vite

## 🎉 Features Implemented

✅ Single board display
✅ Multiple lists support
✅ Card management (create, read, update, delete)
✅ Drag and drop within and between lists
✅ Beautiful responsive UI
✅ In-memory data storage
✅ REST API backend
✅ Error handling and validation
✅ Clean, beginner-friendly code

## 🚫 Intentionally Not Included

- Authentication/Login
- Labels and due dates
- Checklists
- Members/Comments
- Database (using in-memory storage)
- Complex drag and drop features
- Multiple boards
- Advanced styling

## 📄 License

Free to use and modify for learning purposes.

## 🤝 Contributing

This is a learning project. Feel free to fork and extend!

---

**Happy Kanban-ing! 🎯**
