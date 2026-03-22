# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | **[Dansk](README.da.md)** | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Den smukkeste realtidsovervågningsdashboard til AI-agenter.**
> Bygget med React, med ⌘K-kommandopalette, i18n, 4 temaer og et pluginsystem.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Hvorfor OpenClaw Dashboard?

At administrere AI-agenter bør ikke føles som at læse terminal logs. OpenClaw Dashboard transformerer din oplevelse af agentovervågning med:

- **🎨 Stunning Visuelt Design** — Inspireret af Vercel, Linear og Raycast. Glassmorphism, flydende animationer og gennemtænkte detaljer.
- **⚡ Realtidsopdateringer** — WebSocket-drevne live data. Ingen opdateringsknapper nødvendige.
- **⌘K Kommandopalette** — Avancerede brugere elsker tastaturførste grænseflader. Naviger, søg og udfør kommandoer øjeblikkeligt.
- **🌍 Internationalisering** — Indbygget understøttelse af engelsk og kinesisk. Tilføj flere sprog nemt.
- **🎭 4 Smukke Temaer** — Mørkt, Lyst, AMOLED (til OLED-skærme) og Systembevidst.
- **🔌 Pluginsystem** — Udvid funktionalitet uden at forkke. Registrer sider, kommandoer og hooks.
- **📊 Rig Datavisualisering** — Diagrammer, varmekort, målere og fremskridtsindikatorer.
- **📱 Fuldt Responsivt** — Fungerer smukt på mobil, tablet og desktop.

---

## 📊 Funktionssammenligning

| Funktion | OpenClaw Dashboard | Generisk Overvågning | Terminal UI |
|----------|-------------------|---------------------|-------------|
| Realtid WebSocket | ✅ | ⚠️ Begrænset | ✅ |
| Kommandopalette | ✅ | ❌ | ❌ |
| Multi-tema Understøttelse | ✅ 4 temaer | ⚠️ 1-2 temaer | ⚠️ Begrænset |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Pluginsystem | ✅ | ❌ | ❌ |
| Mobil Responsiv | ✅ | ⚠️ Delvis | ❌ |
| Smukke Animationer | ✅ | ❌ | ❌ |
| Docker Klar | ✅ | ✅ | ⚠️ |
| Nul Konfiguration | ✅ | ❌ | ❌ |

---

## 🏗️ Arkitektur

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

## 🚀 Hurtig Start

### Forudsætninger

- Node.js 18+
- npm eller yarn

### Installation via npm

```bash
# Installer fra npm
npm install @openclaw/dashboard

# Start serveren (serverer indbygget frontend + API)
npx @openclaw/dashboard
```

Eller installer globalt:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Fra Kilde

```bash
# Klon repository
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Installer dependencies
npm install

# Byg frontend
npm run build

# Start produktionsserveren
npm start
```

