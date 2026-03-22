# OpenClaw Dashboard API Documentation

## Overview

The OpenClaw Dashboard API provides RESTful endpoints for monitoring AI agents, sessions, tasks, and system metrics. All responses are in JSON format.

**Base URL:** `http://localhost:3777/api`

---

## Authentication

> **Note:** Authentication is planned for a future release. Currently, all endpoints are open.

Future authentication will use Bearer tokens:

```
Authorization: Bearer <your-api-token>
```

---

## Endpoints

### Health Check

#### `GET /api/health`

Returns the health status of the dashboard and its services.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-21T10:30:00.000Z",
  "version": "2.1.0",
  "uptime": 2592000,
  "services": {
    "api": "up",
    "websocket": "up",
    "database": "up",
    "cache": "up"
  }
}
```

---

### Overview

#### `GET /api/overview`

Returns dashboard overview statistics and recent activity.

**Response:**
```json
{
  "stats": {
    "activeSessions": 5,
    "runningTasks": 3,
    "totalAgents": 6,
    "onlineAgents": 4,
    "totalMessages": 1234,
    "totalTokens": 567890
  },
  "recentActivity": [
    {
      "id": "session-1",
      "name": "Debugging payment API",
      "status": "active",
      "model": "gpt-4-turbo",
      "messages": 45,
      "lastActivity": "2024-03-21T10:25:00.000Z"
    }
  ],
  "activityChart": [
    {
      "time": "10:00",
      "messages": 150,
      "sessions": 8,
      "tokens": 5000
    }
  ],
  "taskProgress": {
    "todo": 5,
    "inProgress": 3,
    "review": 2,
    "done": 12
  }
}
```

---

### Sessions

#### `GET /api/sessions`

Returns a paginated list of sessions.

**Query Parameters:**

| Parameter | Type    | Default | Description           |
|-----------|---------|---------|-----------------------|
| page      | number  | 1       | Page number           |
| limit     | number  | 10      | Items per page        |
| search    | string  | ''      | Search by name/model  |
| status    | string  | ''      | Filter by status      |

**Status values:** `active`, `idle`, `error`, `completed`

**Example Request:**
```
GET /api/sessions?page=1&limit=10&status=active
```

**Response:**
```json
{
  "data": [
    {
      "id": "session-1",
      "name": "Debugging payment API integration",
      "status": "active",
      "model": "gpt-4-turbo",
      "messages": 45,
      "tokensUsed": 12500,
      "createdAt": "2024-03-21T09:00:00.000Z",
      "lastActivity": "2024-03-21T10:25:00.000Z",
      "duration": 5100,
      "agentId": "agent-1",
      "tags": ["development", "debugging"],
      "priority": "high"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 18,
    "totalPages": 2
  }
}
```

---

#### `GET /api/sessions/:id`

Returns detailed information about a specific session including message history.

**URL Parameters:**

| Parameter | Type   | Description  |
|-----------|--------|--------------|
| id        | string | Session ID   |

**Response:**
```json
{
  "id": "session-1",
  "name": "Debugging payment API integration",
  "status": "active",
  "model": "gpt-4-turbo",
  "messages": 45,
  "tokensUsed": 12500,
  "createdAt": "2024-03-21T09:00:00.000Z",
  "lastActivity": "2024-03-21T10:25:00.000Z",
  "duration": 5100,
  "agentId": "agent-1",
  "tags": ["development", "debugging"],
  "priority": "high",
  "history": [
    {
      "id": "msg-1",
      "role": "user",
      "content": "Help me debug the payment webhook",
      "timestamp": "2024-03-21T09:00:00.000Z"
    },
    {
      "id": "msg-2",
      "role": "assistant",
      "content": "I'll help you debug the payment webhook...",
      "timestamp": "2024-03-21T09:01:00.000Z"
    }
  ]
}
```

**Error Response:**
```json
{
  "error": "Session not found"
}
```

---

### Agents

#### `GET /api/agents`

Returns all registered agents.

**Response:**
```json
[
  {
    "id": "agent-1",
    "name": "CodeMaster",
    "description": "Expert code reviewer and debugger",
    "status": "online",
    "capabilities": ["code-review", "debugging", "refactoring", "testing"],
    "sessionsCompleted": 234,
    "successRate": 98.5,
    "avgResponseTime": 2.3,
    "avatar": "🤖",
    "color": "#8b5cf6",
    "model": "gpt-4-turbo",
    "lastActive": "2024-03-21T10:25:00.000Z",
    "languages": ["JavaScript", "TypeScript", "Python", "Go", "Rust"]
  }
]
```

---

### Tasks

#### `GET /api/tasks`

Returns tasks, optionally filtered by status.

**Query Parameters:**

| Parameter | Type   | Default | Description      |
|-----------|--------|---------|------------------|
| status    | string | ''      | Filter by status |

**Status values:** `todo`, `in-progress`, `review`, `done`

**Response:**
```json
[
  {
    "id": "task-1",
    "title": "Implement OAuth2 authentication flow",
    "description": "Detailed implementation plan...",
    "status": "in-progress",
    "priority": "high",
    "assignee": "CodeMaster",
    "createdAt": "2024-03-15T10:00:00.000Z",
    "updatedAt": "2024-03-21T10:00:00.000Z",
    "dueDate": "2024-03-23T00:00:00.000Z",
    "tags": ["backend", "security"],
    "progress": 65,
    "dependencies": ["task-3"],
    "estimatedHours": 8,
    "actualHours": null
  }
]
```

---

### System Metrics

#### `GET /api/system`

Returns current system resource metrics.

**Response:**
```json
{
  "cpu": 45,
  "memory": 68,
  "disk": 35,
  "network": {
    "in": 75,
    "out": 42
  },
  "uptime": 2592000,
  "requests": {
    "total": 75000,
    "success": 98.7,
    "errors": 1.3
  },
  "processes": {
    "total": 150,
    "running": 45,
    "sleeping": 105
  }
}
```

---

### Notifications

#### `GET /api/notifications`

Returns all notifications.

**Response:**
```json
[
  {
    "id": "notif-1",
    "type": "success",
    "title": "Deployment successful",
    "message": "Production deployment v2.1.0 completed",
    "timestamp": "2024-03-21T10:25:00.000Z",
    "read": false
  }
]
```

**Notification types:** `success`, `warning`, `error`, `info`

---

#### `POST /api/notifications/:id/read`

Marks a notification as read.

**Response:**
```json
{
  "id": "notif-1",
  "type": "success",
  "title": "Deployment successful",
  "read": true
}
```

---

#### `POST /api/notifications/clear`

Clears all notifications.

**Response:**
```json
[]
```

---

### Heatmap Data

#### `GET /api/heatmap`

Returns activity heatmap data for the past 90 days.

**Response:**
```json
[
  {
    "date": "2024-01-01",
    "value": 7,
    "sessions": 15,
    "messages": 350
  }
]
```

---

## WebSocket Protocol

### Connection

Connect to: `ws://localhost:3777/ws`

### Messages

#### Initial Connection

Server sends an `init` message with current state:

```json
{
  "type": "init",
  "data": {
    "timestamp": "2024-03-21T10:30:00.000Z",
    "activeSessions": 5,
    "messagesLastMinute": 12,
    "tokensLastMinute": 3500,
    "systemLoad": 0.45,
    "newNotifications": 0
  }
}
```

#### Periodic Updates

Server sends `update` messages every 3 seconds:

```json
{
  "type": "update",
  "data": {
    "timestamp": "2024-03-21T10:30:03.000Z",
    "activeSessions": 5,
    "messagesLastMinute": 15,
    "tokensLastMinute": 4200,
    "systemLoad": 0.48,
    "newNotifications": 1
  }
}
```

### Client Example

```javascript
const ws = new WebSocket('ws://localhost:3777/ws');

ws.onopen = () => {
  console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'init':
      console.log('Initial state:', message.data);
      break;
    case 'update':
      console.log('Update:', message.data);
      break;
  }
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

---

## Error Handling

All errors return a consistent format:

```json
{
  "error": "Error message description"
}
```

**HTTP Status Codes:**

| Code | Description            |
|------|------------------------|
| 200  | Success                |
| 404  | Resource not found     |
| 500  | Internal server error  |

---

## Rate Limiting

> **Note:** Rate limiting is planned for a future release.

Future rate limits will be:
- 1000 requests per hour per IP
- 100 requests per minute for WebSocket connections

---

## Changelog

### v2.1.0
- Added task dependencies
- Added heatmap data endpoint
- Enhanced agent capabilities
- Added process metrics to system endpoint

### v2.0.0
- Initial release
- REST API for sessions, agents, tasks
- WebSocket for real-time updates
- System metrics endpoint
