# Stage 1: Build frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/

# Install dependencies
RUN npm ci
RUN cd server && npm ci

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/

# Install production dependencies only
RUN npm ci --omit=dev && \
    cd server && npm ci --omit=dev

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy server code
COPY server/ ./server/

# Set ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3777

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3777/api/health || exit 1

# Environment variables
ENV NODE_ENV=production
ENV PORT=3777

# Start server
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/index.js"]
