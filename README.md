# 🎬 MovieBox - Full-Stack Movie Streaming Platform

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18%2B-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A **production-ready**, full-stack movie streaming platform with automated web scraping capabilities. Build your own Netflix-like service with a modern dark UI, intelligent content scraping, and comprehensive streaming features.

## 🎯 What You Get

This is a **complete, ready-to-deploy system** that includes:

✅ **Backend Server** (Node.js + Express)  
✅ **Web Scraper** (Axios + Cheerio)  
✅ **Database** (MongoDB + Mongoose)  
✅ **Frontend UI** (HTML5 + CSS3 + Vanilla JS)  
✅ **Admin Panel** for content management  
✅ **Video Player** with streaming capabilities  
✅ **Search & Filter** system  
✅ **Comprehensive Documentation**  

---

## 📚 Documentation Index

### Getting Started
- **[QUICK_START.md](QUICK_START.md)** - 30-second setup guide (⭐ Start here!)
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation and configuration

### Development
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing and examples
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Advanced customization and deployment

### This File
- **[README.md](README.md)** - Project overview (you are here)

---

## 🚀 Quick Start (60 Seconds)

```bash
# 1. Clone/Navigate to project
cd Movieboxs

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env and add your MongoDB URI

# 4. Start server
npm start

# 5. Open browser
# http://localhost:5000
```

That's it! Your streaming platform is ready to go. 🎉

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│          🌐 Frontend (Browser)                  │
│  HTML5 + CSS3 + Vanilla JavaScript + AJAX       │
│  (Admin Panel + Movie Grid + Video Player)      │
└────────────────┬────────────────────────────────┘
                 │ REST API Calls (JSON)
                 ▼
┌─────────────────────────────────────────────────┐
│        🖥️ Backend Server (Node.js)              │
│  Express.js REST API with 8+ endpoints          │
│  - Scraping Service (Axios + Cheerio)           │
│  - Movie Management (CRUD operations)           │
│  - Search & Filter Engine                       │
└────────────────┬────────────────────────────────┘
                 │ Mongoose ODM
                 ▼
┌─────────────────────────────────────────────────┐
│        🗄️ Database (MongoDB)                    │
│  Movie Collection with Indexing                 │
│  - Titles, Posters, Video URLs                  │
│  - Metadata, Ratings, Genres                    │
└─────────────────────────────────────────────────┘
```

---

## 📊 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, JavaScript | User Interface |
| **Backend** | Node.js, Express.js | API Server |
| **Scraping** | Axios, Cheerio | Web Content Extraction |
| **Database** | MongoDB, Mongoose | Data Persistence |
| **Hosting** | Any Node.js host (Heroku, AWS, etc.) | Deployment |

---

## ✨ Key Features

### 🤖 Intelligent Web Scraper
- Automatically extracts movie data from any webpage
- Detects titles, posters, video sources, descriptions
- Handles multiple page layouts and formats
- Robust error handling with fallbacks

### 🎨 Modern Dark UI
- Netflix-style responsive design
- Smooth animations and transitions
- Dark theme for comfortable viewing
- Mobile-optimized interface

### 🎥 Video Streaming
- Embedded video player
- Support for multiple video sources
- Full-screen mode
- Iframe and direct video support

### ⚙️ Admin Dashboard
- URL scraping interface
- Live preview before saving
- One-click content management
- Real-time statistics

### 🔍 Search & Discovery
- Full-text search on titles, descriptions, genres
- Pagination support
- Multiple sorting options
- Filter by metadata

### 📱 Responsive Design
- Desktop, tablet, mobile support
- Touch-friendly interface
- Optimized for all screen sizes

---

## 📂 Project Structure

```
Movieboxs/
├── 📄 README.md                    # This file
├── 📄 QUICK_START.md               # 30-second setup
├── 📄 SETUP_GUIDE.md               # Detailed setup
├── 📄 API_DOCUMENTATION.md         # API reference
├── 📄 TESTING_GUIDE.md             # Testing examples
├── 📄 DEVELOPMENT_GUIDE.md         # Advanced guide
├── 📄 package.json                 # Dependencies
├── 📄 server.js                    # Express server (main backend)
├── 📄 .env.example                 # Environment template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 setup.sh                     # Linux/Mac setup script
├── 📄 setup.bat                    # Windows setup script
├── 📂 models/
│   └── 📄 Movie.js                 # MongoDB schema
└── 📂 public/
    └── 📄 index.html               # Frontend (complete UI + JS)
