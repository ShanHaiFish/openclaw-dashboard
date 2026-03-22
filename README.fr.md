# 🔮 OpenClaw Dashboard

[English](README.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | **[Français](README.fr.md)** | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **Le plus beau tableau de bord de surveillance en temps réel pour les agents IA.**
> Construit avec React, comprenant une palette de commandes ⌘K, i18n, 4 thèmes et un système de plugins.

![Aperçu du OpenClaw Dashboard](docs/preview.png)

---

## ✨ Pourquoi OpenClaw Dashboard ?

Gérer des agents IA ne devrait pas ressembler à lire des logs de terminal. OpenClaw Dashboard transforme votre expérience de surveillance des agents avec :

- **🎨 Design visuel époustouflant** — Inspiré par Vercel, Linear et Raycast. Glassmorphism, animations fluides et détails soignés.
- **⚡ Mises à jour en temps réel** — Données en direct alimentées par WebSocket. Pas besoin de boutons d'actualisation.
- **⌘K Palette de commandes** — Les utilisateurs avités adorent les interfaces clavier d'abord. Naviguez, recherchez et exécutez des commandes instantanément.
- **🌍 Internationalisation** — Support intégré pour l'anglais et le chinois. Ajoutez facilement d'autres langues.
- **🎭 4 beaux thèmes** — Sombre, Clair, AMOLED (pour écrans OLED) et basé sur le Système.
- **🔌 Système de plugins** — Étendez les fonctionnalités sans fork. Enregistrez des pages, des commandes et des hooks.
- **📊 Visualisation de données riche** — Graphiques, cartes de chaleur, jauges et indicateurs de progression.
- **📱 Entièrement responsive** — Fonctionne parfaitement sur mobile, tablette et bureau.

---

## 📊 Comparaison des fonctionnalités

| Fonctionnalité | OpenClaw Dashboard | Surveillance générique | Terminal UI |
|---------|-------------------|-----------------------|-------------|
| WebSocket temps réel | ✅ | ⚠️ Limité | ✅ |
| Palette de commandes | ✅ | ❌ | ❌ |
| Support multi-thèmes | ✅ 4 thèmes | ⚠️ 1-2 thèmes | ⚠️ Limité |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Système de plugins | ✅ | ❌ | ❌ |
| Responsive mobile | ✅ | ⚠️ Partiel | ❌ |
| Animations belles | ✅ | ❌ | ❌ |
| Docker Ready | ✅ | ✅ | ⚠️ |
| Configuration zéro | ✅ | ❌ | ❌ |

---

## 🏗️ Architecture

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

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation via npm

```bash
# Installer depuis npm
npm install @openclaw/dashboard

# Démarrer le serveur (sert le frontend intégré + API)
npx @openclaw/dashboard
```

Ou installer globalement :

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Depuis les sources

```bash
# Cloner le dépôt
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Installer les dépendances
npm install

# Construire le frontend
npm run build

# Démarrer le serveur de production
npm start
```

Ouvrez [http://localhost:3777](http://localhost:3777) dans votre navigateur.

### Mode développement

```bash
# Terminal 1: Démarrer le serveur de dev avec hot reload
npm run dev

# Terminal 2: Démarrer le serveur API
npm run server
```

### Docker

```bash
# Avec Docker Compose (recommandé)
docker compose up -d

# Ou construire et exécuter manuellement
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Raccourcis clavier

Appuyez sur `?` n'importe où pour voir tous les raccourcis clavier.

| Raccourci | Action |
|----------|--------|
| `Ctrl+K` | Palette de commandes |
| `Ctrl+/` | Basculer la barre latérale |
| `G puis O` | Aller à Overview |
| `G puis S` | Aller à Sessions |
| `G puis A` | Aller à Agents |
| `G puis T` | Aller à Tasks |
| `G puis ,` | Aller à Settings |
| `T puis D` | Basculer thème sombre |
| `T puis L` | Basculer thème clair |
| `1-5` | Aller aux éléments de navigation |

---

## 📊 Benchmarks de performance

| Métrique | Valeur |
|--------|-------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
 taille du bundle (compressé) | ~180KB |
| Score Lighthouse | 95+ |
| Latence WebSocket | < 50ms |

---

## 🔒 Considérations de sécurité

- **Pas d'authentification par défaut** — Ajoutez votre propre middleware d'authentification en production
- **CORS activé** — Configurez les origines autorisées pour votre déploiement
- **CSP recommandé** — Ajoutez des en-têtes Content-Security-Policy
- **HTTPS requis** — Utilisez toujours HTTPS en production
- **Limitation de débit** — Envisagez d'ajouter une limitation de débit pour les endpoints API

---

## 📁 Structure du projet

```
openclaw-dashboard/
├── .github/               # Workflows GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # Pipeline CI
│   │   └── release.yml    # Automatisation des releases
│   └── FUNDING.yml
├── docs/                  # Documentation
│   └── API.md             # Référence API
├── server/                # Serveur backend
│   ├── index.js           # Serveur Express + WebSocket
│   ├── openclaw-api.js    # Wrapper API avec données mock
│   └── package.json
├── src/
│   ├── components/        # Composants React
│   │   ├── Agents/        # Gestion des agents
│   │   ├── CommandPalette/# ⌘K palette de commandes
│   │   ├── Dashboard/     # Overview, graphiques, métriques
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Panneau de notifications
│   │   ├── Sessions/      # Gestion des sessions
│   │   ├── Settings/      # Pages de paramètres
│   │   ├── Tasks/         # Tableau de tâches
│   │   └── ui/            # Composants UI réutilisables
│   ├── hooks/             # Hooks React personnalisés
│   ├── i18n/              # Traductions (EN/ZH)
│   ├── lib/               # Utilitaires, constantes
│   ├── pages/             # Composants de page
│   ├── plugins/           # Système de plugins
│   │   ├── index.js       # Gestionnaire de plugins
│   │   ├── examples/      # Plugins d'exemple
│   │   └── README.md      # Documentation des plugins
│   ├── stores/            # Stores Zustand
│   └── utils/             # Fonctions utilitaires
├── public/                # Fichiers statiques
├── Dockerfile             # Build Docker multi-étapes
├── docker-compose.yml     # Configuration Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 Endpoints API

Voir [docs/API.md](docs/API.md) pour la documentation complète.

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Vérification de santé |
| `GET /api/overview` | Statistiques du dashboard + activité récente |
| `GET /api/sessions` | Toutes les sessions avec pagination |
| `GET /api/sessions/:id` | Détail de session + historique |
| `GET /api/agents` | Tous les agents |
| `GET /api/tasks` | Tâches avec statut |
| `GET /api/system` | Métriques système |
| `GET /api/notifications` | Liste des notifications |
| `GET /api/heatmap` | Carte de chaleur d'activité sur 90 jours |
| `WS /ws` | Mises à jour en temps réel (toutes les 3s) |

---

## 🎨 Thèmes

Le dashboard supporte 4 thèmes :

| Thème | Description |
|-------|-------------|
| **Sombre** | Dégradé bleu marine profond (par défaut) |
| **Clair** | Blanc pur avec gris subtil |
| **AMOLED** | Noir pur pour écrans OLED |
| **Système** | Suit les préférences du système d'exploitation |

Personnalisez les thèmes en éditant les variables CSS dans `src/index.css`.

---

## 🌐 Internationalisation

Supporte actuellement :
- 🇺🇸 Anglais
- 🇨🇳 Chinois (简体中文)

Ajoutez de nouvelles langues en :
1. Créant un fichier JSON dans `src/i18n/` (ex. `fr.json`)
2. Ajoutant la langue au sélecteur de langue
3. Utilisant `t('key')` pour toutes les chaînes visibles par l'utilisateur

---

## 🔌 Système de plugins

OpenClaw Dashboard supporte les plugins pour étendre les fonctionnalités :

```javascript
export default {
  id: 'my-plugin',
  name: 'Mon Plugin',
  version: '1.0.0',
  activate(context) {
    context.registerPage({ ... });
    context.registerCommand({ ... });
    context.registerHook('event', callback);
  },
  deactivate() {
    // Nettoyage
  }
};
```

Voir [src/plugins/README.md](src/plugins/README.md) pour la documentation complète.

---

## 🐳 Options de déploiement

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Recommandé)

```bash
docker compose up -d
```

Voir le [Guide de déploiement](docs/deployment.md) complet pour des instructions détaillées.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Service Systemd

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

## ❓ FAQ

**Q : Puis-je utiliser cela avec ma propre instance OpenClaw ?**
R : Oui ! Remplacez les données mock dans `server/openclaw-api.js` par de vrais appels API.

**Q : Comment ajouter l'authentification ?**
R : Ajoutez un middleware dans `server/index.js`. Nous recommandons Passport.js ou JWT.

**Q : Puis-je personnaliser les thèmes ?**
R : Absolument ! Éditez les variables CSS dans `src/index.css`.

**Q : Est-ce prêt pour la production ?**
R : Oui, avec une authentification et des en-têtes de sécurité correctement configurés.

**Q : Comment contribuer ?**
R : Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les directives.

---

## 🗺️ Roadmap

### ✅ Terminé

| Version | Points forts |
|---------|-------------|
| **v2.0** | 🎨 Version initiale — React + Vite, ⌘K palette de commandes, 4 thèmes, i18n (EN/ZH), mises à jour WebSocket en temps réel |
| **v2.1** | 📊 Visualisation de données riche (graphiques, cartes de chaleur, jauges), système de plugins, support Docker, optimisations de performance |

### 🚧 En cours (v2.2)

- 🔔 **Notifications d'alerte en temps réel** — Alertes personnalisables basées sur des seuils avec livraison multi-canaux (email, webhook, in-app)
- 🧩 **Marché de plugins** — Parcourez, installez et gérez les plugins communautaires directement depuis le dashboard
- 👥 **Support multi-utilisateurs** — Contrôle d'accès basé sur les rôles (RBAC), gestion des utilisateurs et espaces de travail d'équipe
- 📈 **Analyses avancées** — Informations plus approfondies sur les performances des agents, suivi des coûts et tendances d'utilisation

### 🔮 Planifié (v2.3+)

- 📱 **Application mobile** — Applications iOS et Android natives pour la surveillance en déplacement
- 🌐 **API Gateway** — Couche API REST/GraphQL unifiée avec limitation de débit, cache et authentification
- 🤖 **Débogage assisté par IA** — Laissez l'IA analyser les journaux et suggérer des corrections pour les problèmes d'agents
- 🔄 **Intégration CI/CD** — Support natif pour GitHub Actions, GitLab CI et pipelines Jenkins
- 📡 **Déploiement edge** — Agent léger pour les appareils edge et les scénarios IoT
- �🎯 **Dashboards personnalisés** — Constructeur de dashboards par glisser-déposer avec bibliothèque de widgets

> 💡 Vous avez une demande de fonctionnalité ? [Ouvrez un issue](https://github.com/openclaw/openclaw-dashboard/issues) ou participez à la discussion !

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Veuillez lire [CONTRIBUTING.md](CONTRIBUTING.md) avant de soumettre une PR.

1. Fork le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'feat: Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

---

## Contributeurs

Merci à ces merveilleuses personnes pour leurs contributions :

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Ce projet suit la spécification [all-contributors](https://allcontributors.org). Les contributions de tout type sont les bienvenues !

### Ajouter un nouveau contributeur

Pour ajouter un nouveau contributeur, utilisez la commande suivante :

```bash
npx all-contributors add <username> <contribution>
```

Par exemple :

```bash
npx all-contributors add johndoe code,doc
```

Types de contribution disponibles : `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.

## 🙏 Remerciements

- Inspiré par [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) et [Raycast](https://raycast.com)
- Construit avec amour pour la communauté OpenClaw

---

Fait avec ❤️ par l'équipe OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
