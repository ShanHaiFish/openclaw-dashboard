# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | **Русский** | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Самый красивый дашборд мониторинга AI-агентов в реальном времени.**
> Построен на React с палитрой команд ⌘K, i18n, 4 темами и системой плагинов.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Почему OpenClaw Dashboard?

Управление AI-агентами не должно напоминать чтение логов терминала. OpenClaw Dashboard трансформирует опыт мониторинга агентов с помощью:

- **🎨 Потрясающий визуальный дизайн** — Вдохновлён Vercel, Linear и Raycast. Глассморфизм, плавные анимации и продуманные детали.
- **⚡ Обновления в реальном времени** — Live-данные через WebSocket. Кнопки обновления не нужны.
- **⌘K Палитра команд** — Пользователи любят интерфейсы, где правит клавиатура. Навигация, поиск и выполнение команд мгновенно.
- **🌍 Интернационализация** — Встроенная поддержка английского и китайского. Легко добавлять новые языки.
- **🎭 4 красивые темы** — Тёмная, Светлая, AMOLED (для OLED-экранов) и Системная.
- **🔌 Система плагинов** — Расширяйте функциональность без форка. Регистрируйте страницы, команды и хуки.
- **📊 Богатая визуализация данных** — Графики, тепловые карты, датчики и индикаторы прогресса.
- **📱 Полностью адаптивный** — Отлично работает на мобильных устройствах, планшетах и десктопах.

---

## 📊 Сравнение функций

| Функция | OpenClaw Dashboard | Универсальный мониторинг | Terminal UI |
|---------|-------------------|------------------------|-------------|
| WebSocket в реальном времени | ✅ | ⚠️ Ограничено | ✅ |
| Палитра команд | ✅ | ❌ | ❌ |
| Поддержка нескольких тем | ✅ 4 темы | ⚠️ 1-2 темы | ⚠️ Ограничено |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Система плагинов | ✅ | ❌ | ❌ |
| Адаптивность для мобильных | ✅ | ⚠️ Частично | ❌ |
| Красивые анимации | ✅ | ❌ | ❌ |
| Готовность к Docker | ✅ | ✅ | ⚠️ |
| Нулевая конфигурация | ✅ | ❌ | ❌ |

---

## 🏗️ Архитектура

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

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- npm или yarn

### Установка через npm

```bash
# Установка из npm
npm install @openclaw/dashboard

# Запуск сервера (обслуживает встроенный фронтенд + API)
npx @openclaw/dashboard
```

Или установка глобально:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Из исходного кода

```bash
# Клонирование репозитория
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Установка зависимостей
npm install

# Сборка фронтенда
npm run build

# Запуск продакшн-сервера
npm start
```

