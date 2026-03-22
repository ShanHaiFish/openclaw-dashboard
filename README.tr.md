# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | **[Türkçe](README.tr.md)** | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Yapay zeka ajanları için en güzel gerçek zamanlı izleme panosu.**
> React ile geliştirilmiş, ⌘K komut paleti, i18n, 4 tema ve eklenti sistemi ile donatılmıştır.

![OpenClaw Dashboard Önizleme](docs/preview.png)

---

## ✨ Neden OpenClaw Dashboard?

Yapay zeka ajanlarını yönetmek terminal günlüklerini okumak gibi hissettirmemeli. OpenClaw Dashboard, ajan izleme deneyiminizi şu şekilde dönüştürür:

- **🎨 Görsel Tasarım** — Vercel, Linear ve Raycast'tan ilham alınarak tasarlandı. Glassmorphism, yumuşak animasyonlar ve özenli detaylar.
- **⚡ Gerçek Zamanlı Güncellemeler** — WebSocket destekli canlı veri. Yenileme düğmelerine gerek yok.
- **⌘K Komut Paleti** — Güçlü kullanıcılar klavye öncelikli arayüzleri sever. Anında gezin, ara ve komut çalıştır.
- **🌍 Uluslararasılaştırma** — İngilizce ve Çince yerleşik destek. Kolayca daha fazla dil ekleyin.
- **🎭 4 Güzel Tema** — Koyu, Aydınlık, AMOLED (OLED ekranlar için) ve Sistem uyumlu.
- **🔌 Eklenti Sistemi** — Fork yapmadan işlevselliği genişletin. Sayfalar, komutlar ve kancalar kaydedin.
- **📊 Zengin Veri Görselleştirme** — Grafikler, ısı haritaları, göstergeler ve ilerleme göstergeleri.
- **📱 Tam Duyarlı** — Mobil, tablet ve masaüstünde harika çalışır.

---

## 📊 Özellik Karşılaştırması

| Özellik | OpenClaw Dashboard | Genel İzleme | Terminal UI |
|---------|-------------------|----------------|-------------|
| Gerçek Zamanlı WebSocket | ✅ | ⚠️ Sınırlı | ✅ |
| Komut Paleti | ✅ | ❌ | ❌ |
| Çok Tema Desteği | ✅ 4 tema | ⚠️ 1-2 tema | ⚠️ Sınırlı |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Eklenti Sistemi | ✅ | ❌ | ❌ |
| Mobil Duyarlı | ✅ | ⚠️ Kısmi | ❌ |
| Güzel Animasyonlar | ✅ | ❌ | ❌ |
| Docker Hazır | ✅ | ✅ | ⚠️ |
| Sıfır Yapılandırma | ✅ | ❌ | ❌ |

---

