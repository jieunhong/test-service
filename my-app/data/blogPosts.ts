import { BlogPostType } from '@/types/blog';

export const blogPosts: BlogPostType[] = [
  {
    id: '1',
    title: 'Building Scalable RESTful APIs with Node.js and Express',
    excerpt: 'Learn best practices for designing and implementing production-ready REST APIs that can handle millions of requests.',
    category: 'API Development',
    tags: ['Node.js', 'Express', 'REST', 'Scalability'],
    date: 'Jan 28, 2026',
    readTime: '8 min read',
    content: `
Building scalable RESTful APIs is crucial for modern backend development. In this guide, we'll explore best practices and patterns that will help you create robust, maintainable APIs.

## Why Scalability Matters

As your application grows, your API needs to handle increasing traffic without degrading performance. Poor architecture decisions early on can lead to technical debt and costly rewrites.

### Key Principles

- **Stateless Design**: Each request should contain all necessary information
- **Resource-Based URLs**: Use nouns, not verbs in your endpoints
- **Proper HTTP Methods**: GET, POST, PUT, DELETE used correctly
- **Versioning**: Plan for API evolution from day one

## Express.js Best Practices

Here's a basic structure for a scalable Express application:

\`\`\`javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
\`\`\`

### Rate Limiting

Implement rate limiting to prevent abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

## Database Optimization

- Use connection pooling
- Implement proper indexing
- Cache frequently accessed data
- Use pagination for large datasets

## Monitoring and Logging

Always implement comprehensive logging and monitoring. Tools like **Winston** for logging and **Prometheus** for metrics are industry standards.

**Remember**: Scalability isn't just about handling more requests—it's about maintaining performance, reliability, and developer productivity as your system grows.
`
  },
  {
    id: '2',
    title: 'Database Indexing Strategies for High Performance',
    excerpt: 'Deep dive into database indexing techniques that can dramatically improve query performance in production systems.',
    category: 'Database Engineering',
    tags: ['PostgreSQL', 'MySQL', 'Performance', 'Optimization'],
    date: 'Jan 25, 2026',
    readTime: '10 min read',
    content: `
Database indexing is one of the most powerful tools for optimizing query performance. However, improper indexing can actually harm performance.

## Understanding Indexes

An index is a data structure that improves the speed of data retrieval operations. Think of it like an index in a book—instead of scanning every page, you can jump directly to the content you need.

### Types of Indexes

- **B-Tree Indexes**: Default in most databases, great for equality and range queries
- **Hash Indexes**: Optimized for equality comparisons
- **GiST and GIN**: For full-text search and complex data types
- **Partial Indexes**: Index only a subset of rows

## When to Use Indexes

Create indexes on columns that are:

- Frequently used in WHERE clauses
- Used in JOIN conditions
- Used in ORDER BY clauses
- Have high cardinality (many unique values)

### Example: PostgreSQL Index Creation

\`\`\`sql
-- Simple index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email) 
WHERE active = true;

-- Index with included columns (covering index)
CREATE INDEX idx_users_email_inc ON users(email) 
INCLUDE (first_name, last_name);
\`\`\`

## Index Maintenance

Indexes require maintenance:

- Monitor index usage with \`pg_stat_user_indexes\`
- Remove unused indexes
- Rebuild fragmented indexes
- Update statistics regularly

## Common Pitfalls

**Over-indexing**: Too many indexes slow down INSERT/UPDATE operations. Each index must be maintained on every write.

**Wrong column order in composite indexes**: The order matters! Put the most selective column first.

## Real-World Example

Before optimization:
\`\`\`sql
SELECT * FROM orders 
WHERE user_id = 123 AND status = 'pending'
ORDER BY created_at DESC
LIMIT 10;
-- Execution time: 2400ms
\`\`\`

After adding the right index:
\`\`\`sql
CREATE INDEX idx_orders_user_status_date 
ON orders(user_id, status, created_at DESC);

-- Same query now: 12ms
\`\`\`

**Key takeaway**: Measure, don't guess. Use EXPLAIN ANALYZE to understand query execution plans before and after adding indexes.
`
  },
  {
    id: '3',
    title: 'Microservices Communication Patterns',
    excerpt: 'Explore different patterns for inter-service communication including REST, gRPC, and message queues.',
    category: 'System Design',
    tags: ['Microservices', 'gRPC', 'RabbitMQ', 'Architecture'],
    date: 'Jan 22, 2026',
    readTime: '12 min read',
    content: `
Choosing the right communication pattern is critical for building reliable microservices architectures. Let's explore the most common patterns and when to use each.

## Synchronous vs Asynchronous

### Synchronous Communication

The caller waits for a response. Examples:
- REST APIs
- gRPC
- GraphQL

**Pros:**
- Simple to implement and debug
- Immediate response
- Easy to reason about

**Cons:**
- Services are coupled
- Cascading failures possible
- Requires all services to be available

### Asynchronous Communication

Fire-and-forget or event-driven. Examples:
- Message queues (RabbitMQ, Apache Kafka)
- Event buses
- Pub/Sub systems

**Pros:**
- Services are decoupled
- Better fault tolerance
- Natural load leveling

**Cons:**
- More complex
- Eventual consistency
- Harder to debug

## REST vs gRPC

### When to use REST
- Public APIs
- Simple CRUD operations
- Browser clients
- Wide language support needed

### When to use gRPC
- Internal service communication
- High performance requirements
- Streaming data
- Strongly typed contracts

\`\`\`protobuf
// gRPC service definition
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
  rpc StreamUsers (StreamRequest) returns (stream UserResponse);
}

message UserRequest {
  string user_id = 1;
}

message UserResponse {
  string user_id = 1;
  string email = 2;
  string name = 3;
}
\`\`\`

## Message Queue Patterns

### Point-to-Point (Queue)
One producer, one consumer. Great for task distribution.

### Publish-Subscribe
One producer, multiple consumers. Great for event broadcasting.

### Request-Reply
Async request with correlation ID for response matching.

## Event-Driven Architecture

Example using RabbitMQ:

\`\`\`javascript
// Publisher
const publishEvent = async (eventType, data) => {
  const message = JSON.stringify({
    eventType,
    data,
    timestamp: new Date(),
    id: generateId()
  });
  
  await channel.publish('events', eventType, 
    Buffer.from(message), { persistent: true });
};

// Subscriber
const subscribeToEvent = async (eventType, handler) => {
  const queue = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(queue.queue, 'events', eventType);
  
  channel.consume(queue.queue, async (msg) => {
    const event = JSON.parse(msg.content.toString());
    await handler(event);
    channel.ack(msg);
  });
};
\`\`\`

## Best Practices

- Use circuit breakers for resilience
- Implement proper retry logic with exponential backoff
- Add request tracing (correlation IDs)
- Monitor message queue depths
- Plan for idempotency

**Remember**: The best pattern depends on your specific requirements. Often, you'll use a combination of patterns in a single system.
`
  },
  {
    id: '4',
    title: 'Implementing Efficient Caching Strategies',
    excerpt: 'Master caching techniques with Redis to reduce database load and improve response times.',
    category: 'Performance',
    tags: ['Redis', 'Caching', 'Performance', 'Optimization'],
    date: 'Jan 19, 2026',
    readTime: '9 min read',
    content: `
Caching is one of the most effective ways to improve application performance. Let's explore how to implement caching strategies that actually work in production.

## Cache Invalidation

Phil Karlton famously said: "There are only two hard things in Computer Science: cache invalidation and naming things."

### Invalidation Strategies

- **TTL (Time To Live)**: Data expires after a set time
- **Write-Through**: Update cache on every write
- **Write-Behind**: Async cache updates
- **Event-Based**: Invalidate on specific events

## Redis Basics

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

// Simple key-value
await client.set('user:123', JSON.stringify(userData));
const data = await client.get('user:123');

// With expiration (TTL)
await client.setex('session:abc', 3600, sessionData);

// Hash for structured data
await client.hset('user:123', 'name', 'John');
await client.hset('user:123', 'email', 'john@example.com');
\`\`\`

## Caching Patterns

### Cache-Aside (Lazy Loading)

\`\`\`javascript
const getUser = async (userId) => {
  // Try cache first
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - get from database
  const user = await db.users.findById(userId);
  
  // Store in cache for next time
  await redis.setex(\`user:\${userId}\`, 3600, 
    JSON.stringify(user));
  
  return user;
};
\`\`\`

### Read-Through Cache

The cache library handles fetching from the database:

\`\`\`javascript
const cache = new CacheManager({
  ttl: 3600,
  fetchFunction: async (key) => {
    return await db.query(key);
  }
});

// Cache handles everything
const data = await cache.get('user:123');
\`\`\`

## Advanced Techniques

### Cache Warming

Pre-populate cache with frequently accessed data:

\`\`\`javascript
const warmCache = async () => {
  const popularPosts = await db.posts
    .find({ views: { $gt: 10000 } });
  
  for (const post of popularPosts) {
    await redis.setex(\`post:\${post.id}\`, 
      7200, JSON.stringify(post));
  }
};
\`\`\`

### Stale-While-Revalidate

Serve stale data while fetching fresh data in background:

\`\`\`javascript
const getData = async (key) => {
  const data = await redis.get(key);
  const ttl = await redis.ttl(key);
  
  // If TTL is low, refresh in background
  if (ttl < 300) {
    refreshInBackground(key);
  }
  
  return data;
};
\`\`\`

## Monitoring

Track these metrics:
- Hit rate (cache hits / total requests)
- Miss rate
- Eviction rate
- Memory usage

## Common Mistakes

- Caching everything (cache pollution)
- Not monitoring cache hit rates
- Ignoring memory limits
- Caching personalized data in shared cache

**Pro tip**: Start with a simple TTL-based cache and evolve based on metrics. Don't over-engineer early.
`
  },
  {
    id: '5',
    title: 'Authentication and Authorization Best Practices',
    excerpt: 'Comprehensive guide to implementing secure auth systems with JWT, OAuth2, and RBAC.',
    category: 'Security',
    tags: ['JWT', 'OAuth2', 'Security', 'Authentication'],
    date: 'Jan 16, 2026',
    readTime: '11 min read',
    content: `
Security is non-negotiable in backend development. Let's explore how to implement authentication and authorization correctly.

## Authentication vs Authorization

**Authentication**: Who are you?
**Authorization**: What can you do?

Never confuse these two concepts.

## JWT (JSON Web Tokens)

JWTs are stateless tokens containing encoded claims.

### Structure

\`\`\`
header.payload.signature
\`\`\`

Example implementation:

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Sign token
const token = jwt.sign(
  { 
    userId: user.id, 
    role: user.role 
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify token
const middleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

## Best Practices

### Token Storage

- **Never** store sensitive data in JWT payload
- Use httpOnly cookies for web apps
- Store in secure storage for mobile apps
- Never use localStorage for tokens (XSS vulnerable)

### Token Refresh

Implement refresh tokens for better security:

\`\`\`javascript
// Access token: short-lived (15 minutes)
const accessToken = jwt.sign(payload, SECRET, 
  { expiresIn: '15m' });

// Refresh token: long-lived (7 days)
const refreshToken = jwt.sign({ userId: user.id }, 
  REFRESH_SECRET, { expiresIn: '7d' });
\`\`\`

## Role-Based Access Control (RBAC)

\`\`\`javascript
const roles = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read']
};

const authorize = (permission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    
    if (roles[userRole]?.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
};

// Usage
app.delete('/api/posts/:id', 
  authenticate, 
  authorize('delete'), 
  deletePost
);
\`\`\`

## OAuth 2.0

For third-party authentication (Google, GitHub, etc.):

### Authorization Code Flow

- User clicks "Login with Google"
- Redirect to Google's auth page
- User approves
- Google redirects back with auth code
- Exchange code for access token
- Use token to get user info

## Security Checklist

- Use HTTPS everywhere
- Implement rate limiting
- Hash passwords with bcrypt
- Use strong JWT secrets
- Implement token blacklisting for logout
- Add CSRF protection
- Validate all inputs
- Log authentication attempts

## Password Hashing

\`\`\`javascript
const bcrypt = require('bcrypt');

// Hash password
const hash = await bcrypt.hash(password, 10);

// Verify password
const isValid = await bcrypt.compare(password, hash);
\`\`\`

**Remember**: Security is an ongoing process, not a one-time implementation. Stay updated on security best practices and vulnerabilities.
`
  },
  {
    id: '6',
    title: 'Docker for Backend Developers',
    excerpt: 'Learn how to containerize your backend applications and create reproducible development environments.',
    category: 'DevOps',
    tags: ['Docker', 'Containers', 'DevOps', 'Deployment'],
    date: 'Jan 13, 2026',
    readTime: '10 min read',
    content: `
Docker has revolutionized how we build, ship, and run applications. Let's explore how to effectively use Docker for backend development.

## Why Docker?

- **Consistency**: "Works on my machine" becomes "Works everywhere"
- **Isolation**: Dependencies don't conflict
- **Reproducibility**: Same environment for dev, staging, and production
- **Scalability**: Easy horizontal scaling

## Basic Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
\`\`\`

## Multi-Stage Builds

Reduce image size with multi-stage builds:

\`\`\`dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
\`\`\`

## Docker Compose

Orchestrate multiple containers:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
      - redis
    
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Best Practices

### Layer Caching

Order matters! Put least frequently changed layers first:

\`\`\`dockerfile
# ✅ Good - package.json changes less often
COPY package*.json ./
RUN npm install
COPY . .

# ❌ Bad - code changes often, invalidates cache
COPY . .
RUN npm install
\`\`\`

### .dockerignore

Create a \`.dockerignore\` file:

\`\`\`
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
.vscode
.idea
\`\`\`

### Health Checks

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1
\`\`\`

## Common Commands

\`\`\`bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -p 3000:3000 myapp:latest

# Run with environment variables
docker run -e NODE_ENV=production myapp:latest

# View logs
docker logs container_id

# Execute command in running container
docker exec -it container_id sh

# Stop and remove all containers
docker-compose down

# Start services
docker-compose up -d
\`\`\`

## Security

- Don't run as root
- Use official base images
- Scan for vulnerabilities
- Keep images updated
- Use secrets management

\`\`\`dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs
\`\`\`

**Pro tip**: Use Docker for development environments too. Your entire team will have identical setups, eliminating environment-related bugs.
`
  }
];
