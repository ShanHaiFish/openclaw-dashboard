/**
 * Plugin Manager for OpenClaw Dashboard
 * 
 * Handles plugin registration, lifecycle, and event system.
 */

class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.commands = new Map();
    this.pages = new Map();
    this.hooks = new Map();
    this.store = null;
    this.api = null;
    this.utils = null;
  }

  /**
   * Initialize the plugin manager with app context
   */
  initialize({ store, api, utils }) {
    this.store = store;
    this.api = api;
    this.utils = utils;
  }

  /**
   * Register a plugin
   */
  register(plugin) {
    if (this.plugins.has(plugin.id)) {
      console.warn(`Plugin "${plugin.id}" is already registered`);
      return false;
    }

    const context = this.createContext(plugin.id);
    
    try {
      plugin.activate(context);
      this.plugins.set(plugin.id, {
        ...plugin,
        _registered: Date.now(),
        _context: context,
      });
      console.log(`Plugin "${plugin.name}" registered successfully`);
      return true;
    } catch (error) {
      console.error(`Failed to register plugin "${plugin.id}":`, error);
      return false;
    }
  }

  /**
   * Unregister a plugin
   */
  unregister(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      console.warn(`Plugin "${pluginId}" is not registered`);
      return false;
    }

    try {
      if (plugin.deactivate) {
        plugin.deactivate();
      }
      
      // Clean up registered items
      for (const [key, value] of this.commands) {
        if (value.pluginId === pluginId) {
          this.commands.delete(key);
        }
      }
      for (const [key, value] of this.pages) {
        if (value.pluginId === pluginId) {
          this.pages.delete(key);
        }
      }
      for (const [event, handlers] of this.hooks) {
        this.hooks.set(event, handlers.filter(h => h.pluginId !== pluginId));
      }
      
      this.plugins.delete(pluginId);
      console.log(`Plugin "${pluginId}" unregistered`);
      return true;
    } catch (error) {
      console.error(`Failed to unregister plugin "${pluginId}":`, error);
      return false;
    }
  }

  /**
   * Create context object for a plugin
   */
  createContext(pluginId) {
    return {
      registerPage: (config) => {
        this.pages.set(config.id, { ...config, pluginId });
      },
      
      registerCommand: (config) => {
        this.commands.set(config.id, { ...config, pluginId });
      },
      
      registerHook: (event, callback) => {
        if (!this.hooks.has(event)) {
          this.hooks.set(event, []);
        }
        this.hooks.get(event).push({ callback, pluginId });
      },
      
      store: this.store,
      api: this.api,
      utils: this.utils,
    };
  }

  /**
   * Emit an event to all registered hooks
   */
  emit(event, payload) {
    const handlers = this.hooks.get(event) || [];
    for (const { callback } of handlers) {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error in hook "${event}":`, error);
      }
    }
  }

  /**
   * Get all registered commands
   */
  getCommands() {
    return Array.from(this.commands.values());
  }

  /**
   * Get all registered pages
   */
  getPages() {
    return Array.from(this.pages.values());
  }

  /**
   * Get all registered plugins
   */
  getPlugins() {
    return Array.from(this.plugins.values()).map(p => ({
      id: p.id,
      name: p.name,
      version: p.version,
      description: p.description,
      registered: p._registered,
    }));
  }

  /**
   * Execute a command by ID
   */
  executeCommand(commandId) {
    const command = this.commands.get(commandId);
    if (command && command.action) {
      command.action();
      return true;
    }
    return false;
  }

  /**
   * Check if a plugin is registered
   */
  hasPlugin(pluginId) {
    return this.plugins.has(pluginId);
  }
}

// Singleton instance
const pluginManager = new PluginManager();

export default pluginManager;
export { PluginManager };
