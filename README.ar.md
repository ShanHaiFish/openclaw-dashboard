<div dir="rtl" lang="ar">

# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | **العربية** | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **أجمل لوحة مراقبة لوكيلات الذكاء الاصطناعي في الوقت الفعلي.**
> مبنية باستخدام React، تتميز بلوحة الأوامر ☘K، و i18n، و4 قوالب، ونظام إضافات.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ لماذا OpenClaw Dashboard?

يجب ألا يشبه إدارة وكلاء الذكاء الاصطناعي قراءة سجلات الطرفية. يحول OpenClaw Dashboard تجربة مراقبة الوكالات مع:

- **🎨 تصميم بصري مذهل** — مستوحى من Vercel و Linear و Raycast. زجاجي، ورسوم متحركة سلسة، وتفاصيل مدروسة.
- **⚡ تحديثات في الوقت الفعلي** — بيانات حية عبر WebSocket. لا حاجة لأزرار التحديث.
- **⌘K لوحة الأوامر** — يحب المستخدمون واجهات لوحة المفاتيح. التنقل والبحث وتنفيذ الأوامر فوراً.
- **🌍 التدويل** — دعم مدمج للغتين الإنجليزية والصينية. أضف لغات جديدة بسهولة.
- **🎭 4 قوالب جميلة** — داكن، فاتح، AMOLED (لشاشات OLED)، ونظامي.
- **🔌 نظام الإضافات** — وسع الوظائف دون تفرع. سجل الصفحات والأوامر والخطافات.
- **📊 تصور بيانات غني** — مخططات، خرائط حرارية، مقاييس، ومؤشرات التقدم.
- **📱 متجاوب بالكامل** — يعمل بشكل رائع على الجوال والأجهزة اللوحية وسطح المكتب.

---

## 📊 مقارنة الميزات

| الميزة | OpenClaw Dashboard | المراقبة العامة | واجهة الطرفية |
|--------|-------------------|----------------|-------------|
| WebSocket في الوقت الفعلي | ✅ | ⚠️ محدود | ✅ |
| لوحة الأوامر | ✅ | ❌ | ❌ |
| دعم القوالب المتعددة | ✅ 4 قوالب | ⚠️ 1-2 قوالب | ⚠️ محدود |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| نظام الإضافات | ✅ | ❌ | ❌ |
| متجاوب للجوال | ✅ | ⚠️ جزئي | ❌ |
| رسوم متحركة جميلة | ✅ | ❌ | ❌ |
| جاهزية Docker | ✅ | ✅ | ⚠️ |
| بدون إعدادات | ✅ | ❌ | ❌ |

---

## 🏗️ البنية التحتية

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

## 🚀 البداية السريعة

### المتطلبات

- Node.js 18+
- npm أو yarn

### التثبيت عبر npm

```bash
# التثبيت من npm
npm install @openclaw/dashboard

# تشغيل الخادم (يخدم واجهة الأمام المدمجة + API)
npx @openclaw/dashboard
```

أو التثبيت عالمياً:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### من الكود المصدري

```bash
# استنساخ المستودع
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# تثبيت الاعتماديات
npm install

# بناء واجهة الأمام
npm run build

# تشغيل خادم الإنتاج
npm start
```

