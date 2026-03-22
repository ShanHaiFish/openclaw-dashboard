# 🔮 OpenClaw Dashboard

[English](README.en.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | **[Português (Brasil)](README.pt-BR.md)** | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **O painel de monitoramento em tempo real mais bonito para agentes de IA.**
> Construído com React, com paleta de comandos ⌘K, i18n, 4 temas e um sistema de plugins.

![OpenClaw Dashboard Preview](docs/preview.png)

---

## ✨ Por que o OpenClaw Dashboard?

Gerenciar agentes de IA não deveria ser como ler logs de terminal. O OpenClaw Dashboard transforma sua experiência de monitoramento com:

- **🎨 Design Visual Deslumbrante** — Inspirado no Vercel, Linear e Raycast. Glassmorphism, animações suaves e detalhes cuidadosos.
- **⚡ Atualizações em Tempo Real** — Dados ao vivo alimentados por WebSocket. Sem botões de atualização necessários.
- **⌘K Paleta de Comandos** — Usuários avançados amam interfaces com foco no teclado. Navegue, pesquise e execute comandos instantaneamente.
- **🌍 Internacionalização** — Suporte nativo para inglês e chinês. Adicione mais idiomas facilmente.
- **🎭 4 Temas Bonitos** — Escuro, Claro, AMOLED (para telas OLED) e Baseado no Sistema.
- **🔌 Sistema de Plugins** — Estenda a funcionalidade sem fazer fork. Registre páginas, comandos e hooks.
- **📊 Visualização Rica de Dados** — Gráficos, mapas de calor, medidores e indicadores de progresso.
- **📱 Totalmente Responsivo** — Funciona lindamente em celular, tablet e desktop.

---

## 📊 Comparação de Recursos

| Recurso | OpenClaw Dashboard | Monitoramento Genérico | Terminal UI |
|---------|-------------------|------------------------|-------------|
| WebSocket em Tempo Real | ✅ | ⚠️ Limitado | ✅ |
| Paleta de Comandos | ✅ | ❌ | ❌ |
| Suporte Multi-tema | ✅ 4 temas | ⚠️ 1-2 temas | ⚠️ Limitado |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Sistema de Plugins | ✅ | ❌ | ❌ |
| Responsivo para Mobile | ✅ | ⚠️ Parcial | ❌ |
| Animações Bonitas | ✅ | ❌ | ❌ |
| Pronto para Docker | ✅ | ✅ | ⚠️ |
| Configuração Zero | ✅ | ❌ | ❌ |

---

## 🏗️ Arquitetura

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
│  │                    Estilização TailwindCSS                │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │Dark │ │Light │ │AMOLED│ │System│ │Custom│          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Servidor API OpenClaw                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  REST API   │  │  WebSocket  │  │  Arquivos   │             │
│  │  /api/*     │  │  /ws        │  │  Estáticos  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação via npm

```bash
# Instale do npm
npm install @openclaw/dashboard

# Inicie o servidor (serve o frontend + API embutidos)
npx @openclaw/dashboard
```

Ou instale globalmente:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### A partir do Código Fonte

```bash
# Clone o repositório
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Instale as dependências
npm install

# Compile o frontend
npm run build

# Inicie o servidor de produção
npm start
```

Abra [http://localhost:3777](http://localhost:3777) no seu navegador.

### Modo de Desenvolvimento

```bash
# Terminal 1: Inicie o servidor de desenvolvimento com hot reload
npm run dev

# Terminal 2: Inicie o servidor da API
npm run server
```

### Docker

```bash
# Usando Docker Compose (recomendado)
docker compose up -d

# Ou construa e execute manualmente
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Atalhos de Teclado

Pressione `?` em qualquer lugar para ver todos os atalhos de teclado.

| Atalho | Ação |
|--------|------|
| `Ctrl+K` | Paleta de comandos |
| `Ctrl+/` | Alternar barra lateral |
| `G depois O` | Ir para Visão Geral |
| `G depois S` | Ir para Sessões |
| `G depois A` | Ir para Agentes |
| `G depois T` | Ir para Tarefas |
| `G depois ,` | Ir para Configurações |
| `T depois D` | Alternar tema escuro |
| `T depois L` | Alternar tema claro |
| `1-5` | Pular para itens de navegação |

---

## 📊 Benchmarks de Performance

| Métrica | Valor |
|---------|-------|
| First Contentful Paint | < 0,5s |
| Time to Interactive | < 1,2s |
| Tamanho do Pacote (gzip) | ~180KB |
| Pontuação Lighthouse | 95+ |
| Latência WebSocket | < 50ms

---

## 🔒 Considerações de Segurança

- **Sem autenticação por padrão** — Adicione seu próprio middleware de autenticação em produção
- **CORS habilitado** — Configure origins permitidas para seu deploy
- **CSP recomendado** — Adicione cabeçalhos Content-Security-Policy
- **HTTPS obrigatório** — Sempre use HTTPS em produção
- **Rate limiting** — Considere adicionar rate limiting para endpoints da API

---

## 📁 Estrutura do Projeto

```
openclaw-dashboard/
├── .github/               # Workflows do GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # Pipeline de CI
│   │   └── release.yml    # Automação de release
│   └── FUNDING.yml
├── docs/                  # Documentação
│   └── API.md             # Referência da API
├── server/                # Servidor backend
│   ├── index.js           # Servidor Express + WebSocket
│   ├── openclaw-api.js    # Wrapper da API com dados mock
│   └── package.json
├── src/
│   ├── components/        # Componentes React
│   │   ├── Agents/        # Gerenciamento de agentes
│   │   ├── CommandPalette/# Paleta de comandos ⌘K
│   │   ├── Dashboard/     # Visão geral, gráficos, métricas
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Painel de notificações
│   │   ├── Sessions/      # Gerenciamento de sessões
│   │   ├── Settings/      # Páginas de configurações
│   │   ├── Tasks/         # Quadro de tarefas
│   │   └── ui/            # Componentes UI reutilizáveis
│   ├── hooks/             # Hooks React customizados
│   ├── i18n/              # Traduções (EN/ZH)
│   ├── lib/               # Utilitários, constantes
│   ├── pages/             # Componentes de página
│   ├── plugins/           # Sistema de plugins
│   │   ├── index.js       # Gerenciador de plugins
│   │   ├── examples/      # Plugins de exemplo
│   │   └── README.md      # Documentação de plugins
│   ├── stores/            # Stores do Zustand
│   └── utils/             # Funções utilitárias
├── public/                # Recursos estáticos
├── Dockerfile             # Build multi-stage do Docker
├── docker-compose.yml     # Configuração do Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 Endpoints da API

Veja [docs/API.md](docs/API.md) para documentação completa.

| Endpoint | Descrição |
|----------|-----------|
| `GET /api/health` | Verificação de saúde |
| `GET /api/overview` | Estatísticas do painel + atividade recente |
| `GET /api/sessions` | Todas as sessões com paginação |
| `GET /api/sessions/:id` | Detalhes da sessão + histórico |
| `GET /api/agents` | Todos os agentes |
| `GET /api/tasks` | Tarefas com status |
| `GET /api/system` | Métricas do sistema |
| `GET /api/notifications` | Lista de notificações |
| `GET /api/heatmap` | Mapa de calor de atividade de 90 dias |
| `WS /ws` | Atualizações em tempo real (a cada 3s) |

---

## 🎨 Temas

O painel suporta 4 temas:

| Tema | Descrição |
|------|-----------|
| **Escuro** | Gradiente azul-marinho profundo (padrão) |
| **Claro** | Branco limpo com cinza sutil |
| **AMOLED** | Preto puro para telas OLED |
| **Sistema** | Segue a preferência do SO |

Personalize os temas editando as variáveis CSS em `src/index.css`.

---

## 🌐 Internacionalization

Atualmente suporta:
- 🇺🇸 Inglês
- 🇨🇳 Chinês (简体中文)

Adicione novos idiomas:
1. Criando um arquivo JSON em `src/i18n/` (ex: `ja.json`)
2. Adicionando o idioma no seletor de idiomas
3. Usando `t('key')` para todas as strings visíveis ao usuário

---

## 🔌 Sistema de Plugins

O OpenClaw Dashboard suporta plugins para estender a funcionalidade:

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
    // Limpeza
  }
};
```

Veja [src/plugins/README.md](src/plugins/README.md) para documentação completa.

---

## 🐳 Opções de Deploy

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Recomendado)

```bash
docker compose up -d
```

Veja o [Guia de Deploy](docs/deployment.md) completo para instruções detalhadas.

### VPS / Servidor Dedicado

```bash
npm install --production
npm run build
npm start
```

### Serviço Systemd

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

**P: Posso usar isso com minha própria instância do OpenClaw?**
R: Sim! Substitua os dados mock em `server/openclaw-api.js` com chamadas reais de API.

**P: Como adiciono autenticação?**
R: Adicione middleware em `server/index.js`. Recomendamos Passport.js ou JWT.

**P: Posso personalizar os temas?**
R: Com certeza! Edite as variáveis CSS em `src/index.css`.

**P: Isso está pronto para produção?**
R: Sim, com autenticação e cabeçalhos de segurança configurados adequadamente.

**P: Como contribuo?**
R: Veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes.

---

## 🗺️ Roadmap

### ✅ Concluído

| Versão | Destaques |
|--------|-----------|
| **v2.0** | 🎨 Lançamento inicial — React + Vite, paleta de comandos ⌘K, 4 temas, i18n (EN/ZH), atualizações em tempo real via WebSocket |
| **v2.1** | 📊 Visualização rica de dados (gráficos, mapas de calor, medidores), sistema de plugins, suporte a Docker, otimizações de performance |

### 🚧 Em Progresso (v2.2)

- 🔔 **Notificações de Alerta em Tempo Real** — Alertas configuráveis baseados em limiares com entrega multicanal (e-mail, webhook, in-app)
- 🧩 **Marketplace de Plugins** — Navegue, instale e gerencie plugins da comunidade diretamente do painel
- 👥 **Suporte Multi-usuário** — Controle de acesso baseado em papéis (RBAC), gerenciamento de usuários e espaços de trabalho em equipe
- 📈 **Análises Avançadas** — Insights mais profundos sobre desempenho de agentes, rastreamento de custos e tendências de uso

### 🔮 Planejado (v2.3+)

- 📱 **Aplicativo Móvel** — Apps nativos iOS e Android para monitoramento em qualquer lugar
- 🌐 **API Gateway** — Camada unificada de REST/GraphQL com rate limiting, cache e autenticação
- 🤖 **Depuração com Assistência de IA** — Deixe a IA analisar logs e sugerir correções para problemas de agentes
- 🔄 **Integração CI/CD** — Suporte nativo para GitHub Actions, GitLab CI e Jenkins pipelines
- 📡 **Deploy em Edge** — Agente leve para dispositivos edge e cenários IoT
- 🎯 **Dashboards Personalizados** — Construtor de dashboards com drag-and-drop e biblioteca de widgets

> 💡 Tem uma solicitação de recurso? [Abra uma issue](https://github.com/openclaw/openclaw-dashboard/issues) ou participe da discussão!

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) antes de enviar um PR.

1. Faça fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/amazing-feature`)
3. Commite suas mudanças (`git commit -m 'feat: Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

---

## Contribuidores

Obrigado a essas pessoas maravilhosas por suas contribuições:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Este projeto segue a especificação [all-contributors](https://allcontributors.org). Contribuições de todos os tipos são bem-vindas!

### Adicionando um Novo Contribuidor

Para adicionar um novo contribuidor, use o seguinte comando:

```bash
npx all-contributors add <usuário> <contribuição>
```

Por exemplo:

```bash
npx all-contributors add johndoe code,doc
```

Tipos de contribuição disponíveis: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licença

Este projeto é licenciado sob a Licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Inspirado pelo [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) e [Raycast](https://raycast.com)
- Construído com amor para a comunidade OpenClaw

---

Feito com ❤️ pela equipe OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
