# 🔮 OpenClaw Dashboard

[English](README.en.md) | **繁體中文** | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **最美觀的 AI Agent（智慧體）即時監控儀表板。**
> 基於 React 構建，配備 ⌘K 命令面板、國際化（i18n）、4 種主題以及外掛系統。

![OpenClaw Dashboard 預覽](docs/preview.png)

---

## ✨ 為什麼選擇 OpenClaw Dashboard？

管理 AI Agent（智慧體）不應該像閱讀終端機日誌那樣枯燥。OpenClaw Dashboard 透過以下特性徹底改變你的 Agent 監控體驗：

- **🎨 驚艷的視覺設計** — 靈感來自 Vercel、Linear 和 Raycast。毛玻璃效果（Glassmorphism）、流暢動畫和精心設計的細節。
- **⚡ 即時更新** — 基於 WebSocket 的即時資料推送，無需手動重新整理。
- **⌘K 命令面板** — 進階使用者喜愛的鍵盤優先介面。即時導航、搜尋和執行命令。
- **🌍 國際化（i18n）** — 內建英語和中文支援，輕鬆新增更多語言。
- **🎭 4 種精美主題** — 深色（Dark）、淺色（Light）、AMOLED（適用於 OLED 螢幕）和跟隨系統（System-aware）。
- **🔌 外掛系統** — 無需 fork 即可擴充功能。註冊頁面、命令和鉤子（hooks）。
- **📊 豐富的資料視覺化** — 圖表、熱力圖、儀表板和進度指示器。
- **📱 完全響應式** — 在手機、平板和桌面上都能完美運行。

---

## 📊 功能比較

| 功能 | OpenClaw Dashboard | 通用監控工具 | 終端機 UI |
|------|-------------------|-------------|---------|
| 即時 WebSocket | ✅ | ⚠️ 有限支援 | ✅ |
| 命令面板 | ✅ | ❌ | ❌ |
| 多主題支援 | ✅ 4 種主題 | ⚠️ 1-2 種主題 | ⚠️ 有限支援 |
| 國際化（i18n）(EN/ZH) | ✅ | ❌ | ❌ |
| 外掛系統 | ✅ | ❌ | ❌ |
| 行動端響應式 | ✅ | ⚠️ 部分支援 | ❌ |
| 精美動畫 | ✅ | ❌ | ❌ |
| Docker 就緒 | ✅ | ✅ | ⚠️ |
| 零設定 | ✅ | ❌ | ❌ |

---

