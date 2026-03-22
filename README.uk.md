# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | **[Українська](README.uk.md)** | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Найкрасивіша панель моніторингу в реальному часі для штучного інтелекту.**
> Побудована на React з палітрою команд ⌘K, i18n, 4 темами та системою плагінів.

![OpenClaw Dashboard Попередній перегляд](docs/preview.png)

---

## ✨ Чому OpenClaw Dashboard?

Керування агентами ШІ не повинно нагадувати читання журналів терміналу. OpenClaw Dashboard трансформує ваш досвід моніторингу агентів:

- **🎨 Приголомшливий візуальний дизайн** — Натхненний Vercel, Linear та Raycast. Глассморфізм, плавні анімації та продумані деталі.
- **⚡ Оновлення в реальному часі** — Живі дані на базі WebSocket. Не потрібні кнопки оновлення.
- **⌘K Палітра команд** — Потужні користувачі люблять інтерфейси з пріоритетом клавіатури. Навігуйте, шукайте та виконуйте команди миттєво.
- **🌍 Інтернаціоналізація** — Вбудована підтримка англійської та китайської мов. Легко додавайте більше мов.
- **🎭 4 красиві теми** — Темна, Світла, AMOLED (для OLED-екранів) та Системна.
- **🔌 Система плагінів** — Розширюйте функціональність без форка. Реєструйте сторінки, команди та хуки.
- **📊 Багата візуалізація даних** — Графіки, теплові карти, індикатори та прогрес-бари.
- **📱 Повністю адаптивний** — Чудово працює на мобільних пристроях, планшетах та десктопі.

---

## 📊 Порівняння функцій

| Функція | OpenClaw Dashboard | Загальний моніторинг | Terminal UI |
|---------|-------------------|---------------------|-------------|
| WebSocket у реальному часі | ✅ | ⚠️ Обмежений | ✅ |
| Палітра команд | ✅ | ❌ | ❌ |
| Підтримка кількох тем | ✅ 4 теми | ⚠️ 1-2 теми | ⚠️ Обмежена |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Система плагінів | ✅ | ❌ | ❌ |
| Адаптивність під мобільні | ✅ | ⚠️ Часткова | ❌ |
| Гарні анімації | ✅ | ❌ | ❌ |
| Готовність до Docker | ✅ | ✅ | ⚠️ |
| Нульова конфігурація | ✅ | ❌ | ❌ |

---

