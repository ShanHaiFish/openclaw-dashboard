// OpenClaw API wrapper with rich mock data
import { format, subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

// Helper to generate random timestamps spread over days
const randomTime = (daysBack = 7) => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return subSeconds(subMinutes(subHours(subDays(now, Math.floor(Math.random() * daysBack)), hours), minutes), seconds).toISOString();
};

// Session statuses
const SESSION_STATUSES = ['active', 'idle', 'error', 'completed'];
const MODELS = ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet', 'gemini-pro', 'llama-3-70b', 'mistral-large'];

// Rich mock sessions with realistic names
const generateSessions = () => {
  const sessions = [];
  const topics = [
    'Debugging payment API integration',
    'Writing unit tests for auth module',
    'Code review: User dashboard refactor',
    'Optimizing PostgreSQL query performance',
    'API documentation for v2 endpoints',
    'Setting up GitHub Actions CI/CD',
    'Security audit: OWASP top 10 check',
    'Benchmarking LLM response latency',
    'Refactoring WebSocket event handlers',
    'Design system: Button component variants',
    'Mobile responsive layout fixes',
    'Jest coverage for utils/helpers',
    'Integrating Stripe webhook handlers',
    'Redis cache invalidation strategy',
    'Error boundary implementation review',
    'Kubernetes deployment manifests',
    'GraphQL schema optimization',
    'E2E testing with Playwright',
  ];

  for (let i = 0; i < 18; i++) {
    const status = i < 5 ? 'active' : SESSION_STATUSES[Math.floor(Math.random() * SESSION_STATUSES.length)];
    const messageCount = Math.floor(Math.random() * 150) + 5;
    const model = MODELS[Math.floor(Math.random() * MODELS.length)];
    const daysBack = Math.floor(Math.random() * 7);
    
    sessions.push({
      id: `session-${i + 1}`,
      name: topics[i] || `Session ${i + 1}`,
      status,
      model,
      messages: messageCount,
      tokensUsed: Math.floor(Math.random() * 50000) + 1000,
      createdAt: randomTime(daysBack + 1),
      lastActivity: randomTime(daysBack),
      duration: Math.floor(Math.random() * 3600) + 60,
      agentId: `agent-${(i % 6) + 1}`,
      tags: ['development', 'debugging', 'review', 'documentation', 'testing', 'devops'].slice(0, Math.floor(Math.random() * 3) + 1),
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    });
  }
  
  return sessions.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
};

