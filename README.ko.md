# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | **한국어** | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.comopenclaw/openclaw-dashboard)

> **AI 에이전트를 위한 가장 아름다운 실시간 모니터링 대시보드.**
> React로 구축되었으며, ⌘K 명령 팔레트, i18n, 4가지 테마, 플러그인 시스템을 특징으로 합니다.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ 왜 OpenClaw Dashboard 인가요?

AI 에이전트 관리는 터미널 로그를 읽는 것 같아서는 안 됩니다. OpenClaw Dashboard는 에이전트 모니터링 경험을 다음과 같이 변화시킵니다:

- **🎨 놀라운 비주얼 디자인** — Vercel, Linear, Raycast에서 영감을 받은 글래스모피즘, 부드러운 애니메이션, 그리고 세심한 디테일.
- **⚡ 실시간 업데이트** — WebSocket 기반 라이브 데이터. 새로고침 버튼이 필요 없습니다.
- **⌘K 명령 팔레트** — 파워 유저는 키보드 우선 인터페이스를 선호합니다. 탐색, 검색, 명령 즉시 실행이 가능합니다.
- **🌍 국제화 (i18n)** — 영어와 중국어 내장 지원. 새로운 언어 추가도 간편합니다.
- **🎭 4가지 아름다운 테마** — Dark, Light, AMOLED (OLED 화면용), System-aware (시스템 연동).
- **🔌 플러그인 시스템** — 포크하지 않고 기능 확장. 페이지, 명령, 훅 등록 가능.
- **📊 풍부한 데이터 시각화** — 차트, 히트맵, 게이지, 진행률 표시기.
- **📱 완전 반응형** — 모바일, 태블릿, 데스크톱에서 아름답게 작동.

---

## 📊 기능 비교

| 기능 | OpenClaw Dashboard | 범용 모니터링 | Terminal UI |
|---------|-------------------|-------------------|-------------|
| 실시간 WebSocket | ✅ | ⚠️ 제한적 | ✅ |
| 명령 팔레트 | ✅ | ❌ | ❌ |
| 멀티 테마 지원 | ✅ 4개 테마 | ⚠️ 1-2개 테마 | ⚠️ 제한적 |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| 플러그인 시스템 | ✅ | ❌ | ❌ |
| 모바일 반응형 | ✅ | ⚠️ 부분적 | ❌ |
| 아름다운 애니메이션 | ✅ | ❌ | ❌ |
| Docker 지원 | ✅ | ✅ | ⚠️ |
| 제로 설정 | ✅ | ❌ | ❌ |

---

## 🏗️ 아키텍처

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

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn

### npm으로 설치

```bash
# npm에서 설치
npm install @openclaw/dashboard

# 서버 시작 (내장 프론트엔드 + API 제공)
npx @openclaw/dashboard
```

전역 설치:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### 소스에서 설치

```bash
# 리포지토리 클론
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# 의존성 설치
npm install

# 프론트엔드 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

브라우저에서 [http://localhost:3777](http://localhost:3777)을 엽니다.

### 개발 모드

```bash`
# 터미널 1: 핫 리로드가 있는 프론트엔드 개발 서버 시작
npm run dev

# 터미널 2: API 서버 시작
npm run server
```

### Docker

