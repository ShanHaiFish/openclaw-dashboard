# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | **[বাংলা](README.bn.md)** | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **AI এজেন্টের জন্য সবচেয়ে সুন্দর রিয়েল-টাইম মনিটরিং ড্যাশবোর্ড।**
> React দিয়ে তৈরি, ⌘K কমান্ড প্যালেট, i18n, ৪টি থিম এবং প্লাগইন সিস্টেম সহ।

![OpenClaw Dashboard প্রিভিউ](docs/preview.png)

---

## ✨ কেন OpenClaw Dashboard?

AI এজেন্ট পরিচালনা করা টার্মিনাল লগ পড়ার মতো হওয়া উচিত নয়। OpenClaw Dashboard আপনার এজেন্ট মনিটরিং অভিজ্ঞতাকে রূপান্তরিত করে:

- **🎨 অসাধারণ ভিজ্যুয়াল ডিজাইন** — Vercel, Linear এবং Raycast থেকে অনুপ্রাণিত। Glassmorphism, মসৃণ অ্যানিমেশন এবং সুন্দর বিবরণ।
- **⚡ রিয়েল-টাইম আপডেট** — WebSocket চালিত লাইভ ডেটা। রিফ্রেশ বোতামের প্রয়োজন নেই।
- **⌘K কমান্ড প্যালেট** — পাওয়ার ইউজারদের কীবোর্ড-প্রথম ইন্টারফেস পছন্দ। তাৎক্ষণিকভাবে নেভিগেট, সার্চ এবং কমান্ড এক্সিকিউট করুন।
- **🌍 আন্তর্জাতিককরণ** — ইংরেজি এবং চিনির জন্য বিল্ট-ইন সাপোর্ট। সহজে আরও ভাষা যোগ করুন।
- **🎭 ৪টি সুন্দর থিম** — ডার্ক, লাইট, AMOLED (OLED স্ক্রিনের জন্য) এবং সিস্টেম-সচেতন।
- **🔌 প্লাগইন সিস্টেম** — ফর্ক না করে কার্যকারিতা বাড়ান। পেজ, কমান্ড এবং হুক রেজিস্টার করুন।
- **📊 সমৃদ্ধ ডেটা ভিজ্যুয়ালাইজেশন** — চার্ট, হিটম্যাপ, গেজ এবং প্রগ্রেস ইন্ডিকেটর।
- **📱 সম্পূর্ণ রেসপনসিভ** — মোবাইল, ট্যাবলেট এবং ডেস্কটপে সুন্দরভাবে কাজ করে।

---

## 📊 বৈশিষ্ট্য তুলনা

| বৈশিষ্ট্য | OpenClaw Dashboard | জেনেরিক মনিটরিং | Terminal UI |
|---------|-------------------|-------------------|-------------|
| রিয়েল-টাইম WebSocket | ✅ | ⚠️ সীমিত | ✅ |
| কমান্ড প্যালেট | ✅ | ❌ | ❌ |
| মাল্টি-থিম সাপোর্ট | ✅ ৪টি থিম | ⚠️ ১-২টি থিম | ⚠️ সীমিত |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| প্লাগইন সিস্টেম | ✅ | ❌ | ❌ |
| মোবাইল রেসপনসিভ | ✅ | ⚠️ আংশিক | ❌ |
| সুন্দর অ্যানিমেশন | ✅ | ❌ | ❌ |
| Docker রেডি | ✅ | ✅ | ⚠️ |
| জিরো কনফিগারেশন | ✅ | ❌ | ❌ |

---

