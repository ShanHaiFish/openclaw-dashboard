# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | **[ไทย](README.th.md)** | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **แดชบอร์ดการ_monitoring แบบเรียลไทม์ที่สวยงามที่สุดสำหรับ AI agents**
> สร้างด้วย React พร้อมคำสั่งpalette ⌘K, i18n, 4 ธีม และระบบปลั๊กอิน

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ ทำไมต้อง OpenClaw Dashboard?

การจัดการ AI agents ไม่ควรรู้สึกเหมือนการอ่าน log ใน terminal OpenClaw Dashboard สร้างประสบการณ์การ monitoring ของคุณใหม่ด้วย:

- **🎨 ดีไซน์ที่สวยงาม** — ได้แรงบันดาลใจจาก Vercel, Linear และ Raycast ด้วย Glassmorphism, แอนิเมชันที่ลื่นไหล และรายละเอียดที่พิถีพิถัน
- **⚡ อัปเดตแบบเรียลไทม์** — ข้อมูลสดผ่าน WebSocket ไม่ต้องกดรีเฟรช
- **⌘K Command Palette** — ผู้ใช้ขั้นสูงชื่นชอบอินเทอร์เฟซที่ใช้คีย์บอร์ดเป็นหลัก นำทาง ค้นหา และรันคำสั่งได้ทันที
- **🌍 รองรับหลายภาษา** — รองรับภาษาอังกฤษและจีนในตัว เพิ่มภาษาอื่นๆ ได้ง่าย
- **🎭 4 ธีมสวยงาม** — มืด, สว่าง, AMOLED (สำหรับหน้าจอ OLED), และตามระบบ
- **🔌 ระบบปลั๊กอิน** — ขยายฟังก์ชันได้โดยไม่ต้อง fork ลงทะเบียนหน้า, คำสั่ง, และ hooks
- **📊 การแสดงผลข้อมูลที่หลากหลาย** — แผนภูมิ, แผนที่ความร้อน, มาตรวัด และตัวบ่งชี้ความคืบหน้า
- **📱 รองรับทุกขนาดหน้าจอ** — ใช้งานได้สวยงามบนมือถือ, แท็บเล็ต และเดสก์ท็อป

---

## 📊 เปรียบเทียบฟีเจอร์

| ฟีเจอร์ | OpenClaw Dashboard | การmonitoring ทั่วไป | Terminal UI |
|---------|-------------------|---------------------|-------------|
| WebSocket เรียลไทม์ | ✅ | ⚠️ จำกัด | ✅ |
| Command Palette | ✅ | ❌ | ❌ |
| รองรับหลายธีม | ✅ 4 ธีม | ⚠️ 1-2 ธีม | ⚠️ จำกัด |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| ระบบปลั๊กอิน | ✅ | ❌ | ❌ |
| รองรับมือถือ | ✅ | ⚠️ บางส่วน | ❌ |
| แอนิเมชันสวยงาม | ✅ | ❌ | ❌ |
| พร้อมใช้งาน Docker | ✅ | ✅ | ⚠️ |
| ตั้งค่าศูนย์ | ✅ | ❌ | ❌ |

---