Откройте [http://localhost:3777](http://localhost:3777) в вашем браузере.

### Режим разработки

```bash
# Терминал 1: Запуск dev-сервера фронтенда с hot reload
npm run dev

# Терминал 2: Запуск API-сервера
npm run server
```

### Docker

```bash
# Использование Docker Compose (рекомендуется)
docker compose up -d

# Или сборка и запуск вручную
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Горячие клавиши

Нажмите `?` в любом месте, чтобы увидеть все горячие клавиши.

| Горячая клавиша | Действие |
|-----------------|----------|
| `Ctrl+K` | Палитра команд |
| `Ctrl+/` | Переключение боковой панели |
| `G затем O` | Перейти к Обзору |
| `G затем S` | Перейти к Сессиям |
| `G затем A` | Перейти к Агентам |
| `G затем T` | Перейти к Задачам |
| `G затем ,` | Перейти к Настройкам |
| `T затем D` | Переключить тёмную тему |
| `T затем L` | Переключить светлую тему |
| `1-5` | Переход к элементам навигации |

---

## 📊 Бенчмарки производительности

| Метрика | Значение |
|---------|----------|
| First Contentful Paint | < 0.5с |
| Time to Interactive | < 1.2с |
| Размер сборки (gzip) | ~180КБ |
| Оценка Lighthouse | 95+ |
| Задержка WebSocket | < 50мс |

---

## 🔒 Соображения безопасности

- **Нет аутентификации по умолчанию** — Добавьте собственное middleware аутентификации в продакшне
- **CORS включён** — Настройте разрешённые источники для вашего развертывания
- **CSP рекомендуется** — Добавьте заголовки Content-Security-Policy
- **HTTPS обязателен** — Всегда используйте HTTPS в продакшне
- **Ограничение запросов** — Рассмотрите добавление rate limiting для API-эндпоинтов

---

## 📁 Структура проекта

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI pipeline
│   │   └── release.yml    # Release automation
│   └── FUNDING.yml
├── docs/                  # Документация
│   └── API.md             # Справочник API
├── server/                # Бэкенд-сервер
│   ├── index.js           # Express + WebSocket сервер
│   ├── openclaw-api.js    # Обёртка API с тестовыми данными
│   └── package.json
├── src/
│   ├── components/        # React-компоненты
│   │   ├── Agents/        # Управление агентами
│   │   ├── CommandPalette/# ⌘K палитра команд
│   │   ├── Dashboard/     # Обзор, графики, метрики
│   │   ├── Layout/        # Боковая панель, Заголовок, MainLayout
│   │   ├── Notifications/ # Панель уведомлений
│   │   ├── Sessions/      # Управление сессиями
│   │   ├── Settings/      # Страницы настроек
│   │   ├── Tasks/         # Доска задач
│   │   └── ui/            # Переиспользуемые UI-компоненты
│   ├── hooks/             # Пользовательские React-хуки
│   ├── i18n/              # Переводы (EN/ZH)
│   ├── lib/               # Утилиты, константы
│   ├── pages/             # Компоненты страниц
│   ├── plugins/           # Система плагинов
│   │   ├── index.js       # Менеджер плагинов
│   │   ├── examples/      # Примеры плагинов
│   │   └── README.md      # Документация плагинов
│   ├── stores/            # Zustand-хранилища
│   └── utils/             # Функции утилит
├── public/                # Статические ресурсы
├── Dockerfile             # Многоэтапная сборка Docker
├── docker-compose.yml     # Конфигурация Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API-эндпоинты

Полная документация в [docs/API.md](docs/API.md).

| Эндпоинт | Описание |
|----------|----------|
| `GET /api/health` | Проверка работоспособности |
| `GET /api/overview` | Статистика дашборда + недавняя активность |
| `GET /api/sessions` | Все сессии с пагинацией |
| `GET /api/sessions/:id` | Детали сессии + история |
| `GET /api/agents` | Все агенты |
| `GET /api/tasks` | Задачи со статусом |
| `GET /api/system` | Системные метрики |
| `GET /api/notifications` | Список уведомлений |
| `GET /api/heatmap` | Тепловая карта активности за 90 дней |
| `WS /ws` | Обновления в реальном времени (каждые 3с) |

---

## 🎨 Темы

Дашборд поддерживает 4 темы:

| Тема | Описание |
|------|----------|
| **Dark** | Глубокий тёмно-синий градиент (по умолчанию) |
| **Light** | Чистый белый с лёгким серым |
| **AMOLED** | Чистый чёрный для OLED-экранов |
| **System** | Следует системным настройкам |

Настройте темы, редактируя CSS-переменные в `src/index.css`.

---

## 🌐 Интернационализация

В настоящее время поддерживается:
- 🇺🇸 Английский (English)
- 🇨🇳 Китайский (简体中文)

Добавление новых языков:
1. Создайте JSON-файл в `src/i18n/` (например, `ru.json`)
2. Добавьте язык в переключатель языков
3. Используйте `t('key')` для всех строк пользовательского интерфейса

---

## 🔌 Система плагинов

OpenClaw Dashboard поддерживает плагины для расширения функциональности:

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
    // Очистка
  }
};
```

Полную документацию см. в [src/plugins/README.md](src/plugins/README.md).

---

## 🐳 Варианты развёртывания

### Vercel (Фронтенд)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Рекомендуется)

```bash
docker compose up -d
```

Подробные инструкции см. в [Руководстве по развёртыванию](docs/deployment.md).

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

## ❓ Часто задаваемые вопросы

**Q: Можно ли использовать это с моим собственным экземпляром OpenClaw?**
A: Да! Замените тестовые данные в `server/openclaw-api.js` на реальные вызовы API.

**Q: Как добавить аутентификацию?**
A: Добавьте middleware в `server/index.js`. Мы рекомендуем Passport.js или JWT.

**Q: Можно ли настраивать темы?**
A: Конечно! Редактируйте CSS-переменные в `src/index.css`.

**Q: Готово ли это к продакшну?**
A: Да, при правильной настройке аутентификации и заголовков безопасности.

**Q: Как внести вклад?**
A: Ознакомьтесь с [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🗺️ Дорожная карта

### ✅ Завершено

| Версия | Основные моменты |
|--------|-----------------|
| **v2.0** | 🎨 Начальный релиз — React + Vite, палитра команд ⌘K, 4 темы, i18n (EN/ZH), обновления в реальном времени через WebSocket |
| **v2.1** | 📊 Богатая визуализация данных (графики, тепловые карты, датчики), система плагинов, поддержка Docker, оптимизация производительности |

### 🚧 В разработке (v2.2)

- 🔔 **Уведомления об оповещениях в реальном времени** — Настраиваемые оповещения на основе порогов с многоканальной доставкой (email, webhook, внутри приложения)
- 🧩 **Маркетплейс плагинов** — Просмотр, установка и управление плагинами сообщества прямо из дашборда
- 👥 **Поддержка нескольких пользователей** — Управление доступом на основе ролей (RBAC), управление пользователями и командные рабочие пространства
- 📈 **Расширенная аналитика** — Глубокая аналитика производительности агентов, отслеживание затрат и тенденции использования

### 🔮 Запланировано (v2.3+)

- 📱 **Мобильное приложение** — Нативные приложения iOS и Android для мониторинга в пути
- 🌐 **API Gateway** — Унифицированный слой REST/GraphQL API с ограничением запросов, кэшированием и аутентификацией
- 🤖 **AI-помощь в отладке** — Пусть AI анализирует логи и предлагает исправления для проблем агентов
- 🔄 **Интеграция CI/CD** — Нативная поддержка GitHub Actions, GitLab CI и Jenkins
- 📡 **Edge-развёртывание** — Лёгкий агент для edge-устройств и IoT-сценариев
- 🎯 **Пользовательские дашборды** — Конструктор дашбордов с drag-and-drop и библиотекой виджетов

> 💡 Есть предложение по функциональности? [Создайте issue](https://github.com/openclaw/openclaw-dashboard/issues) или присоединяйтесь к обсуждению!

---

## 🤝 Участие в проекте

Мы приветствуем ваш вклад! Пожалуйста, прочтите [CONTRIBUTING.md](CONTRIBUTING.md) перед отправкой PR.

1. Форкните репозиторий
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'feat: Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## Участники

Спасибо этим замечательным людям за их вклад:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Этот проект следует спецификации [all-contributors](https://allcontributors.org). Приветствуются вклады любого типа!

### Добавление нового участника

Чтобы добавить нового участника, используйте следующую команду:

```bash
npx all-contributors add <username> <contribution>
```

Например:

```bash
npx all-contributors add johndoe code,doc
```

Доступные типы вкладов: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Лицензия

Этот проект находится под лицензией MIT — см. файл [LICENSE](LICENSE) для подробностей.

## 🙏 Благодарности

- Вдохновлён [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) и [Raycast](https://raycast.com)
- Создан с любовью для сообщества OpenClaw

---

Сделано с ❤️ командой OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
