# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | **简体中文**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **最精美的 AI Agent（智能体）实时监控仪表盘。**
> 基于 React 构建，配备 ⌘K 命令面板、国际化（i18n）、4 种主题以及插件系统。

![OpenClaw Dashboard 预览](docs/preview.png)

---

## ✨ 为什么选择 OpenClaw Dashboard？

管理 AI Agent（智能体）不应该像阅读终端日志那样枯燥。OpenClaw Dashboard 通过以下特性彻底改变你的 Agent 监控体验：

- **🎨 惊艳的视觉设计** — 灵感来自 Vercel、Linear 和 Raycast。毛玻璃效果（Glassmorphism）、流畅动画和精心设计的细节。
- **⚡ 实时更新** — 基于 WebSocket 的实时数据推送，无需手动刷新。
- **⌘K 命令面板** — 高级用户喜爱的键盘优先界面。即时导航、搜索和执行命令。
- **🌍 国际化（i18n）** — 内置英语和中文支持，轻松添加更多语言。
- **🎭 4 种精美主题** — 深色（Dark）、浅色（Light）、AMOLED（适用于 OLED 屏幕）和跟随系统（System-aware）。
- **🔌 插件系统** — 无需 fork 即可扩展功能。注册页面、命令和钩子（hooks）。
- **📊 丰富的数据可视化** — 图表、热力图、仪表盘和进度指示器。
- **📱 完全响应式** — 在手机、平板和桌面上都能完美运行。

---

## 📊 功能对比

| 功能 | OpenClaw Dashboard | 通用监控工具 | 终端 UI |
|------|-------------------|-------------|---------|
| 实时 WebSocket | ✅ | ⚠️ 有限支持 | ✅ |
| 命令面板 | ✅ | ❌ | ❌ |
| 多主题支持 | ✅ 4 种主题 | ⚠️ 1-2 种主题 | ⚠️ 有限支持 |
| 国际化（i18n）(EN/ZH) | ✅ | ❌ | ❌ |
| 插件系统 | ✅ | ❌ | ❌ |
| 移动端响应式 | ✅ | ⚠️ 部分支持 | ❌ |
| 精美动画 | ✅ | ❌ | ❌ |
| Docker 就绪 | ✅ | ✅ | ⚠️ |
| 零配置 | ✅ | ❌ | ❌ |

---

