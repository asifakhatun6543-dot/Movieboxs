# 🚀 QUICK START REFERENCE

## ⚡ 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Edit .env with your MongoDB URI
# For local: MONGODB_URI=mongodb://localhost:27017/moviebox

# 4. Start server
npm start

# 5. Open browser
# http://localhost:5000
```

---

## 📋 Pre-Installation Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] MongoDB running? (`mongod` in terminal)
- [ ] Git installed? (`git --version`)
- [ ] Port 5000 available?

---

## 🔑 Key Files Explained

| File | Purpose |
|------|---------|
| `server.js` | Express server, API endpoints, scraper logic |
| `models/Movie.js` | MongoDB schema definition |
| `public/index.html` | Complete frontend UI + JavaScript |
| `package.json` | Dependencies and scripts |
| `.env` | Configuration (MongoDB URI, PORT) |

---

## 🎯 Common Commands

```bash
# Start server
npm start

# Start with auto-reload (dev mode)
npm run dev

# Install a new package
npm install package-name

# Update packages
npm update

# Remove a package
npm uninstall package-name
```

---

## 🔗 API Quick Reference

```bash
# Scrape a movie
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://example.com/movie"}'

# Get all movies
curl http://localhost:5000/api/movies

# Save a movie
curl -X POST http://localhost:5000/api/movies/save \
  -H "Content-Type: application/json" \
  -d '{...movie data...}'

# Search movies
curl "http://localhost:5000/api/movies/search?query=action"

# Get stats
curl http://localhost:5000/api/stats
```

---

## ⚙️ Environment Variables

```env
# Required
MONGODB_URI=mongodb://localhost:27017/moviebox

# Optional
PORT=5000
NODE_ENV=development
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot find module` | Run `npm install` |
| `Connection refused` | Start MongoDB: `mongod` |
| `Port 5000 in use` | Change PORT in `.env` to 8000 |
| `Cannot GET /` | Server not running or wrong port |
| `Scraper fails` | URL might be blocked or invalid |

---

## 📚 File Locations

```
Movieboxs/
├── 📄 server.js              ← Backend logic
├── 📄 package.json           ← Dependencies
├── 📄 .env                   ← Configuration
├── 📂 models/
│   └── Movie.js              ← DB Schema
└── 📂 public/
    └── index.html            ← Frontend
```

---

## 🌐 Access Points

| URL | Purpose |
|-----|---------|
| `http://localhost:5000` | Homepage |
| `http://localhost:5000/api/movies` | Get movies |
| `http://localhost:5000/api/stats` | Database stats |

---

## 📝 Useful Tips

1. **Local Development:** Use `npm run dev` for auto-reload
2. **Testing URLs:** Use real movie/streaming websites
3. **Video Sources:** YouTube, direct video files, or embedded players
4. **Images:** Open Graph tags (og:image) work best
5. **Search:** Case-insensitive, searches title + description + genre

---

## 🎓 Learning Path

1. Read SETUP_GUIDE.md for detailed setup
2. Start server and explore UI
3. Try scraping a sample URL
4. Check browser DevTools (F12) for API calls
5. Modify frontend in `public/index.html`
6. Customize backend in `server.js`

---

## 🚀 Next Steps After Setup

1. ✅ Start the server
2. ✅ Open homepage
3. ✅ Go to Admin tab
4. ✅ Find a movie URL (try IMDb, YouTube, etc.)
5. ✅ Paste URL and click "Fetch & Preview"
6. ✅ Review and click "Save"
7. ✅ Watch on homepage!

---

## 📞 Getting Help

1. Check SETUP_GUIDE.md troubleshooting section
2. Review console output for error messages
3. Open DevTools (F12) to see frontend errors
4. Check `package.json` for available scripts
5. Verify MongoDB connection with `mongo` command

---

**You're ready to build your streaming platform! 🎬**
