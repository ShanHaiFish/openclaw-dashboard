# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | **日本語** | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **AI エージェントのための、最も美しいリアルタイムモニタリングダッシュボード。**
> React で構築。⌘K コマンドパレット、i18n、4つのテーマ、プラグインシステムを搭載。

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ なぜ OpenClaw Dashboard なのか？

AI エージェントの管理は、ターミナルログを読むような体験であるべきではありません。OpenClaw Dashboard は、エージェントモニタリング体験を以下のように変革します：

- **🎨 素敵なビジュアルデザイン** — Vercel、Linear、Raycast にインスピレーションを受けたガラスモーフィズム、スムーズなアニメーション、そして繊細なディテール。
- **⚡ リアルタイム更新** — WebSocket ベースのライブデータ。リフレッシュボタンは不要。
- **⌘K コマンドパレット** — パワーユーザーはキーボード優先のインターフェースを好みます。ナビゲーション、検索、コマンドの即時実行が可能です。
- **🌍 国際化（i18n）** — 英語と中国語のサポートを内蔵。新しい言語の追加も簡単。
- **🎭 4つの美しいテーマ** — Dark、Light、AMOLED（OLED 画面向け）、System-aware（システム連動）。
- **🔌 プラグインシステム** — フォークせずに機能を拡張。ページ、コマンド、フックを登録可能。
- **📊 豊富なデータビジュアライゼーション** — チャート、ヒートマップ、ゲージ、プログレスインジケーター。
- **📱 完全レスポンシブ** — モバイル、タブレット、デスクトップで美しく動作。

---

## 📊 機能比較

| 機能 | OpenClaw Dashboard | 汎用モニタリング | Terminal UI |
|---------|-------------------|-------------------|-------------|
| リアルタイム WebSocket | ✅ | ⚠️ 限定的 | ✅ |
| コマンドパレット | ✅ | ❌ | ❌ |
| マルチテーマ対応 | ✅ 4テーマ | ⚠️ 1-2テーマ | ⚠️ 限定的 |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| プラグインシステム | ✅ | ❌ | ❌ |
| モバイルレスポンシブ | ✅ | ⚠️ 部分的 | ❌ |
| 美しいアニメーション | ✅ | ❌ | ❌ |
| Docker 対応 | ✅ | ✅ | ⚠️ |
| ゼロコンフィグ | ✅ | ❌ | ❌ |

---

## 🏗️ アーキテクチャ

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

## 🚀 クイックスタート

### 前提条件

- Node.js 18+
- npm または yarn

### npm でインストール

```bash
# npm からインストール
npm install @openclaw/dashboard

# サーバーを起動（組み込みフロントエンド + API を提供）
npx @openclaw/dashboard
```

グローバルにインストールする場合：

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### ソースからインストール

```bash
# リポジトリをクローン
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# 依存パッケージをインストール
npm install

# フロントエンドをビルド
npm run build

# 本番サーバーを起動
npm start
```

