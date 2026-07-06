# 🔧 Development & Deployment Guide

## Development Setup

### Using Development Mode with Auto-Reload

```bash
# Install nodemon (already in package.json)
npm install --save-dev nodemon

# Run dev server (auto-reloads on file changes)
npm run dev
```

### Directory Structure for Development

```
Movieboxs/
├── server.js              # Main Express app
├── models/
│   └── Movie.js           # Mongoose schema
├── public/
│   └── index.html         # Frontend
├── package.json           # Dependencies
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
└── docs/
    ├── SETUP_GUIDE.md
    ├── QUICK_START.md
    ├── API_DOCUMENTATION.md
    └── DEVELOPMENT_GUIDE.md
```

---

## 🛠️ Customization Guide

### 1. Customizing the Web Scraper

Edit `server.js` in the `MovieScraper` class:

```javascript
class MovieScraper {
  // Add custom extractors for specific websites
  
  async scrapeMovie(url) {
    // Add site-specific logic here
    if (url.includes('imdb.com')) {
      return this.scrapeIMDb(url);
    }
    if (url.includes('youtube.com')) {
      return this.scrapeYouTube(url);
    }
    // Default behavior
    return this.defaultScrape(url);
  }

  async scrapeIMDb(url) {
    // Custom IMDb scraper
  }

  async scrapeYouTube(url) {
    // Custom YouTube scraper
  }
}
```

### 2. Customizing the Database Schema

Edit `models/Movie.js`:

```javascript
const MovieSchema = new mongoose.Schema({
  // Add custom fields
  director: String,
  cast: [String],
  budget: Number,
  boxOffice: Number,
  awards: [String],
  // ... existing fields
});
```

Then update API handlers to include new fields.

### 3. Customizing Frontend UI

Edit `public/index.html`:

```html
<!-- Add custom sections -->
<section id="trending" class="section">
  <div class="trending-movies">
    <!-- Trending movies grid -->
  </div>
</section>

<!-- Add custom styles in <style> tag -->
<style>
  .trending-movies {
    /* Your custom styles */
  }
</style>
```

### 4. Adding Authentication

Create `middleware/auth.js`:

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
```

Then use in routes:

```javascript
app.delete('/api/movies/:id', authMiddleware, async (req, res) => {
  // Protected endpoint
});
```

### 5. Adding Caching with Redis

```bash
npm install redis
```

```javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/movies', async (req, res) => {
  const cacheKey = `movies_${req.query.page}`;
  
  // Check cache
  client.get(cacheKey, async (err, data) => {
    if (data) {
      return res.json(JSON.parse(data));
    }

    // Fetch from DB
    const movies = await Movie.find().paginate(req.query.page);
    
    // Cache for 1 hour
    client.setex(cacheKey, 3600, JSON.stringify(movies));
    
    res.json(movies);
  });
});
```

---

## 📦 Production Deployment

### Deploy to Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create app:**
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/moviebox
   heroku config:set NODE_ENV=production
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

6. **View logs:**
   ```bash
   heroku logs --tail
   ```

### Deploy to AWS EC2

1. **Launch EC2 instance** (Ubuntu 22.04)

2. **SSH into instance:**
   ```bash
   ssh -i key.pem ubuntu@instance-ip
   ```

3. **Install dependencies:**
   ```bash
   sudo apt update
   sudo apt install nodejs npm mongodb-server
   ```

4. **Clone repository:**
   ```bash
   git clone https://github.com/your-repo/moviebox.git
   cd moviebox
   ```

5. **Install packages:**
   ```bash
   npm install
   ```

6. **Create .env:**
   ```bash
   nano .env
   # Add: MONGODB_URI=mongodb://localhost:27017/moviebox
   # Add: NODE_ENV=production
   ```

7. **Install PM2 (process manager):**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "moviebox"
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx reverse proxy:**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
     }
   }
   ```