## 🏗️ สถาปัตยกรรม

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
│  │  REST API   │  │  WebSocket  │  │  ไฟล์       │             │
│  │  /api/*     │  │  /ws        │  │  คงที่      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js 18+
- npm หรือ yarn

### ติดตั้งผ่าน npm

```bash
# ติดตั้งจาก npm
npm install @openclaw/dashboard

# เริ่มต้นเซิร์ฟเวอร์ (ให้บริการ frontend + API ที่มาพร้อมกัน)
npx @openclaw/dashboard
```

หรือติดตั้งแบบ global:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### จากซอร์สโค้ด

```bash
# โคลน repository
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# ติดตั้ง dependencies
npm install

# สร้าง frontend
npm run build

# เริ่มต้น production server
npm start
```

เปิด [http://localhost:3777](http://localhost:3777) ในเบราว์เซอร์ของคุณ

### โหมดพัฒนา

```bash
# Terminal 1: เริ่มต้น frontend dev server พร้อม hot reload
npm run dev

# Terminal 2: เริ่มต้น API server
npm run server
```

### Docker

```bash
# ใช้ Docker Compose (แนะนำ)
docker compose up -d

# หรือสร้างและรันด้วยตนเอง
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ แป้นพิมพ์ลัด

กด `?` ที่ใดก็ได้เพื่อดูแป้นพิมพ์ลัดทั้งหมด

| แป้นพิมพ์ลัด | การกระทำ |
|-------------|----------|
| `Ctrl+K` | Command palette |
| `Ctrl+/` | แสดง/ซ่อน sidebar |
| `G แล้ว O` | ไปที่ภาพรวม |
| `G แล้ว S` | ไปที่เซสชัน |
| `G แล้ว A` | ไปที่ agents |
| `G แล้ว T` | ไปที่งาน |
| `G แล้ว ,` | ไปที่การตั้งค่า |
| `T แล้ว D` | สลับธีมมืด |
| `T แล้ว L` | สลับธีมสว่าง |
| `1-5` | ข้ามไปยังรายการนำทาง |

---

## 📊 ตัวชี้วัดประสิทธิภาพ

| ตัวชี้วัด | ค่า |
|----------|-----|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| ขนาด Bundle (gzip) | ~180KB |
| คะแนน Lighthouse | 95+ |
| ความหน่วง WebSocket | < 50ms |

---

## 🔒 ข้อพิจารณาด้านความปลอดภัย

- **ไม่มีการยืนยันตัวตนตามค่าเริ่มต้น** — เพิ่ม middleware การยืนยันตัวตนของคุณเองใน production
- **เปิดใช้งาน CORS** — กำหนด allowed origins สำหรับการ部署ของคุณ
- **แนะนำให้ใช้ CSP** — เพิ่ม Content-Security-Policy headers
- **ต้องใช้ HTTPS** — ใช้ HTTPS เสมอใน production
- **Rate limiting** — ควรเพิ่ม rate limiting สำหรับ API endpoints

---

## 📁 โครงสร้างโปรเจค

```
openclaw-dashboard/
├── .github/               # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml         # CI pipeline
│   │   └── release.yml    # การทำงานอัตโนมัติสำหรับ release
│   └── FUNDING.yml
├── docs/                  # เอกสาร
│   └── API.md             # อ้างอิง API
├── server/                # เซิร์ฟเวอร์ backend
│   ├── index.js           # Express + WebSocket server
│   ├── openclaw-api.js    # API wrapper พร้อม mock data
│   └── package.json
├── src/
│   ├── components/        # React components
│   │   ├── Agents/        # การจัดการ agents
│   │   ├── CommandPalette/# ⌘K command palette
│   │   ├── Dashboard/     # ภาพรวม, แผนภูมิ, ตัวชี้วัด
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # แผงการแจ้งเตือน
│   │   ├── Sessions/      # การจัดการเซสชัน
│   │   ├── Settings/      # หน้าการตั้งค่า
│   │   ├── Tasks/         // กระดานงาน
│   │   └── ui/            # React components ที่ใช้ซ้ำได้
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # คำแปล (EN/ZH)
│   ├── lib/               # Utilities, constants
│   ├── pages/             # Page components
│   ├── plugins/           # ระบบปลั๊กอิน
│   │   ├── index.js       # Plugin manager
│   │   ├── examples/      # ตัวอย่างปลั๊กอิน
│   │   └── README.md      # เอกสารปลั๊กอิน
│   ├── stores/            # Zustand stores
│   └── utils/             # Utility functions
├── public/                # ไฟล์คงที่
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # การกำหนดค่า Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API Endpoints

ดู [docs/API.md](docs/API.md) สำหรับเอกสารฉบับเต็ม

| Endpoint | คำอธิบาย |
|----------|----------|
| `GET /api/health` | ตรวจสอบสถานะ |
| `GET /api/overview` | สถิติแดชบอร์ด + กิจกรรมล่าสุด |
| `GET /api/sessions` | เซสชันทั้งหมดพร้อม pagination |
| `GET /api/sessions/:id` | รายละเอียดเซสชัน + ประวัติ |
| `GET /api/agents` | Agents ทั้งหมด |
| `GET /api/tasks` | งานพร้อมสถานะ |
| `GET /api/system` | ตัวชี้วัดระบบ |
| `GET /api/notifications` | รายการแจ้งเตือน |
| `GET /api/heatmap` | แผนที่ความร้อนกิจกรรม 90 วัน |
| `WS /ws` | อัปเดตแบบเรียลไทม์ (ทุก 3 วินาที) |

---

## 🎨 ธีม

แดชบอร์ดรองรับ 4 ธีม:

| ธีม | คำอธิบาย |
|-----|----------|
| **มืด** | ไล่ระดับสีน้ำเงินเข้ม (ค่าเริ่มต้น) |
| **สว่าง** | สีขาวสะอาดพร้อมสีเทาอ่อน |
| **AMOLED** | สีดำล้วนสำหรับหน้าจอ OLED |
| **ระบบ** | ตามความชอบของ OS |

ปรับแต่งธีมได้โดยแก้ไข CSS variables ใน `src/index.css`

---

## 🌐 รองรับหลายภาษา

รองรับในปัจจุบัน:
- 🇺🇸 ภาษาอังกฤษ
- 🇨🇳 ภาษาจีน (简体中文)

เพิ่มภาษาใหม่โดย:
1. สร้างไฟล์ JSON ใน `src/i18n/` (เช่น `ja.json`)
2. เพิ่มภาษาในตัวเลือกภาษา
3. ใช้ `t('key')` สำหรับข้อความที่แสดงต่อผู้ใช้ทั้งหมด

---

## 🔌 ระบบปลั๊กอิน

OpenClaw Dashboard รองรับปลั๊กอินเพื่อขยายฟังก์ชัน:

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
    // ทำความสะอาด
  }
};
```

ดู [src/plugins/README.md](src/plugins/README.md) สำหรับเอกสารฉบับเต็ม

---

## 🐳 ตัวเลือกการ部署

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (แนะนำ)

```bash
docker compose up -d
```

ดู [คู่มือการ部署](docs/deployment.md) ฉบับเต็มสำหรับคำแนะนำโดยละเอียด

### VPS / เซิร์ฟเวอร์จริง

```bash
npm install --production
npm run build
npm start
```

### บริการ Systemd

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

## ❓ คำถามที่พบบ่อย

**ถาม: สามารถใช้กับ OpenClaw instance ของฉันเองได้หรือไม่?**
ตอบ: ได้! แทนที่ mock data ใน `server/openclaw-api.js` ด้วย API calls จริง

**ถาม: จะเพิ่มการยืนยันตัวตนอย่างไร?**
ตอบ: เพิ่ม middleware ใน `server/index.js` เราแนะนำ Passport.js หรือ JWT

**ถาม: ปรับแต่งธีมได้หรือไม่?**
ตอบ: ได้แน่นอน! แก้ไข CSS variables ใน `src/index.css`

**ถาม: พร้อมใช้งานใน production หรือไม่?**
ตอบ: พร้อมใช้งานได้ เมื่อตั้งค่าการยืนยันตัวตนและ security headers อย่างเหมาะสม

**ถาม: จะร่วมพัฒนาได้อย่างไร?**
ตอบ: ดู [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับแนวทาง

---

## 🗺️ แผนพัฒนา

### ✅ เสร็จสิ้นแล้ว

| เวอร์ชัน | จุดเด่น |
|---------|---------|
| **v2.0** | 🎨 วางจำหน่ายครั้งแรก — React + Vite, ⌘K command palette, 4 ธีม, i18n (EN/ZH), การอัปเดตเรียลไทม์ผ่าน WebSocket |
| **v2.1** | 📊 การแสดงผลข้อมูลที่หลากหลาย (แผนภูมิ, แผนที่ความร้อน, มาตรวัด), ระบบปลั๊กอิน, รองรับ Docker, ปรับปรุงประสิทธิภาพ |

### 🚀 กำลังพัฒนา (v2.2)

- 🔔 **การแจ้งเตือนแบบเรียลไทม์** — การแจ้งเตือนที่ปรับแต่งได้ตามเกณฑ์ พร้อมการส่งหลายช่องทาง (อีเมล, webhook, ในแอป)
- 🧩 **Marketplace ปลั๊กอิน** — เรียกดู ติดตั้ง และจัดการปลั๊กอินจากชุมชนได้โดยตรงจากแดชบอร์ด
- 👥 **รองรับผู้ใช้หลายคน** — การควบคุมสิทธิ์ตามบทบาท (RBAC), การจัดการผู้ใช้ และพื้นที่ทำงานแบบทีม
- 📈 **การวิเคราะห์ขั้นสูง** — ข้อมูลเชิงลึกเกี่ยวกับประสิทธิภาพของ agent, การติดตามต้นทุน และแนวโน้มการใช้งาน

### 🔮 วางแผนไว้ (v2.3+)

- 📱 **แอปมือถือ** — แอป iOS และ Android แบบ native สำหรับการ monitor ได้ทุกที่
- 🌐 **API Gateway** — ชั้น API REST/GraphQL แบบรวมพร้อม rate limiting, caching และ authentication
- 🤖 **การดีบักด้วย AI** — ให้วิเคราะห์ log และแนะนำการแก้ไขปัญหาของ agent
- 🔄 **การรวม CI/CD** — รองรับ GitHub Actions, GitLab CI และ Jenkins pipelines แบบ native
- 📡 **Edge Deployment** — Agent น้ำหนักเบาสำหรับอุปกรณ์ edge และสถานการณ์ IoT
- 🎯 **แดชบอร์ดที่กำหนดเอง** — ตัวสร้างแดชบอร์ดแบบ drag-and-drop พร้อม library ของ widget

> 💡 มีคำขอฟีเจอร์? [เปิด issue](https://github.com/openclaw/openclaw-dashboard/issues) หรือเข้าร่วมการสนทนา!

---

## 🤝 ร่วมพัฒนา

ยินดีต้อนรับทุกการมีส่วนร่วม! กรุณาอ่าน [CONTRIBUTING.md](CONTRIBUTING.md) ก่อนส่ง PR

1. Fork repository
2. สร้าง feature branch ของคุณ (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลงของคุณ (`git commit -m 'feat: Add amazing feature'`)
4. Push ไปยัง branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

---

## ผู้มีส่วนร่วม

ขอบคุณผู้ที่ยอดเยี่ยมเหล่านี้สำหรับการมีส่วนร่วม:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

โปรเจคนี้เป็นไปตามข้อกำหนดของ [all-contributors](https://allcontributors.org) การมีส่วนร่วมทุกรูปแบบยินดีต้อนรับ!

### เพิ่มผู้มีส่วนร่วมใหม่

เพื่อเพิ่มผู้มีส่วนร่วมใหม่ ใช้คำสั่งต่อไปนี้:

```bash
npx all-contributors add <username> <contribution>
```

ตัวอย่าง:

```bash
npx all-contributors add johndoe code,doc
```

ประเภทการมีส่วนร่วมที่ใช้ได้: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 ลิขสิทธิ์

โปรเจคนี้อยู่ภายใต้ MIT License — ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียด

## 🙏 ขอบคุณ

- ได้แรงบันดาลใจจาก [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) และ [Raycast](https://raycast.com)
- สร้างด้วยความรักเพื่อชุมชน OpenClaw

---

สร้างด้วย ❤️ โดยทีม OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