// Mock agents with realistic capabilities
const AGENTS = [
  {
    id: 'agent-1',
    name: 'CodeMaster',
    description: 'Expert code reviewer and debugger with deep knowledge of multiple languages and frameworks',
    status: 'online',
    capabilities: ['code-review', 'debugging', 'refactoring', 'testing', 'architecture'],
    sessionsCompleted: 234,
    successRate: 98.5,
    avgResponseTime: 2.3,
    avatar: '🤖',
    color: '#8b5cf6',
    model: 'gpt-4-turbo',
    lastActive: subMinutes(now, 5).toISOString(),
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'],
  },
  {
    id: 'agent-2',
    name: 'DataAnalyst',
    description: 'Specialized in data processing, visualization, and statistical analysis with ML capabilities',
    status: 'online',
    capabilities: ['data-analysis', 'visualization', 'statistics', 'reporting', 'ml-pipeline'],
    sessionsCompleted: 189,
    successRate: 96.2,
    avgResponseTime: 4.1,
    avatar: '📊',
    color: '#06b6d4',
    model: 'claude-3-opus',
    lastActive: subMinutes(now, 12).toISOString(),
    languages: ['Python', 'R', 'SQL', 'Julia'],
  },
  {
    id: 'agent-3',
    name: 'DocWriter',
    description: 'Creates comprehensive documentation, technical writing, and API references',
    status: 'idle',
    capabilities: ['documentation', 'writing', 'editing', 'translation', 'api-docs'],
    sessionsCompleted: 156,
    successRate: 99.1,
    avgResponseTime: 3.5,
    avatar: '📝',
    color: '#10b981',
    model: 'gpt-4',
    lastActive: subHours(now, 2).toISOString(),
    languages: ['Markdown', 'AsciiDoc', 'LaTeX'],
  },
  {
    id: 'agent-4',
    name: 'SecurityGuard',
    description: 'Security auditing, vulnerability assessment, penetration testing, and compliance checking',
    status: 'online',
    capabilities: ['security-audit', 'penetration-testing', 'compliance', 'encryption', 'threat-modeling'],
    sessionsCompleted: 98,
    successRate: 97.8,
    avgResponseTime: 5.2,
    avatar: '🛡️',
    color: '#f59e0b',
    model: 'claude-3-sonnet',
    lastActive: subMinutes(now, 3).toISOString(),
    languages: ['Python', 'Bash', 'YAML'],
  },
  {
    id: 'agent-5',
    name: 'DevOpsBot',
    description: 'Infrastructure automation, CI/CD pipelines, container orchestration, and deployment management',
    status: 'online',
    capabilities: ['deployment', 'monitoring', 'automation', 'scaling', 'kubernetes'],
    sessionsCompleted: 312,
    successRate: 95.4,
    avgResponseTime: 1.8,
    avatar: '🚀',
    color: '#ec4899',
    model: 'gpt-4-turbo',
    lastActive: subMinutes(now, 1).toISOString(),
    languages: ['YAML', 'HCL', 'Bash', 'Dockerfile'],
  },
  {
    id: 'agent-6',
    name: 'UXDesigner',
    description: 'User experience design, prototyping, accessibility auditing, and usability testing',
    status: 'offline',
    capabilities: ['design', 'prototyping', 'user-research', 'accessibility', 'css-wizardry'],
    sessionsCompleted: 87,
    successRate: 94.6,
    avgResponseTime: 6.3,
    avatar: '🎨',
    color: '#8b5cf6',
    model: 'gemini-pro',
    lastActive: subHours(now, 8).toISOString(),
    languages: ['CSS', 'Figma', 'HTML'],
  },
];

// Mock tasks with dependencies
const generateTasks = () => {
  const taskStatuses = ['todo', 'in-progress', 'review', 'done'];
  const taskTitles = [
    'Implement OAuth2 authentication flow',
    'Fix memory leak in WebSocket handler',
    'Add dark mode support to settings',
    'Write unit tests for API endpoints',
    'Optimize image loading pipeline',
    'Setup Sentry error monitoring',
    'Create user onboarding flow',
    'Database migration to PostgreSQL',
    'API rate limiting middleware',
    'Mobile navigation hamburger menu',
    'Full-text search functionality',
    'Email notification templates',
    'User profile edit page',
    'Stripe payment integration',
    'Application performance monitoring',
    'WCAG accessibility audit',
    'i18n for remaining pages',
    'Redis caching layer',
    'Webhook retry handlers',
    'Analytics dashboard widgets',
    'Automated backup system',
    'Load testing with k6',
  ];

  const tasks = [];
  for (let i = 0; i < 22; i++) {
    const status = taskStatuses[Math.floor(Math.random() * taskStatuses.length)];
    const priority = ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)];
    
    // Add dependencies for some tasks
    const dependencies = [];
    if (i > 3 && Math.random() > 0.6) {
      dependencies.push(`task-${Math.floor(Math.random() * i) + 1}`);
    }
    
    tasks.push({
      id: `task-${i + 1}`,
      title: taskTitles[i],
      description: `Detailed implementation plan for: ${taskTitles[i]}. This task involves careful planning and execution.`,
      status,
      priority,
      assignee: AGENTS[Math.floor(Math.random() * AGENTS.length)].name,
      createdAt: randomTime(14),
      updatedAt: randomTime(2),
      dueDate: subDays(now, Math.floor(Math.random() * 7) - 3).toISOString(),
      tags: ['frontend', 'backend', 'devops', 'security', 'testing'].slice(0, Math.floor(Math.random() * 2) + 1),
      progress: status === 'done' ? 100 : status === 'review' ? 90 : Math.floor(Math.random() * 70) + 10,
      dependencies,
      estimatedHours: Math.floor(Math.random() * 16) + 2,
      actualHours: status === 'done' ? Math.floor(Math.random() * 20) + 2 : null,
    });
  }
  
  return tasks;
};

