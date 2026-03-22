/**
 * Activity Logger Plugin
 * 
 * Logs all dashboard events to the console.
 * Useful for debugging and development.
 */

export default {
  id: 'activity-logger',
  name: 'Activity Logger',
  version: '1.0.0',
  description: 'Logs all dashboard events to the console',
  author: 'OpenClaw',
  
  activate(context) {
    console.log('[ActivityLogger] Plugin activated');
    
    // Log session events
    context.registerHook('session:start', (session) => {
      console.log('[ActivityLogger] Session started:', session?.id || 'unknown');
    });
    
    context.registerHook('session:end', (session) => {
      console.log('[ActivityLogger] Session ended:', session?.id || 'unknown');
    });
    
    // Log task events
    context.registerHook('task:create', (task) => {
      console.log('[ActivityLogger] Task created:', task?.id || 'unknown');
    });
    
    context.registerHook('task:complete', (task) => {
      console.log('[ActivityLogger] Task completed:', task?.id || 'unknown');
    });
    
    // Log theme changes
    context.registerHook('theme:change', (theme) => {
      console.log('[ActivityLogger] Theme changed to:', theme);
    });
    
    // Log navigation
    context.registerHook('page:navigate', (page) => {
      console.log('[ActivityLogger] Navigated to:', page);
    });
    
    // Register a command to show activity log
    context.registerCommand({
      id: 'show-activity-log',
      label: 'Show Activity Log',
      description: 'Display recent activity in console',
      category: 'Debug',
      action: () => {
        console.log('[ActivityLogger] Activity log requested');
        const state = context.store?.getState();
        if (state) {
          console.log('[ActivityLogger] Current state:', {
            currentPage: state.currentPage,
            sidebarCollapsed: state.sidebarCollapsed,
            commandPaletteOpen: state.commandPaletteOpen,
          });
        }
      },
    });
  },
  
  deactivate() {
    console.log('[ActivityLogger] Plugin deactivated');
  },
};