## 🏗️ Mimari

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenClaw Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React UI  │  │   Zustand   │  │   WebSocket │             │
│  │   (Görünümler)│◄─┤   (Durum)   │◄─┤   (Gerçek Zamanlı)│      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Framer    │  │   Eklenti   │  │   Express   │             │
│  │   Motion    │  │   Yöneticisi│  │   Sunucu    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    TailwindCSS Stil                       │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │ Koyu │ │Açık  │ │AMOLED│ │Sistem│ │Özel  │          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenClaw API Sunucusu                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Statik     │             │
│  │  /api/*     │  │  /ws        │  │  Dosyalar   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn

### npm ile Kurulum

```bash
# npm'den kurun
npm install @openclaw/dashboard

# Sunucuyu başlatın (yerleşik frontend + API sunar)
npx @openclaw/dashboard
```

Veya globally kurun:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Kaynaktan

```bash
# Depoyu klonlayın
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Bağımlılıkları kurun
npm install

# Frontend'i derleyin
npm run build

# Üretim sunucusunu başlatın
npm start
```

Tarayıcınızda [http://localhost:3777](http://localhost:3777) adresini açın.

### Geliştirme Modu

```bash
# Terminal 1: Canlı yenileme ile frontend geliştirme sunucusunu başlatın
npm run dev

# Terminal 2: API sunucusunu başlatın
npm run server
```

### Docker

```bash
# Docker Compose kullanarak (önerilen)
docker compose up -d

# Veya manuel olarak derleyin ve çalıştırın
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Klavye Kısayolları

Herhangi bir yerde `?` tuşuna basarak tüm klavye kısayollarını görüntüleyin.

| Kısayol | İşlem |
|----------|--------|
| `Ctrl+K` | Komut paleti |
| `Ctrl+/` | Kenar çubuğunu aç/kapat |
| `G然后 O` | Genel Bakış'a git |
| `G然后 S` | Oturumlara git |
| `G然后 A` | Ajanlara git |
| `G然后 T` | Görevlere git |
| `G然后 ,` | Ayarlar'a git |
| `T然后 D` | Koyu temayı aç/kapat |
| `T然后 L` | Açık temayı aç/kapat |
| `1-5` | Geçmenogğlara atla |

---

## 📊 Performans Ölçümleri

| Metrik | Değer |
|--------|-------|
| İlk İçerik Boyama | < 0.5s |
| Etkileşim Süresi | < 1.2s |
| Paket Boyutu (gzip) | ~180KB |
| Lighthouse Puanı | 95+ |
| WebSocket Gecikmesi | < 50ms |

---

## 🔒 Güvenlik Hususları

- **Varsayılan olarak kimlik doğrulama yok** — Üretimde kendi kimlik doğrulama middleware'nizi ekleyin
- **CORS etkin** — Deployment için izin verilen kökenleri yapılandırın
- **CSP önerilir** — Content-Security-Policy başlıkları ekleyin
- **HTTPS gerekli** — Üretimde her zaman HTTPS kullanın
- **Hız sınırı** — API uç noktaları için hız sınırı eklemeyi düşünün

---

## 📁 Proje Yapısı

```
openclaw-dashboard/
├── .github/               # GitHub Actions iş akışları
│   ├── workflows/
│   │   ├── ci.yml         # CI hattı
│   │   └── release.yml    # Yayın otomasyonu
│   └── FUNDING.yml
├── docs/                  # Dokümantasyon
│   └── API.md             # API referansı
├── server/                # Backend sunucu
│   ├── index.js           # Express + WebSocket sunucusu
│   ├── openclaw-api.js    # Sahte veri ile API sarmalayıcı
│   └── package.json
├── src/
│   ├── components/        # React bileşenleri
│   │   ├── Agents/        # Ajan yönetimi
│   │   ├── CommandPalette/# ⌘K komut paleti
│   │   ├── Dashboard/     # Genel bakış, grafikler, metrikler
│   │   ├── Layout/        # Kenar çubuğu, Başlık, Ana Düzen
│   │   ├── Notifications/ # Bildirim paneli
│   │   ├── Sessions/      # Oturum yönetimi
│   │   ├── Settings/      # Ayarlar sayfaları
│   │   ├── Tasks/         # Görev panosu
│   │   └── ui/            # Yeniden kullanılabilir UI bileşenleri
│   ├── hooks/             # Özel React kancaları
│   ├── i18n/              # Çeviriler (EN/ZH)
│   ├── lib/               # Yardımcı programlar, sabitler
│   ├── pages/             # Sayfa bileşenleri
│   ├── plugins/           # Eklenti sistemi
│   │   ├── index.js       # Eklenti yöneticisi
│   │   ├── examples/      # Örnek eklentiler
│   │   └── README.md      # Eklenti dokümantasyonu
│   ├── stores/            # Zustand depoları
│   └── utils/             # Yardımcı işlevler
├── public/                # Statik varlıklar
├── Dockerfile             # Çok katmanlı Docker derlemesi
├── docker-compose.yml     # Docker Compose yapılandırması
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API Uç Noktaları

Tam dokümantasyon için [docs/API.md](docs/API.md) adresine bakın.

| Uç Nokta | Açıklama |
|----------|----------|
| `GET /api/health` | Sağlık kontrolü |
| `GET /api/overview` | Pano istatistikleri + son aktivite |
| `GET /api/sessions` | Sayfalandırma ile tüm oturumlar |
| `GET /api/sessions/:id` | Oturum ayrıntıları + geçmiş |
| `GET /api/agents` | Tüm ajanlar |
| `GET /api/tasks` | Duruma göre görevler |
| `GET /api/system` | Sistem metrikleri |
| `GET /api/notifications` | Bildirim listesi |
| `GET /api/heatmap` | 90 günlük aktivite ısı haritası |
| `WS /ws` | Gerçek zamanlı güncellemeler (her 3s) |

---

## 🎨 Temalandırma

Dashboard 4 tema destekler:

| Tema | Açıklama |
|-------|----------|
| **Koyu** | Derin lacivert gradyan (varsayılan) |
| **Açık** | Ince gri ile temiz beyaz |
| **AMOLED** | OLED ekranlar için saf siyah |
| **Sistem** | İşletim sistemi tercihini takip eder |

Temaları `src/index.css` dosyasındaki CSS değişkenlerini düzenleyerek özelleştirin.

---

## 🌐 Uluslararasılaştırma

Şu anda desteklenenler:
- 🇺🇸 İngilizce
- 🇨🇳 Çince (简体中文)

Yeni dil eklemek için:
1. `src/i18n/` klasöründe bir JSON dosyası oluşturun (örn. `ja.json`)
2. Dili dil değiştiriciye ekleyin
3. Tüm kullanıcıya yönelik dizgeler için `t('key')` kullanın

---

## 🔌 Eklenti Sistemi

OpenClaw Dashboard, işlevselliği genişletmek için eklentileri destekler:

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
    // Temizleme
  }
};
```

Tam dokümantasyon için [src/plugins/README.md](src/plugins/README.md) adresine bakın.

---

## 🐳 Dağıtım Seçenekleri

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Önerilen)

```bash
docker compose up -d
```

Ayrıntılı talimatlar için tam [Deployment Guide](docs/deployment.md) adresine bakın.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Systemd Servisi

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

## ❓ Sıkça Sorulan Sorular

**S: Bunu kendi OpenClaw örneğimle kullanabilir miyim?**
C: Evet! `server/openclaw-api.js` dosyasındaki sahte verileri gerçek API çağrılarıyla değiştirin.

**S: Kimlik doğrulama nasıl eklerim?**
C: `server/index.js` dosyasına middleware ekleyin. Passport.js veya JWT öneririz.

**S: Temaları özelleştirebilir miyim?**
C: Kesinlikle! `src/index.css` dosyasındaki CSS değişkenlerini düzenleyin.

**S: Bu üretim için hazır mı?**
C: Evet, uygun kimlik doğrulama ve güvenlik başlıkları yapılandırıldığında.

**S: Nasıl katkıda bulunabilirim?**
C: Yönergeler için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

---

## 🗺️ Yol Haritası

### ✅ Tamamlanan

| Sürüm | Öne Çıkanlar |
|---------|-----------|
| **v2.0** | 🎨 İlk yayın — React + Vite, ⌘K komut paleti, 4 tema, i18n (EN/ZH), WebSocket gerçek zamanlı güncellemeler |
| **v2.1** | 📊 Zengin veri görselleştirme (grafikler, ısı haritaları, göstergeler), eklenti sistemi, Docker desteği, performans optimizasyonları |

### 🚧 Devam Eden (v2.2)

- 🔔 **Gerçek Zamanlı Uyarı Bildirimleri** — Çoklu kanal teslimatı (e-posta, webhook, uygulama içi) ile özelleştirilebilir eşik tabanlı uyarılar
- 🧩 **Eklenti Pazar Yeri** — Topluluk eklentilerini doğrudan panodan göz atın, kurun ve yönetin
- 👥 **Çok Kullanıcı Desteği** — Rol tabanlı erişim kontrolü (RBAC), kullanıcı yönetimi ve takım çalışma alanları
- 📈 **Gelişmiş Analitik** — Ajan performansı, maliyet takibi ve kullanım trendleri hakkında daha derin bilgiler

### 🔮 Planlanan (v2.3+)

- 📱 **Mobil Uygulama** — Hareket halindeyken izleme için yerel iOS ve Android uygulamaları
- 🌐 **API Ağ Geçidi** — Hız sınırı, önbellekleme ve kimlik doğrulama ile birleşik REST/GraphQL API katmanı
- 🤖 **Yapay Zeka Destekli Hata Ayıklama** — Günlükleri analiz etmesi ve ajan sorunları için düzeltmeler önermesi için yapay zekayı bırakın
- 🔄 **CI/CD Entegrasyonu** — GitHub Actions, GitLab CI ve Jenkins hatları için yerel destek
- 📡 **Kenar Dağıtımı** — Kenar cihazları ve IoT senaryoları için hafif ajan
- 🎯 **Özel Panoları** — Widget kütüphanesi ile sürükleyip bırakma panosu oluşturucu

> 💡 Bir özellik isteğiniz mi var? [Bir sorun açın](https://github.com/openclaw/openclaw-dashboard/issues) veya tartışmaya katılın!

---

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen bir PR göndermeden önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun.

1. Depoyu çatallayın
2. Özellik dalınızı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi.Commitleyin (`git commit -m 'feat: Add amazing feature'`)
4. Dalı itin (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın

---

## Katkıda Bulunanlar

Katkıları için bu harika insanlara teşekkür ederiz:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Bu proje [all-contributors](https://allcontributors.org) spesifikasyonunu takip eder. Her türden katkı memnuniyetle karşılanır!

### Yeni Katkıda Bulunan Ekleme

Yeni bir katkıda bulunan eklemek için şu komutu kullanın:

```bash
npx all-contributors add <username> <contribution>
```

Örneğin:

```bash
npx all-contributors add johndoe code,doc
```

Mevcut katkı türleri: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır — ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) ve [Raycast](https://raycast.com)'tan ilham alınmıştır
- OpenClaw topluluğu için sevgiyle yapılmıştır

---

OpenClaw ekibi tarafından ❤️ ile yapılmıştır

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
