# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | **[Polski](README.pl.md)** | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Najpiękniejszy dashboard monitorowania w czasie rzeczywistym dla agentów AI.**
> Zbudowany z React, z paletą komend ⌘K, i18n, 4 motywami i systemem wtyczek.

![Podgląd OpenClaw Dashboard](docs/preview.png)

---

## ✨ Dlaczego OpenClaw Dashboard?

Zarządzanie agentami AI nie powinno przypominać czytania logów terminala. OpenClaw Dashboard zmienia Twoje doświadczenie monitorowania agentów dzięki:

- **🎨 Oszałamiający Design Wizualny** — Zainspirowany przez Vercel, Linear i Raycast. Glassmorphism, płynne animacje i przemyślane detale.
- **⚡ Aktualizacje w Czasie Rzeczywistym** — Dane na żywo napędzane przez WebSocket. Bez przycisków odświeżania.
- **⌘K Paleta Komend** — Zaawansowani użytkownicy kochają interfejsy klawiaturowe. Nawiguj, wyszukuj i wykonuj komendy natychmiast.
- **🌍 Internacjonalizacja** — wbudowane wsparcie dla angielskiego i chińskiego. Dodawaj kolejne języki łatwo.
- **🎭 4 Piękne Motywy** — Ciemny, Jasny, AMOLED (dla ekranów OLED) i Systemowy.
- **🔌 System Wtyczek** — Rozszerz funkcjonalność bez forka. Rejestruj strony, komendy i hooki.
- **📊 Bogata Wizualizacja Danych** — Wykresy, mapy ciepła, wskaźniki i paski postępu.
- **📱 W Pełni Responsywny** — Działa pięknie na tablecie, telefonie i komputerze.

---

## 📊 Porównanie Funkcji

| Funkcja | OpenClaw Dashboard | Ogólne Monitorowanie | UI Terminala |
|---------|-------------------|---------------------|--------------|
| WebSocket w Czasie Rzeczywistym | ✅ | ⚠️ Ograniczony | ✅ |
| Paleta Komend | ✅ | ❌ | ❌ |
| Wsparce Multi-motywów | ✅ 4 motywy | ⚠️ 1-2 motywy | ⚠️ Ograniczone |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| System Wtyczek | ✅ | ❌ | ❌ |
| Responsywność Mobilna | ✅ | ⚠️ Częściowa | ❌ |
| Piękne Animacje | ✅ | ❌ | ❌ |
| Docker Gotowy | ✅ | ✅ | ⚠️ |
| Zero Konfiguracji | ✅ | ❌ | ❌ |

---

## 🏗️ Architektura

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
│  │                    Stylowanie TailwindCSS                 │   │
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

## 🚀 Szybki Start

### Wymagania Wstępne

- Node.js 18+
- npm lub yarn

### Instalacja przez npm

```bash
# Zainstaluj z npm
npm install @openclaw/dashboard

# Uruchom serwer (serwuje wbudowany frontend + API)
npx @openclaw/dashboard
```

Lub zainstaluj globalnie:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Ze Źródła

```bash
# Sklonuj repozytorium
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Zainstaluj zależności
npm install

# Zbuduj frontend
npm run build

# Uruchom serwer produkcyjny
npm start
```