Åbn [http://localhost:3777](http://localhost:3777) i din browser.

### Udviklingstilstand

```bash
# Terminal 1: Start frontend dev server med hot reload
npm run dev

# Terminal 2: Start API-serveren
npm run server
```

### Docker

```bash
# Brug Docker Compose (anbefalet)
docker compose up -d

# Eller byg og kør manuelt
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Tastaturgenveje

Tryk `?"` hvor som helst for at se alle tastaturgenveje.

| Genvej | Handling |
|--------|----------|
| `Ctrl+K` | Kommandopalette |
| `Ctrl+/` | Skift sidepanel |
| `G derefter O` | Gå til Oversigt |
| `G derefter S` | Gå til Sessioner |
| `G derefter A` | Gå til Agenter |
| `G derefter T` | Gå til Opgaver |
| `G derefter ,` | Gå til Indstillinger |
| `T derefter D` | Skift mørkt tema |
| `T derefter L` | Skift lyst tema |
| `1-5` | Hop til navigationspunkter |

---

## 📊 Ydelsesbenchmarks

| Metrik | Værdi |
|--------|-------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
| Bundle Størrelse (gzipped) | ~180KB |
| Lighthouse Score | 95+ |
| WebSocket Latency | < 50ms |

---

## 🔒 Sikkerhedsovervejelser

- **Ingen standardgodkendelse** — Tilføj dit eget auth-middleware i produktion
- **CORS aktiveret** — Konfigurer tilladte origins for dit deployment
- **CSP anbefalet** — Tilføj Content-Security-Policy-headers
- **HTTPS påkrævet** — Brug altid HTTPS i produktion
- **Rate limiting** — Overvej at tilføje rate limiting for API-endpoints

---

## 📁 Projektstruktur

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI-pipeline
│   │   └── release.yml    # Release-automatisering
│   └── FUNDING.yml
├── docs/                  # Dokumentation
│   └── API.md             # API-reference
├── server/                # Backend-server
│   ├── index.js           # Express + WebSocket-server
│   ├── openclaw-api.js    # API-wrapper med mock data
│   └── package.json
├── src/
│   ├── components/        # React-komponenter
│   │   ├── Agents/        # Agent-administration
│   │   ├── CommandPalette/# ⌘K-kommandopalette
│   │   ├── Dashboard/     # Oversigt, diagrammer, metrics
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications# Notifikationpanel
│   │   ├── Sessions/      # Session-administration
│   │   ├── Settings/      # Indstilllingssider
│   │   ├── Tasks/         # Opgavetavle
│   │   └── ui/            # Genanvendelige UI-komponenter
│   ├── hooks/             # Brugerdefinerede React hooks
│   ├── i18n/              # Oversættelser (EN/ZH)
│   ├── lib/               # Utilities, konstanter
│   ├── pages/             # Sidekomponenter
│   ├── plugins/           # Pluginsystem
│   │   ├── index.js       # Plugin-manager
│   │   ├── examples/      # Eksempel-plugins
│   │   └── README.md      # Plugin-dokumentation
│   ├── stores/            # Zustand stores
│   └── utils/             # Utility-funktioner
├── public/                # Statiske ressourcer
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Docker Compose-konfiguration
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API-endpoints

Se [docs/API.md](docs/API.md) for fuld dokumentation.

| Endpoint | Beskrivelse |
|----------|-------------|
| `GET /api/health` | Sundhedstjek |
| `GET /api/overview` | Dashboard-statistik + seneste aktivitet |
| `GET /api/sessions` | Alle sessioner med paginering |
| `GET /api/sessions/:id` | Detaljeret session + historik |
| `GET /api/agents` | Alle agenter |
| `GET /api/tasks` | Opgaver med status |
| `GET /api/system` | Systemmetrics |
| `GET /api/notifications` | Notifikationsliste |
| `GET /api/heatmap` | 90-dages aktivitetsvarmekort |
| `WS /ws` | Realtidsopdateringer (hver 3s) |

---

## 🎨 Temaer

Dashboarden understøtter 4 temaer:

| Tema | Beskrivelse |
|------|-------------|
| **Dark** | Dyb navy gradient (standard) |
| **Light** | Ren hvid med subtil grå |
| **AMOLED** | Ren sort til OLED-skærme |
| **System** | Følger OS-præferencer |

Tilpas temaer ved at redigere CSS-variabler i `src/index.css`.

---

## 🌐 Internationalisering

Understøtter pt.:
- 🇺🇸 Engelsk
- 🇨🇳 Kinesisk (简体中文)

Tilføj nye sprog ved:
1. Oprette en JSON-fil i `src/i18n/` (f.eks. `ja.json`)
2. Tilføje sproget til sprogvælgeren
3. Bruge `t('key')`) til alle brugerfladeretter

---

## 🔌 Pluginsystem

