# 📚 Complete API Documentation

## Overview

MovieBox API provides comprehensive RESTful endpoints for managing movies, scraping content, and retrieving data.

**Base URL:** `http://localhost:5000/api`  
**Response Format:** JSON  
**Authentication:** None (for development)

---

## 🎬 Movie Endpoints

### Get All Movies

**Endpoint:** `GET /api/movies`

**Query Parameters:**
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 20) - Items per page
- `sort` (string, default: "-createdAt") - Sort field

**Example Request:**
```bash
GET /api/movies?page=1&limit=20&sort=-createdAt
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63d1234567890",
      "title": "Inception",
      "url": "https://example.com/inception",
      "poster": "https://image.jpg",
      "videoUrl": "https://video.mp4",
      "description": "A skilled thief...",
      "genre": ["Sci-Fi", "Thriller"],
      "releaseYear": "2010",
      "rating": 8.8,
      "duration": "148 min",
      "source": "Automated Scraper",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

---

### Get Single Movie

**Endpoint:** `GET /api/movies/:id`

**Example Request:**
```bash
GET /api/movies/63d1234567890
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "63d1234567890",
    "title": "Inception",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Movie not found"
}
```

---

### Search Movies

**Endpoint:** `GET /api/movies/search`

**Query Parameters:**
- `query` (string, required) - Search term

**Example Request:**
```bash
GET /api/movies/search?query=action
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63d1234567890",
      "title": "Action Movie",
      ...
    }
  ],
  "count": 5
}
```

---

### Save Movie

**Endpoint:** `POST /api/movies/save`

**Request Body:**
```json
{
  "title": "Movie Title",
  "url": "https://source-url.com",
  "poster": "https://poster-image.jpg",
  "videoUrl": "https://video-url.mp4",
  "description": "Movie description",
  "genre": ["Action", "Sci-Fi"],
  "releaseYear": "2024",
  "rating": 8,
  "duration": "120 min"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "url": "https://example.com/inception",
    "poster": "https://image.jpg",
    "videoUrl": "https://video.mp4",
    "description": "A skilled thief...",
    "genre": ["Sci-Fi"],
    "releaseYear": "2010",
    "rating": 8.8,
    "duration": "148 min"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "63d1234567890",
    "title": "Inception",
    ...
  },
  "message": "Movie saved to database successfully"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": "Movie already exists in database"
}
```

---

### Update Movie

**Endpoint:** `PUT /api/movies/:id`

**Request Body:**
```json
{
  "title": "Updated Title",
  "rating": 9,
  "description": "Updated description"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:5000/api/movies/63d1234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "rating": 9
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "63d1234567890",
    "title": "Updated Title",
    ...
  },
  "message": "Movie updated successfully"
}
```

---

### Delete Movie

**Endpoint:** `DELETE /api/movies/:id`

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/movies/63d1234567890
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "63d1234567890",
    "title": "Inception",
    ...
  },
  "message": "Movie deleted successfully"
}
```

---

## 🔍 Scraping Endpoints

### Scrape Movie Data

**Endpoint:** `POST /api/scrape`

**Request Body:**
```json
{
  "targetUrl": "https://example.com/movie"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://example.com/movie"}'
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "title": "Movie Title",
    "url": "https://example.com/movie",
    "poster": "https://poster-url.jpg",
    "videoUrl": "https://video-url.mp4",
    "description": "Movie description...",
    "genre": ["Action", "Thriller"],
    "releaseYear": "2024",
    "duration": "120 min",
    "source": "Automated Scraper",
    "rating": 0
  },
  "message": "Movie scraped successfully"
}
```

**Error Response (400 - Invalid URL):**
```json
{
  "success": false,
  "error": "Invalid URL format"
}
```

**Error Response (500 - Scraping Failed):**
```json
{
  "success": false,
  "error": "Failed to scrape movie",
  "details": "Failed to fetch URL: connect ECONNREFUSED"
}
```

---

## 📊 Statistics Endpoints

### Get Database Stats

**Endpoint:** `GET /api/stats`

**Example Request:**
```bash
GET /api/stats
```

**Success Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalMovies": 42,
    "lastAdded": "2024-01-15T10:30:00Z",
    "databaseStatus": "Connected"
  }
}
```

---

## 🔒 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal server error |

---

## 🛡️ Error Handling

All errors return JSON with the following structure:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional details (if applicable)"
}
```

---

## ⏱️ Rate Limiting

Currently no rate limiting implemented. For production, add rate limiting middleware:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## 🔐 Security Headers

Current configuration includes basic security. For production, add:

```javascript
app.use(helmet()); // Security headers
app.use(mongoSanitize()); // Data sanitization
app.use(xss()); // XSS protection
```

---

## 📈 Pagination Example

Get movies with custom pagination:

```bash
# Get page 2 with 10 items per page
curl "http://localhost:5000/api/movies?page=2&limit=10"

# Response includes:
# - pagination.total: Total number of movies
# - pagination.page: Current page
# - pagination.limit: Items per page
# - pagination.pages: Total pages
```

---

## 🔄 Sorting Options

Available sort fields:

- `createdAt` - Creation date
- `title` - Movie title
- `rating` - Movie rating
- `releaseYear` - Release year

Prefix with `-` for descending order:

```bash
# Sort by rating (highest first)
curl "http://localhost:5000/api/movies?sort=-rating"

# Sort by title (A-Z)
curl "http://localhost:5000/api/movies?sort=title"
```

---

## 📝 Example Workflows

### Workflow 1: Add a Movie

1. **Scrape:**
   ```bash
   POST /api/scrape
   {"targetUrl": "https://example.com/movie"}
   ```

2. **Review response** and verify data quality

3. **Save:**
   ```bash
   POST /api/movies/save
   {extracted movie data}
   ```

### Workflow 2: Search & Update

1. **Search:**
   ```bash
   GET /api/movies/search?query=action
   ```

2. **Update result:**
   ```bash
   PUT /api/movies/{id}
   {"rating": 8.5}
   ```

### Workflow 3: Browse & Delete

1. **List all:**
   ```bash
   GET /api/movies?page=1
   ```

2. **Delete one:**
   ```bash
   DELETE /api/movies/{id}
   ```

---

## 🧪 Testing with cURL

### Test API Health

```bash
# Get stats (basic connectivity test)
curl http://localhost:5000/api/stats

# Try scraping a URL
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://www.youtube.com"}'

# Get all movies
curl http://localhost:5000/api/movies
```

---

## 📋 Response Schema

### Movie Object

```typescript
{
  _id: string,           // MongoDB ObjectId
  title: string,         // Movie title
  url: string,          // Source URL
  poster: string,       // Poster image URL
  videoUrl: string,     // Video playback URL
  description: string,  // Movie synopsis
  genre: string[],      // Genre array
  releaseYear: string,  // Release year
  rating: number,       // Rating (0-10)
  duration: string,     // Duration (e.g., "120 min")
  source: string,       // Data source
  createdAt: date,      // Creation timestamp
  updatedAt: date       // Last update timestamp
}
```

---

## 🚀 Performance Tips

1. **Use pagination** - Always paginate large datasets
2. **Filter by genre** - Implement in search endpoint
3. **Cache results** - Use Redis for frequently accessed movies
4. **Optimize images** - Use CDN for poster images
5. **Index database** - Already implemented on title & createdAt

---

**API Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** Production Ready ✅