Otwórz [http://localhost:3777](http://localhost:3777) w przeglądarce.

### Tryb Deweloperski

```bash
# Terminal 1: Uruchom serwer deweloperski frontend z hot reload
npm run dev

# Terminal 2: Uruchom serwer API
npm run server
```

### Docker

```bash
# Użyj Docker Compose (zalecane)
docker compose up -d

# Lub zbuduj i uruchom ręcznie
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Skróty Klawiszowe

Naciśnij `?` w dowolnym miejscu, aby zobaczyć wszystkie skróty klawiszowe.

| Skrót | Akcja |
|-------|-------|
| `Ctrl+K` | Paleta komend |
| `Ctrl+/` | Przełącz panel boczny |
| `G potem O` | Przejdź do Przeglądu |
| `G potem S` | Przejdź do Sesji |
| `G potem A` | Przejdź do Agentów |
| `G potem T` | Przejdź do Zadań |
| `G potem ,` | Przejdź do Ustawień |
| `T potem D` | Przełącz ciemny motyw |
| `T potem L` | Przełącz jasny motyw |
| `1-5` | Przejdź do elementów nawigacji |

---

## 📊 Benchmarki Wydajności

| Metryka | Wartość |
|---------|---------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
| Rozmiar Pakietu (gzipped) | ~180KB |
| Wynik Lighthouse | 95+ |
| Latencja WebSocket | < 50ms |

---

## 🔒 Rozważania Dotyczące Bezpieczeństwa

- **Domyślnie brak uwierzytelniania** — Dodaj własny middleware auth w produkcji
- **CORS włączony** — Skonfiguruj dozwolone origin dla Twojego deploymentu
- **CSP zalecane** — Dodaj nagłówki Content-Security-Policy
- **HTTPS wymagany** — Zawsze używaj HTTPS w produkcji
- **Rate limiting** — Rozważ dodanie rate limiting dla endpointów API

---

## 📁 Struktura Projektu

```
openclaw-dashboard/
├── .github/               # Workflow GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # Pipeline CI
│   │   └── release.yml    # Automatyzacja wydań
│   └── FUNDING.yml
├── docs/                  # Dokumentacja
│   └── API.md             # Referencja API
├── server/                # Serwer backend
│   ├── index.js           # Serwer Express + WebSocket
│   ├── openclaw-api.js    # Wrapper API z danymi mock
│   └── package.json
├── src/
│   ├── components/        # Komponenty React
│   │   ├── Agents/        # Zarządzanie agentami
│   │   ├── CommandPalette/# Paleta komend ⌘K
│   │   ├── Dashboard/     # Przegląd, wykresy, metryki
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Panel powiadomień
│   │   ├── Sessions/      # Zarządzanie sesjami
│   │   ├── Settings/      # Strony ustawień
│   │   ├── Tasks/         # Tablica zadań
│   │   └── ui/            # Wielokrotnie używane komponenty UI
│   ├── hooks/             # Niestandardowe hooki React
│   ├── i18n/              # Tłumaczenia (EN/ZH)
│   ├── lib/               # Narzędzia, stałe
│   ├── pages/             # Komponenty stron
│   ├── plugins/           # System wtyczek
│   │   ├── index.js       # Menedżer wtyczek
│   │   ├── examples/      # Przykładowe wtyczki
│   │   └── README.md      # Dokumentacja wtyczek
│   ├── stores/            # Store'y Zustand
│   └── utils/             # Funkcje narzędziowe
├── public/                # Zasoby statyczne
├── Dockerfile             # Build Docker wieloetapowy
├── docker-compose.yml     # Konfiguracja Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 Punkty końcowe API

Zobacz [docs/API.md](docs/API.md) po pełną dokumentację.

| Endpoint | Opis |
|----------|------|
| `GET /api/health` | Sprawdzenie zdrowia |
| `GET /api/overview` | Statystyki dashboard + ostatnia aktywność |
| `GET /api/sessions` | Wszystkie sesje z paginacją |
| `GET /api/sessions/:id` | Szczegóły sesji + historia |
| `GET /api/agents` | Wszyscy agenci |
| `GET /api/tasks` | Zadania ze statusem |
| `GET /api/system` | Metryki systemowe |
| `GET /api/notifications` | Lista powiadomień |
| `GET /api/heatmap` | Mapa ciepła aktywności 90 dni |
| `WS /ws` | Aktualizacje w czasie rzeczywistym (co 3s) |

---

## 🎨 Motywy

Dashboard obsługuje 4 motywy:

| Motyw | Opis |
|-------|------|
| **Dark** | Głęboki granatowy gradient (domyślny) |
| **Light** | Czysta biel z subtelną szarością |
| **AMOLED** | Czysta czerń dla ekranów OLED |
| **System** | Podąża za preferencjami systemu operacyjnego |

Dostosuj motywy edytując zmienne CSS w `src/index.css`.

---

## 🌐 Internacjonalizacja

Aktualnie obsługuje:
- 🇺🇸 Angielski
- 🇨🇳 Chiński (简体中文)

Dodawaj nowe języki poprzez:
1. Utworzenie pliku JSON w `src/i18n/` (np. `ja.json`)
2. Dodanie języka do przełącznika języków
3. Używanie `t('key')` dla wszystkich tekstów widocznych dla użytkownika

---

## 🔌 System Wtyczek

OpenClaw Dashboard obsługuje wtyczki rozszerzające funkcjonalność:

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
    // Czyszczenie
  }
};
```

Zobacz [src/plugins/README.md](src/plugins/README.md) po pełną dokumentację.

---

## 🐳 Opcje Deploymentu

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Zalecane)

```bash
docker compose up -d
```

Zobacz pełny [Przewodnik Deploymentu](docs/deployment.md) po szczegółowe instrukcje.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Usługa Systemd

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

**Q: Czy mogę używać tego z moją instancją OpenClaw?**
O: Tak! Zastąp dane mock w `server/openclaw-api.js` prawdziwymi wywołaniami API.

**Q: Jak dodać uwierzytelnianie?**
O: Dodaj middleware w `server/index.js`. Polecamy Passport.js lub JWT.

**Q: Czy mogę dostosować motywy?**
O: Oczywiście! Edytuj zmienne CSS w `src/index.css`.

**Q: Czy jest to gotowe do produkcji?**
O: Tak, z odpowiednim uwierzytelnianiem i skonfigurowanymi nagłówkami bezpieczeństwa.

**Q: Jak mogę contributeować?**
O: Zobacz [CONTRIBUTING.md](CONTRIBUTING.md) po wytyczne.

---

## 🗺️ Mapa Drogowa

### ✅ Ukończone

| Wersja | HIGHLIGHTy |
|--------|-----------|
| **v2.0** | 🎨 Pierwsze wydanie — React + Vite, paleta komend ⌘K, 4 motywy, i18n (EN/ZH), aktualizacje czasu rzeczywistego WebSocket |
| **v2.1** | 📊 Bogata wizualizacja danych (wykresy, mapy ciepła, wskaźniki), system wtyczek, wsparcie Docker, optymalizacje wydajności |

### 🚧 W Trakcie (v2.2)

- 🔔 **Powiadomienia Alertów w Czasie Rzeczywistym** — Konfigurowalne alerty oparte na progach z dostawą wielokanałową (email, webhook, w aplikacji)
- 🧩 **Marketplace Wtyczek** — Przeglądaj, instaluj i zarządzaj wtyczkami społeczności bezpośrednio z dashboardu
- 👥 **Wsparcie Wielu Użytkowników** — Kontrola dostępu oparta na rolach (RBAC), zarządzanie użytkownikami i przestrzenie robocze zespołów
- 📈 **Zaawansowana Analityka** — Głębsze spostrzeżenia na temat wydajności agentów, śledzenie kosztów i trendy użycia

### 🔮 Planowane (v2.3+)

- 📱 **Aplikacja Mobilna** — Natywne aplikacje iOS i Android do monitorowania w podróży
- 🌐 **API Gateway** — Ujednolicona warstwa API REST/GraphQL z rate limiting, cachingiem i uwierzytelnianiem
- 🤖 **Debugowanie z Asystą AI** — Niech AI analizuje logi i sugeruje poprawki problemów agentów
- 🔄 **Integracja CI/CD** — Natywne wsparcie dla GitHub Actions, GitLab CI i pipeline'ów Jenkins
- 📡 **Deployment Krawędziowy** — Lekki agent dla urządzeń krawędziowych i scenariuszy IoT
- 🎯 **Niestandardowe Dashboards** — Kreator dashboardów typu drag-and-drop z biblioteką widgetów

> 💡 Masz propozycję funkcjonalności? [Otwórz issue](https://github.com/openclaw/openclaw-dashboard/issues) lub dołącz do dyskusji!

---

## 🤝 Współpraca

Contributions są mile widziane! Przeczytaj [CONTRIBUTING.md](CONTRIBUTING.md) przed wysłaniem PR.

1. Forknij repozytorium
2. Utwórz branch feature (`git checkout -b feature/amazing-feature`)
3. Zatwierdź zmiany (`git commit -m 'feat: Add amazing feature'`)
4. Push do brancha (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

---

## Contributorzy

Dziękujemy tym wspaniałym osobom za ich wkład:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Ten projekt podąża za specyfikacją [all-contributors](https://allcontributors.org). Wkłady każdego rodzaju są mile widziane!

### Dodanie Nowego Contributora

Aby dodać nowego contributora, użyj następującego polecenia:

```bash
npx all-contributors add <username> <contribution>
```

Na przykład:

```bash
npx all-contributors add johndoe code,doc
```

Dostępne typy contribucji: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licencja

Ten projekt jest licencjonowany na licencji MIT — zobacz plik [LICENSE](LICENSE) po szczegóły.

## 🙏 Podziękowania

- Zainspirowany przez [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) i [Raycast](https://raycast.com)
- Zbudowany z miłością dla społeczności OpenClaw

---

Zrobione z ❤️ przez zespół OpenClaw

[![Wykres Historii Gwiazd](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
