import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';
import {
  getOverview as getMockOverview,
  getSessions as getMockSessions,
  getSessionById as getMockSessionById,
  getAgents as getMockAgents,
  getTasks as getMockTasks,
  getSystemMetrics as getMockSystemMetrics,
  getNotifications as getMockNotifications,
  markNotificationRead,
  clearNotifications,
  getHeatmapData as getMockHeatmapData,
  getHealth as getMockHealth,
  getRealtimeUpdate as getMockRealtimeUpdate,
  getTokenAnalytics as getMockTokenAnalytics,
  getAgentPerformance as getMockAgentPerformance,
  getActivityEvents as getMockActivityEvents,
  getAlerts as getMockAlerts,
} from './openclaw-api.js';

// Real OpenClaw data adapter
import {
  getRealSessions,
  getTokenAnalytics as getRealTokenAnalytics,
  getAgentPerformance as getRealAgentPerformance,
  getActivityEvents as getRealActivityEvents,
  getAlerts as getRealAlerts,
  getRealSystemMetrics,
  getRealTasks,
  getRealHeatmap,
  getRealSkills,
  getRealSubagents,
  getRealHealth,
} from './openclaw-real.js';

// Use real data mode by default (set to false for mock data only)
const USE_REAL_DATA = process.env.USE_REAL_DATA !== 'false';

// Data adapters - prefer real data, fallback to mock
const getDataAdapter = (realFn, mockFn) => {
  if (USE_REAL_DATA) {
    try {
      const realData = realFn();
      if (realData && (Array.isArray(realData) ? realData.length > 0 : Object.keys(realData).length > 0)) {
        return realData;
      }
    } catch (e) {
      console.log('[Data] Falling back to mock:', e.message);
    }
  }
  return mockFn();
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "ws:", "wss:"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS configuration - restrict to local network
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from localhost, local network, and no origin (direct API calls)
    if (!origin || 
        origin.startsWith('http://localhost') || 
        origin.startsWith('http://127.0.0.1') ||
        origin.startsWith('http://192.168.') ||
        origin.startsWith('http://10.') ||
        origin.startsWith('http://172.')) {
      callback(null, true);
    } else {
      callback(null, true); // Log but allow for now - change to false for strict mode
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: '1mb' }));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// API Authentication (optional - enabled via API_KEY env var)
const API_KEY = process.env.OPENCLAW_DASHBOARD_API_KEY;
const authenticateApiKey = (req, res, next) => {
  if (!API_KEY) {
    // No API key set, skip authentication
    return next();
  }
  
  const providedKey = req.headers['x-api-key'] || req.query.apiKey;
  if (providedKey === API_KEY) {
    return next();
  }
  
  // Health check and build info are always public
  if (req.path === '/api/health' || req.path === '/api/version') {
    return next();
  }
  
  res.status(401).json({ error: 'Unauthorized. Provide valid x-api-key header.' });
};

// Apply auth to all API routes
app.use('/api', authenticateApiKey);

// Input validation helpers
const sanitize = (str, maxLength = 100) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>\"'&]/g, '').substring(0, maxLength);
};

const validatePositiveInt = (val, defaultValue) => {
  const num = parseInt(val, 10);
  return (isNaN(num) || num < 1) ? defaultValue : Math.min(num, 1000);
};

// API Routes
app.get('/api/overview', (req, res) => {
  const realSessions = getDataAdapter(getRealSessions, () => []);
  const mockOverview = getMockOverview();
  
  // Enhance overview with real session data if available
  if (realSessions.length > 0) {
    const activeSessions = realSessions.filter(s => s.status === 'active' || s.status === 'idle').length;
    const totalTokens = realSessions.reduce((sum, s) => sum + s.tokens.total, 0);
    const totalCost = realSessions.reduce((sum, s) => sum + s.tokens.cost, 0);
    
    res.json({
      ...mockOverview,
      overview: {
        ...mockOverview.overview,
        activeSessions,
        totalMessages: realSessions.reduce((sum, s) => sum + s.messageCount, 0),
        totalTokens,
        totalCost
      },
      sessions: realSessions.slice(0, 5).map(s => ({
        id: s.id,
        agentName: s.name,
        status: s.status,
        messageCount: s.messageCount,
        model: s.model,
        lastMessage: `Model: ${s.model}`,
        createdAt: s.createdAt,
        updatedAt: s.lastActivity,
        tokens: s.tokens
      }))
    });
  } else {
    res.json(mockOverview);
  }
});

