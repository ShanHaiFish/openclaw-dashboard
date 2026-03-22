# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | **[Ελληνικά](README.el.md)** | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Το πιο όμορφο dashboard παρακολούθησης σε πραγματικό χρόνο για AI agents.**
> Φτιαγμένο με React, με παλέτα εντολών ⌘K, i18n, 4 θέματα και ένα σύστημα plugins.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Γιατί OpenClaw Dashboard;

Η διαχείριση AI agents δεν πρέπει να μοιάζει με την ανάγνωση αρχείων καταγραφής terminal. Το OpenClaw Dashboard μεταμορφώνει την εμπειρία παρακολούθησης agents με:

- **🎨 Εκπληκτική Οπτική Σχεδίαση** — Εμπνευσμένο από το Vercel, Linear και Raycast. Glassmorphism, ομαλές κινήσεις και προσεχτικές λεπτομέρειες.
- **⚡ Ενημερώσεις σε Πραγματικό Χρόνο** — Live δεδομένα μέσω WebSocket. Δεν χρειάζεται κουμπί ανανέωσης.
- **⌘K Παλέτα Εντολών** — Οι χρήστες-δύναμη αγαπούν τις διεπαφές πρώτα πληκτρολογίου. Πλοηγηθείτε, αναζητήστε και εκτελέστε εντολές άμεσα.
- **🌍 Διεθνοποίηση** — Ενσωμάτωση υποστήριξης για Αγγλικά και Κινέζικα. Προσθέστε περισσότερες γλώσσες εύκολα.
- **🎭 4 Όμορφα Θέματα** — Dark, Light, AMOLED (για οθόνες OLED) και System-aware.
- **🔌 Σύστημα Plugins** — Επεκτείνετε τη λειτουργικότητα χωρίς fork. Καταχωρήστε σελίδες, εντολές και hooks.
- **📊 Πλούσια Οπτικοποίηση Δεδομένων** — Γραφήματα, χάρτες θερμότητας, γραμμές και δείκτες προόδου.
- **📱 Πλήρως Προσαρμόσιμο** — Λειτουργεί υπέροχα σε κινητό, tablet και desktop.

---

## 📊 Σύγκριση Χαρακτηριστικών

| Χαρακτηριστικό | OpenClaw Dashboard | Γενική Παρακολούθηση | Terminal UI |
|----------------|-------------------|----------------------|-------------|
| Real-time WebSocket | ✅ | ⚠️ Περιορισμένο | ✅ |
| Command Palette | ✅ | ❌ | ❌ |
| Υποστήριξη Πολλαπλών Θεμάτων | ✅ 4 θέματα | ⚠️ 1-2 θέματα | ⚠️ Περιορισμένο |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Σύστημα Plugins | ✅ | ❌ | ❌ |
| Προσαρμογή σε Κινητό | ✅ | ⚠️ Μερική | ❌ |
| Όμορφες Κινήσεις | ✅ | ❌ | ❌ |
| Έτοιμο για Docker | ✅ | ✅ | ⚠️ |
| Μηδενική Ρύθμιση | ✅ | ❌ | ❌ |

---

## 🏗️ Αρχιτεκτονική

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

## 🚀 Γρήγορη Εκκίνηση

### Προϋποθέσεις

- Node.js 18+
- npm ή yarn

### Εγκατάσταση μέσω npm

```bash
# Εγκατάσταση από το npm
npm install @openclaw/dashboard

# Εκκίνηση του server (σερβίρει ενσωματωμένο frontend + API)
npx @openclaw/dashboard
```

Ή εγκατάσταση στο σύστημα:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Από τον πηγαίο κώδικα

```bash
# Κλωνοποίηση του αποθετηρίου
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Εγκατάσταση εξαρτήσεων
npm install

# Build του frontend
npm run build

# Εκκίνηση του production server
npm start
```

