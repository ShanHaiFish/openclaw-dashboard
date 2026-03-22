# 🚀 Deployment Guide

This guide covers deploying OpenClaw Dashboard to **Vercel** (frontend) and **Railway** (full-stack).

---

## 📋 Prerequisites

- Node.js >= 18
- npm or pnpm
- A GitHub account (for one-click deployment)
- A running OpenClaw instance (for API data)

---

## ⚡ Vercel (Frontend Only)

Vercel is ideal for deploying the React frontend with global CDN and instant rollbacks.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Manual Deploy

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   # Preview deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Configure Environment Variables**

   In the Vercel Dashboard → Project Settings → Environment Variables:

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `VITE_API_URL` | Backend API URL | `https://your-api.example.com` |
   | `VITE_WS_URL` | WebSocket URL | `wss://your-api.example.com` |
   | `VITE_APP_TITLE` | App title | `OpenClaw Dashboard` |

   > ⚠️ **Note:** Variables prefixed with `VITE_` are embedded into the client build. Do not put secrets here.

5. **Custom Domain**

   Vercel Dashboard → Project → Settings → Domains → Add your domain.

### Vercel Configuration

The `vercel.json` file includes:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA rewrites:** All routes redirect to `index.html` for client-side routing
- **Security headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Asset caching:** Immutable caching for hashed assets

---

## 🚂 Railway (Full-Stack)

Railway supports the full Express server with WebSocket, making it ideal for complete deployment.

### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Manual Deploy

1. **Install Railway CLI**

   ```bash
   npm i -g @railway/cli
   ```

2. **Login**

   ```bash
   railway login
   ```

3. **Initialize Project**

   ```bash
   cd openclaw-dashboard
   railway init
   ```

4. **Configure Environment Variables**

   In the Railway Dashboard → Project → Variables:

   | Variable | Description | Required |
   |----------|-------------|----------|
   | `NODE_ENV` | Environment | Yes (`production`) |
   | `PORT` | Server port | Yes (`3000` default, Railway sets automatically) |
   | `OPENCLAW_API_URL` | OpenClaw API endpoint | Yes |
   | `OPENCLAW_API_KEY` | API key for authentication | No |
   | `CORS_ORIGIN` | Allowed CORS origins | No |

   Set variables via CLI:

   ```bash
   railway variables set NODE_ENV=production
   railway variables set OPENCLAW_API_URL=https://your-openclaw-instance.com
   ```

5. **Deploy**

   ```bash
   railway up
   ```

   Or link to GitHub for auto-deploy on push:

   ```bash
   railway link
   railway github --branch main
   ```

6. **Generate Domain**

   ```bash
   railway domain
   ```

### Railway Configuration

The `railway.json` file includes:

- **Builder:** Nixpacks (auto-detects Node.js)
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Health check:** `/api/health` with 30s timeout
- **Restart policy:** Auto-restart on failure (max 3 retries)

---

## 🌐 Custom Domain Configuration

### Vercel

1. Go to **Project → Settings → Domains**
2. Add your domain (e.g., `dashboard.example.com`)
3. Add DNS records at your registrar:

   **Option A: CNAME (recommended)**
   ```
   dashboard.example.com  CNAME  cname.vercel-dns.com
   ```

   **Option B: A Record**
   ```
   dashboard.example.com  A  76.76.21.21
   ```

4. Wait for DNS propagation (usually < 5 minutes)
5. SSL certificate is auto-provisioned

### Railway

1. Go to **Project → Settings → Networking**
2. Click **Add Domain**
3. Enter your custom domain
4. Add DNS record:

   ```
   dashboard.example.com  CNAME  your-app.up.railway.app
   ```

5. Railway auto-provisions SSL via Let's Encrypt

---

## 🔧 Environment Variables Reference

### Frontend (Vercel)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | Backend API base URL |
| `VITE_WS_URL` | (same origin) | WebSocket server URL |
| `VITE_APP_TITLE` | `OpenClaw Dashboard` | Browser title |
| `VITE_ENABLE_MOCK` | `false` | Use mock data (demo mode) |

### Backend (Railway)

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | `production` or `development` |
| `PORT` | `3000` | Server port |
| `OPENCLAW_API_URL` | — | OpenClaw instance URL |
| `OPENCLAW_API_KEY` | — | API authentication key |
| `CORS_ORIGIN` | `*` | Allowed CORS origins |
| `LOG_LEVEL` | `info` | Logging level |

---

## 🔍 Health Checks

Both platforms support health checks:

- **Endpoint:** `GET /api/health`
- **Expected response:** `200 OK` with JSON status
- **Railway:** Configured in `railway.json` (30s timeout)
- **Vercel:** N/A (serverless, no persistent server)

---

## 📊 Build Configuration

### Vite Build

Both platforms use the same build process:

```bash
npm install    # Install dependencies
npm run build  # Build production assets → dist/
npm start      # Start Express server (Railway only)
```

Build output structure:

```
dist/
├── index.html          # Entry point
├── assets/             # Hashed JS/CSS bundles
│   ├── index-[hash].js
│   └── index-[hash].css
└── favicon.ico
```

---

## ❓ FAQ

### Q: Vercel deployment shows a blank page

**A:** Check that:
1. `vercel.json` exists in the project root
2. Build succeeded (check Vercel build logs)
3. `VITE_API_URL` is set correctly
4. Browser console for CORS errors

### Q: Railway deployment fails with "PORT not set"

**A:** Railway sets `PORT` automatically. Ensure your `server/index.js` uses:
```javascript
const port = process.env.PORT || 3000;
```

### Q: WebSocket not connecting

**A:**
- **Vercel:** WebSockets are not supported on Vercel's serverless functions. Use Railway for WebSocket support, or point `VITE_WS_URL` to your backend server.
- **Railway:** Ensure the WebSocket path matches between client and server config.

### Q: How to use Vercel for frontend + Railway for backend?

**A:** This is the recommended setup:
1. Deploy frontend to Vercel
2. Deploy full-stack to Railway
3. Set `VITE_API_URL` and `VITE_WS_URL` on Vercel to point to your Railway URL

### Q: Custom domain not working

**A:**
1. DNS propagation can take up to 48 hours
2. Verify DNS records with `dig dashboard.example.com`
3. Check SSL certificate status in platform dashboard
4. Ensure you added the correct record type (CNAME vs A)

### Q: Build fails with "ENOMEM" or memory errors

**A:** Add a `.nixpacks.toml` (Railway) or configure build memory:
```bash
# In Railway, add variable:
NODE_OPTIONS=--max-old-space-size=4096
```

### Q: How to enable demo/mock mode?

**A:** Set `VITE_ENABLE_MOCK=true` in your environment variables. The dashboard will use simulated data without requiring an OpenClaw backend.

---

## 🛠️ Advanced: Docker Deployment

If you prefer Docker (see `Dockerfile` and `docker-compose.yml`):

```bash
docker compose up -d
```

See [Docker Guide](./docker.md) for details.

---

## 📚 Related Documentation

- [API Reference](./API.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Changelog](../CHANGELOG.md)
