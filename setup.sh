#!/bin/bash

# MovieBox - Quick Start Script
# This script automates the initial setup

echo "╔════════════════════════════════════════╗"
echo "║   🎬 MOVIEBOX QUICK START SETUP 🎬     ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js detected: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✓ npm detected: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created. Please edit it with your MongoDB URI."
else
    echo "✓ .env file already exists."
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║        ✅ SETUP COMPLETE! ✅           ║"
echo "╠════════════════════════════════════════╣"
echo "║  Next steps:                           ║"
echo "║  1. Edit .env with your MongoDB URI    ║"
echo "║  2. Run: npm start                     ║"
echo "║  3. Open: http://localhost:5000        ║"
echo "╚════════════════════════════════════════╝"
echo ""