Ανοίξτε το [http://localhost:3777](http://localhost:3777) στον browser σας.

### Λειτουργία Ανάπτυξης

```bash
# Terminal 1: Εκκίνηση frontend dev server με hot reload
npm run dev

# Terminal 2: Εκκίνηση του API server
npm run server
```

### Docker

```bash
# Χρήση Docker Compose (συνιστάται)
docker compose up -d

# ή build και εκτέλεση μη αυτόματα
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Συντομεύσεις Πληκτρολογίου

Πατήστε `?` οπουδήποτε για να δείτε όλες τις συντομεύσεις.

| Συντόμευση | Ενέργεια |
|------------|----------|
| `Ctrl+K` | Παλέτα εντολών |
| `Ctrl+/` | Εναλλαγή πλευρικής μπάρας |
| `G then O` | Μετάβαση στην Επισκόπηση |
| `G then S` | Μετάβαση στις Συνεδρίες |
| `G then A` | Μετάβαση στους Agents |
| `G then T` | Μετάβαση στις Εργασίες |
| `G then ,` | Μετάβαση στις Ρυθμίσεις |
| `T then D` | Εναλλαγή dark θέματος |
| `T then L` | Εναλλαγή light θέματος |
| `1-5` | Άλμα στα στοιχεία πλοήγησης |

---

## 📊 Μετρήσεις Επιδόσεων

| Μετρική | Τιμή |
|---------|------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Μέγεθος Package (gzipped) | ~180KB |
| Βαθμολογία Lighthouse | 95+ |
| Καθυστέρηση WebSocket | < 50ms |

---

## 🔒 Εκστοχασμοί Ασφαλείας

- **Δεν υπάρχει έλεγχος ταυτότητας από προεπιλογή** — Προσθέστε δικό σας auth middleware στο production
- **CORS ενεργοποιημένο** — Ρυθμίστε τα επιτρεπόμενα origins για την ανάπτυξή σας
- **CSP συνιστάται** — Προσθέστε Content-Security-Policy headers
- **HTTPS απαραίτητο** — Χρησιμοποιείτε πάντα HTTPS στο production
- **Περιορισμός ρυθμού** — Εξετάστε την προσθήκη περιορισμού ρυθμού για τα API endpoints

---

## 📁 Δομή Έργου

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI pipeline
│   │   └── release.yml    # Release automation
│   └── FUNDING.yml
├── docs/                  # Τεκμηρίωση
│   └── API.md             # Αναφορά API
├── server/                # Backend server
│   ├── index.js           # Express + WebSocket server
│   ├── openclaw-api.js    # API wrapper με mock data
│   └── package.json
├── src/
│   ├── components/        # Συστατικά React
│   │   ├── Agents/        # Διαχείριση agents
│   │   ├── CommandPalette/# ⌘K παλέτα εντολών
│   │   ├── Dashboard/     # Επισκόπηση, γραφήματα, μετρικά
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Πίνακας ειδοποιήσεων
│   │   ├── Sessions/      # Διαχείριση συνεδριών
│   │   ├── Settings/      # Σελίδες ρυθμίσεων
│   │   ├── Tasks/         # Ταμλό εργασιών
│   │   └── ui/            # Επαναχρησιμοποιήσιμα συστατικά UI
│   ├── hooks/             # Προσαρμοσμένα React hooks
│   ├── i18n/              # Μεταφράσεις (EN/ZH)
│   ├── lib/               # Βοηθητικά προγράμματα, σταθερές
│   ├── pages/             # Συστατικά σελίδων
│   ├── plugins/           # Σύστημα plugins
│   │   ├── index.js       # Διαχειριστής plugins
│   │   ├── examples/      # Παραδείγματα plugins
│   │   └── README.md      # Τεκμηρίωση plugins
│   ├── stores/            # Αποθήκες Zustand
│   └── utils/             # Βοηθητικά προγράμματα
├── public/                # Στατικά στοιχεία
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Διαμόρφωση Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API Endpoints

Δείτε το [docs/API.md](docs/API.md) για πλήρη τεκμηρίωση.

| Endpoint | Περιγραφή |
|----------|-----------|
| `GET /api/health` | Έλεγχος υγείας |
| `GET /api/overview` | Στατιστικά dashboard + πρόσφατη δραστηριότητα |
| `GET /api/sessions` | Όλες οι συνεδρίες με pagination |
| `GET /api/sessions/:id` | Λεπτομέρεια συνεδρίας + ιστορικό |
| `GET /api/agents` | Όλοι οι agents |
| `GET /api/tasks` | Εργασίες με κατάσταση |
| `GET /api/system` | Μετρικά συστήματος |
| `GET /api/notifications` | Λίστα ειδοποιήσεων |
| `GET /api/heatmap` | Χάρτης θερμότητας δραστηριότητας 90 ημερών |
| `WS /ws` | Ενημερώσεις σε πραγματικό χρόνο (κάθε 3 δευτερόλεπτα) |

---

## 🎨 Θέματα

Το dashboard υποστηρίζει 4 θέματα:

| Θέμα | Περιγραφή |
|------|-----------|
| **Dark** | Βαθύ ναυτικό gradient (προεπιλογή) |
| **Light** | Καθαρό λευκό με απαλό γκρι |
| **AMOLED** | Καθαρό μαύρο για οθόνες OLED |
| **System** | Ακολουθεί τις προτιμήσεις του λειτουργικού συστήματος |

Προσαρμόστε τα θέματα επεξεργαζόμενοι τις μεταβλητές CSS στο `src/index.css`.

---

## 🌐 Διεθνοποίηση

Υποστηρίζει προς το παρόν:
- 🇺🇸 Αγγλικά (English)
- 🇨🇳 Κινέζικα (简体中文)

Προσθέστε νέες γλώσσες με:
1. Δημιουργία ενός αρχείου JSON στο `src/i18n/` (π.χ., `ja.json`)
2. Προσθήκη της γλώσσας στον αλλαγέα γλωσσών
3. Χρήση του `t('key')` για όλα τα strings που εμφανίζονται στον χρήστη

---

## 🔌 Σύστημα Plugins

Το OpenClaw Dashboard υποστηρίζει plugins για την επέκταση της λειτουργικότητας:

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
    // Εκκαθάριση
  }
};
```

Δείτε το [src/plugins/README.md](src/plugins/README.md) για πλήρη τεκμηρίωση.

---

## 🐳 Επιλογές Ανάπτυξης

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Συνιστάται)

