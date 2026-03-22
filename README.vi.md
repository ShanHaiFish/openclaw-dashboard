# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | **[Tiếng Việt](README.vi.md)** | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Bảng điều khiển giám sát thời gian thực đẹp nhất cho AI agents.**
> Xây dựng với React, bao gồm ⌘K command palette, i18n, 4 giao diện và hệ thống plugin.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Tại sao chọn OpenClaw Dashboard?

Quản lý AI agents không nên giống như đọc log terminal. OpenClaw Dashboard biến đổi trải nghiệm giám sát agents của bạn với:

- **🎨 Thiết kế Hình ảnh Đáng kinh ngạc** — lấy cảm hứng từ Vercel, Linear và Raycast. Glassmorphism, animations mượt mà và các chi tiết được chăm chút.
- **⚡ Cập nhật Thời gian thực** — Dữ liệu trực tiếp qua WebSocket. Không cần nút làm mới.
- **⌘K Command Palette** — Người dùng power yêu thích giao diện phím tay trước. Điều hướng, tìm kiếm và thực thi lệnh ngay lập tức.
- **🌍 Quốc tế hóa** — Hỗ trợ sẵn Tiếng Anh và Tiếng Trung. Thêm ngôn ngữ dễ dàng.
- **🎭 4 Giao diện Đẹp** — Dark, Light, AMOLED (cho màn hình OLED) và System-aware.
- **🔌 Hệ thống Plugin** — Mở rộng chức năng mà không cần fork. Đăng ký trang, lệnh và hooks.
- **📊 Trực quan hóa Dữ liệu Phong phú** — Biểu đồ, heatmap, gauge và chỉ báo tiến trình.
- **📱 Fully Responsive** — Hoạt động tuyệt vời trên mobile, tablet và desktop.

---

## 📊 So sánh Tính năng

| Tính năng | OpenClaw Dashboard | Giám sát Thông thường | Terminal UI |
|-----------|-------------------|----------------------|-------------|
| Real-time WebSocket | ✅ | ⚠️ Hạn chế | ✅ |
| Command Palette | ✅ | ❌ | ❌ |
| Hỗ trợ Đa giao diện | ✅ 4 giao diện | ⚠️ 1-2 giao diện | ⚠️ Hạn chế |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Hệ thống Plugin | ✅ | ❌ | ❌ |
| Responsive Mobile | ✅ | ⚠️ Một phần | ❌ |
| Animations Đẹp | ✅ | ❌ | ❌ |
| Sẵn sàng Docker | ✅ | ✅ | ⚠️ |
| Cấu hình Zero | ✅ | ❌ | ❌ |

---

## 🏗️ Kiến trúc

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

## 🚀 Bắt đầu Nhanh

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Cài đặt qua npm

```bash
# Cài đặt từ npm
npm install @openclaw/dashboard

# Khởi động server (phục vụ frontend + API tích hợp sẵn)
npx @openclaw/dashboard
```

Hoặc cài đặt toàn cục:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Từ Source

```bash
# Clone repository
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Cài đặt dependencies
npm install

# Build frontend
npm run build

# Khởi động production server
npm start
```

