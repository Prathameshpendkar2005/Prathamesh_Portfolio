#!/bin/bash
set -e  # exit on first error

ZIP_FILE="prathamesh_portfolio.zip"
PROJECT_DIR="Prathamesh_portfolio"

echo "[*] Starting automated deployment..."

# Step 1: Unzip project if not already
if [ ! -d "$PROJECT_DIR" ]; then
    echo "[*] Extracting $ZIP_FILE..."
    unzip -q "$ZIP_FILE" -d "$PROJECT_DIR"
else
    echo "[*] Project already extracted. Skipping unzip."
fi

# Step 2: Auto-detect the actual project root (where client/ or server/ exist)
PROJECT_ROOT=$(find "$PROJECT_DIR" -type d \( -name "client" -o -name "server" \) | head -n 1 | xargs dirname)

if [ -z "$PROJECT_ROOT" ]; then
    echo "[-] Could not find client/ or server/ directory inside $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_ROOT"
echo "[*] Project root detected at: $(pwd)"
echo "[*] Contents:"
ls -1

# Step 3: Verify Node.js
if ! command -v node &> /dev/null; then
    echo "[-] Node.js is not installed. Please install Node.js >=18"
    exit 1
else
    echo "[*] Node.js found: $(node -v)"
fi

# Step 4: Install dependencies (root + client + server)
if [ -f "package.json" ]; then
    echo "[*] Installing root dependencies..."
    npm install --legacy-peer-deps
fi

if [ -d "client" ]; then
    echo "[*] Installing client dependencies..."
    cd client
    npm install --legacy-peer-deps
    cd ..
fi

if [ -d "server" ]; then
    echo "[*] Installing server dependencies..."
    cd server
    npm install --legacy-peer-deps
    cd ..
fi

# Step 5: Build frontend
if [ -d "client" ]; then
    echo "[*] Building client..."
    cd client
    npm run build
    cd ..
fi

# Step 6: Ensure concurrently is available
if ! command -v concurrently &> /dev/null; then
    echo "[*] Installing concurrently globally..."
    npm install -g concurrently
fi

# Step 7: Start project
echo "[*] Starting project..."
if [ -d "client" ] && [ -d "server" ]; then
    concurrently "cd server && npm run dev" "cd client && npm run dev"
elif [ -d "client" ]; then
    cd client && npm run dev
elif [ -d "server" ]; then
    cd server && npm run dev
else
    echo "[-] No client or server found in detected root: $(pwd)"
    exit 1
fi