```bash
docker compose up -d
```

Δείτε τον πλήρη [Οδηγό Ανάπτυξης](docs/deployment.md) για λεπτομερείς οδηγίες.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Υπηρεσία Systemd

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

## ❓ Συχνές Ερωτήσεις

**Ε: Μπορώ να το χρησιμοποιήσω με τη δική μου παρουσίαση OpenClaw;**
Α: Ναι! Αντικαταστήστε τα mock data στο `server/openclaw-api.js` με πραγματικά API calls.

**Ε: Πώς προσθέτω έλεγχο ταυτότητας;**
Α: Προσθέστε middleware στο `server/index.js`. Συνιστούμε το Passport.js ή JWT.

**Ε: Μπορώ να προσαρμόσω τα θέματα;**
Α: Φυσικά! Επεξεργαστείτε τις μεταβλητές CSS στο `src/index.css`.

**Ε: Είναι έτοιμο για production;**
Α: Ναι, με σωστά ρυθμισμένο έλεγχο ταυτότητας και headers ασφαλείας.

**Ε: Πώς συμβάλλω;**
Α: Δείτε το [CONTRIBUTING.md](CONTRIBUTING.md) για οδηγίες.

---

## 🗺️ Χάρτης Πορείας

### ✅ Ολοκληρωμένα

| Έκδοση | Κύρια Χαρακτηριστικά |
|--------|---------------------|
| **v2.0** | 🎨 Αρχική κυκλοφορία — React + Vite, ⌘K παλέτα εντολών, 4 θέματα, i18n (EN/ZH), Ενημερώσεις real-time μέσω WebSocket |
| **v2.1** | 📊 Πλούσια οπτικοποίηση δεδομένων (γραφήματα, χάρτες θερμότητας, γραμμές), σύστημα plugins, υποστήριξη Docker, βελτιώσεις επιδόσεων |

