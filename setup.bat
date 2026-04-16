@echo off
echo Setting up Kanban Board Application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js v16 or higher.
    exit /b 1
)

echo Node.js is installed
echo.

REM Setup Backend
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error: Failed to install backend dependencies
    exit /b 1
)
echo Backend dependencies installed
cd ..
echo.

REM Setup Frontend
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Error: Failed to install frontend dependencies
    exit /b 1
)
echo Frontend dependencies installed
cd ..
echo.

echo Setup complete!
echo.
echo To start the application:
echo.
echo 1. Terminal 1 (Backend):
echo    cd backend
echo    npm start
echo.
echo 2. Terminal 2 (Frontend):
echo    cd frontend
echo    npm run dev
echo.
echo For more details, see README.md
