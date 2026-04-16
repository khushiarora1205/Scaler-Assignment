#!/bin/bash

echo "🚀 Setting up Kanban Board Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo -e "${BLUE}✓ Node.js is installed${NC}"
echo ""

# Setup Backend
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo ""

# Setup Frontend
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo ""

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "🎉 To start the application:"
echo ""
echo "1️⃣  Terminal 1 (Backend):"
echo -e "   ${BLUE}cd backend${NC}"
echo -e "   ${BLUE}npm start${NC}"
echo ""
echo "2️⃣  Terminal 2 (Frontend):"
echo -e "   ${BLUE}cd frontend${NC}"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo "📖 For more details, see README.md"
