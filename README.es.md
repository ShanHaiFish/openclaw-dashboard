# 🔮 OpenClaw Dashboard

[English](README.md) | [繁體中文](README.zh-Hant.md) | [한국어](README.ko.md) | [Deutsch](README.de.md) | **[Español](README.es.md)** | [Français](README.fr.md) | [Italiano](README.it.md) | [Dansk](README.da.md) | [日本語](README.ja.md) | [Polski](README.pl.md) | [Русский](README.ru.md) | [Bosanski](README.bs.md) | [العربية](README.ar.md) | [Norsk](README.no.md) | [Português (Brasil)](README.pt-BR.md) | [ไทย](README.th.md) | [Türkçe](README.tr.md) | [Українська](README.uk.md) | [বাংলা](README.bn.md) | [Ελληνικά](README.el.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-Hans.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/openclaw/openclaw-dashboard)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

> **El panel de monitoreo en tiempo real más hermoso para agentes de IA.**
> Construido con React, con paleta de comandos ⌘K, i18n, 4 temas y un sistema de plugins.

![Vista previa del OpenClaw Dashboard](docs/preview.png)

---

## ✨ ¿Por qué OpenClaw Dashboard?

Gestionar agentes de IA no debería sentirse como leer logs de terminal. OpenClaw Dashboard transforma tu experiencia de monitoreo de agentes con:

- **🎨 Diseño visual impresionante** — Inspirado en Vercel, Linear y Raycast. Glassmorphism, animaciones suaves y detalles cuidadosos.
- **⚡ Actualizaciones en tiempo real** — Datos en vivo impulsados por WebSocket. No se necesitan botones de actualización.
- **⌘K Paleta de comandos** — A los usuarios avanzados les encantan las interfaces de teclado primero. Navega, busca y ejecuta comandos al instante.
- **🌍 Internacionalización** — Soporte incorporado para inglés y chino. Agrega más idiomas fácilmente.
- **🎭 4 temas hermosos** — Oscuro, Claro, AMOLED (para pantallas OLED) y basado en el Sistema.
- **🔌 Sistema de plugins** — Extiende la funcionalidad sin hacer fork. Registra páginas, comandos y hooks.
- **📊 Visualización de datos rica** — Gráficos, mapas de calor, medidores e indicadores de progreso.
- **📱 Totalmente responsivo** — Funciona hermosamente en móvil, tablet y escritorio.

---

## 📊 Comparación de características

| Característica | OpenClaw Dashboard | Monitoreo genérico | Terminal UI |
|---------|-------------------|-------------------|-------------|
| WebSocket en tiempo real | ✅ | ⚠️ Limitado | ✅ |
| Paleta de comandos | ✅ | ❌ | ❌ |
| Soporte multi-tema | ✅ 4 temas | ⚠️ 1-2 temas | ⚠️ Limitado |
| i18n (EN/ZH) | ✅ | ❌ | ❌ |
| Sistema de plugins | ✅ | ❌ | ❌ |
| Responsivo móvil | ✅ | ⚠️ Parcial | ❌ |
| Animaciones hermosas | ✅ | ❌ | ❌ |
| Docker Ready | ✅ | ✅ | ⚠️ |
| Configuración cero | ✅ | ❌ | ❌ |

---

## 🏗️ Arquitectura

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

## 🚀 Inicio rápido

### Requisitos previos

- Node.js 18+
- npm o yarn

### Instalar vía npm

```bash
# Instalar desde npm
npm install @openclaw/dashboard

# Iniciar el sirvidor (sirve frontend integrado + API)
npx @openclaw/dashboard
```

O instalar globalmente:

```bash
npm install -g @openclaw/dashboard
openclaw-dashboard
```

### Desde el código fuente

```bash
# Clonar el repositorio
git clone https://github.com/openclaw/openclaw-dashboard.git
cd openclaw-dashboard

# Instalar dependencias
npm install

# Construir el frontend
npm run build

# Iniciar el servidor de producción
npm start
```

