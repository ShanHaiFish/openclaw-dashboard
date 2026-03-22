import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // Navigation
  currentPage: 'overview',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  // Command palette
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  
  // Notifications panel
  notificationsOpen: false,
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
  toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
  
  // Session detail
  selectedSession: null,
  setSelectedSession: (session) => set({ selectedSession: session }),
  
  // Filters
  sessionFilter: '',
  setSessionFilter: (filter) => set({ sessionFilter: filter }),
  sessionStatusFilter: '',
  setSessionStatusFilter: (status) => set({ sessionStatusFilter: status }),
  
  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Error state
  error: null,
  setError: (error) => set({ error: error }),
  clearError: () => set({ error: null }),
  
  // Recent commands (for command palette history)
  recentCommands: [],
  addRecentCommand: (command) => set((state) => ({
    recentCommands: [command, ...state.recentCommands.filter(c => c !== command)].slice(0, 5),
  })),
  
  // Settings
  settings: {
    notifications: {
      enabled: true,
      email: false,
      push: true,
      types: ['info', 'success', 'warning', 'error'],
    },
    accentColor: '#0ea5e9',
  },
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates },
  })),
}));

export default useAppStore;