// Activity data for charts (24 hours)
const generateActivityData = () => {
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const hour = (now.getHours() - i + 24) % 24;
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      messages: Math.floor(Math.random() * 200) + 50,
      sessions: Math.floor(Math.random() * 15) + 3,
      tokens: Math.floor(Math.random() * 10000) + 2000,
    });
  }
  return data;
};

// Heatmap data for past 90 days
const generateHeatmapData = () => {
  const data = [];
  for (let i = 89; i >= 0; i--) {
    const date = subDays(now, i);
    // More activity on weekdays
    const dayOfWeek = date.getDay();
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
    const baseActivity = isWeekday ? 5 : 2;
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      value: Math.floor(Math.random() * 8) + baseActivity,
      sessions: Math.floor(Math.random() * 20) + (isWeekday ? 10 : 3),
      messages: Math.floor(Math.random() * 500) + (isWeekday ? 200 : 50),
    });
  }
  return data;
};

// Notifications
const generateNotifications = () => [
  {
    id: 'notif-1',
    type: 'success',
    title: 'Deployment successful',
    message: 'Production deployment v2.1.0 completed successfully',
    timestamp: subMinutes(now, 5).toISOString(),
    read: false,
  },
  {
    id: 'notif-2',
    type: 'warning',
    title: 'High memory usage detected',
    message: 'System memory usage exceeded 85% - consider scaling',
    timestamp: subMinutes(now, 23).toISOString(),
    read: false,
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'Agent update available',
    message: 'CodeMaster agent has new capabilities: pair-programming',
    timestamp: subHours(now, 1).toISOString(),
    read: true,
  },
  {
    id: 'notif-4',
    type: 'error',
    title: 'Session timeout',
    message: 'Session session-123 timed out after 30 minutes of inactivity',
    timestamp: subHours(now, 2).toISOString(),
    read: true,
  },
  {
    id: 'notif-5',
    type: 'info',
    title: 'Weekly report ready',
    message: 'Your weekly activity report is ready for review',
    timestamp: subHours(now, 5).toISOString(),
    read: true,
  },
  {
    id: 'notif-6',
    type: 'success',
    title: 'Task completed',
    message: 'OAuth2 authentication flow implementation finished',
    timestamp: subHours(now, 8).toISOString(),
    read: true,
  },
  {
    id: 'notif-7',
    type: 'warning',
    title: 'API rate limit warning',
    message: 'Approaching rate limit: 850/1000 requests in the last hour',
    timestamp: subHours(now, 12).toISOString(),
    read: true,
  },
];

// System metrics
const generateSystemMetrics = () => ({
  cpu: Math.floor(Math.random() * 40) + 20,
  memory: Math.floor(Math.random() * 30) + 50,
  disk: Math.floor(Math.random() * 20) + 30,
  network: {
    in: Math.floor(Math.random() * 100) + 50,
    out: Math.floor(Math.random() * 80) + 30,
  },
  uptime: Math.floor(Math.random() * 30 * 24 * 60 * 60) + 86400, // seconds
  requests: {
    total: Math.floor(Math.random() * 100000) + 50000,
    success: 98.5 + Math.random() * 1.4,
    errors: 0.1 + Math.random() * 1.4,
  },
  processes: {
    total: Math.floor(Math.random() * 50) + 100,
    running: Math.floor(Math.random() * 20) + 30,
    sleeping: Math.floor(Math.random() * 30) + 50,
  },
});

// Store data
let sessions = generateSessions();
let tasks = generateTasks();
let notifications = generateNotifications();

// API functions
export const getOverview = () => ({
  stats: {
    activeSessions: sessions.filter(s => s.status === 'active').length,
    runningTasks: tasks.filter(t => t.status === 'in-progress').length,
    totalAgents: AGENTS.length,
    onlineAgents: AGENTS.filter(a => a.status === 'online').length,
    totalMessages: sessions.reduce((sum, s) => sum + s.messages, 0),
    totalTokens: sessions.reduce((sum, s) => sum + s.tokensUsed, 0),
  },
  recentActivity: sessions.slice(0, 5),
  activityChart: generateActivityData(),
  taskProgress: {
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
  },
});

