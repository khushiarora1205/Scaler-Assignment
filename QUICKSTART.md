# 🚀 Quick Start Guide

## 1. Install Dependencies

### Option A: Automatic (Recommended for macOS/Linux)
```bash
chmod +x setup.sh
./setup.sh
```

### Option B: Automatic (Windows)
```bash
setup.bat
```

### Option C: Manual Installation
```bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
```

## 2. Start Backend Server

```bash
cd backend
npm start
```

Output should show:
```
🚀 Server running at http://localhost:5000
📋 Board API: http://localhost:5000/board
```

## 3. Start Frontend Development Server

Open a new terminal and run:
```bash
cd frontend
npm run dev
```

Your browser should automatically open at `http://localhost:3000`

## 4. You're Done! 🎉

You should see a Kanban board with three default lists:
- To Do
- In Progress
- Done

### Try These Actions:
1. ✏️ Edit a card title by clicking on it
2. ➕ Add a new card to a list
3. 🗑️ Delete a card (hover and click ✕)
4. ➕ Create a new list using "+ Add new list"
5. 🗑️ Delete a list (click ✕ in list header)
6. 🎯 **Drag & Drop**: Grab a card and move it to another list

## ❓ Troubleshooting

### Backend fails to start
```bash
# Check if port 5000 is in use
# On macOS/Linux:
lsof -i :5000

# Kill the process if needed:
kill -9 <PID>
```

### Frontend can't find backend
- Make sure backend is running before starting frontend
- Check backend is at http://localhost:5000

### Dependencies won't install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules
npm install
```

## 📚 Project Structure

```
.
├── backend/           # Express server
│   ├── server.js
│   └── package.json
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/  # Board, List, Card
│   │   └── styles/      # CSS files
│   └── package.json
├── README.md          # Full documentation
├── QUICKSTART.md      # This file
├── setup.sh           # Auto setup (macOS/Linux)
└── setup.bat          # Auto setup (Windows)
```

## 🎨 Key Features Included

| Feature | Status |
|---------|--------|
| View board | ✅ |
| Create list | ✅ |
| Delete list | ✅ |
| Add card | ✅ |
| Edit card | ✅ |
| Delete card | ✅ |
| Drag cards within list | ✅ |
| Drag cards between lists | ✅ |
| Beautiful UI | ✅ |
| Responsive design | ✅ |

## 🔧 Development Mode

### Backend with auto-reload
```bash
cd backend
npm run dev
```

### Frontend with hot reload
```bash
cd frontend
npm run dev
```

## 📦 Production Build

### Build frontend
```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`

## 🎓 What You'll Learn

- React hooks and state management
- REST API design
- Drag and drop implementation
- Component composition
- CSS styling
- Async operations with fetch

---

**Happy coding! If you have questions, check README.md for detailed documentation.** 📖