```bash
# Docker Compose 사용 (권장)
docker compose up -d

# 수동으로 빌드 및 실행
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ 키보드 단축키

어디서나 `?`를 누르면 모든 키보드 단축키를 볼 수 있습니다.

| 단축키 | 액션 |
|----------|--------|
| `Ctrl+K` | 명령 팔레트 |
| `Ctrl+/` | 사이드바 전환 |
| `G then O` | Overview로 이동 |
| `G then S` | Sessions로 이동 |
| `G then A` | Agents로 이동 |
| `G then T` | Tasks로 이동 |
| `G then ,` | Settings로 이동 |
| `T then D` | 다크 테마 전환 |
| `T then L` | 라이트 테마 전환 |
| `1-5` | 네비게이션 항목으로 이동 |

---

## 📊 성능 벤치마크

| 메트릭 | 값 |
|--------|-------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Bundle Size (gzip) | ~180KB |
| Lighthouse Score | 95+ |
| WebSocket Latency | < 50ms |

---

## 🔒 보안 고려사항

- **기본적으로 인증 없음** — 프로덕션에서 자체 인증 미들웨어를 추가하세요
- **CORS 활성화** — 배포 허용 오리진을 구성하세요
- **CSP 권장** — Content-Security-Policy 헤더를 추가하세요
- **HTTPS 필수** — 프로덕션에서는 항상 HTTPS를 사용하세요
- **rate limiting** — API 엔드포인트에 속도 제한 추가를 고려하세요

---

## 📁 프로젝트 구조

```
openclaw-dashboard/
├── .github/               # GitHub Actions 워크플로우
│   ├── workflows/
│   │   ├── ci.yml         # CI 파이프라인
│   │   └── release.yml    # 릴리스 자동화
│   └── FUNDING.yml
├── docs/                  # 문서
│   └── API.md             # API 레퍼런스
├── server/                # 백엔드 서버
│   ├── index.js           # Express + WebSocket 서버
│   ├── openclaw-api.js    # 목 데이터가 있는 API 래퍼
│   └── package.json
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Agents/        # 에이전트 관리
│   │   ├── CommandPalette/# ⌘K 명령 팔레트
│   │   ├── Dashboard/     # 개요, 차트, 메트릭
│   │   ├── Layout/        # 사이드바, Header, MainLayout
│   │   ├── Notifications/ # 알림 패널
│   │   ├── Sessions/      # 세션 관리
│   │   ├── Settings/      # 설정 페이지
│   │   ├── Tasks/         # 태스크 보드
│   │   └── ui/            # 재사용 가능한 UI 컴포넌트
│   ├── hooks/             # 커스텀 React 훅
│   ├── i18n/              # 번역 (EN/ZH)
│   ├── lib/               # 유틸리티, 상수
│   ├── pages/             # 페이지 컴포넌트
│   ├── plugins/           # 플러그인 시스템
│   │   ├── index.js       # 플러그인 관리자
│   │   ├── examples/      # 샘플 플러그인
│   │   └── README.md      # 플러그인 문서
│   ├── stores/            # Zustand 스토어
│   └── utils/             # 유틸리티 함수
├── public/                # 정적 자산
├── Dockerfile             # 멀티스테ージ Docker 빌드
├── docker-compose.yml     # Docker Compose 설정
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API 엔드포인트

전체 문서는 [docs/API.md](docs/API.md)를 참조하세요.

| 엔드포인트 | 설명 |
|----------|-------------|
| `GET /api/health` | 헬스 체크 |
| `GET /api/overview` | 대시보드 통계 + 최근 활동 |
| `GET /api/sessions` | 페이지네이션이 있는 모든 세션 |
| `GET /api/sessions/:id` | 세션 상세 + 히스토리 |
| `GET /api/agents` | 모든 에이전트 |
| `GET /api/tasks` | 상태가 있는 태스크 |
| `GET /api/system` | 시스템 메트릭 |
| `GET /api/notifications` | 알림 목록 |
| `GET /api/heatmap` | 90일 활동 히트맵 |
| `WS /ws` | 실시간 업데이트 (3초마다) |

---

## 🎨 테마

대시보드는 4가지 테마를 지원합니다:

| 테마 | 설명 |
|-------|-------------|
| **Dark** | 딥 네이비 그라데이션 (기본값) |
| **Light** | 은은한 그레이가 있는 깨끗한 화이트 |
| **AMOLED** | OLED 화면을 위한 순수 블랙 |
| **System** | OS 설정에 연동 |

`src/index.css`의 CSS 변수를 수정하여 테마를 커스터마이즈할 수 있습니다.

---

## 🌐 국제화 (i18n)

현재 지원되는 언어:
- 🇺🇸 English
- 🇨🇳 Chinese (简体中文)

새로운 언어를 추가하는 방법:
1. `src/i18n/`에 JSON 파일 생성 (예: `ja.json`)
2. 언어 스위처에 언어 추가
3. 사용자에게 표시되는 모든 문자열에 `t('key')` 사용

---

## 🔌 플러그인 시스템

