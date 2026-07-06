# 🧪 Examples & Testing Guide

## Quick Testing with cURL

### Test 1: Check Server Health

```bash
# Get database statistics
curl http://localhost:5000/api/stats

# Expected Response:
# {
#   "success": true,
#   "stats": {
#     "totalMovies": 0,
#     "lastAdded": null,
#     "databaseStatus": "Connected"
#   }
# }
```

---

## Testing the Scraper

### Test 2: Scrape a YouTube Video

```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "targetUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "title": "Rick Astley - Never Gonna Give You Up...",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "poster": "https://img.youtube.com/...",
    "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "description": "Music video description...",
    "genre": ["Music"],
    "releaseYear": "2009",
    "duration": "3 min"
  }
}
```

### Test 3: Scrape IMDb Movie

```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "targetUrl": "https://www.imdb.com/title/tt0111161/"
  }'
```

### Test 4: Scrape a News Article

```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "targetUrl": "https://techcrunch.com/2024/01/15/ai-news/"
  }'
```

---

## Testing Movie Management

### Test 5: Add a Movie Manually

```bash
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Shawshank Redemption",
    "url": "https://www.imdb.com/title/tt0111161/",
    "poster": "https://via.placeholder.com/300x450?text=Shawshank",
    "videoUrl": "https://www.youtube.com/embed/PLl99DlL6b4",
    "description": "Two imprisoned men bond over a number of years...",
    "genre": ["Drama"],
    "releaseYear": "1994",
    "rating": 9.3,
    "duration": "142 min",
    "source": "Manual Entry"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "63d1234567890abcdef12345",
    "title": "The Shawshank Redemption",
    ...
  },
  "message": "Movie saved to database successfully"
}
```

### Test 6: Get All Movies

```bash
curl http://localhost:5000/api/movies
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63d1234567890abcdef12345",
      "title": "The Shawshank Redemption",
      ...
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

### Test 7: Get Single Movie

```bash
# Replace with actual movie ID from Test 6 response
curl http://localhost:5000/api/movies/63d1234567890abcdef12345
```

### Test 8: Search Movies

```bash
curl "http://localhost:5000/api/movies/search?query=Shawshank"
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63d1234567890abcdef12345",
      "title": "The Shawshank Redemption",
      ...
    }
  ],
  "count": 1
}
```

### Test 9: Update Movie

```bash
curl -X PUT http://localhost:5000/api/movies/63d1234567890abcdef12345 \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 9.5,
    "description": "Updated description..."
  }'
```

### Test 10: Delete Movie

```bash
curl -X DELETE http://localhost:5000/api/movies/63d1234567890abcdef12345
```

---

## Complete Workflow Example

### Step-by-Step: Add and Retrieve a Movie

**Step 1: Scrape a URL**
```bash
SCRAPE_RESPONSE=$(curl -s -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://example.com/movie"}')

echo $SCRAPE_RESPONSE
```

**Step 2: Extract movie data from response**
```bash
# Using jq to parse JSON
MOVIE_DATA=$(echo $SCRAPE_RESPONSE | jq '.data')
echo $MOVIE_DATA
```

**Step 3: Save to database**
```bash
SAVE_RESPONSE=$(curl -s -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d "$MOVIE_DATA")

# Extract movie ID
MOVIE_ID=$(echo $SAVE_RESPONSE | jq -r '.data._id')
echo "Saved with ID: $MOVIE_ID"
```

**Step 4: Retrieve the saved movie**
```bash
curl http://localhost:5000/api/movies/$MOVIE_ID
```

---

## Testing with Different Data Types

### Test with Large Description

```bash
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Long Description Test",
    "url": "https://example.com",
    "poster": "https://via.placeholder.com/300x450",
    "videoUrl": "https://example.com/video.mp4",
    "description": "This is a very long description that tests how the system handles extended text content. It includes multiple sentences and detailed information about the movie that would normally appear on a streaming platform. The system should truncate this automatically to 1000 characters maximum as defined in the schema.",
    "genre": ["Drama", "Thriller", "Crime", "Mystery"],
    "releaseYear": "2023",
    "rating": 8.7,
    "duration": "156 min"
  }'
```

### Test with Multiple Genres

```bash
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Multi-Genre Movie",
    "url": "https://example.com",
    "poster": "https://via.placeholder.com/300x450",
    "videoUrl": "https://example.com/video.mp4",
    "description": "A movie with multiple genres",
    "genre": ["Action", "Sci-Fi", "Thriller", "Adventure", "Mystery"],
    "releaseYear": "2024",
    "rating": 8.0,
    "duration": "145 min"
  }'
```

---

## Pagination Testing

### Test 11: Get Movies with Pagination

```bash
# Get page 1 with 5 items per page
curl "http://localhost:5000/api/movies?page=1&limit=5"

# Get page 2
curl "http://localhost:5000/api/movies?page=2&limit=5"

# Get all with default settings
curl http://localhost:5000/api/movies
```

---

## Sorting Testing

### Test 12: Get Movies with Different Sorting

```bash
# Sort by newest first (default)
curl "http://localhost:5000/api/movies?sort=-createdAt"

# Sort by oldest first
curl "http://localhost:5000/api/movies?sort=createdAt"