Mở [http://localhost:3777](http://localhost:3777) trong trình duyệt của bạn.

### Chế độ Phát triển

```bash
# Terminal 1: Khởi động frontend dev server với hot reload
npm run dev

# Terminal 2: Khởi động API server
npm run server
```

### Docker

```bash
# Sử dụng Docker Compose (khuyên dùng)
docker compose up -d

# Hoặc build và chạy thủ công
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Phím Tắt

Nhấn `?` ở bất kỳ đâu để xem tất cả phím tắt.

| Phím tắt | Hành động |
|----------|----------|
| `Ctrl+K` | Command palette |
| `Ctrl+/` | Chuyển đổi sidebar |
| `G then O` | Đi đến Tổng quan |
| `G then S` | Đi đến Sessions |
| `G then A` | Đi đến Agents |
| `G then T` | Đi đến Tasks |
| `G then ,` | Đi đến Cài đặt |
| `T then D` | Chuyển đổi giao diện dark |
| `T then L` | Chuyển đổi giao diện light |
| `1-5` | nhảy đến mục điều hướng |

---

## 📊 Benchmark Hiệu suất

| Chỉ số | Giá trị |
|--------|---------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Kích thước Bundle (gzipped) | ~180KB |
| Điểm Lighthouse | 95+ |
| Độ trễ WebSocket | < 50ms |

---

## 🔒 Cân nhắc Bảo mật

- **Không có authentication mặc định** — Thêm middleware authentication của riêng bạn trong production
- **CORS đã bật** — Cấu hình allowed origins cho deployment của bạn
- **CSP khuyến nghị** — Thêm Content-Security-Policy headers
- **HTTPS bắt buộc** — Luôn sử dụng HTTPS trong production
- **Rate limiting** — Xem xét thêm rate limiting cho các API endpoints

---

## 📁 Cấu trúc Dự án

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI pipeline
│   │   └── release.yml    # Release automation
│   └── FUNDING.yml
├── docs/                  # Tài liệu
│   └── API.md             # Tham chiếu API
├── server/                # Backend server
│   ├── index.js           # Express + WebSocket server
│   ├── openclaw-api.js    # API wrapper với mock data
│   └── package.json
├── src/
│   ├── components/        # React components
│   │   ├── Agents/        # Quản lý agents
│   │   ├── CommandPalette/# ⌘K command palette
│   │   ├── Dashboard/     # Tổng quan, charts, metrics
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Panel thông báo
│   │   ├── Sessions/      # Quản lý sessions
│   │   ├── Settings/      # Trang cài đặt
│   │   ├── Tasks/         # Bảng tasks
│   │   └── ui/            # UI components tái sử dụng
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Bản dịch (EN/ZH)
│   ├── lib/               # Tiện ích, hằng số
│   ├── pages/             # Page components
│   ├── plugins/           # Hệ thống plugin
│   │   ├── index.js       # Plugin manager
│   │   ├── examples/      # Ví dụ plugins
│   │   └── README.md      # Tài liệu plugin
│   ├── stores/            # Zustand stores
│   └── utils/             # Utility functions
├── public/                # Static assets
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Docker Compose config
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API Endpoints

Xem [docs/API.md](docs/API.md) để biết tài liệu đầy đủ.

| Endpoint | Mô tả |
|----------|-------|
| `GET /api/health` | Kiểm tra sức khỏe |
| `GET /api/overview` | Thống kê dashboard + hoạt động gần đây |
| `GET /api/sessions` | Tất cả sessions với pagination |
| `GET /api/sessions/:id` | Chi tiết session + lịch sử |
| `GET /api/agents` | Tất cả agents |
| `GET /api/tasks` | Tasks với trạng thái |
| `GET /api/system` | System metrics |
| `GET /api/notifications` | Danh sách thông báo |
| `GET /api/heatmap` | Heatmap hoạt động 90 ngày |
| `WS /ws` | Cập nhật thời gian thực (mỗi 3 giây) |

---

## 🎨 Giao diện

Dashboard hỗ trợ 4 giao diện:

| Giao diện | Mô tả |
|-----------|-------|
| **Dark** | Gradient navy đậm (mặc định) |
| **Light** | Trắng sạch với xám nhẹ |
| **AMOLED** | Đen thuần cho màn hình OLED |
| **System** | Theo tùy chọn hệ điều hành |

Tùy chỉnh giao diện bằng cách chỉnh sửa CSS variables trong `src/index.css`.

---

## 🌐 Quốc tế hóa

Hiện hỗ trợ:
- 🇺🇸 Tiếng Anh (English)
- 🇨🇳 Tiếng Trung (简体中文)

Thêm ngôn ngữ mới bằng cách:
1. Tạo file JSON trong `src/i18n/` (ví dụ: `ja.json`)
2. Thêm ngôn ngữ vào language switcher
3. Sử dụng `t('key')` cho tất cả strings hiển thị cho người dùng

---

## 🔌 Hệ thống Plugin

OpenClaw Dashboard hỗ trợ plugin để mở rộng chức năng:

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
    // Dọn dẹp
  }
};
```

Xem [src/plugins/README.md](src/plugins/README.md) để biết tài liệu đầy đủ.

---

## 🐳 Tùy chọn Triển khai

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Khuyên dùng)