افتح [http://localhost:3777](http://localhost:3777) في متصفحك.

### وضع التطوير

```bash
# الطرفية 1: تشغيل خادم تطوير الواجهة مع إعادة التحميل الفوري
npm run dev

# الطرفية 2: تشغيل خادم API
npm run server
```

### Docker

```bash
# استخدام Docker Compose (موصى به)
docker compose up -d

# أو البناء والتشغيل يدوياً
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ اختصارات لوحة المفاتيح

اضغط `؟` في أي مكان لرؤية جميع اختصارات لوحة المفاتيح.

| الاختصار | الإجراء |
|----------|---------|
| `Ctrl+K` | لوحة الأوامر |
| `Ctrl+/` | تبديل الشريط الجانبي |
| `G ثم O` | الانتقال إلى النظرة العامة |
| `G ثم S` | الانتقال إلى الجلسات |
| `G ثم A` | الانتقال إلى الوكلاء |
| `G ثم T` | الانتقال إلى المهام |
| `G ثم ،` | الانتقال إلى الإعدادات |
| `T ثم D` | تبديل القالب الداكن |
| `T ثم L` | تبديل القالب الفاتح |
| `1-5` | الانتقال إلى عناصر التنقل |

---

## 📊 معايير الأداء

| المقياس | القيمة |
|---------|--------|
| First Contentful Paint | < 0.5ث |
| Time to Interactive | < 1.2ث |
| حجم الحزمة (مظلّل) | ~180ك.ب |
| نتيجة Lighthouse | 95+ |
| زمن استجابة WebSocket | < 50م.ث |

---

## 🔒 اعتبارات الأمان

- **لا توجد مصادقة افتراضياً** — أضف middleware المصادقة الخاص بك في الإنتاج
- **CORS مفعل** — قم بتكوين المصادر المسموح بها لنشرك
- **CSP موصى به** — أضف رؤوس Content-Security-Policy
- **HTTPS مطلوب** — استخدم HTTPS دائماً في الإنتاج
- **تحديد المعدل** — فكر في إضافة rate limiting لنقاط API

---

## 📁 هيكل المشروع

```
openclaw-dashboard/
├── .github/               # سير عمل GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # خط أنابيب CI
│   │   └── release.yml    # أتمتة الإصدار
│   └── FUNDING.yml
├── docs/                  # التوثيق
│   └── API.md             # مرجع API
├── server/                # خادم الواجهة الخلفية
│   ├── index.js           # خادم Express + WebSocket
│   ├── openclaw-api.js    # غلاف API مع بيانات وهمية
│   └── package.json
├── src/
│   ├── components/        # مكونات React
│   │   ├── Agents/        # إدارة الوكلاء
│   │   ├── CommandPalette/# ⌘K لوحة الأوامر
│   │   ├── Dashboard/     # النظرة العامة، المخططات، المقاييس
│   │   ├── Layout/        # الشريط الجانبي، الرأس، MainLayout
│   │   ├── Notifications/ # لوحة الإشعارات
│   │   ├── Sessions/      # إدارة الجلسات
│   │   ├── Settings/      # صفحات الإعدادات
│   │   ├── Tasks/         // لوحة المهام
│   │   └── ui/            # مكونات واجهة المستخدم القابلة لإعادة الاستخدام
│   ├── hooks/             # خطافات React المخصصة
│   ├── i18n/              # الترجمات (EN/ZH)
│   ├── lib/               # الأدوات، الثوابت
│   ├── pages/             # مكونات الصفحات
│   ├── plugins/           # نظام الإضافات
│   │   ├── index.js       # مدير الإضافات
│   │   ├── examples/      # أمثلة الإضافات
│   │   └── README.md      # توثيق الإضافات
│   ├── stores/            # تخزينات Zustand
│   └── utils/             # دوال الأدوات
├── public/                # الأصول الثابتة
├── Dockerfile             # بناء Docker متعدد المراحل
├── docker-compose.yml     # تكوين Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 نقاط نهاية API

انظر [docs/API.md](docs/API.md) للتوثيق الكامل.

| نقطة الن الوصف |
|---------------|-------------|
| `GET /api/health` | فحص الصحة |
| `GET /api/overview` | إحصائيات لوحة المراقبة + النشاط الأخير |
| `GET /api/sessions` | جميع الجلسات مع الترقيم |
| `GET /api/sessions/:id` | تفاصيل الجlse + السجل |
| `GET /api/agents` | جميع الوكلاء |
| `GET /api/tasks` | المهام مع الحالة |
| `GET /api/system` | مقاييس النظام |
| `GET /api/notifications` | قائمة الإشعارات |
| `GET /api/heatmap` | خريطة حرارية للنشاط لمدة 90 يوم |
| `WS /ws` | تحديثات في الوقت الفعلي (كل 3ث) |

---

## 📊 القوالب

تدعم لوحة المراقبة 4 قوالب:

| القالب | الوصف |
|--------|-------|
| **Dark** | تدرج أزرق داكن عميق (افتراضي) |
| **Light** | أبيض نقي برمادي خفيف |
| **AMOLED** | أسود نقي لشاشات OLED |
| **System** | يتبع تفضيلات النظام

قم بتخصيص القوالب عن طريق تعديل متغيرات CSS في `src/index.css`.

---

## 🌐 التدويل

يدعم حاليًا:
- 🇺🇸 الإنجليزية (English)
- 🇨🇳 الصينية (简体中文)

إضافة لغات جديدة:
1. أنشئ ملف JSON في `src/i18n/` (مثال: `ar.json`)
2. أضف اللغة إلى مبدل اللغة
3. استخدم `t('key')` لجميع نصوص واجهة المستخدم

---

## 🔌 نظام الإضافات

يدعم OpenClaw Dashboard إضافات لتوسيع الوظائف:

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
    // التنظيف
  }
};
```

انظر [src/plugins/README.md](src/plugins/README.md) للتوثيق الكامل.

---

## 🐳 خيارات النشر

### Vercel (واجهة الأمام)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (موصى به)

```bash
docker compose up -d
```

انظر [دليل النشر](docs/deployment.md) للتعليمات التفصيلية.

### VPS / خادم مخصص

```bash
npm install --production
npm run build
npm start
```

### خدمة Systemd

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

## ❓ الأسئلة الشائعة

**س: هل يمكنني استخدام هذا مع نسختي الخاصة من OpenClaw؟**
ج: نعم! استبدل البيانات الوهمية في `server/openclaw-api.js` باستدعاءات API حقيقية.

**س: كيف أضيف المصادقة؟**
ج: أضف middleware في `server/index.js`. نوصي بـ Passport.js أو JWT.

**س: هل يمكنني تخصيص القوالب؟**
ج: بالتأكيد! قم بتعديل متغيرات CSS في `src/index.css`.

**س: هل هذا جاهز للإنتاج؟**
ج: نعم، مع تكوين المصادقة ورؤوس الأمان بشكل صحيح.

**س: كيف أسهم في المشروع؟**
ج: اقرأ [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🗺️ خطة التطوير

### ✅ المكتمل

| الإصدار | الأبرز |
|---------|--------|
| **v2.0** | 🎨 الإصدار الأولي — React + Vite، لوحة أوامر ⌘K، 4 قوالب، i18n (EN/ZH)، تحديثات WebSocket في الوقت الفعلي |
| **v2.1** | 📊 تصور بيانات غني (مخططات، خرائط حرارية، مقاييس)، نظام الإضافات، دعم Docker، تحسينات الأداء |

### 🚧 قيد التطوير (v2.2)

- 🔔 **إشعارات التنبيه في الوقت الفعلي** — إشعارات قابلة للتخصيص قائمة على الحدود مع التسليم متعدد القنوات (البريد الإلكتروني، webhook، داخل التطبيق)
- 🧩 **سوق الإضافات** — تصفح وتثبيت وإدارة إضافات المجتمع مباشرة من لوحة المراقبة
- 👥 **دعم المستخدمين المتعددين** — التحكم في الوصول القائم على الأدوار (RBAC)، إدارة المستخدمين ومساحات عمل الفريق
- 📈 **تحليلات متقدمة** — رؤى أعمق في أداء الوكالات، تتبع التكاليف واستخدام الاتجاهات

### 🔮 المخطط (v2.3+)

- 📱 **تطبيق جوال** — تطبيقات iOS و Android الأصلية للمراقبة أثناء التنقل
- 🌐 **API Gateway** — طبقة API REST/GraphQL موحدة مع rate limiting والتو ذخنة والمصادقة
- 🤖 **التصحيح بمساعدة الذكاء الاصطناعي** — دع الذكاء الاصطناعي يحلل السجلات ويقترح إصلاحات لمشاكل الوكالات
- 🔄 **تكامل CI/CD** — دعم أصلي لـ GitHub Actions و GitLab CI و Jenkins
- 📡 **النشر على الحافة** — وكيل خفيف لأجهزة الحافة وسيناريوهات إنترنت الأشياء
- 🎳 **لوحات مراقبة مخصصة** — منشئ لوحات المراقبة بالسحب والإفلات مع مكتبة الأدوات

> 💡 لديك اقتراح ميزة؟ [افتح issue](https://github.com/openclaw/openclaw-dashboard/issues) أو انضم إلى النقاش!

---

## 🤝 المساهمة

مرحباً بالمساهمات! يرجى قراءة [CONTRIBUTING.md](CONTRIBUTING.md) قبل إرسال PR.

1. تفرع المستودع
2. أنشئ فرع ميزتك (`git checkout -b feature/amazing-feature`)
3. ثبت تغييراتك (`git commit -m 'feat: Add amazing feature'`)
4. ادفع إلى الفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

---

## المساهمون

شكراً لهؤلاء الأشخاص الرائعين على مساهماتهم:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

يتبع هذا المشروع مواصفات [all-contributors](https://allcontributors.org). مرحباً بالمساهمات من أي نوع!

### إضافة مساهم جديد

لإضافة مساهم جديد، استخدم الأمر التالي:

```bash
npx all-contributors add <username> <contribution>
```

على سبيل المثال:

```bash
npx all-contributors add johndoe code,doc
```

أنواع المساهمة المتاحة: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 الامتنان

- مستوحى من [Vercel Dashboard](https://vercel.com/dashboard) و [Linear](https://linear.app) و [Raycast](https://raycast.com)
- صنع بحب لمجتمع OpenClaw

---

صنع بـ ❤️ من فريق OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)

</div>
