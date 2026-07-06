# 🎬 MovieBox - Automated Movie Streaming Platform

A production-ready, full-stack movie streaming website with automated web scraping capabilities. Build your own Netflix-like platform with a clean dark UI, admin panel, and comprehensive video streaming features.

## 📋 Features

✨ **Core Features:**
- 🤖 **Automated Web Scraper** - Intelligently extract movie data from any webpage
- 🎥 **Video Streaming** - Embed and stream movies with custom video players
- 🗄️ **MongoDB Database** - Persistent storage with Mongoose ORM
- 🎨 **Modern Dark UI** - Netflix/Moviebox-style responsive design
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔍 **Search & Filter** - Advanced search functionality
- ⚙️ **Admin Dashboard** - Easy-to-use admin panel for content management
- 📊 **Database Stats** - Real-time statistics and monitoring

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js, Express.js |
| **Scraping** | Axios, Cheerio |
| **Database** | MongoDB, Mongoose |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Styling** | CSS3 with CSS Variables |
| **API** | RESTful JSON API |

---

## 📦 Installation & Setup

### Step 1: Prerequisites

Ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) - [Download Local](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Step 2: Clone & Install Dependencies

```bash
# Navigate to project directory
cd Movieboxs

# Install all dependencies
npm install
```

**Expected Output:**
```
npm install
added 150+ packages
```

### Step 3: Configure MongoDB

#### Option A: Local MongoDB Setup (Recommended for Development)

**Windows/Mac/Linux:**
1. Install MongoDB Community Edition from [official site](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows:** `mongod` (in command prompt)
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

3. Verify MongoDB is running:
   ```bash
   mongo --version
   # Should show: MongoDB shell version
   ```

#### Option B: MongoDB Atlas (Cloud - Easier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/moviebox?retryWrites=true&w=majority`

### Step 4: Environment Configuration

1. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

2. Edit `.env` and add your MongoDB URI:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/moviebox
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moviebox?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

3. Save the file

### Step 5: Start the Server

```bash
# Start the server
npm start

# Expected output:
# ╔════════════════════════════════════════╗
# ║   🎬 MOVIEBOX STREAMING SERVER 🎬      ║
# ╠════════════════════════════════════════╣
# ║  Server running on: http://localhost:5000  ║
# ║  Database: mongodb://localhost:27017/moviebox  ║
# ║  Environment: development  ║
# ╚════════════════════════════════════════╝
# ✓ MongoDB connected successfully
```

### Step 6: Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

You should see the MovieBox homepage with the admin panel available.

---

## 🚀 Usage Guide

### Admin Panel - Adding Movies

1. **Navigate to Admin Tab**
   - Click the "⚙️ Admin" button in the navbar

2. **Enter Movie URL**
   - Paste the URL of any movie or streaming page
   - Example: `https://example.com/movies/action/movie-name`

3. **Click "Fetch & Preview"**
   - The system will scrape the page and extract:
     - Movie title
     - Poster image
     - Video URL
     - Description
     - Release year
     - Genre
     - Duration

4. **Review the Preview**
   - Check that all data is correct
   - The video player will display the detected video source

5. **Click "Confirm & Save to Website"**
   - Movie is now saved to MongoDB
   - It appears on the homepage grid

### Homepage - Watching Movies

1. **Browse Available Movies**
   - All saved movies appear in a responsive grid
   - Hover over a movie to see the play button

2. **Search for Movies**
   - Use the search box to find movies by title
   - Results update in real-time

3. **Play a Movie**
   - Click on a movie poster to open the video player
   - Full-screen and controls are available
   - Click the X button or outside to close

---

## 📡 API Endpoints

### Scraping

**POST /api/scrape**
- Scrapes a URL and extracts movie data
- Request: `{ "targetUrl": "https://example.com/movie" }`
- Response: Movie object with title, poster, videoUrl, etc.

### Movies

**GET /api/movies**
- Fetch all movies with pagination
- Query params: `?page=1&limit=20`

**GET /api/movies/:id**
- Get a single movie by ID

**POST /api/movies/save**
- Save a movie to database
- Request: Movie object

**PUT /api/movies/:id**
- Update a movie

**DELETE /api/movies/:id**
- Delete a movie from database

**GET /api/movies/search?query=keyword**
- Search movies by title, description, or genre

**GET /api/stats**
- Get database statistics

---

## 📂 Project Structure

```
Movieboxs/
├── package.json                 # Dependencies
├── server.js                    # Express server & API endpoints
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── models/
│   └── Movie.js                 # Mongoose schema
└── public/
    └── index.html               # Frontend UI
```

---

## 🎯 Example: Scraping a Movie

Let's say you want to add a movie from IMDb:

1. Go to IMDb movie page: `https://www.imdb.com/title/tt1234567/`
2. Copy the URL
3. Paste in Admin panel URL field
4. Click "Fetch & Preview"
5. System extracts:
   - Title: "Movie Name"
   - Poster: IMDb poster image
   - Description: Movie plot
   - Release Year: 2023
   - Genres: Action, Drama
   - Duration: 120 min

6. Click "Confirm & Save"
7. Movie appears on homepage

---

## 🔧 Advanced Configuration

### Custom Scraping Rules

Edit `server.js` in the `MovieScraper` class to customize extraction:

```javascript
extractTitle(html, url) {
  // Add custom logic for specific websites
  if (url.includes('imdb.com')) {
    // IMDb-specific extraction
  }
  // Fallback to default
}
```

### Change Server Port

Edit `.env`:
```env
PORT=8000  # Default: 5000
```

### Production Database

Use MongoDB Atlas for production:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/moviebox
NODE_ENV=production
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service (`mongod` or `brew services start mongodb-community`)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` to `8000` or kill process on port 5000

### Scraping Not Working
**Solutions:**
1. Check if URL is accessible in browser
2. Some sites block Axios - try a different URL
3. Check browser console for errors (F12)
4. Verify video source is embedded in the page

### MongoDB URI Error
```
Error: Invalid connection string
```
**Solution:** Double-check your MongoDB URI in `.env`
- Local: `mongodb://localhost:27017/moviebox`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/moviebox?retryWrites=true&w=majority`

---

## 📊 Database Schema

### Movie Collection

```javascript
{
  _id: ObjectId,
  title: "Movie Title",              // String, required
  url: "https://source-url.com",     // String, required
  poster: "https://image-url.jpg",   // String
  videoUrl: "https://video.mp4",     // String, required
  description: "Movie plot...",      // String
  genre: ["Action", "Drama"],        // Array
  releaseYear: "2023",               // String
  rating: 8.5,                       // Number (0-10)
  duration: "120 min",               // String
  source: "Automated Scraper",       // String
  createdAt: 2024-01-15T10:30:00Z,  // Date
  updatedAt: 2024-01-15T10:30:00Z   // Date
}
```

---

## 🔐 Security Notes

⚠️ **Important for Production:**

1. **Never commit `.env` file** - Use `.env.example` as template
2. **Use environment variables** for sensitive data
3. **Validate all user inputs** - Done in backend
4. **Set CORS restrictions** - Modify `cors()` in server.js
5. **Use HTTPS** - Deploy with SSL certificate
6. **Rate limiting** - Add for production
7. **Authentication** - Add user login if needed

---

## 📈 Performance Tips

1. **Database Indexing:** Already implemented on title and createdAt
2. **Pagination:** Use limit parameter to reduce data transfer
3. **Image Optimization:** Compress poster images before saving
4. **Caching:** Add Redis for frequently accessed data
5. **CDN:** Use CDN for static assets and video files

---

## 📝 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Blank homepage | Database not connected | Check MongoDB is running |
| Scraper fails | URL blocked | Try different URL source |
| Video won't play | Invalid video URL | Check source has embedded video |
| Slow page load | Large images | Optimize image sizes |
| CORS error | Frontend/backend mismatch | Check API_BASE_URL in index.html |

---

## 🚀 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set MongoDB URI
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to AWS, GCP, or Azure

Follow their respective Node.js deployment guides with:
- Node.js runtime
- Environment variables configuration
- MongoDB connection URI

---

## 📚 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Cheerio Web Scraping](https://cheerio.js.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 💬 Support

For issues or questions:
1. Check the **Troubleshooting** section
2. Review **Common Issues & Solutions** table
3. Check API response status codes

---

## 🎉 You're All Set!

Your MovieBox streaming platform is ready to go. Start adding movies and enjoy your own streaming service!

**Need Help?** Refer to the setup instructions above or check the API documentation.

Happy Streaming! 🍿🎬

---

**Last Updated:** January 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✅