Abre [http://localhost:3777](http://localhost:3777) en tu navegador.

### Modo de desarrollo

```bash
# Terminal 1: Iniciar servidor de desarrollo con hot reload
npm run dev

# Terminal 2: Iniciar el servidor API
npm run server
```

### Docker

```bash
# Usando Docker Compose (recomendado)
docker compose up -d

# O construir y ejecutar manualmente
docker build -t openclaw-dashboard .
docker run -p 3777:3777 openclaw-dashboard
```

---

## ⌨️ Atajos de teclado

Presiona `?` en cualquier lugar para ver todos los atajos de teclado.

| Atajo | Acción |
|----------|--------|
| `Ctrl+K` | Paleta de comandos |
| `Ctrl+/` | Alternar barra lateral |
| `G luego O` | Ir a Overview |
| `G luego S` | Ir a Sessions |
| `G luego A` | Ir a Agents |
| `G luego T` | Ir a Tasks |
| `G luego ,` | Ir a Settings |
| `T luego D` | Alternar tema oscuro |
| `T luego L` | Alternar tema claro |
| `1-5` | Saltar a elementos de navegación |

---

## 📊 Benchmarks de rendimiento

| Métrica | Valor |
|--------|-------|
| First Contentful Paint | < 0.5s |
| Time to Interactive | < 1.2s |
| Tamaño del bundle (comprimido) | ~180KB |
| Puntuación de Lighthouse | 95+ |
| Latencia de WebSocket | < 50ms |

---

## 🔒 Consideraciones de seguridad

- **Sin autenticación por defecto** — Agrega tu propio middleware de autenticación en producción
- **CORS habilitado** — Configura orígenes permitidos para tu despliegue
- **CSP recomendado** — Agrega encabezados Content-Security-Policy
- **HTTPS requerido** — Siempre usa HTTPS en producción
- **Limitación de tasa** — Considera agregar limitación de tasa para endpoints de API

---

## 📁 Estructura del proyecto

```
openclaw-dashboard/
├── .github/               # Flujos de GitHub Actions
│   ├── workflows/
│   │   ├── ci.yml         # Pipeline de CI
│   │   └── release.yml    # Automatización de releases
│   └── FUNDING.yml
├── docs/                  # Documentación
│   └── API.md             # Referencia de API
├── server/                # Servidor backend
│   ├── index.js           # Servidor Express + WebSocket
│   ├── openclaw-api.js    # Wrapper de API con datos mock
│   └── package.json
├── src/
│   ├── components/        # Componentes React
│   │   ├── Agents/        # Gestión de agentes
│   │   ├── CommandPalette/# ⌘K paleta de comandos
│   │   ├── Dashboard/     # Overview, gráficos, métricas
│   │   ├── Layout/        # Sidebar, Header, MainLayout
│   │   ├── Notifications/ # Panel de notificaciones
│   │   ├── Sessions/      # Gestión de sesiones
│   │   ├── Settings/      # Páginas de configuración
│   │   ├── Tasks/         # Tablero de tareas
│   │   └── ui/            # Componentes UI reutilizables
│   ├── hooks/             # Hooks de React personalizados
│   ├── i18n/              # Traducciones (EN/ZH)
│   ├── lib/               # Utilidades, constantes
│   ├── pages/             # Componentes de página
│   ├── plugins/           # Sistema de plugins
│   │   ├── index.js       # Gestor de plugins
│   │   ├── examples/      # Plugins de ejemplo
│   │   └── README.md      # Documentación de plugins
│   ├── stores/            # Almacenes Zustand
│   └── utils/             # Funciones de utilidad
├── public/                # Archivos estáticos
├── Dockerfile             # Build multi-etapa de Docker
├── docker-compose.yml     # Configuración de Docker Compose
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔌 Endpoints de API

Ver [docs/API.md](docs/API.md) para documentación completa.

| Endpoint | Descripción |
|----------|-------------|
| `GET /api/health` | Verificación de salud |
| `GET /api/overview` | Estadísticas del dashboard + actividad reciente |
| `GET /api/sessions` | Todas las sesiones con paginación |
| `GET /api/sessions/:id` | Detalle de sesión + historial |
| `GET /api/agents` | Todos los agentes |
| `GET /api/tasks` | Tareas con estado |
| `GET /api/system` | Métricas del sistema |
| `GET /api/notifications` | Lista de notificaciones |
| `GET /api/heatmap` | Mapa de calor de actividad de 90 días |
| `WS /ws` | Actualizaciones en tiempo real (cada 3s) |

---

## 🎨 Temas

El dashboard soporta 4 temas:

| Tema | Descripción |
|-------|-------------|
| **Oscuro** | Degradado azul marino profundo (predeterminado) |
| **Claro** | Blanco limpio con gris sutil |
| **AMOLED** | Negro puro para pantallas OLED |
| **Sistema** | Sigue las preferencias del SO |

Personaliza los temas editando las variables CSS en `src/index.css`.

---

## 🌐 Internacionalización

Soporta actualmente:
- 🇺🇸 Inglés
- 🇨🇳 Chino (简体中文)

Agrega nuevos idiomas:
1. Creando un archivo JSON en `src/i18n/` (ej. `es.json`)
2. Agregando el idioma al selector de idioma
3. Usando `t('key')` para todas las cadenas visibles al usuario

---

## 🔌 Sistema de plugins

OpenClaw Dashboard soporta plugins para extender la funcionalidad:

```javascript
export default {
  id: 'my-plugin',
  name: 'Mi Plugin',
  version: '1.0.0',
  activate(context) {
    context.registerPage({ ... });
    context.registerCommand({ ... });
    context.registerHook('event', callback);
  },
  deactivate() {
    // Limpieza
  }
};
```

Ver [src/plugins/README.md](src/plugins/README.md) para documentación completa.

---

## 🐳 Opciones de despliegue

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openclaw/openclaw-dashboard&project-name=openclaw-dashboard&repository-name=openclaw-dashboard&framework-other=vite)

### Railway (Full-Stack)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/clone?repository=https://github.com/openclaw/openclaw-dashboard)

### Docker (Recomendado)

```bash
docker compose up -d
```

Ver la [Guía de despliegue](docs/deployment.md) completa para instrucciones detalladas.

### VPS / Bare Metal

```bash
npm install --production
npm run build
npm start
```

### Servicio Systemd

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

**P: ¿Puedo usar esto con mi propia instancia de OpenClaw?**
R: ¡Sí! Reemplaza los datos mock en `server/openclaw-api.js` con llamadas reales a la API.

**P: ¿Cómo agrego autenticación?**
R: Agrega middleware en `server/index.js`. Recomendamos Passport.js o JWT.

**P: ¿Puedo personalizar los temas?**
R: ¡Absolutamente! Edita las variables CSS en `src/index.css`.

**P: ¿Está listo para producción?**
R: Sí, con autenticación y encabezados de seguridad configurados adecuadamente.

**P: ¿Cómo contribuyo?**
R: Ver [CONTRIBUTING.md](CONTRIBUTING.md) para directrices.

---

## 🗺️ Roadmap

### ✅ Completado

| Versión | Destacados |
|---------|-----------|
| **v2.0** | 🎨 Lanzamiento inicial — React + Vite, ⌘K paleta de comandos, 4 temas, i18n (EN/ZH), actualizaciones en tiempo real WebSocket |
| **v2.1** | 📊 Visualización de datos rica (gráficos, mapas de calor, medidores), sistema de plugins, soporte Docker, optimizaciones de rendimiento |

### 🚧 En progreso (v2.2)

- 🔔 **Notificaciones de alerta en tiempo real** — Alertas personalizables basadas en umbrales con entrega multicanal (email, webhook, in-app)
- 🧩 **Mercado de plugins** — Busca, instala y gestiona plugins de la comunidad directamente desde el dashboard
- 👥 **Soporte multiusuario** — Control de acceso basado en roles (RBAC), gestión de usuarios y espacios de trabajo de equipo
- 📈 **Análisis avanzados** — Información más profunda sobre el rendimiento de agentes, seguimiento de costos y tendencias de uso

### 🔮 Planificado (v2.3+)

- 📱 **App móvil** — Apps nativas de iOS y Android para monitoreo sobre la marcha
- 🌐 **API Gateway** — Capa unificada de API REST/GraphQL con limitación de tasa, caché y autenticación
- 🤖 **Depuración asistida por IA** — Deja que la IA analice los logs y sugiera correcciones para problemas de agentes
- 🔄 **Integración CI/CD** — Soporte nativo para GitHub Actions, GitLab CI y pipelines de Jenkins
- 📡 **Despliegue edge** — Agente ligero para dispositivos edge y escenarios IoT
- 🎯 **Dashboards personalizados** — Constructor de dashboards con arrastrar y soltar con biblioteca de widgets

> 💡 ¿Tienes una solicitud de función? [Abre un issue](https://github.com/openclaw/openclaw-dashboard/issues) ¡o únete a la discusión!

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) antes de enviar un PR.

1. Forkea el repositorio
2. Crea tu rama de feature (`git checkout -b feature/amazing-feature`)
3. Commitea tus cambios (`git commit -m 'feat: Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## Contribuidores

Gracias a estas maravillosas personas por sus contribuciones:

<!-- ALL-CONTRIBUTORS-LIST:START -->
| [<img src="https://avatars.githubusercontent.com/u/1?v=4" width="50px;"/><br /><sub>OpenClaw</sub>](https://github.com/openclaw)<br />[💬](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Code") [🤔](https://github.com/openclaw/openclaw-dashboard#ideas "Ideas & Planning") [📖](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Documentation") [🚧](https://github.com/openclaw/openclaw-dashboard/commits?author=openclaw "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

¡Este proyecto sigue la especificación [all-contributors](https://allcontributors.org). ¡Contribuciones de cualquier tipo son bienvenidas!

### Agregar un nuevo contribuidor

Para agregar un nuevo contribuidor, usa el siguiente comando:

```bash
npx all-contributors add <username> <contribution>
```

Por ejemplo:

```bash
npx all-contributors add johndoe code,doc
```

Tipos de contribución disponibles: `code`, `doc`, `ideas`, `maintenance`, `bug`, `test`, `review`, `question`, `design`, `translation`, `infra`, `platform`, `tool`, `eventOrganizing`, `business`

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- Inspirado en [Vercel Dashboard](https://vercel.com/dashboard), [Linear](https://linear.app) y [Raycast](https://raycast.com)
- Construido con amor para la comunidad OpenClaw

---

Hecho con ❤️ por el equipo OpenClaw

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw-dashboard&type=Date)](https://star-history.com/#openclaw/openclaw-dashboard&Date)