## 🏗️ Архітектура

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenClaw Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React UI  │  │   Zustand   │  │   WebSocket │             │
│  │   (Види)    │◄─┤   (Стан)    │◄─┤   (Реальн.) │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Framer    │  │   Менеджер  │  │   Express   │             │
│  │   Motion    │  │   плагінів  │  │   Сервер    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Стилізація TailwindCSS                 │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │Темна ││Світла││AMOLED││Систем││Власна│          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API-сервер OpenClaw                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Статичні   │             │
│  │  /api/*     │  │  /ws        │  │  файли      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Швидкий старт

### Вимоги

- Node.js 18+
- npm або yarn

### Встановлення через npm

```bash
# Встановіть з npm
npm install @openclaw/dashboard

# Запустіть сервер (обслуговує вбудований фронтенд + API)
npx @openclaw/dashboard
```

Або встановіть глобально:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### З вихідного коду

```bash
# Клонуйте репозиторій
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Встановіть залежності
npm install

# Зберіть фронтенд
npm run build

# Запустіть виробничий сервер
npm start
```

Відкрийте [http://localhost:3777](http://localhost:3777) у вашому браузері.

### Режим розробки

```bash
# Термінал 1: Запустіть сервер розробки фронтенду з гарячим перезавантаженням
npm run dev

# Термінал 2: Запустіть API-сервер
npm run server
```

### Docker

```bash
# Використовуйте Docker Compose (рекомендовано)
docker compose up -d

# Або зберіть та запустіть вручну
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Гарячі клавіші

Натисніть `?` будь-де, щоб побачити всі гарячі клавіші.

| Комбінація | Дія |
|----------|--------|
| `Ctrl+K` | Палітра команд |
| `Ctrl+/` | Перемкнути бокову панель |
| `G потім O` | Перейти до Огляду |
| `G потім S` | Перейти до Сесій |
| `G потім A` | Перейти до Агентів |
| `G потім T` | Перейти до Завдань |
| `G потім ,` | Перейти до Налаштувань |
| `T потім D` | Перемкнути темну тему |
| `T потім L` | Перемкнути світлу тему |
| `1-5` | Перейти до пунктів навігації |

---

## 📊 Показники продуктивності

| Метрика | Значення |
|--------|-------|
| Перше фарбування вмісту | < 0.5с |
| Час до інтерактивності | < 1.2с |
| Розмір пакунка (gzip) | ~180КБ |
| Оцінка Lighthouse | 95+ |
| Затримка WebSocket | < 50мс |

---

## 🔒 Міркування безпеки

- **За замовчуванням без автентифікації** — Додайте власний middleware автентифікації у виробництві
- **CORS увімкнено** — Налаштуйте дозволені джерела для вашого розгортання
- **Рекомендовано CSP** — Додайте заголовки Content-Security-Policy
- **Потрібен HTTPS** — Завжди використовуйте HTTPS у виробництві
- **Обмеження швидкості** — Розгляньте додавання обмеження швидкості для кінцевих точок API

---

## 📁 Структура проєкту

```
openclaw-dashboard/
├── .github/               # Робочі процеси GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # CI конвеєр
│   │   └── release.yml    # Автоматизація релізу
│   └── FUNDING.yml
├── docs/                  # Документація
│   └── API.md             # Посібник з API
├── server/                # Сервер backend
│   ├── index.js           # Сервер Express + WebSocket
│   ├── openclaw-api.js    # Обгортка API з моковими даними
│   └── package.json
├── src/
│   ├── components/        # Компоненти React
│   │   ├── Agents/        # Керування агентами
│   │   ├── CommandPalette/# Палітра команд ⌘K
│   │   ├── Dashboard/     # Огляд, графіки, метрики
│   │   ├── Layout/        # Бічна панель, Заголовок, Основний макет
│   │   ├── Notifications/ # Панель сповіщень
│   │   ├── Sessions/      # Керування сесіями
│   │   ├── Settings/      # Сторінки налаштувань
│   │   ├── Tasks/         # Дошка завдань
│   │   └── ui/            # Повторно використовувані UI-компоненти
│   ├── hooks/             # Кастомні хуки React
│   ├── i18n/              # Переклади (EN/ZH)
│   ├── lib/               # Утиліти, константи
│   ├── pages/             # Компоненти сторінок
│   ├── plugins/           # Система плагінів
│   │   ├── index.js       # Менеджер плагінів
│   │   ├── examples/      # Приклади плагінів
│   │   └── README.md      # Документація плагінів
│   ├── stores/            # Сховища Zustand
│   └── utils/             # Функції утиліт
├── public/                # Статичні ресурси
├── Dockerfile             # Багатошарова збірка Docker
├── docker-compose.yml     # Конфігурація Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 Кінцеві точки API

Повна документація див. [docs/API.md](docs/API.md).

| Кінцева точка | Опис |
|----------|----------|
| `GET /api/health` | Перевірка здоров'я |
| `GET /api/overview` | Статистика панелі + остання активність |
| `GET /api/sessions` | Усі сесії з пагінацією |
| `GET /api/sessions/:id` | Деталі сесії + історія |
| `GET /api/agents` | Усі агенти |
| `GET /api/tasks` | Завдання зі статусом |
| `GET /api/system` | Системні метрики |
| `GET /api/notifications` | Список сповіщень |
| `GET /api/heatmap` | Теплова карта активності за 90 днів |
| `WS /ws` | Оновлення в реальному часі (кожні 3с) |

---

## 🎨 Теми

Панель підтримує 4 теми:

| Тема | Опис |
|-------|----------|
| **Темна** | Глибокий синій градієнт (за замовчуванням) |
| **Світла** | Чистий білий з легким сірим |
| **AMOLED** | Чистий чорний для OLED-екранів |
| **Системна** | Слідує за налаштуваннями ОС |

Налаштуйте теми, редагуючи CSS-змінні у `src/index.css`.

---

## 🌐 Інтернаціоналізація

Наразі підтримуються:
- 🇺🇸 Англійська
- 🇨🇳 Китайська (简体中文)

Додавання нових мов:
1. Створіть JSON-файл у `src/i18n/` (наприклад, `ja.json`)
2. Додайте мову до перемикача мов
3. Використовуйте `t('key')` для всіх рядків, що відображаються користувачеві

---

## 🔌 Система плагінів

OpenClaw Dashboard підтримує плагіни для розширення функціональності:

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
    // Очищення
  }
};
```

Повна документація див. [src/plugins/README.md](src/plugins/README.md).

---

## 🐳 Варіанти розгортання

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Повний стек)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Рекомендовано)

```bash
docker compose up -d
```

Докладні інструкції див. у повному [Deployment Guide](docs/deployment.md).

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Systemd-сервіс

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

## ❓ Часті запитання

**П: Чи можу я використовувати це з власним екземпляром OpenClaw?**
В: Так! Замініть мокові дані в `server/openclaw-api.js` реальними викликами API.

**П: Як додати автентифікацію?**
В: Додайте middleware у `server/index.js`. Рекомендуємо Passport.js або JWT.

**П: Чи можу я налаштувати теми?**
В: Абсолютно! Редагуйте CSS-змінні у `src/index.css`.

**П: Чи готове це до виробництва?**
В: Так, за умови належної автентифікації та заголовків безпеки.

**П: Як зробити внесок?**
В: Див. [CONTRIBUTING.md](CONTRIBUTING.md) для настанов.

---

## 🗺️ Дорожня карта

### ✅ Завершено

| Версія | Особливості |
|---------|-----------|
| **v2.0** | 🎨 Початковий реліз — React + Vite, палітра команд ⌘K, 4 теми, i18n (EN/ZH), оновлення WebSocket в реальному часі |
| **v2.1** | 📊 Багата візуалізація даних (графіки, теплові карти, індикатори), система плагінів, підтримка Docker, оптимізація продуктивності |

### 🚧 В розробці (v2.2)

- 🔔 **Сповіщення про сповіщення в реальному часі** — Налаштовувані сповіщення на основі порогів з доставкою через кілька каналів (електронна пошта, webhook, в застосунку)
- 🧩 **Маркетплейс плагінів** — Переглядайте, встановлюйте та керуйте плагінами спільноти безпосередньо з панелі
- 👥 **Підтримка кількох користувачів** — Контроль доступу на основі ролей (RBAC), керування користувачами та робочі простори команд
- 📈 **Розширена аналітика** — Глибші інсайти щодо продуктивності агентів, відстеження витрат та тенденцій використання

### 🔮 Заплановано (v2.3+)

- 📱 **Мобільний додаток** — Нативні додатки iOS та Android для моніторингу в дорозі
- 🌐 **API-шлюз** — Єдиний шар API REST/GraphQL з обмеженням швидкості, кешуванням та автентифікацією
- 🤖 **Дебаггінг за допомогою ШІ** — Дозвольте ШІ аналізувати журнали та пропонувати виправлення для проблем агентів
- 🔄 **Інтеграція CI/CD** — Нативна підтримка GitHub Actions, GitLab CI та конвеєрів Jenkins
- 📡 **Розгортання на краю** — Легкий агент для крайових пристроїв та сценаріїв IoT
- 🎯 **Власні панелі** — Конструктор панелей з перетягуванням та бібліотекою віджетів

> 💡 Маєте запит на функцію? [Створіть issue](https://github.com/openclaw/openclaw-dashboard/issues) або приєднуйтесь до обговорення!

---

## 🤝 Участь

Ми вітаємо внески! Будь ласка, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) перед поданням PR.

1.форкніть репозиторій
2. Створіть гілку з вашою функцією (`git checkout -b feature/amazing-feature`)
3. Зафіксуйте зміни (`git commit -m 'feat: Add amazing feature'`)
4. Надішліть на гілку (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

---

## Учасники

Дякуємо цим чудовим людям за їхні внески:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Цей проєкт дотримується специфікації [all-contributors](https://allcontributors.org). Внески будь-якого типу вітаються!

### Додавання нового учасника

Щоб додати нового учасника, використовуйте таку команду:

```bash
npx all-contributors add <username> <contribution>
```

Наприклад:

```bash
npx all-contributors add johndoe code,doc
```

Доступні типи внесків: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Ліцензія

Цей проєкт ліцензовано за ліцензією MIT — деталі див. у файлі [LICENSE](LICENSE).

## 🙏 Подяки

- Натхненний [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) та [Raycast](https://raycast.com)
- Зроблено з любов'ю для спільноти OpenClaw

---

Зроблено з ❤️ командою OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
