#!/bin/bash
cd /home/node/.openclaw/workspace/openclaw-dashboard
export HOST=0.0.0.0
export PORT=3777
node server/index.js