OpenClaw Dashboard understøtter plugins til at udvide funktionalitet:

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
    // Oprydning
  }
};
```

Se [src/plugins/README.md](src/plugins/README.md) for fuld dokumentation.

---

## 🐳 Deploymentsmuligheder

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Anbefalet)

```bash
docker compose up -d
```

Se den fulde [Deploymentsguide](docs/deployment.md) for detaljerede instruktioner.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Systemd-tjeneste

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

**Q: Kan jeg bruge dette med min egen OpenClaw-instans?**
A: Ja! Erstat mock-dataene i `server/openclaw-api.js` med rigtige API-kald.

**Tilføjer jeg godkendelse?**
A: Tilføj middleware i `server/index.js`. Vi anbefaler Passport.js eller JWT.

**Q: Kan jeg tilpasse temaerne?**
A: Absolut! Rediger CSS-variablerne i `src/index.css`.

**Q: Er dette produktionsklar?**
A: Ja, med korrekt godkendelse og sikkerhedsheaders konfigureret.

**Q: Hvordan bidrager jeg?**
A: Se [CONTRIBUTING.md](CONTRIBUTING.md) for retningslinjer.

---

## 🗺️ Køreplan

### ✅ Fuldført

| Version | Højdepunkter |
|---------|-------------|
| **v2.0** | 🎨 Første udgivelse — React + Vite, ⌘K-kommandopalette, 4 temaer, i18n (EN/ZH), WebSocket realtidsopdateringer |
| **v2.1** | 📊 Rig datavisualisering (diagrammer, varmekort, målere), pluginsystem, Docker-understøttelse, ydelsesoptimeringer |

### 🚧 Under Udvikling (v2.2)

- 🔔 **Realtids Advarselsnotifikationer** — Tilpasselige tærskelbaserede alerts med multi-kanal-levering (email, webhook, in-app)
- 🧩 **Plugin Marketplace** — Gennemse, installer og administrer community-plugins direkte fra dashboarden
- 👥 **Multi-bruger Understøttelse** — Rollebaseret adgangskontrol (RBAC), brugeradministration og team-workspaces
- 📈 **Avanceret Analyse** — Dybere indsigt i agentpræstationer, omkostningssporing og brugstrends

### 🔮 Planlagt (v2.3+)

- 📱 **Mobilapp** — Native iOS & Android apps til overvågning på farten
- 🌐 **API Gateway** — Unified REST/GraphQL API-lag med rate limiting, caching og godkendelse
- 🤖 **AI-assisteret Debugging** — Lad AI analysere logs og foreslå løsninger på agentproblemer
- 🔄 **CI/CD-integration** — Native understøttelse af GitHub Actions, GitLab CI og Jenkins-pipelines
- 📡 **Edge Deployment** — Let agent til edge-enheder og IoT-scenarier
- 🎯 **Tilpassede Dashboards** - Drag-and-drop dashboard-builder med widget-bibliotek

> 💡 Har du et funktionsønske? [Åbn en issue](https://github.com/openclaw/openclaw-dashboard/issues) eller deltag i diskussionen!

---

## 🤝 Bidrage

Bidrag er velkomne! Læs venligst [CONTRIBUTING.md](CONTRIBUTING.md) før du indsender en PR.

1. Fork repository
2. Opret din feature branch (`git checkout -b feature/amazing-feature`)
3. Commit dine ændringer (`git commit -m 'feat: Add amazing-feature'`)
4. Push til branchen (`git push origin feature/amazing-feature`)
5. Åbn en Pull Request

---

## Bidragydere

Tak til disse vidunderlige mennesker for deres bidrag:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Dette projekt følger [all-contributors](https://allcontributors.org) specifikationen. Bidrag af enhver art er velkomne!

### Tilføj en Ny Bidragyder

For at tilføje en ny bidragyder, brug følgende kommando:

```bash
npx all-contributors add <username> <contribution>
```

For eksempel:

```bash
npx all-contributors add johndoe code,doc
```

Tilgængelige bidragstyper: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licens

Dette projekt er licenseret under MIT-licensen — se [LICENSE](LICENSE)-filen for detaljer.

## 🙏 Anerkendelser

- Inspireret af [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) og [Raycast](https://raycast.com)
- Bygget med kærlighed til OpenClaw-fællesskabet

---

Lavet med ❤️ af OpenClaw-holdet

[![Stjerne Historik Diagram](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