app.get('/api/sessions', (req, res) => {
  const realSessions = getDataAdapter(getRealSessions, () => []);
  
  if (realSessions.length > 0) {
    const page = validatePositiveInt(req.query.page, 1); const limit = validatePositiveInt(req.query.limit, 20); const search = sanitize(req.query.search || '', 100).toLowerCase(); const status = sanitize(req.query.status || '', 20);
    let filtered = realSessions;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        s.model.toLowerCase().includes(searchLower)
      );
    }
    
    if (status) {
      filtered = filtered.filter(s => s.status === status);
    }
    
    const start = (Number(page) - 1) * Number(limit);
    const paginated = filtered.slice(start, start + Number(limit));
    
    // Return both formats for compatibility
    res.json({
      sessions: paginated,
      data: paginated,  // Frontend expects this
      total: filtered.length,
      page: Number(page),
      totalPages: Math.ceil(filtered.length / Number(limit))
    });
  } else {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const mockData = getMockSessions(Number(page), Number(limit), search, status);
    // Ensure both formats
    res.json({
      ...mockData,
      data: mockData.sessions || mockData
    });
  }
});

app.get('/api/sessions/:id', (req, res) => {
  const realSessions = getDataAdapter(getRealSessions, () => []);
  const session = realSessions.find(s => s.id === req.params.id) || getMockSessionById(req.params.id);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json(session);
});

app.get('/api/agents', (req, res) => {
  const mockAgents = (typeof getMockAgents === 'function') ? (getMockAgents() || []) : [];
  const realPerformance = getRealAgentPerformance() || [];
  
  // Create a map of real performance by model name
  const realPerfMap = {};
  for (const perf of realPerformance) {
    realPerfMap[perf.model || perf.id] = perf;
  }
  
  // Merge: use mock display data + real performance stats
  const mergedAgents = mockAgents.map((agent) => {
    const model = agent.model || '';
    const realPerf = realPerfMap[model] || realPerfMap[`openrouter/${model}`] || realPerfMap[`xiaomi/${model}`];
    
    return {
      ...agent,
      status: realPerf?.status || agent.status || 'offline',
      sessionsCompleted: realPerf?.sessions || agent.sessionsCompleted || 0,
      successRate: realPerf?.successRate || agent.successRate || 0,
      avgResponseTime: realPerf?.avgResponseTime || agent.avgResponseTime || 0,
      totalTokens: realPerf?.totalTokens || agent.totalTokens || 0,
      lastActive: realPerf?.lastActive || agent.lastActive,
    };
  });
  
  // If no mock agents, use real performance data directly
  const result = mergedAgents.length > 0 ? mergedAgents : realPerformance;
  res.json(result);
});

// Tasks - REAL DATA from sessions
app.get('/api/tasks', (req, res) => {
  const { status = '' } = req.query;
  const realTasks = getRealTasks();
  if (realTasks.length > 0) {
    let filtered = realTasks;
    if (status) {
      filtered = realTasks.filter(t => t.status === status);
    }
    res.json(filtered);
  } else {
    res.json(getMockTasks(status));
  }
});

// System metrics - REAL DATA
app.get('/api/system', (req, res) => {
  const realMetrics = getRealSystemMetrics();
  res.json(realMetrics || getMockSystemMetrics());
});

app.get('/api/notifications', (req, res) => {
  // Generate notifications from real alerts and activity
  const realAlerts = getRealAlerts();
  const notifications = realAlerts.map(alert => ({
    id: alert.id,
    type: alert.severity === 'critical' ? 'error' : alert.severity === 'warning' ? 'warning' : 'info',
    title: alert.title,
    message: alert.message,
    read: alert.dismissed,
    timestamp: alert.timestamp
  }));
  res.json(notifications);
});

app.post('/api/notifications/:id/read', (req, res) => {
  res.json({ id: req.params.id, read: true });
});

app.post('/api/notifications/clear', (req, res) => {
  res.json({ cleared: true });
});