# Sort by title (A-Z)
curl "http://localhost:5000/api/movies?sort=title"

# Sort by rating (highest first)
curl "http://localhost:5000/api/movies?sort=-rating"

# Sort by release year (newest first)
curl "http://localhost:5000/api/movies?sort=-releaseYear"
```

---

## Error Testing

### Test 13: Invalid URL

```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"not-a-valid-url"}'

# Expected Response (400):
# {
#   "success": false,
#   "error": "Invalid URL format"
# }
```

### Test 14: Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'

# Expected Response (400):
# {
#   "error": "Title and videoUrl are required"
# }
```

### Test 15: Non-existent Movie

```bash
curl http://localhost:5000/api/movies/000000000000000000000000

# Expected Response (404):
# {
#   "success": false,
#   "error": "Movie not found"
# }
```

### Test 16: Duplicate Movie

```bash
# First save
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Duplicate Test",
    "url": "https://example.com/movie",
    "poster": "https://via.placeholder.com/300x450",
    "videoUrl": "https://example.com/video.mp4"
  }'

# Second save (same title and URL)
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Duplicate Test",
    "url": "https://example.com/movie",
    "poster": "https://via.placeholder.com/300x450",
    "videoUrl": "https://example.com/video.mp4"
  }'

# Expected Response (409):
# {
#   "success": false,
#   "error": "Movie already exists in database"
# }
```

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Create new collection: "MovieBox API"
3. Add requests:

**Request 1: Get Stats**
- Method: GET
- URL: http://localhost:5000/api/stats

**Request 2: Scrape Movie**
- Method: POST
- URL: http://localhost:5000/api/scrape
- Body (raw JSON):
```json
{
  "targetUrl": "https://example.com/movie"
}
```

**Request 3: Save Movie**
- Method: POST
- URL: http://localhost:5000/api/movies/save
- Body (raw JSON):
```json
{
  "title": "Test Movie",
  "url": "https://example.com",
  "poster": "https://via.placeholder.com/300x450",
  "videoUrl": "https://example.com/video.mp4",
  "description": "Test",
  "genre": ["Action"],
  "releaseYear": "2024",
  "rating": 8
}
```

---

## Batch Testing Script

Create `test.sh`:

```bash
#!/bin/bash

API="http://localhost:5000/api"

echo "🧪 Running API Tests..."
echo ""

# Test 1: Stats
echo "📊 Test 1: Get Stats"
curl -s $API/stats | jq .
echo ""

# Test 2: Get movies (should be empty initially)
echo "📋 Test 2: Get Movies"
curl -s "$API/movies?limit=5" | jq .pagination
echo ""

# Test 3: Add a movie
echo "➕ Test 3: Add Movie"
MOVIE_ID=$(curl -s -X POST $API/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Movie",
    "url":"https://example.com",
    "poster":"https://via.placeholder.com/300x450",
    "videoUrl":"https://example.com/video.mp4",
    "description":"Test",
    "genre":["Action"],
    "releaseYear":"2024",
    "rating":8
  }' | jq -r '.data._id')
echo "Movie ID: $MOVIE_ID"
echo ""

# Test 4: Get the movie
echo "🔍 Test 4: Get Movie"
curl -s "$API/movies/$MOVIE_ID" | jq .data.title
echo ""

# Test 5: Search
echo "🔎 Test 5: Search Movies"
curl -s "$API/movies/search?query=Test" | jq .count
echo ""

echo "✅ Tests Complete!"
```

Run:
```bash
chmod +x test.sh
./test.sh
```

---

## Real-World Scraping Examples

### Example 1: Scrape Netflix Title

**Note:** Netflix blocks scrapers. This is for educational purposes.

```bash
# Typically won't work due to anti-scraping measures
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://www.netflix.com/title/..."}'
```

### Example 2: Scrape YouTube Video

```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

### Example 3: Scrape Movie Review Site

```bash
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://www.rottentomatoes.com/m/..."}'
```

---

## Performance Testing

### Test with Apache Bench

```bash
# Test homepage (100 requests, 10 concurrent)
ab -n 100 -c 10 http://localhost:5000/

# Test API (100 requests)
ab -n 100 http://localhost:5000/api/movies

# Test with custom headers
ab -n 100 -H "Accept: application/json" http://localhost:5000/api/stats
```

### Test with wrk

```bash
# Install wrk
# Run 4 threads, 10 connections for 30 seconds
wrk -t4 -c10 -d30s http://localhost:5000/

# Test with script
wrk -t4 -c10 -d30s -s script.lua http://localhost:5000/api/movies
```

---

## Debugging Tips

### Enable Verbose Output

```bash
# Show request and response headers
curl -v -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://example.com"}'

# Follow redirects
curl -L http://localhost:5000/

# Show response time
curl -w "\nTime taken: %{time_total}s\n" http://localhost:5000/api/stats
```

### Use Pretty Printing

```bash
# Pretty print JSON response
curl -s http://localhost:5000/api/movies | jq '.'

# Extract specific field
curl -s http://localhost:5000/api/movies | jq '.pagination'

# Filter movies by genre
curl -s http://localhost:5000/api/movies | jq '.data[] | select(.genre[] | contains("Action"))'
```

---

**Happy Testing! 🚀**
