// App constants
export const APP_NAME = 'OpenClaw Dashboard';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Real-time monitoring for AI agents';

// API endpoints
export const API_BASE = '/api';
export const WS_PATH = '/ws';

// Routes
export const ROUTES = {
  overview: '/',
  sessions: '/sessions',
  agents: '/agents',
  tasks: '/tasks',
  settings: '/settings',
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'overview', path: '/', icon: 'LayoutDashboard', label: 'nav.overview' },
  { id: 'sessions', path: '/sessions', icon: 'MessageSquare', label: 'nav.sessions' },
  { id: 'agents', path: '/agents', icon: 'Bot', label: 'nav.agents' },
  { id: 'tasks', path: '/tasks', icon: 'CheckSquare', label: 'nav.tasks' },
  { id: 'analytics', path: '/analytics', icon: 'BarChart3', label: 'nav.analytics' },
  { id: 'activity', path: '/activity', icon: 'Activity', label: 'nav.activity' },
  { id: 'alerts', path: '/alerts', icon: 'Bell', label: 'nav.alerts' },
  { id: 'settings', path: '/settings', icon: 'Settings', label: 'nav.settings' },
];

// Session statuses
export const SESSION_STATUSES = ['active', 'idle', 'error', 'completed'];

// Task statuses
export const TASK_STATUSES = ['todo', 'in-progress', 'review', 'done'];

// Task priorities
export const TASK_PRIORITIES = ['low', 'medium', 'high', 'critical'];

// Theme options
export const THEMES = [
  { id: 'dark', label: 'theme.dark', icon: 'Moon' },
  { id: 'light', label: 'theme.light', icon: 'Sun' },
  { id: 'amoled', label: 'theme.amoled', icon: 'Circle' },
  { id: 'system', label: 'theme.system', icon: 'Monitor' },
];

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = [
  { keys: ['Ctrl', 'K'], label: 'shortcuts.commandPalette' },
  { keys: ['Ctrl', '/'], label: 'shortcuts.toggleSidebar' },
  { keys: ['G', 'O'], label: 'shortcuts.goToOverview' },
  { keys: ['G', 'S'], label: 'shortcuts.goToSessions' },
  { keys: ['G', 'A'], label: 'shortcuts.goToAgents' },
  { keys: ['G', 'T'], label: 'shortcuts.goToTasks' },
  { keys: ['G', ','], label: 'shortcuts.goToSettings' },
  { keys: ['T', 'D'], label: 'shortcuts.toggleDark' },
  { keys: ['T', 'L'], label: 'shortcuts.toggleLight' },
  { keys: ['?'], label: 'shortcuts.showShortcuts' },
  { keys: ['1-5'], label: 'shortcuts.jumpToNav' },
];

// Accent colors
export const ACCENT_COLORS = [
  { id: '#0ea5e9', name: 'Sky' },
  { id: '#8b5cf6', name: 'Violet' },
  { id: '#ec4899', name: 'Pink' },
  { id: '#f59e0b', name: 'Amber' },
  { id: '#10b981', name: 'Emerald' },
  { id: '#06b6d4', name: 'Cyan' },
  { id: '#ef4444', name: 'Red' },
  { id: '#6366f1', name: 'Indigo' },
];

// Chart colors
export const CHART_COLORS = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  grid: 'rgba(148, 163, 184, 0.1)',
  text: '#94a3b8',
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
  desktop: 1024,
};

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 250,
  slow: 350,
};

// Update interval for WebSocket
export const UPDATE_INTERVAL = 3000;
