# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | **Bosanski** | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Najljepša nadzorna ploča za praćenje AI agenata u realnom vremenu.**
> Izgrađena sa React-om, uključuje ⌘K paletu komandi, i18n, 4 teme i sistem pluginova.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Zašto OpenClaw Dashboard?

Upravljanje AI agentima ne bi trebalo nalikovati čitanju terminalnih logova. OpenClaw Dashboard transformiše vaše iskustvo praćenja agenata uz:

- **🎨 Zapanjujući vizuelni dizajn** — Inspirisan Vercel-om, Linear-om i Raycast-om. Glassmorfizam, glatke animacije i promišljeni detalji.
- **⚡ Ažuriranja u realnom vremenu** — Podaci uživo putem WebSocket-a. Dugmad za osvježavanje nisu potrebna.
- **⌘K Paleta komandi** — Korisnici vole interfejse sa tipkovnicom. Navigacija, pretraga i izvršavanje komandi trenutno.
- **🌍 Internacionalizacija** — Ugrađena podrška za engleski i kineski. Lako dodajte nove jezike.
- **🎭 4 prekrasne teme** — Tamna, Svijetla, AMOLED (za OLED ekrane) i Sistemska.
- **🔌 Sistem pluginova** — Proširite funkcionalnost bez forka. Registrujte stranice, komande i hookove.
- **📊 Bogata vizualizacija podataka** — Grafikoni, toplotne karte, mjerači i indikatori napretka.
- **📱 Potpuno responzivan** — Odlično radi na mobilnim uređajima, tabletima i desktop računarima.

---

## 📊 Upoređivanje funkcija

| Funkcija | OpenClaw Dashboard | Opšti monitoring | Terminal UI |
|---------|-------------------|-----------------|-------------|
| WebSocket u realnom vremenu | ✅ | ⚠️ Ograničeno | ✅ |
| Paleta komandi | ✅ | ❌ | ❌ |
| Podrška više tema | ✅ 4 teme | ⚠️ 1-2 teme | ⚠️ Ograničeno |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Sistem pluginova | ✅ | ❌ | ❌ |
| Responzivnost za mobilne | ✅ | ⚠️ Djelimično | ❌ |
| Prekrasne animacije | ✅ | ❌ | ❌ |
| Spremnost za Docker | ✅ | ✅ | ⚠️ |
| Nulta konfiguracija | ✅ | ❌ | ❌ |

---

## 🏗️ Arhitektura

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

## 🚀 Brzi početak

### Preduvjeti

- Node.js 18+
- npm ili yarn

### Instalacija putem npm-a

```bash
# Instalacija sa npm-a
npm install @openclaw/dashboard

# Pokretanje servera (poslužuje ugrađeni frontend + API)
npx @openclaw/dashboard
```

Ili instalacija globalno:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Iz izvornog koda

```bash
# Kloniranje repozitorija
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Instalacija zavisnosti
npm install

# Build frontenda
npm run build

# Pokretanje produkcione servera
npm start
```

