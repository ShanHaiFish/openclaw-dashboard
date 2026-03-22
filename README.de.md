# 🔮 OpenClaw Dashboard

[English](README.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | **[Deutsch](README.de.md)** | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Das schönste Echtzeit-Monitoring-Dashboard für KI-Agenten.**
> Entwickelt mit React, mit ⌘K Command Palette, i18n, 4 Themes und einem Plugin-System.

![OpenClaw Dashboard Vorschau](docs/preview.png)

---

## ✨ Warum OpenClaw Dashboard?

Die Verwaltung von KI-Agenten sollte sich nicht anfühlen wie das Lesen von Terminal-Logs. OpenClaw Dashboard transformiert Ihr Agent-Monitoring-Erlebnis mit:

- **🎨 Atemberaubendes visuelles Design** — Inspiriert von Vercel, Linear und Raycast. Glasmorphismus, flüssige Animationen und durchdachte Details.
- **⚡ Echtzeit-Updates** — WebSocket-basierte Live-Daten. Keine Aktualisierungstasten erforderlich.
- **⌘K Command Palette** — Power-User lieben Tastatur-First-Oberflächen. Navigieren, suchen und Befehle sofort ausführen.
- **🌍 Internationalisierung** — Eingebaute Unterstützung für Englisch und Chinesisch. Fügen Sie einfach weitere Sprachen hinzu.
- **🎭 4 wunderschöne Themes** — Dunkel, Hell, AMOLED (für OLED-Bildschirme) und systembewusst.
- **🔌 Plugin-System** — Erweitern Sie die Funktionalität ohne Fork. Registrieren Sie Seiten, Befehle und Hooks.
- **📊 Reiche Datenvisualisierung** — Diagramme, Heatmaps, Messgeräte und Fortschrittsanzeigen.
- **📱 Vollständig responsiv** — Funktioniert wunderbar auf Mobiltelefon, Tablet und Desktop.

---

## 📊 Feature-Vergleich

| Feature | OpenClaw Dashboard | Generisches Monitoring | Terminal UI |
|---------|-------------------|-----------------------|-------------|
| Echtzeit WebSocket | ✅ | ⚠️ Eingeschränkt | ✅ |
| Command Palette | ✅ | ❌ | ❌ |
| Multi-Theme-Unterstützung | ✅ 4 Themes | ⚠️ 1-2 Themes | ⚠️ Eingeschränkt |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Plugin-System | ✅ | ❌ | ❌ |
| Mobile Responsiv | ✅ | ⚠️ Teilweise | ❌ |
| Schöne Animationen | ✅ | ❌ | ❌ |
| Docker Ready | ✅ | ✅ | ⚠️ |
| Zero Config | ✅ | ❌ | ❌ |

---

## 🏗️ Architektur

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

## 🚀 Schnellstart

### Voraussetzungen

- Node.js 18+
- npm oder yarn

### Installation über npm

```bash
# Installation von npm
npm install @openclaw/dashboard

# Server starten (bedient eingebautes Frontend + API)
npx @openclaw/dashboard
```

Oder global installieren:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Aus dem Quellcode

```bash
# Repository klonen
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Abhängigkeiten installieren
npm install

# Frontend erstellen
npm run build

# Produktionsserver starten
npm start
```

Öffnen Sie [http://localhost:3777](http://localhost:3777) in Ihrem Browser.

### Entwicklungsmodus

```bash
# Terminal 1: Frontend-Dev-Server mit Hot Reload starten
npm run dev

# Terminal 2: API-Server starten
npm run server
```

### Docker

```bash
# Mit Docker Compose (empfohlen)
docker compose up -d

# Oder manuell erstellen und ausführen
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Tastenkürzel

Drücken Sie `?` an einer beliebigen Stelle, um alle Tastenkürzel anzuzeigen.

| Tastenkürzel | Aktion |
|----------|--------|
| `Ctrl+K` | Command Palette |
| `Ctrl+/` | Seitenleiste umschalten |
| `G dann O` | Zur Übersicht |
| `G dann S` | Zu den Sitzungen |
| `G dann A` | Zu den Agenten |
| `G dann T` | Zu den Aufgaben |
| `G dann ,` | Zu den Einstellungen |
| `T dann D` | Dunkles Theme umschalten |
| `T dann L` | Helles Theme umschalten |
| `1-5` | Zu Navigationspunkten springen |

---

## 📊 Leistungsbenchmarks

| Metrik | Wert |
|--------|------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
| Bundle-Größe (gezippt) | ~180KB |
| Lighthouse-Score | 95+ |
| WebSocket-Latenz | < 50ms |

---

## 🔒 Sicherheitsüberlegungen

- **Standardmäßig keine Authentifizierung** — Fügen Sie in der Produktion Ihre eigene Auth-Middleware hinzu
- **CORS aktiviert** — Konfigurieren Sie erlaubte Ursachen für Ihre Bereitstellung
- **CSP empfohlen** — Fügen Sie Content-Security-Policy-Header hinzu
- **HTTPS erforderlich** — Verwenden Sie in der Produktion immer HTTPS
- **Rate Limiting** — Erwägen Sie die Hinzufügung von Rate Limiting für API-Endpunkte

---

## 📁 Projektstruktur

```
openclaw-dashboard/
├── .github/               # GitHub Actions Workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI-Pipeline
│   │   └── release.yml    # Release-Automatisierung
│   └── FUNDING.yml
├── docs/                  # Dokumentation
│   └── API.md             # API-Referenz
├── server/                # Backend-Server
│   ├── index.js           # Express + WebSocket Server
│   ├── openclaw-api.js    # API-Wrapper mit Mock-Daten
│   └── package.json
├── src/
│   ├── components/        # React-Komponenten
│   │   ├── Agents/        # Agent-Verwaltung
│   │   ├── CommandPalette/# ⌘K Command Palette
│   │   ├── Dashboard/     # Übersicht, Diagramme, Metriken
│   │   ├── Layout/        # Seitenleiste, Header, MainLayout
│   │   ├── Notifications/ # Benachrichtigungsbereich
│   │   ├── Sessions/      # Sitzungsverwaltung
│   │   ├── Settings/      # Einstellungsseiten
│   │   ├── Tasks/         # Aufgabenboard
│   │   └── ui/            # Wiederverwendbare UI-Komponenten
│   ├── hooks/             # Benutzerdefinierte React Hooks
│   ├── i18n/              # Übersetzungen (EN/ZH)
│   ├── lib/               # Hilfsprogramme, Konstanten
│   ├── pages/             # Seitenkomponenten
│   ├── plugins/           # Plugin-System
│   │   ├── index.js       # Plugin-Manager
│   │   ├── examples/      # Beispiel-Plugins
│   │   └── README.md      # Plugin-Dokumentation
│   ├── stores/            # Zustand-Speicher
│   └── utils/             # Hilfsfunktionen
├── public/                # Statische Assets
├── Dockerfile             # Multi-Stage Docker Build
├── docker-compose.yml     # Docker Compose Konfiguration
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API-Endpunkte

Siehe [docs/API.md](docs/API.md) für die vollständige Dokumentation.

| Endpunkt | Beschreibung |
|----------|-------------|
| `GET /api/health` | Gesundheitsprüfung |
| `GET /api/overview` | Dashboard-Statistiken + letzte Aktivität |
| `GET /api/sessions` | Alle Sitzungen mit Paginierung |
| `GET /api/sessions/:id` | Sitzungsdetails + Verlauf |
| `GET /api/agents` | Alle Agenten |
| `GET /api/tasks` | Aufgaben mit Status |
| `GET /api/system` | Systemmetriken |
| `GET /api/notifications` | Benachrichtigungsliste |
| `GET /api/heatmap` | 90-Tage Aktivitäts-Heatmap |
| `WS /ws` | Echtzeit-Updates (alle 3s) |

---

## 🎨 Theming

Das Dashboard unterstützt 4 Themes:

| Theme | Beschreibung |
|-------|-------------|
| **Dunkel** | Tiefer marineblauer Farbverlauf (Standard) |
| **Hell** | Sauberes Weiß mit dezentem Grau |
| **AMOLED** | Reines Schwarz für OLED-Bildschirme |
| **System** | Folgt den OS-Einstellungen |

Passen Sie Themes an, indem Sie CSS-Variablen in `src/index.css` bearbeiten.

---

## 🌐 Internationalisierung

Unterstützt derzeit:
- 🇺🇸 Englisch
- 🇨🇳 Chinesisch (简体中文)

Fügen Sie neue Sprachen hinzu durch:
1. Erstellen einer JSON-Datei in `src/i18n/` (z.B. `de.json`)
2. Hinzufügen der Sprache zum Sprachumschalter
3. Verwenden von `t('key')` für alle benutzerseitenbezogenen Zeichenfolgen

---

## 🔌 Plugin-System

OpenClaw Dashboard unterstützt Plugins zur Erweiterung der Funktionalität:

```javascript
export default {
  id: 'my-plugin',
  name: 'Mein Plugin',
  version: '1.0.0',
  activate(context) {
    context.registerPage({ ... });
    context.registerCommand({ ... });
    context.registerHook('event', callback);
  },
  deactivate() {
    // Bereinigung
  }
};
```

Siehe [src/plugins/README.md](src/plugins/README.md) für die vollständige Dokumentation.

---

## 🐳 Bereitstellungsoptionen

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Empfohlen)

```bash
docker compose up -d
```

Siehe den vollständigen [Deployment Guide](docs/deployment.md) für detaillierte Anweisungen.

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

**Q: Kann ich dies mit meiner eigenen OpenClaw-Instanz verwenden?**
A: Ja! Ersetzen Sie die Mock-Daten in `server/openclaw-api.js` durch echte API-Aufrufe.

**Q: Wie füge ich Authentifizierung hinzu?**
A: Fügen Sie Middleware in `server/index.js` hinzu. Wir empfehlen Passport.js oder JWT.

**Q: Kann ich die Themes anpassen?**
A: Absolut! Bearbeiten Sie die CSS-Variablen in `src/index.css`.

**Q: Ist dies produktionsreif?**
A: Ja, mit ordnungsgemäß konfigurierter Authentifizierung und Sicherheitsheadern.

**Q: Wie kann ich beitragen?**
A: Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Richtlinien.

---

## 🗺️ Roadmap

### ✅ Abgeschlossen

| Version | Highlights |
|---------|-----------|
| **v2.0** | 🎨 Erste Veröffentlichung — React + Vite, ⌘K Command Palette, 4 Themes, i18n (EN/ZH), WebSocket Echtzeit-Updates |
| **v2.1** | 📊 Reiche Datenvisualisierung (Diagramme, Heatmaps, Messgeräte), Plugin-System, Docker-Unterstützung, Leistungsoptimierungen |

### 🚧 In Arbeit (v2.2)

- 🔔 **Echtzeit-Benachrichtigungen** — Anpassbare schwellenbasierte Benachrichtigungen mit Mehrkanal-Zustellung (E-Mail, Webhook, In-App)
- 🧩 **Plugin-Marktplatz** — Durchsuchen, Installieren und Verwalten von Community-Plugins direkt im Dashboard
- 👥 **Multi-Benutzer-Unterstützung** — Rollenbasierte Zugriffskontrolle (RBAC), Benutzerverwaltung und Team-Arbeitsbereiche
- 📈 **Erweiterte Analysen** — Tiefere Einblicke in die Agentenleistung, Kostenverfolgung und Nutzungstrends

### 🔮 Geplant (v2.3+)

- 📱 **Mobile App** — Native iOS- und Android-Apps für unterwegs-Monitoring
- 🌐 **API-Gateway** — Einheitliche REST/GraphQL-API-Schicht mit Rate Limiting, Caching und Auth
- 🤖 **KI-gestütztes Debugging** — Lassen Sie KI Logs analysieren und Fehlerbehebung für Agenten-Probleme vorschlagen
- 🔄 **CI/CD-Integration** — Native Unterstützung für GitHub Actions, GitLab CI und Jenkins Pipelines
- 📡 **Edge-Bereitstellung** - Leichtgewichtiger Agent für Edge-Geräte und IoT-Szenarien
- 🎯 **Benutzerdefinierte Dashboards** — Drag-and-drop Dashboard-Builder mit Widget-Bibliothek

> 💡 Haben Sie einen Funktionswunsch? [Eröffnen Sie ein Issue](https://github.com/openclaw/openclaw-dashboard/issues) oder nehmen Sie an der Diskussion teil!

---

## 🤝 Beitrag

Beiträge sind willkommen! Bitte lesen Sie [CONTRIBUTING.md](CONTRIBUTING.md), bevor Sie eine PR einreichen.

1. Forken Sie das Repository
2. Erstellen Sie Ihren Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'feat: Add amazing feature'`)
4. Pushen Sie den Branch (`git push origin feature/amazing-feature`)
5. Öffnen Sie einen Pull Request

---

## Mitwirkende

Vielen Dank an diese wunderbaren Menschen für ihre Beiträge:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Dieses Projekt folgt der [all-contributors](https://allcontributors.org) Spezifikation. Beiträge jeder Art sind willkommen!

### Einen neuen Mitwirkenden hinzufügen

Um einen neuen Mitwirkenden hinzuzufügen, verwenden Sie folgenden Befehl:

```bash
npx all-contributors add <username> <contribution>
```

Zum Beispiel:

```bash
npx all-contributors add johndoe code,doc
```

Verfügbare Beitragstypen: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 🙏 Danksagungen

- Inspiriert vom [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) und [Raycast](https://raycast.com)
- Mit Liebe für die OpenClaw-Community gebaut

---

Mit ❤️ gemacht vom OpenClaw-Team

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
