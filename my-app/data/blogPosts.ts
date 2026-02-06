import { BlogPostType } from '@/types/blog';

export const blogPosts: BlogPostType[] = [
  {
    id: '1',
    title: 'Node.js와 Express로 확장 가능한 RESTful API 구축하기',
    excerpt: '수백만 개의 요청을 처리할 수 있는 프로덕션급 REST API를 설계하고 구현하기 위한 모범 사례를 배워보세요.',
    category: 'API 개발',
    tags: ['Node.js', 'Express', 'REST', '확장성'],
    date: '2026년 1월 28일',
    readTime: '8분 소요',
    content: `
확장 가능한 RESTful API를 구축하는 것은 현대 백엔드 개발의 핵심입니다. 이 가이드에서는 견고하고 유지보수가 쉬운 API를 만드는 데 도움이 되는 모범 사례와 패턴을 살펴보겠습니다.

## 확장성이 중요한 이유

애플리케이션이 성장함에 따라 API는 성능 저하 없이 증가하는 트래픽을 처리할 수 있어야 합니다. 초기에 내린 잘못된 아키텍처 결정은 기술 부채와 비용이 많이 드는 재작업으로 이어질 수 있습니다.

### 핵심 원칙

- **무상태(Stateless) 설계**: 각 요청은 필요한 모든 정보를 포함해야 합니다.
- **리소스 기반 URL**: 엔드포인트에 동사가 아닌 명사를 사용하세요.
- **적절한 HTTP 메서드**: GET, POST, PUT, DELETE를 올바르게 사용하세요.
- **버전 관리**: 첫날부터 API의 진화를 계획하세요.

## Express.js 모범 사례

확장 가능한 Express 애플리케이션의 기본 구조는 다음과 같습니다.

\`\`\`javascript
const express = require('express');
const app = express();

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

// 에러 처리
app.use(errorHandler);

module.exports = app;
\`\`\`

### 속도 제한(Rate Limiting)

남용을 방지하기 위해 속도 제한을 구현하세요.

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100 // 각 IP당 15분 동안 최대 100개 요청 제한
});

app.use('/api/', limiter);
\`\`\`

## 데이터베이스 최적화

- 연결 풀링(Connection Pooling) 사용
- 적절한 인덱싱 구현
- 자주 액세스하는 데이터 캐싱
- 대규모 데이터셋에 페이지네이션 사용

## 모니터링 및 로깅

항상 포괄적인 로깅과 모니터링을 구현하세요. 로깅을 위한 **Winston**과 지표 측정을 위한 **Prometheus**는 업계 표준입니다.

**기억하세요**: 확장성은 단순히 더 많은 요청을 처리하는 것뿐만 아니라, 시스템이 커짐에 따라 성능, 신뢰성 및 개발 생산성을 유지하는 것입니다.
`
  },
  {
    id: '2',
    title: '고성능을 위한 데이터베이스 인덱싱 전략',
    excerpt: '운영 시스템에서 쿼리 성능을 획기적으로 향상시킬 수 있는 데이터베이스 인덱싱 기술에 대해 깊이 있게 알아봅니다.',
    category: '데이터베이스 엔지니어링',
    tags: ['PostgreSQL', 'MySQL', '성능', '최적화'],
    date: '2026년 1월 25일',
    readTime: '10분 소요',
    content: `
데이터베이스 인덱싱은 쿼리 성능을 최적화하는 가장 강력한 도구 중 하나입니다. 하지만 부적절한 인덱싱은 오히려 성능을 저하시킬 수 있습니다.

## 인덱스 이해하기

인덱스는 데이터 검색 작업의 속도를 향상시키는 데이터 구조입니다. 책의 색인과 비슷하다고 생각하면 됩니다. 모든 페이지를 스캔하는 대신 필요한 내용으로 바로 이동할 수 있습니다.

### 인덱스 유형

- **B-Tree 인덱스**: 대부분의 데이터베이스에서 기본적으로 사용되며, 등호 및 범위 쿼리에 유용합니다.
- **Hash 인덱스**: 등호 비교에 최적화되어 있습니다.
- **GiST 및 GIN**: 전체 텍스트 검색 및 복잡한 데이터 유형에 사용됩니다.
- **부분 인덱스(Partial Indexes)**: 행의 하위 집합만 인덱싱합니다.

## 인덱스를 사용해야 하는 경우

다음과 같은 컬럼에 인덱스를 만드세요.

- WHERE 절에서 자주 사용되는 컬럼
- JOIN 조건에 사용되는 컬럼
- ORDER BY 절에 사용되는 컬럼
- 카디널리티(고유 값의 수)가 높은 컬럼

### 예시: PostgreSQL 인덱스 생성

\`\`\`sql
-- 단순 인덱스
CREATE INDEX idx_users_email ON users(email);

-- 복합 인덱스
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- 부분 인덱스
CREATE INDEX idx_active_users ON users(email) 
WHERE active = true;

-- 포함된 컬럼이 있는 인덱스 (커버링 인덱스)
CREATE INDEX idx_users_email_inc ON users(email) 
INCLUDE (first_name, last_name);
\`\`\`

## 인덱스 유지 관리

인덱스는 유지 관리가 필요합니다.

- \`pg_stat_user_indexes\`를 사용하여 인덱스 사용량 모니터링
- 사용하지 않는 인덱스 제거
- 조각화된 인덱스 재구성
- 주기적으로 통계 업데이트

## 흔한 실수

**과도한 인덱싱**: 인덱스가 너무 많으면 INSERT/UPDATE 작업이 느려집니다. 쓰기 작업마다 각 인덱스를 업데이트해야 하기 때문입니다.

**복합 인덱스의 잘못된 컬럼 순서**: 순서가 중요합니다! 선택도가 가장 높은 컬럼을 앞에 두세요.

## 실세계 예시

최적화 전:
\`\`\`sql
SELECT * FROM orders 
WHERE user_id = 123 AND status = 'pending'
ORDER BY created_at DESC
LIMIT 10;
-- 실행 시간: 2400ms
\`\`\`

적절한 인덱스 추가 후:
\`\`\`sql
CREATE INDEX idx_orders_user_status_date 
ON orders(user_id, status, created_at DESC);

-- 동일한 쿼리 실행 시간: 12ms
\`\`\`

**핵심 요점**: 추측하지 말고 측정하세요. 인덱스를 추가하기 전후의 쿼리 실행 계획을 이해하기 위해 EXPLAIN ANALYZE를 사용하세요.
`
  },
  {
    id: '3',
    title: '마이크로서비스 통신 패턴',
    excerpt: 'REST, gRPC, 메시지 큐를 포함한 서비스 간 통신을 위한 다양한 패턴을 살펴봅니다.',
    category: '시스템 설계',
    tags: ['마이크로서비스', 'gRPC', 'RabbitMQ', '아키텍처'],
    date: '2026년 1월 22일',
    readTime: '12분 소요',
    content: `
신뢰할 수 있는 마이크로서비스 아키텍처를 구축하려면 올바른 통신 패턴을 선택하는 것이 중요합니다. 가장 일반적인 패턴과 각각의 사용 시기를 살펴보겠습니다.

## 동기식 vs 비동기식

### 동기식 통신

호출자가 응답을 기다립니다. 예시:
- REST API
- gRPC
- GraphQL

**장점:**
- 구현 및 디버깅이 간단함
- 즉각적인 응답
- 추론하기 쉬움

**단점:**
- 서비스 간 결합도가 높음
- 계단식 장애(Cascading failures) 가능성
- 모든 서비스가 가용 상태여야 함

### 비동기식 통신

발송 후 망각(Fire-and-forget) 또는 이벤트 기반 방식입니다. 예시:
- 메시지 큐 (RabbitMQ, Apache Kafka)
- 이벤트 버스
- 발행/구독(Pub/Sub) 시스템

**장점:**
- 서비스 간 결합도가 낮음
- 장애 내성 향상
- 자연스러운 부하 분산

**단점:**
- 더 복잡함
- 최종 일관성(Eventual consistency)
- 디버깅이 더 어려움

## REST vs gRPC

### REST 사용 시기
- 공개 API
- 단순 CRUD 작업
- 브라우저 클라이언트
- 광범위한 언어 지원이 필요한 경우

### gRPC 사용 시기
- 내부 서비스 간 통신
- 고성능 요구 사항
- 스트리밍 데이터
- 강력한 타입 정의가 필요한 경우

\`\`\`protobuf
// gRPC 서비스 정의
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

## 메시지 큐 패턴

### Point-to-Point (Queue)
하나의 생산자, 하나의 소비자. 작업 분배에 적합합니다.

### Publish-Subscribe
하나의 생산자, 여러 소비자. 이벤트 브로드캐스팅에 적합합니다.

### Request-Reply
응답 매칭을 위해 상관관계 ID(Correlation ID)를 사용하는 비동기 요청입니다.

## 이벤트 기반 아키텍처

RabbitMQ를 사용한 예시:

\`\`\`javascript
// 생산자 (Publisher)
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

// 소비자 (Subscriber)
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

## 모범 사례

- 회복 탄력성을 위해 서킷 브레이커(Circuit Breakers) 사용
- 지수 백오프(Exponential backoff)를 포함한 적절한 재시도 로직 구현
- 요청 추적 추가 (상관관계 ID)
- 메시지 큐 깊이 모니터링
- 멱등성(Idempotency) 계획

**기억하세요**: 최선의 패턴은 특정 요구 사항에 따라 다릅니다. 종종 하나의 시스템에서 여러 패턴을 조합하여 사용하게 됩니다.
`
  },
  {
    id: '4',
    title: '효율적인 캐싱 전략 구현하기',
    excerpt: 'Redis를 활용한 캐싱 기술을 마스터하여 데이터베이스 부하를 줄이고 응답 시간을 개선하세요.',
    category: '성능 최적화',
    tags: ['Redis', '캐싱', '성능', '최적화'],
    date: '2026년 1월 19일',
    readTime: '9분 소요',
    content: `
캐싱은 애플리케이션 성능을 향상시키는 가장 효과적인 방법 중 하나입니다. 실제 운영 환경에서 효과적으로 작동하는 캐싱 전략을 구현하는 방법을 살펴보겠습니다.

## 캐시 무효화 (Cache Invalidation)

Phil Karlton은 "컴퓨터 과학에는 어려운 일이 두 가지 있는데, 하나는 캐시 무효화이고 다른 하나는 이름 짓기다"라고 말했습니다.

### 무효화 전략

- **TTL (Time To Live)**: 설정된 시간이 지나면 데이터 만료
- **Write-Through**: 쓰기 작업마다 캐시 업데이트
- **Write-Behind**: 비동기식 캐시 업데이트
- **이벤트 기반**: 특정 이벤트 발생 시 무효화

## Redis 기초

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

// 단순 키-값
await client.set('user:123', JSON.stringify(userData));
const data = await client.get('user:123');

// 만료 시간 설정 (TTL)
await client.setex('session:abc', 3600, sessionData);

// 구조화된 데이터를 위한 Hash
await client.hset('user:123', 'name', 'John');
await client.hset('user:123', 'email', 'john@example.com');
\`\`\`

## 캐싱 패턴

### Cache-Aside (Lazy Loading)

\`\`\`javascript
const getUser = async (userId) => {
  // 먼저 캐시 확인
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // 캐시 미스 - 데이터베이스에서 가져오기
  const user = await db.users.findById(userId);
  
  // 다음에 사용할 수 있도록 캐시에 저장
  await redis.setex(\`user:\${userId}\`, 3600, 
    JSON.stringify(user));
  
  return user;
};
\`\`\`

### Read-Through Cache

캐시 라이브러리가 데이터베이스에서 데이터를 가져오는 것을 처리합니다.

\`\`\`javascript
const cache = new CacheManager({
  ttl: 3600,
  fetchFunction: async (key) => {
    return await db.query(key);
  }
});

// 캐시가 모든 것을 처리함
const data = await cache.get('user:123');
\`\`\`

## 고급 기술

### 캐시 워밍 (Cache Warming)

자주 액세스하는 데이터를 캐시에 미리 채워 넣습니다.

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

백그라운드에서 신선한 데이터를 가져오는 동안 오래된 데이터를 제공합니다.

\`\`\`javascript
const getData = async (key) => {
  const data = await redis.get(key);
  const ttl = await redis.ttl(key);
  
  // TTL이 낮으면 백그라운드에서 갱신
  if (ttl < 300) {
    refreshInBackground(key);
  }
  
  return data;
};
\`\`\`

## 모니터링

다음 지표를 추적하세요.
- 히트율 (캐시 히트 / 총 요청)
- 미스율
- 제거율 (Eviction rate)
- 메모리 사용량

## 흔한 실수

- 모든 것을 캐싱 (캐시 오염)
- 캐시 히트율 모니터링 누락
- 메모리 제한 무시
- 공유 캐시에 개인화된 데이터 저장

**프로 팁**: 간단한 TTL 기반 캐시로 시작하여 지표에 따라 발전시키세요. 조기에 과도하게 설계하지 마세요.
`
  },
  {
    id: '5',
    title: '인증 및 인가 모범 사례',
    excerpt: 'JWT, OAuth2, RBAC를 사용한 보안 인증 시스템 구현을 위한 종합 가이드입니다.',
    category: '보안',
    tags: ['JWT', 'OAuth2', '보안', '인증'],
    date: '2026년 1월 16일',
    readTime: '11분 소요',
    content: `
보안은 백엔드 개발에서 절대 타협할 수 없는 부분입니다. 인증과 인가를 올바르게 구현하는 방법을 살펴보겠습니다.

## 인증 vs 인가

**인증 (Authentication)**: 당신은 누구인가?
**인가 (Authorization)**: 당신은 무엇을 할 수 있는가?

이 두 개념을 절대 혼동하지 마세요.

## JWT (JSON Web Tokens)

JWT는 인코딩된 클레임을 포함하는 무상태(Stateless) 토큰입니다.

### 구조

\`\`\`
header.payload.signature
\`\`\`

구현 예시:

\`\`\`javascript
const jwt = require('jsonwebtoken');

// 토큰 서명
const token = jwt.sign(
  { 
    userId: user.id, 
    role: user.role 
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// 토큰 검증
const middleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
};
\`\`\`

## 모범 사례

### 토큰 저장

- JWT 페이로드에 민감한 데이터를 **절대** 저장하지 마세요.
- 웹 앱에서는 httpOnly 쿠키를 사용하세요.
- 모바일 앱에서는 보안 저장소에 저장하세요.
- localStorage에 토큰을 저장하지 마세요 (XSS에 취약).

### 토큰 갱신

보안을 강화하기 위해 리프레시 토큰을 구현하세요.

\`\`\`javascript
// 액세스 토큰: 단기 유효 (15분)
const accessToken = jwt.sign(payload, SECRET, 
  { expiresIn: '15m' });

// 리프레시 토큰: 장기 유효 (7일)
const refreshToken = jwt.sign({ userId: user.id }, 
  REFRESH_SECRET, { expiresIn: '7d' });
\`\`\`

## 역할 기반 액세스 제어 (RBAC)

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
      res.status(403).json({ error: '권한이 없습니다' });
    }
  };
};

// 사용 예시
app.delete('/api/posts/:id', 
  authenticate, 
  authorize('delete'), 
  deletePost
);
\`\`\`

## OAuth 2.0

제3자 인증(Google, GitHub 등)의 경우:

### 인증 코드 플로우 (Authorization Code Flow)

- 사용자가 "Google로 로그인" 클릭
- Google 인증 페이지로 리다이렉트
- 사용자 승인
- Google이 인증 코드와 함께 다시 리다이렉트
- 코드를 액세스 토큰으로 교환
- 토큰을 사용하여 사용자 정보 획득

## 보안 체크리스트

- 모든 곳에 HTTPS 사용
- 속도 제한(Rate limiting) 구현
- bcrypt로 비밀번호 해싱
- 강력한 JWT 시크릿 사용
- 로그아웃을 위한 토큰 블랙리스트 구현
- CSRF 보호 추가
- 모든 입력 검증
- 인증 시도 로깅

## 비밀번호 해싱

\`\`\`javascript
const bcrypt = require('bcrypt');

// 비밀번호 해싱
const hash = await bcrypt.hash(password, 10);

// 비밀번호 검증
const isValid = await bcrypt.compare(password, hash);
\`\`\`

**기억하세요**: 보안은 한 번의 구현으로 끝나는 것이 아니라 지속적인 프로세스입니다. 최신 보안 모범 사례와 취약점에 대해 항상 확인하세요.
`
  },
  {
    id: '6',
    title: '백엔드 개발자를 위한 Docker',
    excerpt: '백엔드 애플리케이션을 컨테이너화하고 재현 가능한 개발 환경을 만드는 방법을 배웁니다.',
    category: '데브옵스',
    tags: ['Docker', '컨테이너', '데브옵스', '배포'],
    date: '2026년 1월 13일',
    readTime: '10분 소요',
    content: `
Docker는 우리가 애플리케이션을 구축, 배송, 실행하는 방식을 혁신했습니다. 백엔드 개발에서 Docker를 효과적으로 사용하는 방법을 살펴보겠습니다.

## 왜 Docker인가?

- **일관성**: "내 컴퓨터에서는 되는데"가 "어디서든 됨"으로 바뀝니다.
- **격리**: 종속성이 충돌하지 않습니다.
- **재현성**: 개발, 스테이징, 운영 환경이 동일합니다.
- **확장성**: 수평적 확장이 용이합니다.

## 기본 Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 종속성 설치
RUN npm ci --only=production

# 애플리케이션 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["node", "server.js"]
\`\`\`

## 멀티 스테이지 빌드

멀티 스테이지 빌드로 이미지 크기를 줄이세요.

\`\`\`dockerfile
# 빌드 스테이지
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 실행 스테이지
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
\`\`\`

## Docker Compose

여러 컨테이너를 오케스트레이션합니다.

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

## 모범 사례

### 레이어 캐싱

순서가 중요합니다! 가장 덜 변하는 레이어를 앞에 두세요.

\`\`\`dockerfile
# ✅ 좋음 - package.json은 덜 자주 바뀜
COPY package*.json ./
RUN npm install
COPY . .

# ❌ 나쁨 - 코드는 자주 바뀌어 캐시를 무효화함
COPY . .
RUN npm install
\`\`\`

### .dockerignore

\`.dockerignore\` 파일을 만드세요.

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

### 헬스 체크

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1
\`\`\`

## 자주 사용하는 명령어

\`\`\`bash
# 이미지 빌드
docker build -t myapp:latest .

# 컨테이너 실행
docker run -p 3000:3000 myapp:latest

# 환경 변수와 함께 실행
docker run -e NODE_ENV=production myapp:latest

# 로그 확인
docker logs container_id

# 실행 중인 컨테이너에서 명령어 실행
docker exec -it container_id sh

# 모든 컨테이너 중지 및 제거
docker-compose down

# 서비스 시작
docker-compose up -d
\`\`\`

## 보안

- root로 실행하지 마세요.
- 공식 베이스 이미지를 사용하세요.
- 취약점을 스캔하세요.
- 이미지를 최신 상태로 유지하세요.
- 비밀 값 관리(Secrets management)를 사용하세요.

\`\`\`dockerfile
# non-root 사용자 생성
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 소유권 변경
COPY --chown=nodejs:nodejs . .

# non-root 사용자로 전환
USER nodejs
\`\`\`

**프로 팁**: 개발 환경에서도 Docker를 사용하세요. 팀 전체가 동일한 설정을 갖게 되어 환경 관련 버그를 제거할 수 있습니다.
`
  }
];