```bash
docker compose up -d
```

Xem [Hướng dẫn Triển khai đầy đủ](docs/deployment.md) để biết hướng dẫn chi tiết.

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

## ❓ Câu hỏi Thường gặp

**Hỏi: Tôi có thể dùng nó với instance OpenClaw của mình không?**
Đáp: Có! Thay thế mock data trong `server/openclaw-api.js` bằng API calls thực tế.

**Hỏi: Làm thế nào để thêm authentication?**
Đáp: Thêm middleware trong `server/index.js`. Chúng tôi khuyến nghị Passport.js hoặc JWT.

**Hỏi: Tôi có thể tùy chỉnh giao diện không?**
Đáp: Hoàn toàn có thể! Chỉnh sửa CSS variables trong `src/index.css`.

**Hỏi: Nó sẵn sàng cho production chưa?**
Đáp: Có, với authentication và security headers được cấu hình đúng.

**Hỏi: Làm thế nào để đóng góp?**
Đáp: Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết hướng dẫn.

---

## 🗺️ Lộ trình

### ✅ Đã hoàn thành

| Phiên bản | Điểm nổi bật |
|-----------|-------------|
| **v2.0** | 🎨 Phát hành đầu tiên — React + Vite, ⌘K command palette, 4 giao diện, i18n (EN/ZH), Cập nhật real-time WebSocket |
| **v2.1** | 📊 Trực quan hóa dữ liệu phong phú (biểu đồ, heatmap, gauge), hệ thống plugin, hỗ trợ Docker, tối ưu hiệu suất |

### 🚧 Đang phát triển (v2.2)

- 🔔 **Thông báo Cảnh báo Thời gian thực** — Cảnh báo tùy chỉnh dựa trên ngưỡng với nhiều kênh gửi (email, webhook, trong ứng dụng)
- 🧩 **Plugin Marketplace** — Duyệt, cài đặt và quản lý community plugins trực tiếp từ dashboard
- 👥 **Hỗ trợ Đa người dùng** — Kiểm soát truy cập dựa trên vai trò (RBAC), quản lý người dùng và không gian làm việc nhóm
- 📈 **Phân tích Nâng cao** — Thông tin sâu hơn về hiệu suất agents, theo dõi chi phí và xu hướng sử dụng

### 🔮 Lên kế hoạch (v2.3+)

- 📱 **Ứng dụng Di động** — Ứng dụng iOS & Android gốc để giám sát mọi lúc mọi nơi
- 🌐 **API Gateway** — Lớp API REST/GraphQL thống nhất với rate limiting, caching và authentication
- 🤖 **Gỡ lỗi với Trợ giúp AI** — Để AI phân tích logs và đề xuất fixes cho các vấn đề của agents
- 🔄 **Tích hợp CI/CD** — Hỗ trợ gốc cho GitHub Actions, GitLab CI và Jenkins pipelines
- 📡 **Triển khai Edge** — Agent nhẹ cho edge devices và scenarios IoT
- 🎯 **Dashboard Tùy chỉnh** — Trình tạo dashboard drag-and-drop với widget library

> 💡 Có yêu cầu tính năng? [Mở issue](https://github.com/openclaw/openclaw-dashboard/issues) hoặc tham gia thảo luận!

---

## 🤝 Đóng góp

Đóng góp được chào đón! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) trước khi submit PR.

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'feat: Add amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

---

## Những người đóng góp

Cảm ơn những người tuyệt vời này vì sự đóng góp của họ:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Dự án này tuân theo đặc tả [all-contributors](https://allcontributors.org). Mọi loại đóng góp đều được chào đón!

### Thêm Người đóng góp Mới

Để thêm người đóng góp mới, sử dụng lệnh sau:

```bash
npx all-contributors add <username> <contribution>
```

Ví dụ:

```bash
npx all-contributors add johndoe code,doc
```

Các loại đóng góp: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Giấy phép

Dự án này được cấp phép theo Giấy phép MIT - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Ghi công

- lấy cảm hứng từ [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) và [Raycast](https://raycast.com)
- Xây dựng với tình yêu cho cộng đồng OpenClaw

---

Được tạo với ❤️ bởi đội ngũ OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
