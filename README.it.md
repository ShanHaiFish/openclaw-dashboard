# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | **[Italiano](README.it.md)** | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **La dashboard di monitoraggio in tempo reale più bella per agenti AI.**
> Costruita con React, dotata di palette dei comandi ⌘K, i18n, 4 temi e un sistema di plugin.

![Anteprima OpenClaw Dashboard](docs/preview.png)

---

## ✨ Perché OpenClaw Dashboard?

Gestire agenti AI non dovrebbe sembrare leggere log del terminale. OpenClaw Dashboard trasforma la tua esperienza di monitoraggio degli agenti con:

- **🎨 Design Visivo Stupendo** — Ispirato a Vercel, Linear e Raycast. Glassmorphism, animazioni fluide e dettagli studiati.
- **⚡ Aggiornamenti in Tempo Reale** — Dati live grazie a WebSocket. Nessun pulsante di aggiornamento necessario.
- **⌘K Palette dei Comandi** — Gli utenti esperti amano le interfacce orientate alla tastiera. Naviga, cerca ed esegui comandi istantaneamente.
- **🌍 Internazionalizzazione** — Supporto integrato per inglese e cinese. Aggiungi altre lingue facilmente.
- **🎭 4 Temi Belli** — Scuro, Chiaro, AMOLED (per schermi OLED) e basato sul Sistema.
- **🔌 Sistema di Plugin** — Estendi le funzionalità senza fork. Registra pagine, comandi e hook.
- **📊 Visualizzazione Dati Ricca** — Grafici, mappe di calore, indicatori e barre di avanzamento.
- **📱 Completamente Responsive** — Funziona perfettamente su mobile, tablet e desktop.

---

## 📊 Confronto Funzionalità

| Funzionalità | OpenClaw Dashboard | Monitoraggio Generico | UI Terminale |
|--------------|-------------------|----------------------|--------------|
| WebSocket in Tempo Reale | ✅ | ⚠️ Limitato | ✅ |
| Palette dei Comandi | ✅ | ❌ | ❌ |
| Supporto Multi-tema | ✅ 4 temi | ⚠️ 1-2 temi | ⚠️ Limitato |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Sistema di Plugin | ✅ | ❌ | ❌ |
| Responsive Mobile | ✅ | ⚠️ Parziale | ❌ |
| Animazioni Bellissime | ✅ | ❌ | ❌ |
| Docker Ready | ✅ | ✅ | ⚠️ |
| Zero Configurazione | ✅ | ❌ | ❌ |

---

## 🏗️ Architettura

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
│  │                    Stile TailwindCSS                      │   │
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

## 🚀 Inizio Rapido

### Prerequisiti

- Node.js 18+
- npm o yarn

### Installazione tramite npm

```bash
# Installa da npm
npm install @openclaw/dashboard

# Avvia il server (serve frontend + API integrati)
npx @openclaw/dashboard
```

Oppure installa globalmente:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Da Sorgente

```bash
# Clona la repository
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Installa le dipendenze
npm install

# Build del frontend
npm run build

# Avvia il server di produzione
npm start
```

