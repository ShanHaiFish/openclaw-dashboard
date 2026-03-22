import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Lazy-loaded Pages
const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const SessionsPage = lazy(() => import('./pages/SessionsPage'));
const AgentsPage = lazy(() => import('./pages/AgentsPage'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const ActivityPage = lazy(() => import('./pages/ActivityPage'));
const AlertsPage = lazy(() => import('./pages/AlertsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Settings page is a component
import SettingsPage from './components/Settings/SettingsPage';

// UI Components
import ErrorBoundary from './components/ui/ErrorBoundary';
import Splash from './components/ui/Splash';
import Logo from './components/ui/Logo';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useI18n } from './hooks/useI18n';
import { useWebSocket } from './hooks/useWebSocket';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Store
import useAppStore from './stores/appStore';

// Loading fallback component
const PageLoader = ({ t }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--border-primary)]" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-[var(--accent-primary)] animate-spin" />
      </div>
      <p className="text-sm text-[var(--text-tertiary)]">{t?.('common.loading') || 'Loading...'}</p>
    </div>
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, setTheme, toggleTheme } = useTheme();
  const { lang, setLang, t, toggleLang } = useI18n();
  const { isConnected, lastUpdate } = useWebSocket();
  
  const {
    toggleCommandPalette,
    toggleSidebar,
    setCurrentPage,
  } = useAppStore();

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+k': (e) => {
      e?.preventDefault();
      toggleCommandPalette();
    },
    'ctrl+/': toggleSidebar,
    'g+o': () => setCurrentPage('overview'),
    'g+s': () => setCurrentPage('sessions'),
    'g+a': () => setCurrentPage('agents'),
    'g+t': () => setCurrentPage('tasks'),
    'g+n': () => setCurrentPage('analytics'),
    'g+v': () => setCurrentPage('activity'),
    'g+l': () => setCurrentPage('alerts'),
    'g+,': () => setCurrentPage('settings'),
    't+d': () => setTheme('dark'),
    't+l': () => setTheme('light'),
    '?': () => toggleCommandPalette(),
    '1': () => setCurrentPage('overview'),
    '2': () => setCurrentPage('sessions'),
    '3': () => setCurrentPage('agents'),
    '4': () => setCurrentPage('tasks'),
    '5': () => setCurrentPage('analytics'),
    '6': () => setCurrentPage('activity'),
    '7': () => setCurrentPage('alerts'),
    '8': () => setCurrentPage('settings'),
  });

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/*"
              element={
                <MainLayout
                  t={t}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  lang={lang}
                  onToggleLang={toggleLang}
                />
              }
            >
              <Route 
                index 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <OverviewPage t={t} lastUpdate={lastUpdate} />
                  </Suspense>
                } 
              />
              <Route 
                path="sessions" 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <SessionsPage t={t} />
                  </Suspense>
                } 
              />
              <Route 
                path="agents" 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <AgentsPage t={t} />
                  </Suspense>
                } 
              />
              <Route 
                path="tasks" 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <TasksPage t={t} />
                  </Suspense>
                } 
              />
              <Route 
                path="analytics" 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <AnalyticsPage t={t} />
                  </Suspense>
                } 
              />
              <Route 
                path="activity" 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <ActivityPage t={t} />
                  </Suspense>
                } 
              />
              <Route
                path="alerts"
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <AlertsPage t={t} />
                  </Suspense>
                }
              />
              <Route
                path="skills"
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <SkillsPage t={t} />
                  </Suspense>
                }
              />
              <Route
                path="settings"
                element={
                  <SettingsPage
                    t={t}
                    theme={theme}
                    setTheme={setTheme}
                    lang={lang}
                    setLang={setLang}
                  />
                }
              />
              <Route 
                path="*" 
                element={
                  <Suspense fallback={<PageLoader t={t} />}>
                    <NotFoundPage t={t} />
                  </Suspense>
                } 
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
