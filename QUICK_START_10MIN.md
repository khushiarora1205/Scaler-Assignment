# ⚡ 10-Minute Quick Start Guide

**Goal**: Get the Kanban board running in 10 minutes!

---

## ⏱️ Timeline

```
Minutes 1-2:  Check prerequisites
Minutes 3-5:  Install dependencies
Minutes 6-7:  Start backend
Minutes 8-10: Start frontend & enjoy!
```

---

## ✅ Prerequisites (1 minute)

Do you have these installed?

```bash
# Check Node.js
node --version
# Should show v16 or higher

# Check npm
npm --version
# Should show 8 or higher
```

**Issue?** Install Node.js from https://nodejs.org

---

## 🔧 Install Dependencies (2-3 minutes)

### Option A: Automatic (Best!)

```bash
# Navigate to project
cd /Users/apple/Desktop/Scaler-Assignment

# Make script executable (macOS/Linux only)
chmod +x setup.sh

# Run setup
./setup.sh
# OR on Windows: setup.bat

# Wait for completion...
```

### Option B: Manual

**Terminal 1 - Backend:**
```bash
cd /Users/apple/Desktop/Scaler-Assignment/backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd /Users/apple/Desktop/Scaler-Assignment/frontend
npm install
```

---

## 🚀 Start Backend (1 minute)

```bash
cd /Users/apple/Desktop/Scaler-Assignment/backend
npm start
```

**You should see:**
```
🚀 Server running at http://localhost:5000
📋 Board API: http://localhost:5000/board
```

✅ Leave this running!

---

## 🎨 Start Frontend (2 minutes)

**Open a NEW terminal** and run:

```bash
cd /Users/apple/Desktop/Scaler-Assignment/frontend
npm run dev
```

**You should see:**
```
➜  Local:   http://localhost:3000/
➜  press h to show help
```

✅ Browser should automatically open!

---

## 🎉 You're Done! (0 minutes)

If you see a Kanban board with:
- 3 lists: "To Do", "In Progress", "Done"
- Sample cards in each list
- Drag & drop working

**Congratulations!** 🎊

---

## 🎮 Try These (2-3 minutes)

### Try Dragging
1. Click and drag any card
2. Move it to another list
3. Notice the smooth animation

### Add a Card
1. Click **"+ Add Card"** in any list
2. Type a task name
3. Press Enter
4. New card appears!

### Edit a Card
1. Click on any card title
2. Edit the text
3. Click ✓ to save
4. Title updates!

### Delete a Card
1. Hover over a card
2. Click the **✕** button
3. Confirm deletion
4. Card disappears!

### Add a List
1. Click **"+ Add new list"** (bottom right)
2. Enter list name
3. Press Enter
4. New list appears!

---

## ✨ Congratulations!

You now have:
✅ A running Kanban board
✅ Fully functional drag & drop
✅ Complete CRUD operations
✅ Beautiful UI
✅ Understanding of full-stack apps

---

## 📚 What's Next?

### Option 1: Learn the Code
Read [CODE_WALKTHROUGH.md](CODE_WALKTHROUGH.md) to understand how everything works.

### Option 2: Extend It
Add new features:
- Card descriptions
- Due dates
- Labels
- Local storage persistence

### Option 3: Troubleshoot
If something's wrong, see [QUICKSTART.md](QUICKSTART.md) troubleshooting.

---

## 🔗 Important Links

- **Backend API**: http://localhost:5000/board
- **Frontend App**: http://localhost:3000
- **Full Docs**: [README.md](README.md)
- **Code Guide**: [CODE_WALKTHROUGH.md](CODE_WALKTHROUGH.md)

---

## 🆘 Common Issues

**Backend won't start?**
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

**Frontend can't connect?**
- Make sure backend is running first
- Check it's on http://localhost:5000
- Refresh frontend page

**Drag & drop broken?**
```bash
cd frontend
npm install react-beautiful-dnd
npm run dev
```

---

## ⏰ Time Check

- ✅ Setup: ~5 minutes
- ✅ Running: ~2 minutes
- ✅ Testing features: ~3 minutes
- **Total: ~10 minutes!**

---

## 🎯 Next Steps

1. **Explore the UI** - Click everything, try all features
2. **Check the code** - Open components and see how they work
3. **Read docs** - Understand the architecture
4. **Modify** - Change colors, add features, experiment
5. **Learn** - Study the patterns and concepts

---

## 🎉 Have Fun!

You've built a full-stack application! 🚀

**Questions?** See [INDEX.md](INDEX.md) for links to full documentation.

Happy coding! 💻✨