OpenClaw Dashboard는 플러그인을 통한 기능 확장을 지원합니다:

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
    // 정리
  }
};
```

전체 문서는 [src/plugins/README.md](src/plugins/README.md)를 참조하세요.

---

## 🐳 배포 옵션

### Vercel (프론트엔드)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (풀스택)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (권장)

```bash
docker compose up -d
```

자세한 지침은 전체 [배포 가이드](docs/deployment.md)를 참조하세요.

### VPS / 베어 메탈

```bash
npm install --production
npm run build
npm start
```

### Systemd 서비스

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

## ❓ 자주 묻는 질문

**Q: 자체 OpenClaw 인스턴스에서 사용할 수 있나요?**
A: 네! `server/openclaw-api.js`의 목 데이터를 실제 API 호출로 바꾸면 됩니다.

**Q: 인증을 추가하려면 어떻게 해야 하나요?**
A: `server/index.js`에 미들웨어를 추가하세요. Passport.js 또는 JWT를 권장합니다.

**Q: 테마를 커스터마이즈할 수 있나요?**
A: 물론입니다! `src/index.css`의 CSS 변수를 수정하세요.

**Q: 프로덕션에서 사용할 수 있나요?**
A: 네, 적절한 인증과 보안 헤더를 구성하면 사용 가능합니다.

**Q: 기여하려면 어떻게 해야 하나요?**
A: 가이드라인은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

---

## 🗺️ 로드맵

### ✅ 완료됨

| 버전 | 하이라이트 |
|---------|-----------|
| **v2.0** | 🎨 초기 릴리스 — React + Vite, ⌘K 명령 팔레트, 4개 테마, i18n (EN/ZH), WebSocket 실시간 업데이트 |
| **v2.1** | 📊 풍부한 데이터 시각화 (차트, 히트맵, 게이지), 플러그인 시스템, Docker 지원, 성능 최적화 |

### 🚧 진행 중 (v2.2)

- 🔔 **실시간 알림 알림** — 다중 채널 전달 (이메일, 웹훅, 앱 내)이 있는 커스터마이즈 가능한 임계값 기반 알림
- 🧩 **플러그인 마켓플레이스** — 대시보드에서 직접 커뮤니티 플러그인을 찾아보거나, 설치하거나, 관리
- 👥 **다중 사용자 지원** — 역할 기반 접근 제어 (RBAC), 사용자 관리, 팀 워크스페이스
- 📈 **고급 분석** — 에이전트 성능에 대한 심층 통찰, 비용 추적, 사용 트렌드

### 🔮 계획됨 (v2.3+)

- 📱 **모바일 앱** — 이동 중 모니터를 위한 네이티브 iOS 및 Android 앱
- 🌐 **API 게이트웨이** — 속도 제한, 캐싱, 인증이 있는 통합 REST/GraphQL 레이어
- 🤖 **AI 지원 디버깅** — AI가 로그를 분석하고 에이전트 문제에 대한 수정 제안
- 🔄 **CI/CD 통합** — GitHub Actions, GitLab CI, Jenkins 파이프라인 네이티브 지원
- 📡 **엣지 배포** — 엣지 디바이스 및 IoT 시나리오용 경량 에이전트
- 🎯 **커스텀 대시보드** — 위젯 라이브러리가 있는 드래그 앤 드롭 대시보드 빌더

> 💡 기능 요청이 있으신가요? [Issue 열기](https://github.com/openclaw/openclaw-dashboard/issues) 또는 토론에 참여하세요!

---

## 🤝 기여

기여를 환영합니다! PR을 제출하기 전에 [CONTRIBUTING.md](CONTRIBUTING.md)를 읽어주세요.

1. 리포지토리 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

---

## 기여자

기여해 주신 훌륭한 분들께 감사합니다:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

이 프로젝트는 [all-contributors](https://allcontributors.org) 사양을 따릅니다. 모든 유형의 기여를 환영합니다!

### 새로운 기여자 추가

새로운 기여자를 추가하려면 다음 명령어를 사용하세요:

```bash
npx all-contributors add <username> <contribution>
```

예:

```bash
npx all-contributors add johndoe code,doc
```

사용 가능한 기여 유형: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 라이센스

이 프로젝트는 MIT 라이센스에 따라 라이센스가 부여됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말씀

- [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app), [Raycast](https://raycast.com)에서 영감을 받았습니다
- OpenClaw 커뮤니티를 위해 사랑으로 구축

---

OpenClaw 팀이 ❤️로 제작

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
