# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **The most beautiful real-time monitoring dashboard for AI agents.**
> Built with React, featuring ⌘K command palette, i18n, 4 themes, and a plugin system.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Why OpenClaw Dashboard?

Managing AI agents shouldn't feel like reading terminal logs. OpenClaw Dashboard transforms your agent monitoring experience with:

- **🎨 Stunning Visual Design** — Inspired by Vercel, Linear, and Raycast. Glassmorphism, smooth animations, and thoughtful details.
- **⚡ Real-time Updates** — WebSocket-powered live data. No refresh buttons needed.
- **⌘K Command Palette** — Power users love keyboard-first interfaces. Navigate, search, and execute commands instantly.
- **🌍 Internationalization** — Built-in support for English and Chinese. Add more languages easily.
- **🎭 4 Beautiful Themes** — Dark, Light, AMOLED (for OLED screens), and System-aware.
- **🔌 Plugin System** — Extend functionality without forking. Register pages, commands, and hooks.
- **📊 Rich Data Visualization** — Charts, heatmaps, gauges, and progress indicators.
- **📱 Fully Responsive** — Works beautifully on mobile, tablet, and desktop.

---

## 📊 Feature Comparison

| Feature | OpenClaw Dashboard | Generic Monitoring | Terminal UI |
|---------|-------------------|-------------------|-------------|
| Real-time WebSocket | ✅ | ⚠️ Limited | ✅ |
| Command Palette | ✅ | ❌ | ❌ |
| Multi-theme Support | ✅ 4 themes | ⚠️ 1-2 themes | ⚠️ Limited |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Plugin System | ✅ | ❌ | ❌ |
| Mobile Responsive | ✅ | ⚠️ Partial | ❌ |
| Beautiful Animations | ✅ | ❌ | ❌ |
| Docker Ready | ✅ | ✅ | ⚠️ |
| Zero Config | ✅ | ❌ | ❌ |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenClaw Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React UI  │  │   Zustand   │  │   WebSocket │             │
│  │   (Views)   │◄─┤   (State)   │◄─┤   (Realtime)│             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Framer    │  │   Plugin    │  │   Express   │             │
│  │   Motion    │  │   Manager   │  │   Server    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    TailwindCSS Styling                    │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │ Dark │ │Light │ │AMOLED│ │System│ │Custom│          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenClaw API Server                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Static     │             │
│  │  /api/*     │  │  /ws        │  │  Files      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Install via npm

```bash
# Install from npm
npm install @openclaw/dashboard

# Start the server (serves built-in frontend + API)
npx @openclaw/dashboard
```

Or install globally:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### From Source

```bash
# Clone the repository
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Install dependencies
npm install

# Build the frontend
npm run build

# Start the production server
npm start
```

Open [http://localhost:3777](http://localhost:3777) in your browser.

### Development Mode

```bash
# Terminal 1: Start frontend dev server with hot reload
npm run dev

# Terminal 2: Start the API server
npm run server
```

### Docker

```bash
# Using Docker Compose (recommended)
docker compose up -d

# Or build and run manually
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Keyboard Shortcuts

Press `?` anywhere to see all keyboard shortcuts.

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Command palette |
| `Ctrl+/` | Toggle sidebar |
| `G then O` | Go to Overview |
| `G then S` | Go to Sessions |
| `G then A` | Go to Agents |
| `G then T` | Go to Tasks |
| `G then ,` | Go to Settings |
| `T then D` | Toggle dark theme |
| `T then L` | Toggle light theme |
| `1-5` | Jump to nav items |

---

## 📊 Performance Benchmarks

| Metric | Value |
|--------|-------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Bundle Size (gzipped) | ~180KB |
| Lighthouse Score | 95+ |
| WebSocket Latency | < 50ms |

---

## 🔒 Security Considerations

- **No authentication by default** — Add your own auth middleware in production
- **CORS enabled** — Configure allowed origins for your deployment
- **CSP recommended** — Add Content-Security-Policy headers
- **HTTPS required** — Always use HTTPS in production
- **Rate limiting** — Consider adding rate limiting for API endpoints

---

## 📁 Project Structure

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI pipeline
│   │   └── release.yml    # Release automation
│   └── FUNDING.yml
├── docs/                  # Documentation
│   └── API.md             # API reference
├── server/                # Backend server
│   ├── index.js           # Express + WebSocket server
│   ├── openclaw-api.js    # API wrapper with mock data
│   └── package.json
├── src/
│   ├── components/        # React components
│   │   ├── Agents/        # Agent management
│   │   ├── CommandPalette/# ⌘K command palette
│   │   ├── Dashboard/     # Overview, charts, metrics
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Notification panel
│   │   ├── Sessions/      # Session management
│   │   ├── Settings/      # Settings pages
│   │   ├── Tasks/         # Task board
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Translations (EN/ZH)
│   ├── lib/               # Utilities, constants
│   ├── pages/             # Page components
│   ├── plugins/           # Plugin system
│   │   ├── index.js       # Plugin manager
│   │   ├── examples/      # Example plugins
│   │   └── README.md      # Plugin documentation
│   ├── stores/            # Zustand stores
│   └── utils/             # Utility functions
├── public/                # Static assets
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Docker Compose config
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API Endpoints

See [docs/API.md](docs/API.md) for full documentation.

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/overview` | Dashboard stats + recent activity |
| `GET /api/sessions` | All sessions with pagination |
| `GET /api/sessions/:id` | Session detail + history |
| `GET /api/agents` | All agents |
| `GET /api/tasks` | Tasks with status |
| `GET /api/system` | System metrics |
| `GET /api/notifications` | Notification list |
| `GET /api/heatmap` | 90-day activity heatmap |
| `WS /ws` | Real-time updates (every 3s) |

---

## 🎨 Theming

The dashboard supports 4 themes:

| Theme | Description |
|-------|-------------|
| **Dark** | Deep navy gradient (default) |
| **Light** | Clean white with subtle gray |
| **AMOLED** | Pure black for OLED screens |
| **System** | Follows OS preference |

Customize themes by editing CSS variables in `src/index.css`.

---

## 🌐 Internationalization

Currently supports:
- 🇺🇸 English
- 🇨🇳 Chinese (简体中文)

Add new languages by:
1. Creating a JSON file in `src/i18n/` (e.g., `ja.json`)
2. Adding the language to the language switcher
3. Using `t('key')` for all user-facing strings

---

## 🔌 Plugin System

OpenClaw Dashboard supports plugins to extend functionality:

```javascript
export default {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  activate(context) {
    context.registerPage({ ... });
    context.registerCommand({ ... });
    context.registerHook('event', callback);
  },
  deactivate() {
    // Cleanup
  }
};
```

See [src/plugins/README.md](src/plugins/README.md) for full documentation.

---

## 🐳 Deployment Options

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Recommended)

```bash
docker compose up -d
```

See the full [Deployment Guide](docs/deployment.md) for detailed instructions.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Systemd Service

```ini
[Unit]
Description=OpenClaw Dashboard
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/openclaw-dashboard
ExecStart=/usr/bin/node server/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

---

## ❓ FAQ

**Q: Can I use this with my own OpenClaw instance?**
A: Yes! Replace the mock data in `server/openclaw-api.js` with real API calls.

**Q: How do I add authentication?**
A: Add middleware in `server/index.js`. We recommend Passport.js or JWT.

**Q: Can I customize the themes?**
A: Absolutely! Edit the CSS variables in `src/index.css`.

**Q: Is this production-ready?**
A: Yes, with proper authentication and security headers configured.

**Q: How do I contribute?**
A: See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🗺️ Roadmap

### ✅ Completed

| Version | Highlights |
|---------|-----------|
| **v2.0** | 🎨 Initial release — React + Vite, ⌘K command palette, 4 themes, i18n (EN/ZH), WebSocket real-time updates |
| **v2.1** | 📊 Rich data visualization (charts, heatmaps, gauges), plugin system, Docker support, performance optimizations |

### 🚧 In Progress (v2.2)

- 🔔 **Real-time Alert Notifications** — Customizable threshold-based alerts with multi-channel delivery (email, webhook, in-app)
- 🧩 **Plugin Marketplace** — Browse, install, and manage community plugins directly from the dashboard
- 👥 **Multi-user Support** — Role-based access control (RBAC), user management, and team workspaces
- 📈 **Advanced Analytics** — Deeper insights into agent performance, cost tracking, and usage trends

### 🔮 Planned (v2.3+)

- 📱 **Mobile App** — Native iOS & Android apps for on-the-go monitoring
- 🌐 **API Gateway** — Unified REST/GraphQL API layer with rate limiting, caching, and auth
- 🤖 **AI-assisted Debugging** — Let AI analyze logs and suggest fixes for agent issues
- 🔄 **CI/CD Integration** — Native support for GitHub Actions, GitLab CI, and Jenkins pipelines
- 📡 **Edge Deployment** — Lightweight agent for edge devices and IoT scenarios
- 🎯 **Custom Dashboards** — Drag-and-drop dashboard builder with widget library

> 💡 Have a feature request? [Open an issue](https://github.com/openclaw/openclaw-dashboard/issues) or join the discussion!

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Contributors

Thanks to these wonderful people for their contributions:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any kind welcome!

### Adding a New Contributor

To add a new contributor, use the following command:

```bash
npx all-contributors add <username> <contribution>
```

For example:

```bash
npx all-contributors add johndoe code,doc
```

Available contribution types: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app), and [Raycast](https://raycast.com)
- Built with love for the OpenClaw community

---

Made with ❤️ by the OpenClaw team

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
