/**
 * Custom Theme Plugin
 * 
 * Demonstrates how to add a custom theme to the dashboard.
 */

export default {
  id: 'custom-theme',
  name: 'Custom Theme',
  version: '1.0.0',
  description: 'Adds a custom theme option to the dashboard',
  author: 'OpenClaw',
  
  activate(context) {
    // Register a command to apply custom theme
    context.registerCommand({
      id: 'apply-custom-theme',
      label: 'Apply Custom Theme',
      description: 'Apply a custom purple theme',
      category: 'Appearance',
      action: () => {
        // This would normally modify CSS variables
        console.log('[CustomTheme] Custom theme applied');
        context.utils?.showToast?.({
          type: 'info',
          title: 'Custom Theme',
          message: 'Custom theme feature coming soon!',
        });
      },
    });
    
    // Listen for theme changes
    context.registerHook('theme:change', (theme) => {
      console.log('[CustomTheme] Theme changed, current:', theme);
    });
  },
  
  deactivate() {
    console.log('[CustomTheme] Plugin deactivated');
  },
};