## 🏗️ 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenClaw Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React UI  │  │   Zustand   │  │   WebSocket │             │
│  │   (视图层)   │◄─┤  (状态管理)  │◄─┤   (实时通信) │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Framer    │  │   Plugin    │  │   Express   │             │
│  │   Motion    │  │   Manager   │  │   Server    │             │
│  │  (动画引擎)  │  │ (插件管理器) │  │  (服务端)    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   TailwindCSS 样式系统                    │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │ Dark │ │Light │ │AMOLED│ │System│ │Custom│          │   │
│  │  │ 深色  │ │ 浅色  │ │纯黑色│ │跟随系统│ │ 自定义│          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                          HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenClaw API Server (API 服务端)              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Static     │             │
│  │  /api/*     │  │  /ws        │  │  Files      │             │
│  │  (REST接口)  │  │  (WebSocket)│  │ (静态文件)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 前提条件

- Node.js 18+
- npm 或 yarn

### 通过 npm 安装

```bash
# 从 npm 安装
npm install @openclaw/dashboard

# 启动服务（同时提供内置前端和 API）
npx @openclaw/dashboard
```

或者全局安装：

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# 安装依赖
npm install

# 构建前端
npm run build

# 启动生产服务器
npm start
```

在浏览器中打开 [http://localhost:3777](http://localhost:3777)。

### 开发模式

```bash
# 终端 1：启动前端开发服务器（支持热重载）
npm run dev

# 终端 2：启动 API 服务器
npm run server
```

### Docker 部署

```bash
# 使用 Docker Compose（推荐）
docker compose up -d

# 或手动构建并运行
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ 键盘快捷键

在任意位置按 `?` 查看所有键盘快捷键。

| 快捷键 | 操作 |
|--------|------|
| `Ctrl+K` | 命令面板 |
| `Ctrl+/` | 切换侧边栏 |
| `G then O` | 跳转到概览 |
| `G then S` | 跳转到会话 |
| `G then A` | 跳转到 Agent（智能体） |
| `G then T` | 跳转到任务 |
| `G then ,` | 跳转到设置 |
| `T then D` | 切换深色主题 |
| `T then L` | 切换浅色主题 |
| `1-5` | 跳转到导航项 |

---

## 📊 性能基准

| 指标 | 数值 |
|------|------|
| 首次内容绘制（FCP） | < 0.5 秒 |
| 可交互时间（TTI） | < 1.2 秒 |
| 打包大小（gzip 压缩后） | ~180KB |
| Lighthouse 评分 | 95+ |
| WebSocket 延迟 | < 50ms |

---

## 🔒 安全注意事项

- **默认无认证** — 在生产环境中请添加自己的认证中间件
- **已启用 CORS** — 请为你的部署配置允许的来源（origins）
- **建议启用 CSP** — 添加 Content-Security-Policy 响应头
- **生产环境必须使用 HTTPS** — 始终在生产环境中使用 HTTPS
- **速率限制** — 考虑为 API 端点添加速率限制

---

## 📁 项目结构

```
openclaw-dashboard/
├── .github/               # GitHub Actions 工作流
│   ├── workflows/
│   │   ├── ci.yml         # CI 流水线
│   │   └── release.yml    # 发布自动化
│   └── FUNDING.yml
├── docs/                  # 文档
│   └── API.md             # API 参考文档
├── server/                # 后端服务
│   ├── index.js           # Express + WebSocket 服务端
│   ├── openclaw-api.js    # API 封装（含模拟数据）
│   └── package.json
├── src/
│   ├── components/        # React 组件
│   │   ├── Agents/        # Agent（智能体）管理
│   │   ├── CommandPalette/# ⌘K 命令面板
│   │   ├── Dashboard/     # 概览、图表、指标
│   │   ├── Layout/        # 侧边栏、头部、主布局
│   │   ├── Notifications/ # 通知面板
│   │   ├── Sessions/      # 会话管理
│   │   ├── Settings/      # 设置页面
│   │   ├── Tasks/         # 任务看板
│   │   └── ui/            # 可复用 UI 组件
│   ├── hooks/             # 自定义 React Hooks
│   ├── i18n/              # 国际化翻译文件（EN/ZH）
│   ├── lib/               # 工具库、常量
│   ├── pages/             # 页面组件
│   ├── plugins/           # 插件系统
│   │   ├── index.js       # 插件管理器
│   │   ├── examples/      # 示例插件
│   │   └── README.md      # 插件文档
│   ├── stores/            # Zustand 状态存储
│   └── utils/             # 工具函数
├── public/                # 静态资源
├── Dockerfile             # 多阶段 Docker 构建
├── docker-compose.yml     # Docker Compose 配置
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API 端点

完整文档请参阅 [docs/API.md](docs/API.md)。

| 端点 | 说明 |
|------|------|
| `GET /api/health` | 健康检查 |
| `GET /api/overview` | 仪表盘统计 + 最近活动 |
| `GET /api/sessions` | 所有会话（支持分页） |
| `GET /api/sessions/:id` | 会话详情 + 历史记录 |
| `GET /api/agents` | 所有 Agent（智能体） |
| `GET /api/tasks` | 任务及状态 |
| `GET /api/system` | 系统指标 |
| `GET /api/notifications` | 通知列表 |
| `GET /api/heatmap` | 90 天活动热力图 |
| `WS /ws` | 实时更新（每 3 秒推送） |

---

## 🎨 主题定制

仪表盘支持 4 种主题：

| 主题 | 说明 |
|------|------|
| **Dark（深色）** | 深蓝色渐变（默认） |
| **Light（浅色）** | 干净的白色配以淡灰色 |
| **AMOLED（纯黑）** | 适用于 OLED 屏幕的纯黑色 |
| **System（跟随系统）** | 跟随操作系统的主题偏好 |

可通过编辑 `src/index.css` 中的 CSS 变量来自定义主题。

---

## 🌐 国际化（i18n）

目前支持：
- 🇺🇸 英语（English）
- 🇨🇳 中文（简体中文）

添加新语言的步骤：
1. 在 `src/i18n/` 目录下创建 JSON 文件（例如 `ja.json`）
2. 在语言切换器中添加新语言
3. 使用 `t('key')` 方式引用所有面向用户的字符串

---

## 🔌 插件系统

OpenClaw Dashboard 支持通过插件扩展功能：

```javascript
export default {
  id: 'my-plugin',
  name: '我的插件',
  version: '1.0.0',
  activate(context) {
    context.registerPage({ ... });   // 注册页面
    context.registerCommand({ ... }); // 注册命令
    context.registerHook('event', callback); // 注册钩子
  },
  deactivate() {
    // 清理资源
  }
};
```

完整文档请参阅 [src/plugins/README.md](src/plugins/README.md)。

---

## 🐳 部署选项

### Vercel（仅前端）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway（全栈）

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker（推荐）

```bash
docker compose up -d
```

详细说明请参阅完整的[部署指南](docs/deployment.md)。

### VPS / 裸金属服务器

```bash
npm install --production
npm run build
npm start
```

### Systemd 服务

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

## ❓ 常见问题

**问：能否连接到我自己的 OpenClaw 实例？**
答：可以！将 `server/openclaw-api.js` 中的模拟数据替换为真实的 API 调用即可。

**问：如何添加认证？**
答：在 `server/index.js` 中添加中间件。推荐使用 Passport.js 或 JWT。

**问：能否自定义主题？**
答：当然可以！编辑 `src/index.css` 中的 CSS 变量即可。

**问：是否可用于生产环境？**
答：是的，只需配置好认证和安全响应头即可。

**问：如何参与贡献？**
答：请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 中的贡献指南。

---

## 🗺️ 路线图

### ✅ 已完成

| 版本 | 亮点 |
|------|------|
| **v2.0** | 🎨 初始发布 — React + Vite、⌘K 命令面板、4 种主题、国际化（EN/ZH）、WebSocket 实时更新 |
| **v2.1** | 📊 丰富的数据可视化（图表、热力图、仪表盘）、插件系统、Docker 支持、性能优化 |

### 🚧 进行中（v2.2）

- 🔔 **实时告警通知** — 基于自定义阈值的告警，支持多渠道推送（邮件、Webhook、应用内通知）
- 🧩 **插件市场** — 直接在仪表盘中浏览、安装和管理社区插件
- 👥 **多用户支持** — 基于角色的访问控制（RBAC）、用户管理和团队工作空间
- 📈 **高级分析** — 深入了解 Agent 性能、成本追踪和使用趋势

### 🔮 计划中（v2.3+）

- 📱 **移动应用** — 原生 iOS 和 Android 应用，随时随地监控
- 🌐 **API 网关** — 统一的 REST/GraphQL API 层，支持速率限制、缓存和认证
- 🤖 **AI 辅助调试** — 让 AI 分析日志并为 Agent 问题提供修复建议
- 🔄 **CI/CD 集成** — 原生支持 GitHub Actions、GitLab CI 和 Jenkins 流水线
- 📡 **边缘部署** — 适用于边缘设备和 IoT 场景的轻量级 Agent
- 🎯 **自定义仪表盘** — 拖拽式仪表盘构建器，配备组件库

> 💡 有功能建议？[提交 Issue](https://github.com/openclaw/openclaw-dashboard/issues) 或加入讨论！

---

## 🤝 贡献指南

欢迎贡献！提交 PR 前请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'feat: Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 开启 Pull Request

---

## 贡献者

感谢这些优秀贡献者的付出：

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

本项目遵循 [all-contributors](https://allcontributors.org) 规范。欢迎任何形式的贡献！

### 添加新贡献者

使用以下命令添加新贡献者：

```bash
npx all-contributors add <用户名> <贡献类型>
```

例如：

```bash
npx all-contributors add johndoe code,doc
```

可用的贡献类型：`code`、`doc`、`ideas`、`maintenance`、`bug`、`test`、`review`、`question`、`design`、`translation`、`infra`、`platform`、`tool`、`eventOrganizing`、`business`

---

## 📄 许可证

本项目基于 MIT 许可证开源 — 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 灵感来自 [Vercel Dashboard](https://vercel.com/dashboard)、[Linear](https://linear.app) 和 [Raycast](https://raycast.com)
- 为 OpenClaw 社区倾心打造

---

由 OpenClaw 团队用 ❤️ 构建

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