### 🚧 Σε Εξέλιξη (v2.2)

- 🔔 **Ειδοποιήσεις Προειδοποιήσεων σε Πραγματικό Χρόνο** — Προσαρμόσιμες προειδοποιήσεις βασισμένες σε όρια με πολλαπλά κανάλια παράδοσης (email, webhook, εντός εφαρμογής)
- 🧩 **Αγορά Plugins** — Περιηγηθείτε, εγκαταστήστε και διαχειριστείτε community plugins απευθείας από το dashboard
- 👥 **Υποστήριξη Πολλαπλών Χρηστών** — Έλεγχος πρόσβασης βασισμένος σε ρόλους (RBAC), διαχείριση χρηστών και εργασιακοί χώροι ομάδων
- 📈 **Προχωρημένη Αναλυτική** — Βαθύτερες πληροφορίες για την απόδοση των agents, παρακολούθηση κόστους και τάσεις χρήσης

### 🔮 Σχεδιασμένα (v2.3+)

- 📱 **Εφαρμογή Κινητού** — Εγγενείς εφαρμογές iOS & Android για παρακολούθηση σε κίνηση
- 🌐 **API Gateway** — Ενιαίο API layer REST/GraphQL με περιορισμό ρυθμού, caching και έλεγχο ταυτότητας
- 🤖 **Ανίχνευση Σφαλμάτων με Βοήθεια AI** — Αφήστε το AI να αναλύει logs και να προτείνει διορθώσεις για προβλήματα agents
- 🔄 **Ενσωμάτωση CI/CD** — Εγγενής υποστήριξη για GitHub Actions, GitLab CI και Jenkins pipelines
- 📡 **Ανάπτυξη στο Περιθώριο** — Ελαφρύ agent για συσκευές περιθωρίου και σενάρια IoT
- 🎯 **Προσαρμοσμένα Dashboards** — Δημιουργός dashboards drag-and-drop με βιβλιοθήκη widgets

> 💈 Έχετε μια πρόταση για χαρακτηριστικό; [Ανοίξτε ένα issue](https://github.com/openclaw/openclaw-dashboard/issues) ή συμμετέχετε στη συζήτηση!

---

## 🤝 Συμβολή

Οι συμβολές είναι ευπρόσδεκτες! Παρακαλώ διαβάστε το [CONTRIBUTING.md](CONTRIBUTING.md) πριν υποβάλετε ένα PR.

1. Fork το αποθετήριο
2. Δημιουργήστε τον κλάδο χαρακτηριστικών σας (`git checkout -b feature/amazing-feature`)
3. Κάντε commit τις αλλαγές σας (`git commit -m 'feat: Add amazing feature'`)
4. Push στον κλάδο (`git push origin feature/amazing-feature`)
5. Ανοίξτε ένα Pull Request

---

## Συνεισφέροντες

Ευχαριστούμε αυτά τα υπέροχα άτομα για τις συμβολές τους:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Αυτό το έργο ακολουθεί τη προδιαγραφή [all-contributors](https://allcontributors.org). Οι συμβολές κάθε τύπου είναι ευπρόσδεκτες!

### Προσθήκη Νέου Συνεισφέροντα

Για να προσθέσετε έναν νέο συνεισφέροντα, χρησιμοποιήστε την ακόλουθη εντολή:

```bash
npx all-contributors add <username> <contribution>
```

Για παράδειγμα:

```bash
npx all-contributors add johndoe code,doc
```

Διαθέσιμοι τύποι συμβολών: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Άδεια

Αυτό το έργο είναι υπό άδεια MIT - δείτε το αρχείο [LICENSE](LICENSE) για λεπτομέρειες.

## 🙏 Ευχαριστίες

- Εμπνευσμένο από το [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) και [Raycast](https://raycast.com)
- Φτιαγμένο με αγάπη για την κοινότητα OpenClaw

---

Δημιουργήθηκε με ❤️ από την ομάδα OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