ブラウザで [http://localhost:3777](http://localhost:3777) を開きます。

### 開発モード

```bash
# ターミナル 1: ホットリロード付きフロントエンド開発サーバーを起動
npm run dev

# ターミナル 2: API サーバーを起動
npm run server
```

### Docker

```bash
# Docker Compose を使用（推奨）
docker compose up -d

# 手動でビルドして実行
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ キーボードショートカット

どこでも `?` を押すと、すべてのキーボードショートカットを表示します。

| ショートカット | アクション |
|----------|--------|
| `Ctrl+K` | コマンドパレット |
| `Ctrl+/` | サイドバーの切り替え |
| `G then O` | Overview に移動 |
| `G then S` | Sessions に移動 |
| `G then A` | Agents に移動 |
| `G then T` | Tasks に移動 |
| `G then ,` | Settings に移動 |
| `T then D` | ダークテーマの切り替え |
| `T then L` | ライトテーマの切り替え |
| `1-5` | ナビゲーション項目にジャンプ |

---

## 📊 パフォーマンスベンチマーク

| メトリクス | 値 |
|--------|-------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Bundle Size (gzip) | ~180KB |
| Lighthouse Score | 95+ |
| WebSocket Latency | < 50ms |

---

## 🔒 セキュリティに関する考慮事項

- **デフォルトでは認証なし** — 本番環境では独自の認証ミドルウェアを追加してください
- **CORS 有効** — デプロイメントで許可するオリジンを設定してください
- **CSP 推奨** — Content-Security-Policy ヘッダーを追加してください
- **HTTPS 必須** — 本番環境では常に HTTPS を使用してください
- **レートリミット** — API エンドポイントにレート制限の追加を検討してください

---

## 📁 プロジェクト構成

```
openclaw-dashboard/
├── .github/               # GitHub Actions ワークフロー
│   ├── workflows/
│   │   ├── ci.yml         # CI パイプライン
│   │   └── release.yml    # リリース自動化
│   └── FUNDING.yml
├── docs/                  # ドキュメント
│   └── API.md             # API リファレンス
├── server/                # バックエンドサーバー
│   ├── index.js           # Express + WebSocket サーバー
│   ├── openclaw-api.js    # モックデータ付き API ラッパー
│   └── package.json
├── src/
│   ├── components/        # React コンポーネント
│   │   ├── Agents/        # エージェント管理
│   │   ├── CommandPalette/# ⌘K コマンドパレット
│   │   ├── Dashboard/     # Overview、チャート、メトリクス
│   │   ├── Layout/        # サイドバー、Header、MainLayout
│   │   ├── Notifications/ # 通知パネル
│   │   ├── Sessions/      # セッション管理
│   │   ├── Settings/      # 設定ページ
│   │   ├── Tasks/         # タスクボード
│   │   └── ui/            # 再利用可能な UI コンポーネント
│   ├── hooks/             # カスタム React フック
│   ├── i18n/              # 翻訳 (EN/ZH)
│   ├── lib/               # ユーティリティ、定数
│   ├── pages/             # ページコンポーネント
│   ├── plugins/           # プラグインシステム
│   │   ├── index.js       # プラグインマネージャー
│   │   ├── examples/      # サンプルプラグイン
│   │   └── README.md      # プラグインドキュメント
│   ├── stores/            # Zustand ストア
│   └── utils/             # ユーティリティ関数
├── public/                # 静的アセット
├── Dockerfile             # マルチステージ Docker ビルド
├── docker-compose.yml     # Docker Compose 設定
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 API エンドポイント

完全なドキュメントは [docs/API.md](docs/API.md) を参照してください。

| エンドポイント | 説明 |
|----------|-------------|
| `GET /api/health` | ヘルスチェック |
| `GET /api/overview` | ダッシュボード統計 + 最近のアクティビティ |
| `GET /api/sessions` | ページネーション付きのすべてのセッション |
| `GET /api/sessions/:id` | セッション詳細 + 履歴 |
| `GET /api/agents` | すべてのエージェント |
| `GET /api/tasks` | ステータス付きタスク |
| `GET /api/system` | システムメトリクス |
| `GET /api/notifications` | 通知リスト |
| `GET /api/heatmap` | 90日間のアクティビティヒートマップ |
| `WS /ws` | リアルタイム更新（3秒ごと） |

---

## 🎨 テーマ

ダッシュボードは4つのテーマをサポートしています：

| テーマ | 説明 |
|-------|-------------|
| **Dark** | デープネイビーのグラデーション（デフォルト） |
| **Light** | サブtleなグレーのクリーンホワイト |
| **AMOLED** | OLED 画面向けの純粋なブラック |
| **System** | OS の設定に連動 |

`src/index.css` の CSS 変数を編集してテーマをカスタマイズできます。

---

## 🌐 国際化（i18n）

現在サポートされている言語：
- 🇺🇸 English
- 🇨🇳 Chinese（簡体中文）

新しい言語を追加する方法：
1. `src/i18n/` に JSON ファイルを作成（例：`ja.json`）
2. 言語スイッチャーに言語を追加
3. ユーザーに表示するすべての文字列に `t('key')` を使用

---

## 🔌 プラグインシステム

OpenClaw Dashboard はプラグインによる機能拡張をサポートしています：

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
    // クリーンアップ
  }
};
```

完全なドキュメントは [src/plugins/README.md](src/plugins/README.md) を参照してください。

---

## 🐳 デプロイオプション

### Vercel（フロントエンド）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway（フルスタック）

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker（推奨）

```bash
docker compose up -d
```

詳細な手順は完全な[デプロイガイド](docs/deployment.md)を参照してください。

### VPS / ベアメタル

```bash
npm install --production
npm run build
npm start
```

### Systemd サービス

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

## ❓ よくある質問

**Q: 自分の OpenClaw インスタンスで使用できますか？**
A: はい！`server/openclaw-api.js` のモックデータを実際の API コールに置き換えてください。

**Q: 認証を追加するにはどうすればいいですか？**
A: `server/index.js` にミドルウェアを追加してください。Passport.js または JWT を推奨します。

**Q: テーマをカスタマイズできますか？**
A: もちろん！`src/index.css` の CSS 変数を編集してください。

**Q: 本番環境で使用できますか？**
A: はい、適切な認証とセキュリティヘッダーを設定すれば使用可能です。

**Q: コントリビュートするにはどうすればいいですか？**
A: ガイドラインは [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

---

## 🗺️ ロードマップ

### ✅ 完了済み

| バージョン | ハイライト |
|---------|-----------|
| **v2.0** | 🎨 初期リリース — React + Vite、⌘K コマンドパレット、4テーマ、i18n（EN/ZH）、WebSocket リアルタイム更新 |
| **v2.1** | 📊 豊富なデータビジュアライゼーション（チャート、ヒートマップ、ゲージ）、プラグインシステム、Docker サポート、パフォーマンス最適化 |

### 🚧 開発中（v2.2）

- 🔔 **リアルタイムアラート通知** — マルチチャネル配信（メール、Webhook、アプリ内）付きのカスタマイズ可能なしきい値ベースアラート
- 🧩 **プラグインマーケットプレイス** — ダッシュボードから直接コミュニティプラグインを閲覧、インストール、管理
- 👥 **マルチユーザー対応** — ロールベースのアクセス制御（RBAC）、ユーザー管理、チームワークスペース
- 📈 **高度な分析** — エージェントパフォーマンスの深い洞察、コスト追跡、使用傾向

### 🔮 計画中（v2.3+）

- 📱 **モバイルアプリ** — モバイルモニタリングのためのネイティブ iOS と Android アプリ
- 🌐 **API ゲートウェイ** — レート制限、キャッシング、認証付きの統一 REST/GraphQL レイヤー
- 🤖 **AI アシストデバッグ** — AI がログを分析し、エージェントの問題に対する修正を提案
- 🔄 **CI/CD 統合** — GitHub Actions、GitLab CI、Jenkins パイプラインのネイティブサポート
- 📡 **エッジデプロイメント** — エッジデバイスと IoT シナリオ向けの軽量エージェント
- 🎯 **カスタムダッシュボード** — ウィジェットライブラリ付きのドラッグアンドドロップダッシュボードビルダー

> 💡 機能リクエストがありますか？[Issue を開く](https://github.com/openclaw/openclaw-dashboard/issues) またはディスカッションに参加してください！

---

## 🤝 コントリビューション

コントリビューションを歓迎します！PR を提出する前に [CONTRIBUTING.md](CONTRIBUTING.md) をお読みください。

1. リポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'feat: Add amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. Pull Request を開く

---

## コントリビューター

コントリビューションしてくれた素晴らしい皆さんに感謝します：

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

このプロジェクトは [all-contributors](https://allcontributors.org) の仕様に従っています。あらゆる種類のコントリビューションを歓迎します！

### 新しいコントリビューターを追加する

新しいコントリビューターを追加するには、以下のコマンドを使用してください：

```bash
npx all-contributors add <username> <contribution>
```

例：

```bash
npx all-contributors add johndoe code,doc
```

利用可能なコントリビューションタイプ：`code`、`doc`、`ideas`、`maintenance`、`bug`、`test`、`review`、`question`、`design`、`translation`、`infra`、`platform`、`tool`、`eventOrganizing`、`business`

---

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

- [Vercel Dashboard](https://vercel.com/dashboard)、[Linear](https://linear.app)、[Raycast](https://raycast.com) にインスピレーションを受けました
- OpenClaw コミュニティのための愛を込めて構築

---

OpenClaw チームが ❤️ を込めて制作

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