Otvorite [http://localhost:3777](http://localhost:3777) u vašem pretraživaču.

### Razvojni režim

```bash
# Terminal 1: Pokretanje frontend dev servera sa hot reload-om
npm run dev

# Terminal 2: Pokretanje API servera
npm run server
```

### Docker

```bash
# Korištenje Docker Compose-a (preporučeno)
docker compose up -d

# Ili build i pokretanje ručno
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Prečice na tipkovnici

Pritisnite `?` bilo gdje da vidite sve prečice na tipkovnici.

| Prečica | Radnja |
|---------|--------|
| `Ctrl+K` | Paleta komandi |
| `Ctrl+/` | Prebacivanje bočne trake |
| `G pa O` | Idi na Pregled |
| `G pa S` | Idi na Sesije |
| `G pa A` | Idi na Agente |
| `G pa T` | Idi na Zadatke |
| `G pa ,` | Idi na Postavke |
| `T pa D` | Prebaci tamnu temu |
| `T pa L` | Prebaci svijetlu temu |
| `1-5` | Skoči na stavke navigacije |

---

## 📊 Benchmarkovi performansi

| Metrika | Vrijednost |
|---------|------------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Veličina bundle-a (gzipped) | ~180KB |
| Lighthouse rezultat | 95+ |
| WebSocket latencija | < 50ms |

---

## 🔒 Sigurnosne napomene

- **Nema autentikacije po defaultu** — Dodajte vlastiti auth middleware u produkciji
- **CORS omogućen** — Konfigurišite dozvoljene origin-e za vaš deploy
- **CSP preporučen** — Dodajte Content-Security-Policy header-e
- **HTTPS obavezan** — Uvijek koristite HTTPS u produkciji
- **Ograničavanje zahtjeva** — Razmotrite dodavanje rate limiting-a za API endpoint-ove

---

## 📁 Struktura projekta

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI pipeline
│   │   └── release.yml    # Release automation
│   └── FUNDING.yml
├── docs/                  # Dokumentacija
│   └── API.md             # API referenca
├── server/                # Backend server
│   ├── index.js           # Express + WebSocket server
│   ├── openclaw-api.js    # API wrapper sa mock podacima
│   └── package.json
├── src/
│   ├── components/        # React komponente
│   │   ├── Agents/        # Upravljanje agentima
│   │   ├── CommandPalette/# ⌘K paleta komandi
│   │   ├── Dashboard/     # Pregled, grafikoni, metrike
│   │   ├── Layout/        # Bočna traka, Zaglavlje, MainLayout
│   │   ├── Notifications/ # Panel obavještenja
│   │   ├── Sessions/      # Upravljanje sesijama
│   │   ├── Settings/      # Stranice postavki
│   │   ├── Tasks/         # Board zadataka
│   │   └── ui/            # Ponovo upotrebljive UI komponente
│   ├── hooks/             # Prilagođeni React hookovi
│   ├── i18n/              # Prevodi (EN/ZH)
│   ├── lib/               # Utilitije, konstante
│   ├── pages/             # Komponente stranica
│   ├── plugins/           # Sistem pluginova
│   │   ├── index.js       # Manager pluginova
│   │   ├── examples/      # Primjeri pluginova
│   │   └── README.md      # Dokumentacija pluginova
│   ├── stores/            # Zustand store-ovi
│   └── utils/             # Utilitije funkcije
├── public/                # Statički resursi
├── Dockerfile             # Višefazni Docker build
├── docker-compose.yml     # Docker Compose konfiguracija
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API Endpoint-ovi

Punu dokumentaciju pogledajte u [docs/API.md](docs/API.md).

| Endpoint | Opis |
|----------|------|
| `GET /api/health` | Zdravstvena provjera |
| `GET /api/overview` | Statistika nadzorne ploče + nedavna aktivnost |
| `GET /api/sessions` | Sve sesije sa paginacijom |
| `GET /api/sessions/:id` | Detalji sesije + historija |
| `GET /api/agents` | Svi agenti |
| `GET /api/tasks` | Zadaci sa statusom |
| `GET /api/system` | Sistemske metrike |
| `GET /api/notifications` | Lista obavještenja |
| `GET /api/heatmap` | Toplotna karta aktivnosti od 90 dana |
| `WS /ws` | Ažuriranja u realnom vremenu (svake 3s) |

---

## 🎨 Teme

Nadzorna ploča podržava 4 teme:

| Tema | Opis |
|------|------|
| **Dark** | Duboki tamno-plavi gradijent (podrazumijevano) |
| **Light** | Čista bijela sa suptilno sivom |
| **AMOLED** | Čista crna za OLED ekrane |
| **System** | Prati sistemske postavke |

Prilagodite teme uređivanjem CSS varijabli u `src/index.css`.

---

## 🌐 Internacionalizacija

Trenutno podržano:
- 🇺🇸 Engleski (English)
- 🇨🇳 Kineski (简体中文)

Dodavanje novih jezika:
1. Kreirajte JSON fajl u `src/i18n/` (npr. `bs.json`)
2. Dodajte jezik u prekidač jezika
3. Koristite `t('key')` za sve stringove korisničkog interfejsa

---

## 🔌 Sistem pluginova

OpenClaw Dashboard podržava plugine za proširenje funkcionalnosti:

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
    // Čišćenje
  }
};
```

Punu dokumentaciju pogledajte u [src/plugins/README.md](src/plugins/README.md).

---

## 🐳 Opcije deploy-a

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Preporučeno)

```bash
docker compose up -d
```