export const getSessions = (page = 1, limit = 10, search = '', status = '') => {
  let filtered = [...sessions];
  
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
  
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  
  return {
    data: paginated,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
};

export const getSessionById = (id) => {
  const session = sessions.find(s => s.id === id);
  if (!session) return null;
  
  return {
    ...session,
    history: Array.from({ length: Math.min(session.messages, 20) }, (_, i) => ({
      id: `msg-${i}`,
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `Message ${i + 1} content for ${session.name}`,
      timestamp: subMinutes(new Date(session.lastActivity), i * 2).toISOString(),
    })),
  };
};

export const getAgents = () => AGENTS;

export const getTasks = (status = '') => {
  let filtered = [...tasks];
  if (status) {
    filtered = filtered.filter(t => t.status === status);
  }
  return filtered;
};

export const getSystemMetrics = () => generateSystemMetrics();

export const getNotifications = () => notifications;

export const markNotificationRead = (id) => {
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.read = true;
  }
  return notif;
};

export const clearNotifications = () => {
  notifications = [];
  return [];
};

export const getHeatmapData = () => generateHeatmapData();

export const getHealth = () => ({
  status: 'healthy',
  timestamp: new Date().toISOString(),
  version: '2.1.0',
  uptime: Math.floor(Math.random() * 30 * 24 * 60 * 60) + 86400,
  services: {
    api: 'up',
    websocket: 'up',
    database: 'up',
    cache: 'up',
  },
});

// Generate real-time update
export const getRealtimeUpdate = () => ({
  timestamp: new Date().toISOString(),
  activeSessions: sessions.filter(s => s.status === 'active').length,
  messagesLastMinute: Math.floor(Math.random() * 20) + 5,
  tokensLastMinute: Math.floor(Math.random() * 5000) + 1000,
  systemLoad: Math.random() * 0.5 + 0.2,
  newNotifications: Math.floor(Math.random() * 3),
});

// Token analytics data
export const getTokenAnalytics = () => {
  const totalInput = Math.floor(Math.random() * 500000) + 100000;
  const totalOutput = Math.floor(Math.random() * 300000) + 50000;
  const totalCost = (totalInput * 0.003 + totalOutput * 0.012) / 1000;
  
  // Model distribution
  const modelDistribution = MODELS.slice(0, 5).map(model => ({
    name: model,
    value: Math.floor(Math.random() * 100000) + 10000,
    cost: Math.floor(Math.random() * 5) + 1,
  }));
  
  // 7-day trend
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(now, i);
    trend.push({
      date: format(date, 'MM/dd'),
      input: Math.floor(Math.random() * 80000) + 20000,
      output: Math.floor(Math.random() * 50000) + 10000,
      model: MODELS[Math.floor(Math.random() * MODELS.length)],
    });
  }
  
  return {
    totalInput,
    totalOutput,
    totalCost,
    burnRate: Math.floor(Math.random() * 5000) + 1000,
    budget: {
      used: totalCost,
      limit: 100,
    },
    modelDistribution,
    trend,
  };
};

// Agent performance data
export const getAgentPerformance = () => {
  return AGENTS.map(agent => ({
    ...agent,
    performanceMetrics: {
      tasksCompleted: agent.sessionsCompleted,
      successRate: agent.successRate,
      avgResponseTime: agent.avgResponseTime,
      uptime: Math.floor(Math.random() * 100) + 90,
      qualityScore: Math.floor(Math.random() * 10) + 90,
    },
  }));
};

