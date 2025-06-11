#!/bin/bash

# ========= USER CONFIG =========
WALLET="YOUR_DOGE_WALLET_ADDRESS"
ALGO="yescrypt"
POOL="yescrypt.mine.zergpool.com"
PORT="6233"
COIN="DOGE"
WORKER_NAME="xpworker"
THREADS=2
MINER_DIR="$HOME/miner"
WEB_PORT=8080
# ===============================

echo "💬 Initialising..."

# Check tce-load exists
if ! command -v tce-load &>/dev/null; then
  echo "❌ This script requires Tiny Core Linux with tce-load."
  exit 1
fi

# Install needed extensions
load_if_missing() {
  for ext in "$@"; do
    if ! which "$ext" &>/dev/null; then
      echo "📦 Installing $ext..."
      tce-load -wi "$ext"
    else
      echo "✅ $ext already installed."
    fi
  done
}

load_if_missing git make g++ curl autoconf automake python3

# Create miner directory
mkdir -p "$MINER_DIR"
cd "$MINER_DIR" || exit 1

# Clone cpuminer-multi
if [ ! -d cpuminer-multi ]; then
  echo "🔽 Cloning cpuminer-multi..."
  git clone https://github.com/tpruvot/cpuminer-multi.git
fi

cd cpuminer-multi || exit 1

# Build cpuminer
if [ ! -f ./cpuminer ]; then
  echo "🔧 Building cpuminer..."
  ./autogen.sh
  ./configure CFLAGS="-O2"
  make -j"$THREADS"
else
  echo "✅ cpuminer already built."
fi

# Create web portal script
cd "$MINER_DIR"
cat > portal.py <<EOF
import http.server
import socketserver

PORT = $WEB_PORT

html = f"""
<!DOCTYPE html>
<html>
<head><title>Mining Status</title></head>
<body style='font-family:sans-serif;background:#111;color:#0f0;padding:20px;'>
<h1>🚀 Mining Dashboard</h1>
<p><strong>Coin:</strong> $COIN</p>
<p><strong>Algorithm:</strong> $ALGO</p>
<p><strong>Wallet:</strong> $WALLET</p>
<p><strong>Worker:</strong> $WORKER_NAME</p>
<p><strong>Pool:</strong> $POOL:$PORT</p>
<p><a style='color:#0ff;' href='https://zergpool.com/?address=$WALLET' target='_blank'>🔗 View live stats</a></p>
<hr>
<em>Leave this page open to monitor basic info.<br>The miner is running in the background.</em>
</body>
</html>
"""

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(html.encode())

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🌐 Web portal running at http://localhost:{PORT}")
    httpd.serve_forever()
EOF

# Start web portal in background
python3 "$MINER_DIR/portal.py" &
WEB_PID=$!

# Start miner
cd "$MINER_DIR/cpuminer-multi"
echo "🚀 Starting cpuminer..."
./cpuminer \
  -a "$ALGO" \
  -o "stratum+tcp://$POOL:$PORT" \
  -u "$WALLET.$WORKER_NAME" \
  -p "c=$COIN" \
  -t "$THREADS"

# After miner exits, kill the portal
echo "🛑 cpuminer stopped. Killing web portal..."
kill $WEB_PID