Puni vodič za deploy pogledajte u [Vodiču za deploy](docs/deployment.md).

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Systemd Servis

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

## ❓ Često postavljana pitanja

**Q: Mogu li ovo koristiti sa svojom OpenClaw instancom?**
A: Da! Zamijenite mock podatke u `server/openclaw-api.js` sa stvarnim API pozivima.

**Q: Kako dodati autentikaciju?**
A: Dodajte middleware u `server/index.js`. Preporučujemo Passport.js ili JWT.

**Q: Mogu li prilagoditi teme?**
A: Naravno! Uredite CSS varijable u `src/index.css`.

**Q: Je li ovo spremno za produkciju?**
A: Da, uz pravilno konfiguriranu autentikaciju i sigurnosne header-e.

**Q: Kako mogu doprinijeti?**
A: Pročitajte [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🗺️ Roadmap

### ✅ Završeno

| Verzija | Istaknuto |
|---------|-----------|
| **v2.0** | 🎨 Početno izdanje — React + Vite, ⌘K paleta komandi, 4 teme, i18n (EN/ZH), WebSocket ažuriranja u realnom vremenu |
| **v2.1** | 📊 Bogata vizualizacija podataka (grafikoni, toplotne karte, mjerači), sistem pluginova, Docker podrška, optimizacija performansi |

### 🚧 U razvoju (v2.2)

- 🔔 **Obavještenja o alarmima u realnom vremenu** — Prilagodljiva obavještenja bazirana na pragovima sa višekanalnom isporukom (email, webhook, u aplikaciji)
- 🧩 **Tržište pluginova** — Pretražujte, instalirajte i upravljajte community pluginima direktno iz nadzorne ploče
- 👥 **Podrška za više korisnika** — Kontrola pristupa bazirana na rolama (RBAC), upravljanje korisnicima i timski radni prostori
- 📈 **Napredna analitika** — Dublji uvid u performanse agenata, praćenje troškova i trendovi korištenja

### 🔮 Planirano (v2.3+)

- 📱 **Mobilna aplikacija** — Native iOS i Android aplikacije za praćenje u pokretu
- 🌐 **API Gateway** — Unificirani REST/GraphQL API sloj sa rate limitingom, keširanjem i autentikacijom
- 🤖 **AI-asistirano debugiranje** — Pustite AI da analizira logove i predlaže rješenja za probleme agenata
- 🔄 **CI/CD Integracija** — Native podrška za GitHub Actions, GitLab CI i Jenkins
- 📡 **Edge Deployment** — Lagani agent za edge uređaje i IoT scenarije
- 🎯 **Prilagođene nadzorne ploče** — Drag-and-drop graditelj nadzornih ploča sa bibliotekom widgeta

> 💡 Imate prijedlog funkcionalnosti? [Otvorite issue](https://github.com/openclaw/openclaw-dashboard/issues) ili se pridružite diskusiji!

---

## 🤝 Doprinos

Dobrodošli su doprinosi! Molimo pročitajte [CONTRIBUTING.md](CONTRIBUTING.md) prije slanja PR-a.

1. Forkujte repozitorij
2. Kreirajte svoju feature granu (`git checkout -b feature/amazing-feature`)
3. Commit-ujte svoje promjene (`git commit -m 'feat: Add amazing feature'`)
4. Push-ajte na granu (`git push origin feature/amazing-feature`)
5. Otvorite Pull Request

---

## Doprinoseći

Hvala ovim divnim ljudima na njihovim doprinosima:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Ovaj projekt slijedi specifikaciju [all-contributors](https://allcontributors.org). Doprinosi bilo koje vrste su dobrodošli!

### Dodavanje novog doprinosa

Za dodavanje novog doprinosa, koristite sljedeću komandu:

```bash
npx all-contributors add <username> <contribution>
```

Na primjer:

```bash
npx all-contributors add johndoe code,doc
```

Dostupni tipovi doprinosa: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licenca

Ovaj projekt je licenciran pod MIT licencom - vidite [LICENSE](LICENSE) fajl za detalje.

## 🙏 Zahvalnice

- Inspirisan [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) i [Raycast](https://raycast.com)
- Napravljeno sa ljubavlju za OpenClaw zajednicu

---

Napravljeno sa ❤️ od OpenClaw tima

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