// Heatmap - REAL DATA from sessions
app.get('/api/heatmap', (req, res) => {
  const realHeatmap = getRealHeatmap();
  res.json(realHeatmap.length > 0 ? realHeatmap : getMockHeatmapData());
});

// Health - REAL DATA
app.get('/api/health', (req, res) => {
  res.json(getRealHealth());
});

// Analytics endpoints - REAL DATA
app.get('/api/analytics/tokens', (req, res) => {
  const realData = getDataAdapter(getRealTokenAnalytics, getMockTokenAnalytics);
  res.json(realData);
});

// Analytics Agents - Merge mock display + real performance
app.get('/api/analytics/agents', (req, res) => {
  const mockAgents = (typeof getMockAgents === 'function') ? (getMockAgents() || []) : [];
  const realPerformance = getRealAgentPerformance() || [];
  
  const realPerfMap = {};
  for (const perf of realPerformance) {
    realPerfMap[perf.model || perf.id] = perf;
  }
  
  const mergedAgents = mockAgents.map((agent) => {
    const model = agent.model || '';
    const realPerf = realPerfMap[model] || realPerfMap[`openrouter/${model}`] || realPerfMap[`xiaomi/${model}`];
    
    return {
      ...agent,
      status: realPerf?.status || agent.status || 'offline',
      sessions: realPerf?.sessions || agent.sessionsCompleted || 0,
      successRate: realPerf?.successRate || agent.successRate || 0,
      avgResponseTime: realPerf?.avgResponseTime || agent.avgResponseTime || 0,
      totalTokens: realPerf?.totalTokens || agent.totalTokens || 0,
      lastActive: realPerf?.lastActive || agent.lastActive,
    };
  });
  
  res.json(mergedAgents.length > 0 ? mergedAgents : realPerformance);
});

// Activity endpoint - REAL DATA
app.get('/api/activity', (req, res) => {
  const realData = getDataAdapter(getRealActivityEvents, getMockActivityEvents);
  res.json(realData);
});

// Alerts endpoint - REAL DATA
app.get('/api/alerts', (req, res) => {
  const realData = getDataAdapter(getRealAlerts, getMockAlerts);
  res.json(realData);
});

// Skills - REAL DATA from filesystem
app.get('/api/skills', (req, res) => {
  const realSkills = getRealSkills();
  res.json({ skills: realSkills, total: realSkills.length });
});

// Sub-agents - REAL DATA from sessions
app.get('/api/subagents', (req, res) => {
  const realSubagents = getRealSubagents();
  res.json({
    subagents: realSubagents,
    total: realSubagents.length
  });
});

// Real sessions endpoint (for debugging)
app.get('/api/real/sessions', (req, res) => {
  res.json(getRealSessions());
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// WebSocket server
const wss = new WebSocketServer({ server, path: '/ws' });

const getRealtimeData = () => {
  const realSessions = getDataAdapter(getRealSessions, () => []);
  const mockUpdate = getMockRealtimeUpdate();
  
  if (realSessions.length > 0) {
    const activeSessions = realSessions.filter(s => s.status === 'active').length;
    const totalTokens = realSessions.reduce((sum, s) => sum + s.tokens.total, 0);
    
    return {
      ...mockUpdate,
      activeSessions,
      totalTokens,
      totalMessages: realSessions.reduce((sum, s) => sum + s.messageCount, 0),
      sessions: realSessions.slice(0, 5),
      timestamp: new Date().toISOString()
    };
  }
  return mockUpdate;
};

wss.on('connection', (ws) => {
  console.log('[WS] Client connected');
  
  // Send initial data
  ws.send(JSON.stringify({
    type: 'init',
    data: getRealtimeData(),
  }));
  
  // Send periodic updates
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({
        type: 'update',
        data: getRealtimeData(),
      }));
    }
  }, 5000);
  
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
});

// Start server
const PORT = process.env.PORT || 3777;

server.listen(PORT, () => {
  console.log(`
  🔮 OpenClaw Dashboard Server
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📡 API:    http://localhost:${PORT}/api
  🌐 Web:    http://localhost:${PORT}
  ⚡ WS:     ws://localhost:${PORT}/ws
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