## 🏗️ আর্কিটেকচার

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenClaw Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React UI  │  │   Zustand   │  │   WebSocket │             │
│  │   (ভিউ)     │◄─┤   (স্টেট)   │◄─┤   (রিয়েল.) │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Framer    │  │  প্লাগইন    │  │   Express   │             │
│  │   Motion    │  │  ম্যানেজার  │  │   সার্ভার   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    TailwindCSS স্টাইল                     │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │ডার্ক │ │লাইট │ │AMOLED│ │সিস্টেম│ │কাস্টম│          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenClaw API সার্ভার                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  স্ট্যাটিক  │             │
│  │  /api/*     │  │  /ws        │  │  ফাইল       │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 দ্রুত শুরু

### প্রয়োজনীয়তা

- Node.js 18+
- npm বা yarn

### npm দিয়ে ইনস্টল

```bash
# npm থেকে ইনস্টল করুন
npm install @openclaw/dashboard

# সার্ভার চালু করুন (বিল্ট-ইন ফ্রন্টএন্ড + API পরিবেশন করে)
npx @openclaw/dashboard
```

অথবা গ্লোবালি ইনস্টল করুন:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### সোর্স থেকে

```bash
# রিপোজিটরি ক্লোন করুন
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ফ্রন্টএন্ড বিল্ড করুন
npm run build

# প্রোডাকশন সার্ভার চালু করুন
npm start
```

আপনার ব্রাউজারে [http://localhost:3777](http://localhost:3777) খুলুন।

### ডেভেলপমেন্ট মোড

```bash
# টার্মিনাল ১: হট রিলোড সহ ফ্রন্টএন্ড ডেভ সার্ভার চালু করুন
npm run dev

# টার্মিনাল ২: API সার্ভার চালু করুন
npm run server
```

### Docker

```bash
# Docker Compose ব্যবহার করে (সুপারিশকৃত)
docker compose up -d

# অথবা মানুষিকভাবে বিল্ড এবং চালান
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ কীবোর্ড শর্টকাট

সমস্ত কীবোর্ড শর্টকাট দেখতে যেকোনো জায়গায় `?` প্রেস করুন।

| শর্টকাট | অ্যাকশন |
|----------|--------|
| `Ctrl+K` | কমান্ড প্যালেট |
| `Ctrl+/` | সাইডবার টগল |
| `G তারপর O` | ওভারভিউতে যান |
| `G তারপর S` | সেশনে যান |
| `G তারপর A` | এজেন্টে যান |
| `G তারপর T` | টাস্কে যান |
| `G তারপর ,` | সেটিংসে যান |
| `T তারপর D` | ডার্ক থিম টগল |
| `T তারপর L` | লাইট থিম টগল |
| `1-৫` | নেভ আইটেমে যান |

---

## 📊 পারফরম্যান্স বেঞ্চমার্ক

| মেট্রিক | মান |
|--------|-------|
| প্রথম কন্টেন্ট পেইন্ট | < ০.৫সে |
| ইন্টারঅ্যাকটিভ টাইম | < ১.২সে |
| বান্ডেল সাইজ (gzipped) | ~১৮০KB |
| Lighthouse স্কোর | ৯৫+ |
| WebSocket লেটেন্সি | < ৫০ms |

---

## 🔒 নিরাপত্তা বিবেচনা

- **ডিফল্টে কোনো অথেনটিকেশন নেই** — প্রোডাকশনে নিজস্ব অথ মিডলওয়্যার যোগ করুন
- **CORS সক্ষম** — আপনার ডিপ্লয়মেন্টের জন্য অনুমোদিত অরিজিন কনফিগার করুন
- **CSP সুপারিশকৃত** — Content-Security-Policy হেডার যোগ করুন
- **HTTPS প্রয়োজন** — প্রোডাকশনে সর্বদা HTTPS ব্যবহার করুন
- **রেট লিমিটিং** — API এন্ডপয়েন্টের জন্য রেট লিমিটিং যোগ করার কথা বিবেচনা করুন

---

## 📁 প্রজেক্ট স্ট্রাকচার

```
openclaw-dashboard/
├── .github/               # GitHub Actions ওয়ার্কফ্লো
│   ├── workflows/
│   │   ├── ci.yml         # CI পাইপলাইন
│   │   └── release.yml    # রিলিজ অটোমেশন
│   └── FUNDING.yml
├── docs/                  # ডকুমেন্টেশন
│   └── API.md             # API রেফারেন্স
├── server/                # ব্যাকএন্ড সার্ভার
│   ├── index.js           # Express + WebSocket সার্ভার
│   ├── openclaw-api.js    # মক ডেটা সহ API র‍্যাপার
│   └── package.json
├── src/
│   ├── components/        # React কম্পোনেন্ট
│   │   ├── Agents/        # এজেন্ট ম্যানেজমেন্ট
│   │   ├── CommandPalette/# ⌘K কমান্ড প্যালেট
│   │   ├── Dashboard/     # ওভারভিউ, চার্ট, মেট্রিক্স
│   │   ├── Layout/        # সাইডবার, হেডার, মেইন লেআউট
│   │   ├── Notifications/ # নোটিফিকেশন প্যানেল
│   │   ├── Sessions/      # সেশন ম্যানেজমেন্ট
│   │   ├── Settings/      # সেটিংস পেজ
│   │   ├── Tasks/         # টাস্ক বোর্ড
│   │   └── ui/            # পুনঃব্যবহারযোগ্য UI কম্পোনেন্ট
│   ├── hooks/             # কাস্টম React হুক
│   ├── i18n/              # অনুবাদ (EN/ZH)
│   ├── lib/               ইউটিলিটি, কনস্ট্যান্ট
│   ├── pages/             # পেজ কম্পোনেন্ট
│   ├── plugins/           # প্লাগইন সিস্টেম
│   │   ├── index.js       # প্লাগইন ম্যানেজার
│   │   ├── examples/      # উদাহরণ প্লাগইন
│   │   └── README.md      # প্লাগইন ডকুমেন্টেশন
│   ├── stores/            # Zustand স্টোর
│   └── utils/             # ইউটিলিটি ফাংশন
├── public/                # স্ট্যাটিক অ্যাসেট
├── Dockerfile             # মাল্টি-স্টেজ Docker বিল্ড
├── docker-compose.yml     # Docker Compose কনফিগ
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API এন্ডপয়েন্ট

পূর্ণ ডকুমেন্টেশনের জন্য [docs/API.md](docs/API.md) দেখুন।

| এন্ডপয়েন্ট | বিবরণ |
|----------|----------|
| `GET /api/health` | হেলথ চেক |
| `GET /api/overview` | ড্যাশবোর্ড পরিসংখ্যান + সাম্প্রতিক কার্যকলাপ |
| `GET /api/sessions` | পেজিনেশন সহ সমস্ত সেশন |
| `GET /api/sessions/:id` | সেশন বিস্তারিত + ইতিহাস |
| `GET /api/agents` | সমস্ত এজেন্ট |
| `GET /api/tasks` | স্ট্যাটাস অনুযায়ী টাস্ক |
| `GET /api/system` | সিস্টেম মেট্রিক্স |
| `GET /api/notifications` | নোটিফিকেশন তালিকা |
| `GET /api/heatmap` | ৯০-দিনের কার্যকলাপ হিটম্যাপ |
| `WS /ws` | রিয়েল-টাইম আপডেট (প্রতি ৩সে) |

---

## 🎨 থিমিং

ড্যাশবোর্ড ৪টি থিম সমর্থন করে:

| থিম | বিবরণ |
|-------|----------|
| **ডার্ক** | গভীর নেভি গ্রেডিয়েন্ট (ডিফল্ট) |
| **লাইট** | সূক্ষ্ম গ্রে সহ পরিষ্কার সাদা |
| **AMOLED** | OLED স্ক্রিনের জন্য বিশুদ্ধ কালো |
| **সিস্টেম** | OS পছন্দ অনুসরণ করে |

`src/index.css` ফাইলে CSS ভেরিয়েবল সম্পাদনা করে থিম কাস্টমাইজ করুন।

---

## 🌐 আন্তর্জাতিককরণ

বর্তমানে সমর্থিত:
- 🇺🇸 ইংরেজি
- 🇨🇳 চিনি (简体中文)

নতুন ভাষা যোগ করতে:
1. `src/i18n/` ফোল্ডারে একটি JSON ফাইল তৈরি করুন (যেমন `ja.json`)
2. ভাষা সুইচারে ভাষা যোগ করুন
3. সমস্ত ইউজার-ফেসিং স্ট্রিংয়ের জন্য `t('key')` ব্যবহার করুন

---

## 🔌 প্লাগইন সিস্টেম

OpenClaw Dashboard কার্যকারিতা বাড়ানোর জন্য প্লাগইন সমর্থন করে:

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
    // পরিষ্কার
  }
};
```

পূর্ণ ডকুমেন্টেশনের জন্য [src/plugins/README.md](src/plugins/README.md) দেখুন।

---

## 🐳 ডিপ্লয়মেন্ট অপশন

### Vercel (ফ্রন্টএন্ড)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (ফুল-স্ট্যাক)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (সুপারিশকৃত)

```bash
docker compose up -d
```

বিস্তারিত নির্দেশিকার জন্য পূর্ণ [Deployment Guide](docs/deployment.md) দেখুন।

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Systemd সার্ভিস

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

## ❓ সাধারণ জিজ্ঞাসা

**প্র: কি আমি এটি আমার নিজের OpenClaw ইন্সট্যান্সের সাথে ব্যবহার করতে পারি?**
উ: হ্যাঁ! `server/openclaw-api.js`-এ মক ডেটা প্রকৃত API কল দিয়ে প্রতিস্থাপন করুন।

**প্র: অথেনটিকেশন কিভাবে যোগ করব?**
উ: `server/index.js`-এ মিডলওয়্যার যোগ করুন। আমরা Passport.js বা JWT সুপারিশ করি।

**প্র: কি আমি থিম কাস্টমাইজ করতে পারি?**
উ: অবশ্যই! `src/index.css`-এ CSS ভেরিয়েবল সম্পাদনা করুন।

**প্র: এটি কি প্রোডাকশনের জন্য প্রস্তুত?**
উ: হ্যাঁ, যথাযথ অথেনটিকেশন এবং নিরাপত্তা হেডার কনফিগার করা থাকলে।

**প্র: কিভাবে অবদান রাখব?**
উ: নির্দেশিকার জন্য [CONTRIBUTING.md](CONTRIBUTING.md) দেখুন।

---

## 🗺️ রোডম্যাপ

### ✅ সম্পন্ন

| সংস্করণ | বৈশিষ্ট্য |
|---------|-----------|
| **v2.0** | 🎨 প্রাথমিক রিলিজ — React + Vite, ⌘K কমান্ড প্যালেট, ৪টি থিম, i18n (EN/ZH), WebSocket রিয়েল-টাইম আপডেট |
| **v2.1** | 📊 সমৃদ্ধ ডেটা ভিজ্যুয়ালাইজেশন (চার্ট, হিটম্যাপ, গেজ), প্লাগইন সিস্টেম, Docker সাপোর্ট, পারফরম্যান্স অপ্টিমাইজেশন |

### 🚧 চলমান (v2.2)

- 🔔 **রিয়েল-টাইম সতর্কতা বিজ্ঞপ্তি** — বহু-চ্যানেল ডেলিভারি (ইমেইল, ওয়েবহুক, ইন-অ্যাপ) সহ কাস্টমাইজেবল থ্রেশহোল্ড-ভিত্তিক সতর্কতা
- 🧩 **প্লাগইন মার্কেটপ্লেস** — সরাসরি ড্যাশবোর্ড থেকে কমিউনিটি প্লাগইন ব্রাউজ, ইনস্টল এবং ম্যানেজ করুন
- 👥 **মাল্টি-ইউজার সাপোর্ট** — রোল-বেজড অ্যাক্সেস কন্ট্রোল (RBAC), ইউজার ম্যানেজমেন্ট এবং টিম ওয়ার্কস্পেস
- 📈 **উন্নত অ্যানালিটিক্স** — এজেন্ট পারফরম্যান্স, কস্ট ট্র্যাকিং এবং ব্যবহার ট্রেন্ডে গভীর অন্তর্দৃষ্টি

### 🔮 পরিকল্পিত (v2.3+)

- 📱 **মোবাইল অ্যাপ** — চলাচলের সময় মনিটরিংয়ের জন্য নেটিভ iOS এবং Android অ্যাপ
- 🌐 **API গেটওয়ে** — রেট লিমিটিং, ক্যাশিং এবং অথ সহ ইউনিফায়িড REST/GraphQL API লেয়ার
- 🤖 **AI-সহায়িত ডিবাগিং** — লগ বিশ্লেষণ এবং এজেন্ট সমস্যার জন্য সমাধান প্রস্তাব করতে AI-কে দিন
- 🔄 **CI/CD ইন্টিগ্রেশন** — GitHub Actions, GitLab CI এবং Jenkins পাইপলাইনের জন্য নেটিভ সাপোর্ট
- 📡 **এজ ডিপ্লয়মেন্ট** — এজ ডিভাইস এবং IoT পরিস্থিতির জন্য হালকা এজেন্ট
- �য় **কাস্টম ড্যাশবোর্ড** — উইজেট লাইব্রেরি সহ ড্র্যাগ-এন্ড-ড্রপ ড্যাশবোর্ড বিল্ডার

> 💡 একটি বৈশিষ্ট্য অনুরোধ আছে? [একটি ইস্যু খুলুন](https://github.com/openclaw/openclaw-dashboard/issues) অথবা আলোচনায় যোগ দিন!

---

## 🤝 অবদান

অবদান স্বাগতম! দয়া করে PR জমা দেওয়ার আগে [CONTRIBUTING.md](CONTRIBUTING.md) পড়ুন।

1. রিপোজিটরি ফর্ক করুন
2. আপনার ফিচার ব্রান্চ তৈরি করুন (`git checkout -b feature/amazing-feature`)
3. আপনার পরিবর্তন কমিট করুন (`git commit -m 'feat: Add amazing feature'`)
4. ব্রান্চে পুশ করুন (`git push origin feature/amazing-feature`)
5. একটি Pull Request খুলুন

---

## অবদানকারী

তাদের অবদানের জন্য এই অসাধারণ মানুষদের কাছে ধন্যবাদ:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

এই প্রজেক্ট [all-contributors](https://allcontributors.org) স্পেসিফিকেশন অনুসরণ করে। যেকোনো ধরনের অবদান স্বাগতম!

### নতুন অবদানকারী যোগ করা

নতুন অবদানকারী যোগ করতে এই কমান্ড ব্যবহার করুন:

```bash
npx all-contributors add <username> <contribution>
```

উদাহরণস্বরূপ:

```bash
npx all-contributors add johndoe code,doc
```

উপলব্ধ অবদানের ধরন: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 লাইসেন্স

এই প্রজেক্ট MIT লাইসেন্সের অধীনে লাইসেন্সকৃত — বিস্তারিত জানতে [LICENSE](LICENSE) ফাইল দেখুন।

## 🙏 কৃতজ্ঞতা

- [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) এবং [Raycast](https://raycast.com) থেকে অনুপ্রাণিত
- OpenClaw কমিউনিটির জন্য ভালোবাসা দিয়ে তৈরি

---

OpenClaw টিম দ্বারা ❤️ দিয়ে তৈরি

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