## 🏗️ 架構

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenClaw Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React UI  │  │   Zustand   │  │   WebSocket │             │
│  │   (視圖層)   │◄─┤  (狀態管理)  │◄─┤   (即時通訊) │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Framer    │  │   Plugin    │  │   Express   │             │
│  │   Motion    │  │   Manager   │  │   Server    │             │
│  │  (動畫引擎)  │  │ (外掛管理器) │  │  (伺服端)    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   TailwindCSS 樣式系統                    │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │ Dark │ │Light │ │AMOLED│ │System│ │Custom│          │   │
│  │  │ 深色  │ │ 淺色  │ │純黑色│ │跟隨系統│ │ 自訂 │          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                          HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenClaw API Server（API 伺服端）             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Static     │             │
│  │  /api/*     │  │  /ws        │  │  Files      │             │
│  │  (REST 介面) │  │  (WebSocket)│  │ (靜態檔案)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 快速開始

### 前提條件

- Node.js 18+
- npm 或 yarn

### 透過 npm 安裝

```bash
# 從 npm 安裝
npm install @openclaw/dashboard

# 啟動服務（同時提供內建前端和 API）
npx @openclaw/dashboard
```

或者全域安裝：

```bash
npm install -g @openclaw-dashboard
openclaw-dashboard
```

### 從原始碼建置

```bash
# 複製儲存庫
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# 安裝相依套件
npm install

# 建置前端
npm run build

# 啟動生產伺服器
npm start
```

在瀏覽器中開啟 [http://localhost:3777](http://localhost:3777)。

### 開發模式

```bash
# 終端機 1：啟動前端開發伺服器（支援熱重載）
npm run dev

# 終端機 2：啟動 API 伺服器
npm run server
```

### Docker 部署

```bash
# 使用 Docker Compose（推薦）
docker compose up -d

# 或手動建置並執行
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ 鍵盤快捷鍵

在任意位置按 `?` 檢視所有鍵盤快捷鍵。

| 快捷鍵 | 操作 |
|--------|------|
| `Ctrl+K` | 命令面板 |
| `Ctrl+/` | 切換側邊欄 |
| `G then O` | 跳轉到概覽 |
| `G then S` | 跳轉到工作階段 |
| `G then A` | 跳轉到 Agent（智慧體） |
| `G then T` | 跳轉到任務 |
| `G then ,` | 跳轉到設定 |
| `T then D` | 切換深色主題 |
| `T then L` | 切換淺色主題 |
| `1-5` | 跳轉到導覽項目 |

---

## 📊 效能基準

| 指標 | 數值 |
|------|------|
| 首次內容繪製（FCP） | < 0.5 秒 |
| 可互動時間（TTI） | < 1.2 秒 |
| 打包大小（gzip 壓縮後） | ~180KB |
| Lighthouse 評分 | 95+ |
| WebSocket 延遲 | < 50ms |

---

## 🔒 安全注意事項

- **預設無認證** — 在正式環境中請新增自己的認證中介軟體
- **已啟用 CORS** — 請為你的部署設定允許的來源（origins）
- **建議啟用 CSP** — 新增 Content-Security-Policy 回應標頭
- **正式環境必須使用 HTTPS** — 始終在正式環境中使用 HTTPS
- **速率限制** — 考慮為 API 端點新增速率限制

---

## 📁 專案結構

```
openclaw-dashboard/
├── .github/               # GitHub Actions 工作流程
│   ├── workflows/
│   │   ├── ci.yml         # CI 流水線
│   │   └── release.yml    # 發佈自動化
│   └── FUNDING.yml
├── docs/                  # 文件
│   └── API.md             # API 參考文件
├── server/                # 後端伺服器
│   ├── index.js           # Express + WebSocket 伺服端
│   ├── openclaw-api.js    # API 封裝（含模擬資料）
│   └── package.json
├── src/
│   ├── components/        # React 元件
│   │   ├── Agents/        # Agent（智慧體）管理
│   │   ├── CommandPalette/# ⌘K 命令面板
│   │   ├── Dashboard/     # 概覽、圖表、指標
│   │   ├── Layout/        # 側邊欄、標頭、主佈局
│   │   ├── Notifications/ # 通知面板
│   │   ├── Sessions/      # 工作階段管理
│   │   ├── Settings/      # 設定頁面
│   │   ├── Tasks/         # 任務看板
│   │   └── ui/            # 可重複使用 UI 元件
│   ├── hooks/             # 自訂 React Hooks
│   ├── i18n/              # 國際化翻譯檔案（EN/ZH）
│   ├── lib/               # 工具庫、常數
│   ├── pages/             # 頁面元件
│   ├── plugins/           # 外掛系統
│   │   ├── index.js       # 外掛管理器
│   │   ├── examples/      # 範例外掛
│   │   └── README.md      # 外掛文件
│   ├── stores/            # Zustand 狀態儲存
│   └── utils/             # 工具函數
├── public/                # 靜態資源
├── Dockerfile             # 多階段 Docker 建置
├── docker-compose.yml     # Docker Compose 設定
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API 端點

完整文件請參閱 [docs/API.md](docs/API.md)。

| 端點 | 說明 |
|------|------|
| `GET /api/health` | 健康檢查 |
| `GET /api/overview` | 儀表板統計 + 最近活動 |
| `GET /api/sessions` | 所有工作階段（支援分頁） |
| `GET /api/sessions/:id` | 工作階段詳情 + 歷史記錄 |
| `GET /api/agents` | 所有 Agent（智慧體） |
| `GET /api/tasks` | 任務及狀態 |
| `GET /api/system` | 系統指標 |
| `GET /api/notifications` | 通知列表 |
| `GET /api/heatmap` | 90 天活動熱力圖 |
| `WS /ws` | 即時更新（每 3 秒推送） |

---

## 🎨 主題自訂

儀表板支援 4 種主題：

| 主題 | 說明 |
|------|------|
| **Dark（深色）** | 深藍色漸層（預設） |
| **Light（淺色）** | 乾淨的白色配以淡灰色 |
| **AMOLED（純黑）** | 適用於 OLED 螢幕的純黑色 |
| **System（跟隨系統）** | 跟隨作業系統的主題偏好 |

可透過編輯 `src/index.css` 中的 CSS 變數來自訂主題。

---

## 🌐 國際化（i18n）

目前支援：
- 🇺🇸 英語（English）
- 🇨🇳 中文（簡體中文）

新增語言的步驟：
1. 在 `src/i18n/` 目錄下建立 JSON 檔案（例如 `ja.json`）
2. 在語言切換器中新增語言
3. 使用 `t('key')` 方式引用所有面向使用者的字串

---

## 🔌 外掛系統

OpenClaw Dashboard 支援透過外掛擴充功能：

```javascript
export default {
  id: 'my-plugin',
  name: '我的外掛',
  version: '1.0.0',
  activate(context) {
    context.registerPage({ ... });   // 註冊頁面
    context.registerCommand({ ... }); // 註冊命令
    context.registerHook('event', callback); // 註冊鉤子
  },
  deactivate() {
    // 清理資源
  }
};
```

完整文件請參閱 [src/plugins/README.md](src/plugins/README.md)。

---

## 🐳 部署選項

### Vercel（僅前端）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway（全端）

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker（推薦）

```bash
docker compose up -d
```

詳細說明請參閱完整的[部署指南](docs/deployment.md)。

### VPS / 裸機伺服器

```bash
npm install --production
npm run build
npm start
```

### Systemd 服務

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

## ❓ 常見問題

**問：能否連接到我自己的 OpenClaw 實例？**
答：可以！將 `server/openclaw-api.js` 中的模擬資料替換為真實的 API 呼叫即可。

**問：如何新增認證？**
答：在 `server/index.js` 中新增中介軟體。推薦使用 Passport.js 或 JWT。

**問：能否自訂主題？**
答：當然可以！編輯 `src/index.css` 中的 CSS 變數即可。

**問：是否可用於正式環境？**
答：是的，只需設定好認證和安全回應標頭即可。

**問：如何參與貢獻？**
答：請參閱 [CONTRIBUTING.md](CONTRIBUTING.md) 中的貢獻指南。

---

## 🗺️ 路線圖

### ✅ 已完成

| 版本 | 亮點 |
|------|------|
| **v2.0** | 🎨 初始發佈 — React + Vite、⌘K 命令面板、4 種主題、國際化（EN/ZH）、WebSocket 即時更新 |
| **v2.1** | 📊 豐富的資料視覺化（圖表、熱力圖、儀表板）、外掛系統、Docker 支援、效能最佳化 |

### 🚧 進行中（v2.2）

- 🔔 **即時告警通知** — 基於自訂閾值的告警，支援多管道推送（電子郵件、Webhook、應用內通知）
- 🧩 **外掛市集** — 直接在儀表板中瀏覽、安裝和管理社群外掛
- 👥 **多使用者支援** — 基於角色的存取控制（RBAC）、使用者管理和團隊工作空間
- 📈 **進階分析** — 深入了解 Agent 效能、成本追蹤和使用趨勢

### 🔮 計畫中（v2.3+）

- 📱 **行動應用** — 原生 iOS 和 Android 應用，隨時隨地監控
- 🌐 **API 閘道** — 統一的 REST/GraphQL API 層，支援速率限制、快取和認證
- 🤖 **AI 輔助偵錯** — 讓 AI 分析日誌並為 Agent 問題提供修復建議
- 🔄 **CI/CD 整合** — 原生支援 GitHub Actions、GitLab CI 和 Jenkins 流水線
- 📡 **邊緣部署** — 適用於邊緣裝置和 IoT 場景的輕量級 Agent
- 🎯 **自訂儀表板** — 拖曳式儀表板建構器，配備元件庫

> 💡 有功能建議？[提交 Issue](https://github.com/openclaw/openclaw-dashboard/issues) 或加入討論！

---

## 🤝 貢獻指南

歡迎貢獻！提交 PR 前請先閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)。

1. Fork 儲存庫
2. 建立功能分支（`git checkout -b feature/amazing-feature`）
3. 提交變更（`git commit -m 'feat: Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 開啟 Pull Request

---

## 貢獻者

感謝這些優秀貢獻者的付出：

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

本專案遵循 [all-contributors](https://allcontributors.org) 規範。歡迎任何形式的貢獻！

### 新增新貢獻者

使用以下命令新增新貢獻者：

```bash
npx all-contributors add <使用者名稱> <貢獻類型>
```

例如：

```bash
npx all-contributors add johndoe code,doc
```

可用的貢獻類型：`code`、`doc`、`ideas`、`maintenance`、`bug`、`test`、`review`、`question`、`design`、`translation`、`infra`、`platform`、`tool`、`eventOrganizing`、`business`

---

## 📄 授權條款

本專案基於 MIT 授權條款開源 — 詳見 [LICENSE](LICENSE) 檔案。

## 🙏 致謝

- 靈感來自 [Vercel Dashboard](https://vercel.com/dashboard)、[Linear](https://linear.app) 和 [Raycast](https://raycast.com)
- 為 OpenClaw 社群傾心打造

---

由 OpenClaw 團隊用 ❤️ 構建

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