9. **Enable SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Deploy to Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .

   ENV PORT=5000
   EXPOSE 5000

   CMD ["npm", "start"]
   ```

2. **Create .dockerignore:**
   ```
   node_modules
   npm-debug.log
   .env
   .git
   ```

3. **Build image:**
   ```bash
   docker build -t moviebox:latest .
   ```

4. **Run container:**
   ```bash
   docker run -p 5000:5000 \
     -e MONGODB_URI=mongodb://host.docker.internal:27017/moviebox \
     moviebox:latest
   ```

5. **Push to Docker Hub:**
   ```bash
   docker tag moviebox:latest your-username/moviebox:latest
   docker push your-username/moviebox:latest
   ```

---

## 🔍 Advanced Features

### 1. Implement Proxy Support

```javascript
const httpProxyMiddleware = require('http-proxy-middleware');

app.use(
  '/api/proxy',
  httpProxyMiddleware({
    target: 'http://another-api.com',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy': '' }
  })
);
```

### 2. Add Thumbnail Generation

```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

app.post('/api/movies/save', async (req, res) => {
  try {
    // Generate thumbnail from poster
    const thumbnail = await sharp(req.body.poster)
      .resize(300, 450)
      .toBuffer();
    
    // Save to S3 or local storage
    // ...
  } catch (error) {
    console.error('Thumbnail error:', error);
  }
});
```

### 3. Email Notifications

```bash
npm install nodemailer
```

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/api/movies/save', async (req, res) => {
  // ... save movie ...
  
  // Send notification
  await transporter.sendMail({
    to: 'admin@example.com',
    subject: `New movie added: ${req.body.title}`,
    text: `A new movie has been added to your streaming platform.`
  });
});
```

### 4. Analytics & Logging

```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.post('/api/scrape', async (req, res) => {
  logger.info(`Scraping URL: ${req.body.targetUrl}`);
  // ... rest of code ...
});
```

---

## 🧪 Testing

### Unit Tests with Jest

```bash
npm install --save-dev jest supertest
```

Create `tests/api.test.js`:

```javascript
const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  it('should fetch all movies', async () => {
    const response = await request(app)
      .get('/api/movies')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should scrape a URL', async () => {
    const response = await request(app)
      .post('/api/scrape')
      .send({ targetUrl: 'https://example.com' })
      .expect(200);
    
    expect(response.body.data.title).toBeDefined();
  });
});
```

Run tests:
```bash
npm test
```

---

## 🔒 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` file
   - Use `.env.example` as template
   - Rotate secrets regularly

2. **Input Validation:**
   ```javascript
   const { body, validationResult } = require('express-validator');

   app.post('/api/movies/save', [
     body('title').notEmpty().trim().escape(),
     body('videoUrl').isURL(),
     body('poster').isURL()
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
   });
   ```

3. **Rate Limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   
   app.use('/api/', limiter);
   ```

4. **CORS Configuration:**
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com',
     credentials: true
   }));
   ```

---

## 📈 Performance Optimization

1. **Database Indexing:**
   - Already implemented on `title` and `createdAt`
   - Add more as needed

2. **Query Optimization:**
   ```javascript
   // Use .select() to limit fields
   app.get('/api/movies', async (req, res) => {
     const movies = await Movie.find()
       .select('title poster rating')  // Only these fields
       .limit(20);
   });
   ```

3. **Compression:**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

4. **Asset Caching:**
   ```javascript
   app.use(express.static('public', {
     maxAge: '1h'
   }));
   ```

---

## 🚀 Scaling Strategies

1. **Horizontal Scaling:**
   - Load balance with Nginx/HAProxy
   - Use Redis for session storage
   - Implement message queues (RabbitMQ, Kafka)

2. **Vertical Scaling:**
   - Upgrade server resources
   - Optimize database queries
   - Implement caching

3. **Database Scaling:**
   - MongoDB sharding
   - Read replicas
   - Connection pooling

---

## 📊 Monitoring & Maintenance

### Setup Monitoring

```bash
npm install @datadog/browser-rum
```

### Database Backups

```bash
# MongoDB backup
mongodump --db moviebox --out /backup

# MongoDB restore
mongorestore --db moviebox /backup/moviebox
```

---

**Happy developing! 🚀**