Apri [http://localhost:3777](http://localhost:3777) nel tuo browser.

### Modalità Sviluppo

```bash
# Terminale 1: Avvia il server di sviluppo frontend con hot reload
npm run dev

# Terminale 2: Avvia il server API
npm run server
```

### Docker

```bash
# Usa Docker Compose (consigliato)
docker compose up -d

# Oppure build ed esegui manualmente
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Scorciatoie Tastiera

Premi `?` ovunque per vedere tutte le scorciatoie da tastiera.

| Scorciatoia | Azione |
|-------------|--------|
| `Ctrl+K` | Palette dei comandi |
| `Ctrl+/` | Attiva/disattiva sidebar |
| `G poi O` | Vai a Panoramica |
| `G poi S` | Vai a Sessioni |
| `G poi A` | Vai a Agenti |
| `G poi T` | Vai a Attività |
| `G poi ,` | Vai a Impostazioni |
| `T poi D` | Attiva/disattiva tema scuro |
| `T poi L` | Attiva/disattiva tema chiaro |
| `1-5` | Vai agli elementi di navigazione |

---

## 📊 Benchmark Prestazioni

| Metrica | Valore |
|---------|--------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
| Dimensione Bundle (gzipped) | ~180KB |
| Punteggio Lighthouse | 95+ |
| Latenza WebSocket | < 50ms |

---

## 🔒 Considerazioni sulla Sicurezza

- **Nessuna autenticazione predefinita** — Aggiungi il tuo middleware di autenticazione in produzione
- **CORS abilitato** — Configura gli origin consentiti per il tuo deployment
- **CSP consigliato** — Aggiungi intestazioni Content-Security-Policy
- **HTTPS obbligatorio** — Usa sempre HTTPS in produzione
- **Limitazione delle richieste** — Considera l'aggiunta di rate limiting per gli endpoint API

---

## 📁 Struttura del Progetto

```
openclaw-dashboard/
├── .github/               # Workflow GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # Pipeline CI
│   │   └── release.yml    # Automazione release
│   └── FUNDING.yml
├── docs/                  # Documentazione
│   └── API.md             # Riferimento API
├── server/                # Server backend
│   ├── index.js           # Server Express + WebSocket
│   ├── openclaw-api.js    # Wrapper API con dati mock
│   └── package.json
├── src/
│   ├── components/        # Componenti React
│   │   ├── Agents/        # Gestione agenti
│   │   ├── CommandPalette/# Palette comandi ⌘K
│   │   ├── Dashboard/     # Panoramica, grafici, metriche
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Pannello notifiche
│   │   ├── Sessions/      # Gestione sessioni
│   │   ├── Settings/      # Pagine impostazioni
│   │   ├── Tasks/         # Board attività
│   │   └── ui/            # Componenti UI riutilizzabili
│   ├── hooks/             # Hook React personalizzati
│   ├── i18n/              # Traduzioni (EN/ZH)
│   ├── lib/               # Utility, costanti
│   ├── pages/             # Componenti pagina
│   ├── plugins/           # Sistema di plugin
│   │   ├── index.js       # Gestore plugin
│   │   ├── examples/      # Plugin di esempio
│   │   └── README.md      # Documentazione plugin
│   ├── stores/            # Store Zustand
│   └── utils/             # Funzioni utility
├── public/                # Asset statici
├── Dockerfile             # Build Docker multi-stage
├── docker-compose.yml     # Configurazione Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 Endpoint API

Vedi [docs/API.md](docs/API.md) per la documentazione completa.

| Endpoint | Descrizione |
|----------|-------------|
| `GET /api/health` | Controllo salute |
| `GET /api/overview` | Statistiche dashboard + attività recente |
| `GET /api/sessions` | Tutte le sessioni con paginazione |
| `GET /api/sessions/:id` | Dettaglio sessione + cronologia |
| `GET /api/agents` | Tutti gli agenti |
| `GET /api/tasks` | Attività con stato |
| `GET /api/system` | Metriche di sistema |
| `GET /api/notifications` | Lista notifiche |
| `GET /api/heatmap` | Mappa di calore attività a 90 giorni |
| `WS /ws` | Aggiornamenti in tempo reale (ogni 3s) |

---

## 🏗️ Temi

La dashboard supporta 4 temi:

| Tema | Descrizione |
|------|-------------|
| **Dark** | Gradiente blu scuro (predefinito) |
| **Light** | Bianco pulito con grigio sottile |
| **AMOLED** | Nero puro per schermi OLED |
| **System** | Segue le preferenze del sistema operativo |

Personalizza i temi modificando le variabili CSS in `src/index.css`.

---

## 🌐 Internazionalizzazione

Attualmente supporta:
- 🇺🇸 Inglese
- 🇨🇳 Cinese (简体中文)

Aggiungi nuove lingue:
1. Creando un file JSON in `src/i18n/` (es. `ja.json`)
2. Aggiungendo la lingue al selettore della lingua
3. Usando `t('key')` per tutte le stringhe destinate all'utente

---

## 🔌 Sistema di Plugin

OpenClaw Dashboard supporta plugin per estendere le funzionalità:

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
    // Pulizia
  }
};
```

Vedi [src/plugins/README.md](src/plugins/README.md) per la documentazione completa.

---

## 🐳 Opzioni di Deployment

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Consigliato)

```bash
docker compose up -d
```

Vedi la [Guida al Deployment](docs/deployment.md) per istruzioni dettagliate.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Servizio Systemd

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

**Q: Posso usarlo con la mia istanza OpenClaw?**
R: Sì! Sostituisci i dati mock in `server/openclaw-api.js` con chiamate API reali.

**Q: Come aggiungo l'autenticazione?**
R: Aggiungi un middleware in `server/index.js`. Consigliamo Passport.js o JWT.

**Q: Posso personalizzare i temi?**
R: Certamente! Modifica le variabili CSS in `src/index.css`.

**Q: È pronto per la produzione?**
R: Sì, con autenticazione appropriata e intestazioni di sicurezza configurate.

**Q: Come posso contribuire?**
R: Vedi [CONTRIBUTING.md](CONTRIBUTING.md) per le linee guida.

---

## 🗺️ Roadmap

### ✅ Completato

| Versione | Novità |
|----------|--------|
| **v2.0** | 🎨 Rilascio iniziale — React + Vite, palette comandi ⌘K, 4 temi, i18n (EN/ZH), aggiornamenti tempo reale WebSocket |
| **v2.1** | 📊 Visualizzazione dati ricca (grafici, mappe di calore, indicatori), sistema di plugin, supporto Docker, ottimizzazioni prestazioni |

### 🚧 In Corso (v2.2)

- 🔔 **Notifiche Alert in Tempo Reale** — Alert personalizzabili basati su soglie con consegna multi-canale (email, webhook, in-app)
- 🧩 **Marketplace Plugin** — Sfoglia, installa e gestisci plugin della community direttamente dalla dashboard
- 👥 **Supporto Multi-utente** — Controllo accessi basato su ruoli (RBAC), gestione utenti e workspace di team
- 📈 **Analisi Avanzate** — Approfondimenti sulle prestazioni degli agenti, tracciamento costi e trend di utilizzo

### 🔮 Pianificato (v2.3+)

- 📱 **App Mobile** — App native iOS e Android per monitoraggio in movimento
- 🌐 **API Gateway** — Layer API REST/GraphQL unificato con rate limiting, caching e autenticazione
- 🤖 **Debugging Assistito da AI** — L'AI analizza i log e suggerisce soluzioni per i problemi degli agenti
- 🔄 **Integrazione CI/CD** — Supporto nativo per GitHub Actions, GitLab CI e pipeline Jenkins
- 📡 **Deployment Edge** — Agente leggero per dispositivi edge e scenari IoT
- 🎯 **Dashboard Personalizzate** — Builder drag-and-drop con libreria di widget

> 💡 Hai una richiesta di funzionalità? [Apri una issue](https://github.com/openclaw/openclaw-dashboard/issues) o partecipa alla discussione!

---

## 🤝 Contribuire

I contributi sono ben accetti! Leggi [CONTRIBUTING.md](CONTRIBUTING.md) prima di inviare una PR.

1. Fork la repository
2. Crea il tuo branch feature (`git checkout -b feature/amazing-feature`)
3. Commit delle modifiche (`git commit -m 'feat: Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

---

## Contributori

Grazie a queste meravigliose persone per i loro contributi:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Questo progetto segue la specifica [all-contributors](https://allcontributors.org). Contributi di qualsiasi tipo sono ben accetti!

### Aggiungere un Nuovo Contributore

Per aggiungere un nuovo contributore, usa il seguente comando:

```bash
npx all-contributors add <username> <contribution>
```

Ad esempio:

```bash
npx all-contributors add johndoe code,doc
```

Tipi di contributo disponibili: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licenza

Questo progetto è licenziato sotto la Licenza MIT — vedi il file [LICENSE](LICENSE) per i dettagli.

## 🙏 Ringraziamenti

- Ispirato da [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) e [Raycast](https://raycast.com)
- Costruito con amore per la community di OpenClaw

---

Fatto con ❤️ dal team OpenClaw

[![Grafico Storia Stelle](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