// Activity events
export const getActivityEvents = () => {
  const eventTypes = ['session_start', 'task_complete', 'error', 'token_milestone', 'warning'];
  const eventTitles = {
    session_start: [
      'New session started',
      'Agent session initiated',
      'Chat session opened',
      'Debug session created',
    ],
    task_complete: [
      'Task completed successfully',
      'Code review finished',
      'Deployment completed',
      'Test suite passed',
    ],
    error: [
      'API request failed',
      'Connection timeout',
      'Authentication error',
      'Rate limit exceeded',
    ],
    token_milestone: [
      '10K tokens milestone reached',
      '50K tokens milestone reached',
      '100K tokens milestone reached',
      'Daily token limit 50% reached',
    ],
    warning: [
      'High memory usage detected',
      'Slow response time warning',
      'Approaching rate limit',
      'Disk space running low',
    ],
  };
  
  const events = [];
  for (let i = 0; i < 25; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const titles = eventTitles[type];
    const hoursBack = Math.floor(Math.random() * 24);
    const minutesBack = Math.floor(Math.random() * 60);
    
    const timestamp = new Date(now);
    timestamp.setHours(timestamp.getHours() - hoursBack);
    timestamp.setMinutes(timestamp.getMinutes() - minutesBack);
    
    events.push({
      id: `event-${i + 1}`,
      type,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: `Event occurred in session session-${Math.floor(Math.random() * 10) + 1}`,
      timestamp: timestamp.toISOString(),
      agent: AGENTS[Math.floor(Math.random() * AGENTS.length)].name,
      session: `session-${Math.floor(Math.random() * 10) + 1}`,
      details: type === 'error' ? 'Error code: ' + Math.floor(Math.random() * 500) + 100 : null,
    });
  }
  
  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Alerts
export const getAlerts = () => {
  const alertTypes = ['budget_exceeded', 'task_failed', 'agent_unresponsive'];
  const severities = ['critical', 'warning', 'info'];
  
  const alertData = [
    {
      type: 'budget_exceeded',
      severity: 'critical',
      title: 'Budget Limit Exceeded',
      message: 'Daily token budget has exceeded 90% of the limit',
      details: 'Current usage: $89.50 / $100.00',
      source: 'Budget Monitor',
    },
    {
      type: 'task_failed',
      severity: 'critical',
      title: 'Task Execution Failed',
      message: 'Critical deployment task failed after 3 retries',
      details: 'Error: Connection refused on port 3000',
      source: 'Task Runner',
      agent: 'DevOpsBot',
    },
    {
      type: 'agent_unresponsive',
      severity: 'warning',
      title: 'Agent Unresponsive',
      message: 'CodeMaster agent has not responded for 5 minutes',
      details: 'Last response: 5 minutes ago',
      source: 'Health Monitor',
      agent: 'CodeMaster',
    },
    {
      type: 'budget_exceeded',
      severity: 'warning',
      title: 'Budget Warning',
      message: 'Approaching daily budget limit - 75% consumed',
      details: 'Current usage: $75.20 / $100.00',
      source: 'Budget Monitor',
    },
    {
      type: 'task_failed',
      severity: 'warning',
      title: 'Test Suite Failures',
      message: '3 test cases failed in the authentication module',
      details: 'Failed tests: login, logout, session-refresh',
      source: 'CI/CD Pipeline',
      agent: 'CodeMaster',
    },
    {
      type: 'agent_unresponsive',
      severity: 'info',
      title: 'Agent Status Update',
      message: 'UXDesigner agent is back online after maintenance',
      details: 'Maintenance completed successfully',
      source: 'Agent Manager',
      agent: 'UXDesigner',
    },
    {
      type: 'budget_exceeded',
      severity: 'info',
      title: 'Budget Reset',
      message: 'Daily budget has been reset for the new period',
      details: 'New limit: $100.00',
      source: 'Budget Monitor',
    },
    {
      type: 'task_failed',
      severity: 'info',
      title: 'Task Retry Successful',
      message: 'Previously failed task completed on retry',
      details: 'Task: API documentation generation',
      source: 'Task Runner',
      agent: 'DocWriter',
    },
  ];
  
  return alertData.map((alert, index) => ({
    id: `alert-${index + 1}`,
    ...alert,
    timestamp: subHours(now, Math.floor(Math.random() * 12)).toISOString(),
    dismissed: index > 5,
    snoozedUntil: null,
  }));
};
