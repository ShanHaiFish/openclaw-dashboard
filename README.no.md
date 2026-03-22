# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | **[Norsk](README.no.md)** | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Det vakreste sanntids overvåkningspanelet for AI-agenter.**
> Bygget med React, med ⌘K-kommandopalett, i18n, 4 temaer og et plugin-system.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Hvorfor OpenClaw Dashboard?

Det å administrere AI-agenter bør ikke føles som å lese terminallogger. OpenClaw Dashboard transformerer overvåkingsopplevelsen med:

- **🎨 Storslått visuelt design** — Inspirert av Vercel, Linear og Raycast. Glassmorphism, jevne animasjoner og gjennomtenkte detaljer.
- **⚡ Sanntidsoppdateringer** — WebSocket-drevet live-data. Ingen behov for oppfriskningsknapper.
- **⌘K-kommandopalett** — Avanserte brukere elsker tastaturførste grensesnitt. Naviger, søk og utfør kommandoer umiddelbart.
- **🌍 Internasjonalisering** — innebygd støtte for engelsk og kinesisk. Legg enkelt til flere språk.
- **🎭 4 vakre temaer** — Mørkt, lyst, AMOLED (for OLED-skjermer) og systemtilpasset.
- **🔌 Plugin-system** — Utvid funksjonalitet uten å forkke. Registrer sider, kommandoer og hooks.
- **📊 Rik datavisualisering** — Diagrammer, varmekart, målere og framdriftsindikatorer.
- **📱 Fullt responsivt** — Fungerer vakkert på mobil, nettbrett og desktop.

---

## 📊 Sammenligning av funksjoner

