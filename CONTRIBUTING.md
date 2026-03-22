# Contributing to OpenClaw Dashboard

Thank you for your interest in contributing to OpenClaw Dashboard! This document provides comprehensive guidelines and information for contributors.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher (20 recommended)
- **npm** or **yarn**
- **Git**
- A code editor (VS Code recommended)

### Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/openclaw-dashboard.git
   cd openclaw-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. **Start development servers:**
   ```bash
   # Terminal 1: Frontend dev server (hot reload)
   npm run dev

   # Terminal 2: API server
   npm run server
   ```

4. **Open in browser:**
   ```
   http://localhost:5173  (frontend dev server)
   http://localhost:3777  (production build)
   ```

---

## 📁 Project Structure

```
openclaw-dashboard/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── docs/                   # Documentation
│   └── API.md              # API reference
├── server/                 # Backend (Express + WebSocket)
│   ├── index.js            # Server entry point
│   └── openclaw-api.js     # API with mock data
├── src/
│   ├── components/
│   │   ├── Agents/         # Agent management UI
│   │   ├── CommandPalette/ # ⌘K command palette
│   │   ├── Dashboard/      # Overview, charts, metrics
│   │   ├── Layout/         # Sidebar, Header, MainLayout
│   │   ├── Notifications/  # Notification panel
│   │   ├── Sessions/       # Session management UI
│   │   ├── Settings/       # Settings pages
│   │   ├── Tasks/          # Task board (Kanban)
│   │   └── ui/             # Reusable UI components
│   │       ├── Avatar.jsx
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── ErrorBoundary.jsx
│   │       ├── Logo.jsx
│   │       ├── Modal.jsx
│   │       ├── Splash.jsx
│   │       └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useI18n.js      # Internationalization
│   │   ├── useKeyboardShortcuts.js
│   │   ├── useMediaQuery.js
│   │   ├── useTheme.js
│   │   └── useWebSocket.js
│   ├── i18n/               # Translation files
│   │   ├── en.json
│   │   ├── zh.json
│   │   └── index.js
│   ├── lib/                # Utilities
│   │   ├── constants.js
│   │   └── utils.js
│   ├── pages/              # Page components
│   │   ├── OverviewPage.jsx
│   │   ├── SessionsPage.jsx
│   │   ├── AgentsPage.jsx
│   │   ├── TasksPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── plugins/            # Plugin system
│   │   ├── index.js
│   │   └── examples/
│   ├── stores/             # Zustand state
│   │   └── appStore.js
│   └── utils/              # Helper functions
│       └── formatters.js
├── public/                 # Static assets
├── Dockerfile
├── docker-compose.yml
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Code Style

### General Guidelines

- Use **functional components** with hooks
- Keep components **small and focused** (single responsibility)
- Use **TypeScript-style JSDoc** for documentation
- Follow the existing patterns in the codebase

### Component Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MyComponent.jsx` |
| Utilities | camelCase | `myUtility.js` |
| Hooks | camelCase with `use` | `useMyHook.js` |
| Constants | UPPER_SNAKE | `API_URL` |

### Styling

- Use **TailwindCSS utility classes** exclusively
- Use **CSS variables** for theming (defined in `index.css`)
- Follow the **8px grid system** for spacing (p-2, p-4, p-6, etc.)
- Use **responsive prefixes**: `sm:`, `md:`, `lg:`, `xl:`

### Example Component

```jsx
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

/**
 * A beautiful card component with hover animation.
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 */
const MyCard = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)]"
    >
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

export default MyCard;
```

---

## 🌐 Adding Translations

1. Add new keys to **both** `src/i18n/en.json` and `src/i18n/zh.json`
2. Keep keys organized by feature (e.g., `system.cpu`, `tasks.priority`)
3. Use the `t()` function in components:
   ```jsx
   <h1>{t('overview.title')}</h1>
   ```

### Translation Key Format

```json
{
  "featureName": {
    "keyName": "Translated text"
  }
}
```

---

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no code change |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `chore` | Maintenance tasks |

### Examples

```
feat(dashboard): Add system metrics panel
fix(auth): Resolve token refresh issue
docs(api): Update endpoint documentation
style(ui): Format button components
refactor(plugins): Simplify plugin registration
```

---

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Steps to reproduce** — Clear, numbered steps
2. **Expected behavior** — What should happen
3. **Actual behavior** — What actually happens
4. **Screenshots** — If applicable
5. **Environment** — Browser, OS, Node version
6. **Console errors** — Copy/paste any errors

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**Steps to reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.10.0]
```

---

## ✨ Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** first
2. **Describe the feature** clearly
3. **Explain why** it would be useful
4. **Consider submitting a PR** — We love contributions!

---

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the style guide
- [ ] Tests pass (`npm run build` succeeds)
- [ ] No console errors
- [ ] New components support i18n
- [ ] New components work with all 4 themes
- [ ] Documentation updated if needed
- [ ] Commit messages follow format

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] My code follows the style guide
- [ ] I have tested my changes
- [ ] I have added/updated translations
- [ ] My changes work with all themes
```

### Review Process

1. At least one maintainer approval required
2. All CI checks must pass
3. No merge conflicts
4. Squash and merge preferred

---

## 🧪 Testing

Currently, we rely on manual testing. To verify your changes:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview

# Check for console errors in browser DevTools
```

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to:
- Open an issue for questions
- Join our community discussions
- Reach out to maintainers

---

Thank you for contributing! 🙏
