#!/bin/bash

# KeyCircle Development Startup Script

echo "🚀 KeyCircle Development Server"
echo "================================"
echo ""

# Check if frontend node_modules exists
if [ ! -d "frontend/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd frontend
  npm install
  cd ..
  echo ""
fi

# Show available commands
echo "📝 Available commands:"
echo ""
echo "  Frontend Development:"
echo "    cd frontend && npm run dev       # Start dev server (http://localhost:8080)"
echo "    cd frontend && npm run build     # Build for production"
echo "    cd frontend && npm run preview   # Preview production build"
echo ""
echo "  Backend Development:"
echo "    cd backend && npm install        # Setup backend (when implemented)"
echo "    cd backend && npm run dev        # Start backend server"
echo ""
echo "  General:"
echo "    npm run lint                     # Lint frontend code"
echo ""

# Ask if user wants to start dev server
read -p "Start frontend dev server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  cd frontend
  npm run dev
fi