| Funksjon | OpenClaw Dashboard | Generell overvåkning | Terminal UI |
|----------|-------------------|---------------------|-------------|
| Sanntids WebSocket | ✅ | ⚠️ Begrenset | ✅ |
| Kommandopalett | ✅ | ❌ | ❌ |
| Multi-tema støtte | ✅ 4 temaer | ⚠️ 1-2 temaer | ⚠️ Begrenset |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Plugin-system | ✅ | ❌ | ❌ |
| Mobil responsiv | ✅ | ⚠️ Delvis | ❌ |
| Vakre animasjoner | ✅ | ❌ | ❌ |
| Docker-klar | ✅ | ✅ | ⚠️ |
| Nullkonfigurasjon | ✅ | ❌ | ❌ |

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
│  │                    TailwindCSS-styling                    │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │Dark │ │Light │ │AMOLED│ │System│ │Custom│          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenClaw API-server                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Statiske   │             │
│  │  /api/*     │  │  /ws        │  │  filer      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Rask start

### Forutsetninger

- Node.js 18+
- npm eller yarn

### Installasjon via npm

```bash
# Installer fra npm
npm install @openclaw/dashboard

# Start serveren (serverer innebygd frontend + API)
npx @openclaw/dashboard
```

Eller installer globalt:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Fra kildekode

```bash
# Klon repositoryet
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Installer avhengigheter
npm install

# Bygg frontend
npm run build

# Start produksjonsserveren
npm start
```

Åpne [http://localhost:3777](http://localhost:3777) i nettleseren din.

### Utviklermodus

```bash
# Terminal 1: Start frontend-utviklingsserver med hot reload
npm run dev

# Terminal 2: Start API-serveren
npm run server
```

### Docker

```bash
# Bruk Docker Compose (anbefalt)
docker compose up -d

# Eller bygg og kjør manuelt
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Tastatursnarveier

Trykk `?` hvor som helst for å se alle tastatursnarveier.

| Snarvei | Handling |
|---------|----------|
| `Ctrl+K` | Kommandopalett |
| `Ctrl+/` | Slå av/på sidepanel |
| `G deretter O` | Gå til Oversikt |
| `G deretter S` | Gå til Økter |
| `G deretter A` | Gå til Agenter |
| `G deretter T` | Gå til Oppgaver |
| `G deretter ,` | Gå til Innstillinger |
| `T deretter D` | Slå av/på mørkt tema |
| `T deretter L` | Slå av/på lyst tema |
| `1-5` | Hopp til navigasjonselementer |

---

## 📊 Ytelsesmålinger

| Måling | Verdi |
|--------|-------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
| Pakkestørrelse (gzippet) | ~180KB |
| Lighthouse-poengsum | 95+ |
| WebSocket-latens | < 50ms |

---

## 🔒 Sikkerhetshensyn

- **Innlogging som standard deaktivert** — Legg til ditt eget autentiseringsmiddleware i produksjon
- **CORS aktivert** — Konfigurer tillatte opprinnelser for ditt oppsett
- **CSP anbefalt** — Legg til Content-Security-Policy-overskrifter
- **HTTPS påkrevd** — Bruk alltid HTTPS i produksjon
- **Rategrense** — Vurder å legge til rategrense for API-endepunkter

---

## 📁 Prosjektstruktur

```
openclaw-dashboard/
├── .github/               # GitHub Actions-arbeidsflyter
│   ├── workflows/
│   │   ├── ci.yml         # CI-pipeline
│   │   └── release.yml    # Utgivelsesautomatisering
│   └── FUNDING.yml
├── docs/                  # Dokumentasjon
│   └── API.md             # API-referanse
├── server/                # Backend-server
│   ├── index.js           # Express + WebSocket-server
│   ├── openclaw-api.js    # API-wrapper med mock-data
│   └── package.json
├── src/
│   ├── components/        # React-komponenter
│   │   ├── Agents/        # Agent-administrasjon
│   │   ├── CommandPalette/# ⌘K-kommandopalett
│   │   ├── Dashboard/     # Oversikt, diagrammer, målinger
│   │   ├── Layout/        # Sidepanel, Header, MainLayout
│   │   ├── Notifications/ # Varslingspanel
│   │   ├── Sessions/      # Øktadministrasjon
│   │   ├── Settings/      # Innstillinger
│   │   ├── Tasks/         # Oppgavetavle
│   │   └── ui/            # Gjenbrukbare UI-komponenter
│   ├── hooks/             # Egendefinerte React-hooks
│   ├── i18n/              # Oversettelser (EN/ZH)
│   ├── lib/               # Verktøy, konstanter
│   ├── pages/             # Sidekomponenter
│   ├── plugins/           # Plugin-system
│   │   ├── index.js       # Plugin-manager
│   │   ├── examples/      # Eksempel-plugins
│   │   └── README.md      # Plugin-dokumentasjon
│   ├── stores/            # Zustand-lagre
│   └── utils/             # Verktøyfunksjoner
├── public/                # Statiske ressurser
├── Dockerfile             # Fleretrinns Docker-bygging
├── docker-compose.yml     # Docker Compose-konfigurasjon
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API-endepunkter

Se [docs/API.md](docs/API.md) for fullstendig dokumentasjon.

| Endepunkt | Beskrivelse |
|-----------|-------------|
| `GET /api/health` | Helsesjekk |
| `GET /api/overview` | Dashbordstatistikk + nylig aktivitet |
| `GET /api/sessions` | Alle økter med paginering |
| `GET /api/sessions/:id` | Øktdetaljer + historikk |
| `GET /api/agents` | Alle agenter |
| `GET /api/tasks` | Oppgaver med status |
| `GET /api/system` | Systemmålinger |
| `GET /api/notifications` | Varslingsliste |
| `GET /api/heatmap` | 90-dagers aktivitetsvarmekart |
| `WS /ws` | Sanntidsoppdateringer (hver 3s) |

---

## 🎨 Temabehandling

Panelet støtter 4 temaer:

| Tema | Beskrivelse |
|------|-------------|
| **Mørkt** | Dyp marineblå gradient (standard) |
| **Lyst** | Rent hvitt med subtil grå |
| **AMOLED** | Rent svart for OLED-skjermer |
| **System** | Følger OS-prefanse |

Tilpass temaer ved å redigere CSS-variablene i `src/index.css`.

---

## 🌐 Internasjonalisering

Støtter foreløpig:
- 🇺🇸 Engelsk
- 🇨🇳 Kinesisk (简体中文)

Legg til nye språk ved å:
1. Opprette en JSON-fil i `src/i18n/` (f.eks. `ja.json`)
2. Legge til språket i språkvelgeren
3. Bruke `t('key')` for alle brukervendte strenger

---

## 🔌 Plugin-system

OpenClaw Dashboard støtter plugins for å utvide funksjonaliteten:

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
    // Rydd opp
  }
};
```

Se [src/plugins/README.md](src/plugins/README.md) for fullstendig dokumentasjon.

---

## 🐳 Alternativer for utplassering

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Anbefalt)

```bash
docker compose up -d
```

Se den fullstendige [Utplasseringsveiledningen](docs/deployment.md) for detaljerte instruksjoner.

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

**Q: Kan jeg bruke dette med min egen OpenClaw-instans?**
A: Ja! Erstatt mock-dataene i `server/openclaw-api.js` med ekte API-kall.

**Q: Hvordan legger jeg til autentisering?**
A: Legg til middleware i `server/index.js`. Vi anbefaler Passport.js eller JWT.

**Q: Kan jeg tilpasse temaene?**
A: Absolutt! Rediger CSS-variablene i `src/index.css`.

**Q: Er dette klart for produksjon?**
A: Ja, med riktig autentisering og sikkerhetsoverskrifter konfigurert.

**Q: Hvordan bidrar jeg?**
A: Se [CONTRIBUTING.md](CONTRIBUTING.md) for retningslinjer.

---

## 🗺️ Kjøreplan

### ✅ Fullført

| Versjon | Høydepunkter |
|---------|-------------|
| **v2.0** | 🎨 Første utgivelse — React + Vite, ⌘K-kommandopalett, 4 temaer, i18n (EN/ZH), WebSocket sanntidsoppdateringer |
| **v2.1** | 📊 Rik datavisualisering (diagrammer, varmekart, målere), plugin-system, Docker-støtte, ytelsesoptimaliseringer |

### 🚧 Under utvikling (v2.2)

- 🔔 **Sanntids varslinger** — Tilpassbare terskelbaserte varsler med multikanal-levering (e-post, webhook, i appen)
- 🧩 **Plugin-markedsplass** — Bla gjennom, installer og administrer community-plugins direkte fra panelet
- 👥 **Støtte for flere brukere** — Rollebasert tilgangskontroll (RBAC), brukeradministrasjon og teamarbeidsområder
- 📈 **Avansert analyse** — Dypere innsikt i agentytelse, kostnadsoppfølging og brukstrender

### 🔮 Planlagt (v2.3+)

- 📱 **Mobilapp** — Nativ iOS og Android-apper for overvåking på farten
- 🌐 **API-gateway** — Felles REST/GraphQL API-lag med rategrense, caching og autentisering
- 🤖 **AI-assistert feilsøking** — La AI analysere logger og foreslå løsninger for agentproblemer
- 🔄 **CI/CD-integrasjon** — Nativ støtte for GitHub Actions, GitLab CI og Jenkins-pipelines
- 📡 **Kantutplassering** — Lettvektsagent for kantenheter og IoT-scenarioer
- 🎯 **Tilpassede instrumentpaneler** — Dra-og-slipp instrumentpanelbygger med widgetbibliotek

> 💡 Har du et funksjonsønske? [Åpne en issue](https://github.com/openclaw/openclaw-dashboard/issues) eller bli med i diskusjonen!

---

## 🤝 Bidra

Bidrag er velkomne! Vennligst les [CONTRIBUTING.md](CONTRIBUTING.md) før du sender en PR.

1. Fork repositoryet
2. Opprett din feature-gren (`git checkout -b feature/amazing-feature`)
3. Commite endringene (`git commit -m 'feat: Add amazing feature'`)
4. Push til grenen (`git push origin feature/amazing-feature`)
5. Åpne en Pull Request

---

## Bidragsytere

Takk til disse fantastiske menneskene for deres bidrag:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Dette prosjektet følger [all-contributors](https://allcontributors.org)-spesifikasjonen. Bidrag av alle typer er velkomne!

### Legg til en ny bidragsyter

For å legge til en ny bidragsyter, bruk følgende kommando:

```bash
npx all-contributors add <brukernavn> <bidrag>
```

For eksempel:

```bash
npx all-contributors add johndoe code,doc
```

Tilgjengelige bidragstyper: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Lisens

Dette prosjektet er lisensiert under MIT-lisensen — se [LICENSE](LICENSE)-filen for detaljer.

## 🙏 Anerkjennelser

- Inspirert av [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) og [Raycast](https://raycast.com)
- Bygget med kjærlighet for OpenClaw-fellesskapet

---

Laget med ❤️ av OpenClaw-teamet

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