```

---

## 🎓 How It Works

### 1️⃣ Admin Scrapes a URL
```javascript
// POST /api/scrape
Admin pastes URL → System fetches HTML → Extracts data → Shows preview
```

### 2️⃣ System Extracts Movie Data
```javascript
// The scraper intelligently finds:
✓ Title (from meta tags, H1, or URL)
✓ Poster (from og:image or largest image)
✓ Video URL (from iframe, video tag, or embed)
✓ Description (from meta description)
✓ Genres, Year, Duration (via regex)
```

### 3️⃣ Admin Reviews & Saves
```javascript
// POST /api/movies/save
Preview shown → Admin confirms → Movie saved to MongoDB → Appears on homepage
```

### 4️⃣ Users Watch
```javascript
// GET /api/movies
Homepage loads → Users browse grid → Click movie → Video player opens
```

---

## 🔑 Core API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/scrape` | Scrape movie data from URL |
| GET | `/api/movies` | Get all movies (paginated) |
| GET | `/api/movies/:id` | Get single movie |
| POST | `/api/movies/save` | Save movie to database |
| PUT | `/api/movies/:id` | Update movie |
| DELETE | `/api/movies/:id` | Delete movie |
| GET | `/api/movies/search` | Search movies |
| GET | `/api/stats` | Get database statistics |

**See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete details.**

---

## 📋 Requirements

### System Requirements
- **Node.js** v14+
- **MongoDB** (local or cloud)
- **4GB RAM** minimum
- **Internet connection** for scraping

### Software
- Node.js: [Download](https://nodejs.org/)
- MongoDB: [Download](https://www.mongodb.com/try/download/community)
- Git: [Download](https://git-scm.com/)

---

## 🛠️ Installation

### Automated Setup (Recommended)

**For Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**For Windows:**
```bash
setup.bat
```

### Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Edit .env with MongoDB URI
nano .env

# 4. Start server
npm start
```

**Need help?** See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

---

## 🚀 Running the System

### Development Mode (Auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Verify It's Working
```bash
# Server should output:
# ✓ MongoDB connected successfully
# Server running on: http://localhost:5000
```

Open http://localhost:5000 in your browser.

---

## 💡 Usage Examples

### Add a Movie via UI
1. Click "⚙️ Admin" tab
2. Paste movie URL (any website)
3. Click "🔍 Fetch & Preview"
4. Review scraped data
5. Click "✅ Confirm & Save"
6. Movie appears on homepage

### Add a Movie via API
```bash
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Movie",
    "url": "https://source.com",
    "poster": "https://image.jpg",
    "videoUrl": "https://video.mp4",
    "description": "Movie about...",
    "genre": ["Action"],
    "releaseYear": "2024",
    "rating": 8
  }'
```

### Search for Movies
```bash
curl "http://localhost:5000/api/movies/search?query=action"
```

**More examples:** See [TESTING_GUIDE.md](TESTING_GUIDE.md)

---

## 🎯 Common Use Cases

### 📺 Personal Streaming Server
Set up your own streaming platform at home for family.

### 🏫 Educational Platform
Build a video education platform with curated content.

### 🎮 Game Streaming Hub
Aggregate gaming streams and tutorials in one place.

### 📚 Content Collection
Create a repository of tutorials, webinars, and videos.

### 🎬 Movie Database
Build a movie recommendation and review platform.

---

## 🔒 Security & Privacy

⚠️ **Important Considerations:**

- Scraping may violate some websites' Terms of Service
- Always respect `robots.txt` and site policies
- Don't scrape protected or copyrighted content
- For production, add authentication and authorization
- Use HTTPS for sensitive deployments
- Implement rate limiting
- Never commit `.env` file

**For production security:** See [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is accessible

### "Port 5000 already in use"
- Change port in `.env`: `PORT=8000`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### "Scraper not finding data"
- URL might be blocked by site
- Try a different URL
- Check browser console (F12)

### "Movies not showing on homepage"
- Check browser console for errors
- Verify API is running: `curl http://localhost:5000/api/stats`
- Ensure database has movies

**More help:** See [SETUP_GUIDE.md](SETUP_GUIDE.md) troubleshooting section.

---

## 📈 What's Next?

After setup, you can:

1. ✅ Add movies via admin panel
2. ✅ Watch videos
3. ✅ Customize UI (edit `public/index.html`)
4. ✅ Modify scraper (edit `server.js`)
5. ✅ Add authentication
6. ✅ Deploy to cloud (Heroku, AWS, etc.)
7. ✅ Add advanced features (caching, analytics, etc.)

**See [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for advanced topics.**

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Web Scraping with Cheerio](https://cheerio.js.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Open a Pull Request

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

## 🎉 You're All Set!

Your production-ready movie streaming platform is ready to launch. Start adding content and enjoy your custom streaming experience!

### Quick Reminders

- 📖 Read [QUICK_START.md](QUICK_START.md) first
- 🔧 See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- 🧪 Check [TESTING_GUIDE.md](TESTING_GUIDE.md) for examples
- 🚀 Review [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for deployment

### Next Steps

```bash
# 1. Start server
npm start

# 2. Open browser
# http://localhost:5000

# 3. Go to Admin tab
# Paste movie URL and click "Fetch & Preview"

# 4. Confirm and save
# Movie appears on homepage!
```

---

**Questions?** Check the documentation files or review the API endpoints in [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

**Happy Streaming! 🍿🎬**

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** Production Ready ✅  
**Maintained By:** Senior Developer Team