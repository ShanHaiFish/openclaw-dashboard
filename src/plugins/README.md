# Plugin Architecture

OpenClaw Dashboard supports a simple but powerful plugin system that allows you to extend its functionality.

## Overview

Plugins can:
- **Register new pages** - Add custom views to the dashboard
- **Register commands** - Add entries to the ⌘K command palette
- **Register hooks** - Listen to and respond to dashboard events
- **Access state** - Read and write to the application store

## Quick Start

### Creating a Plugin

Create a new file in `src/plugins/`:

```javascript
// src/plugins/my-plugin/index.js
export default {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  description: 'A sample plugin',
  author: 'Your Name',
  
  activate(context) {
    // Register a new page
    context.registerPage({
      id: 'my-page',
      path: '/my-page',
      label: 'My Page',
      icon: 'Layout',
      component: MyPageComponent,
    });
    
    // Register a command
    context.registerCommand({
      id: 'my-command',
      label: 'Run My Command',
      shortcut: 'ctrl+shift+m',
      action: () => {
        console.log('Command executed!');
      },
    });
    
    // Register a hook
    context.registerHook('session:start', (session) => {
      console.log('Session started:', session.id);
    });
    
    // Access the store
    const state = context.store.getState();
    console.log('Current theme:', state.theme);
  },
  
  deactivate() {
    // Cleanup when plugin is disabled
  },
};
```

### Plugin Manifest

Each plugin should have a `plugin.json` manifest:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "Your Name",
  "main": "index.js",
  "permissions": ["pages", "commands", "hooks", "store"]
}
```

## Plugin API

### Context Object

The `activate` function receives a context object with the following methods:

#### `context.registerPage(config)`

Register a new page in the dashboard.

```javascript
context.registerPage({
  id: 'analytics',           // Unique page ID
  path: '/analytics',        // URL path
  label: 'Analytics',        // Display label
  icon: 'BarChart3',         // Lucide icon name
  component: AnalyticsPage,  // React component
  parent: null,              // Optional parent page ID
  order: 10,                 // Sort order in navigation
});
```

#### `context.registerCommand(config)`

Register a command in the ⌘K palette.

```javascript
context.registerCommand({
  id: 'toggle-logging',
  label: 'Toggle Debug Logging',
  description: 'Enable/disable debug logging',
  category: 'Debug',
  shortcut: 'ctrl+shift+d',
  action: () => {
    // Command action
  },
});
```

#### `context.registerHook(event, callback)`

Listen to dashboard events.

```javascript
context.registerHook('session:start', (session) => {
  // Handle session start
});

context.registerHook('session:end', (session) => {
  // Handle session end
});

context.registerHook('theme:change', (theme) => {
  // Handle theme change
});

context.registerHook('page:navigate', (page) => {
  // Handle page navigation
});
```

#### `context.store`

Access the Zustand store.

```javascript
// Read state
const theme = context.store.getState().theme;

// Subscribe to changes
context.store.subscribe((state) => {
  console.log('State changed:', state);
});
```

#### `context.api`

Make API calls.

```javascript
// Fetch data
const sessions = await context.api.get('/sessions');
const tasks = await context.api.get('/tasks');

// Post data
await context.api.post('/notifications/clear');
```

#### `context.utils`

Utility functions.

```javascript
// Show a toast notification
context.utils.showToast({
  type: 'success',
  title: 'Done!',
  message: 'Task completed successfully',
});

// Navigate programmatically
context.utils.navigate('/sessions');

// Get translation
const text = context.utils.t('common.loading');
```

## Available Events

| Event            | Payload      | Description              |
|------------------|--------------|--------------------------|
| `session:start`  | Session      | A session starts         |
| `session:end`    | Session      | A session ends           |
| `task:create`    | Task         | A task is created        |
| `task:update`    | Task         | A task is updated        |
| `task:complete`  | Task         | A task is completed      |
| `theme:change`   | string       | Theme is changed         |
| `page:navigate`  | string       | Page navigation occurs   |
| `notification`   | Notification | New notification arrives |
| `agent:status`   | Agent        | Agent status changes     |

## Example Plugins

See `src/plugins/examples/` for working example plugins:

- **Activity Logger** - Logs all dashboard events
- **Custom Theme** - Adds a custom theme option
- **Stats Widget** - Adds a stats widget to the overview

## Plugin Lifecycle

```
1. Plugin is registered
2. activate(context) is called
3. Plugin registers pages, commands, hooks
4. Plugin is active and responding to events
5. deactivate() is called (on disable/uninstall)
6. Plugin cleans up resources
```

## Best Practices

1. **Keep plugins focused** - Each plugin should do one thing well
2. **Handle cleanup** - Always implement `deactivate()` to clean up
3. **Use unique IDs** - Prefix plugin IDs to avoid conflicts
4. **Document your plugin** - Include a README with usage instructions
5. **Handle errors gracefully** - Don't let plugin errors crash the dashboard

## Security Considerations

- Plugins run in the browser with full access to the application
- Only install plugins from trusted sources
- Review plugin code before installation
- Plugins can access all application state and API endpoints
