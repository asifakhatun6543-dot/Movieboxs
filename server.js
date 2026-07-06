require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const Movie = require('./models/Movie');

// ============== MIDDLEWARE ==============
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// ============== DATABASE CONNECTION ==============
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moviebox';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch((err) => console.error('✗ MongoDB connection error:', err.message));

// ============== WEB SCRAPER UTILITY ==============
class MovieScraper {
  constructor() {
    this.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  }

  async fetchHTML(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch URL: ${error.message}`);
    }
  }

  extractTitle(html, url) {
    const $ = cheerio.load(html);

    // Priority 1: Open Graph title
    let title = $('meta[property="og:title"]').attr('content');

    // Priority 2: Meta description title
    if (!title) {
      title = $('meta[name="title"]').attr('content');
    }

    // Priority 3: Page title tag
    if (!title) {
      title = $('title').text();
    }

    // Priority 4: H1 tag
    if (!title) {
      title = $('h1').first().text();
    }

    // Fallback: Extract from URL
    if (!title) {
      title = url.split('/').pop().replace(/[-_]/g, ' ').split('?')[0];
    }

    return title.trim().substring(0, 200) || 'Unknown Movie';
  }

  extractPoster(html, baseUrl) {
    const $ = cheerio.load(html);

    // Priority 1: Open Graph image
    let poster = $('meta[property="og:image"]').attr('content');

    // Priority 2: Twitter image
    if (!poster) {
      poster = $('meta[name="twitter:image"]').attr('content');
    }

    // Priority 3: Largest image on page
    if (!poster) {
      const images = [];
      $('img').each((i, el) => {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt');
        if (src && alt && alt.toLowerCase().includes('poster|cover|thumbnail')) {
          images.push(src);
        }
      });
      if (images.length > 0) {
        poster = images[0];
      }
    }

    // Priority 4: First image on page
    if (!poster) {
      poster = $('img').first().attr('src');
    }

    // Convert relative URLs to absolute
    if (poster && !poster.startsWith('http')) {
      poster = new URL(poster, baseUrl).href;
    }

    return poster || 'https://via.placeholder.com/300x450?text=No+Image';
  }

  extractVideoUrl(html, url) {
    const $ = cheerio.load(html);

    // Priority 1: Iframe embed
    let videoUrl = $('iframe').first().attr('src');

    // Priority 2: Video tag source
    if (!videoUrl) {
      videoUrl = $('video source').first().attr('src');
    }

    // Priority 3: Embed tag
    if (!videoUrl) {
      const embedSrc = $('embed').first().attr('src');
      if (embedSrc) videoUrl = embedSrc;
    }

    // Priority 4: Fallback to the page URL itself
    if (!videoUrl) {
      videoUrl = url;
    }

    // Convert relative URLs to absolute
    if (videoUrl && !videoUrl.startsWith('http')) {
      videoUrl = new URL(videoUrl, url).href;
    }

    return videoUrl || '';
  }

  extractDescription(html) {
    const $ = cheerio.load(html);

    // Priority 1: Open Graph description
    let description = $('meta[property="og:description"]').attr('content');

    // Priority 2: Meta description
    if (!description) {
      description = $('meta[name="description"]').attr('content');
    }

    // Priority 3: First paragraph
    if (!description) {
      description = $('p').first().text();
    }

    // Clean and trim
    description = description
      ?.trim()
      .replace(/\s+/g, ' ')
      .substring(0, 1000) || 'No description available';

    return description;
  }

  extractMetadata(html) {
    const $ = cheerio.load(html);

    // Extract genres
    const genres = [];
    $('[data-genre], .genre, .tag').each((i, el) => {
      const genre = $(el).text().trim();
      if (genre && genres.length < 5) {
        genres.push(genre);
      }
    });

    // Extract release year
    const yearMatch = html.match(/\b(19|20)\d{2}\b/);
    const releaseYear = yearMatch ? yearMatch[0] : 'Unknown';

    // Extract duration
    let duration = 'Unknown';
    const durationMatch = html.match(/(\d+)\s*min/i);
    if (durationMatch) {
      duration = durationMatch[0];
    }

    return {
      genre: genres.length > 0 ? genres : ['Unknown'],
      releaseYear,
      duration
    };
  }

  async scrapeMovie(url) {
    try {
      const html = await this.fetchHTML(url);
      const metadata = this.extractMetadata(html);

      return {
        title: this.extractTitle(html, url),
        url: url,
        poster: this.extractPoster(html, url),
        videoUrl: this.extractVideoUrl(html, url),
        description: this.extractDescription(html),
        genre: metadata.genre,
        releaseYear: metadata.releaseYear,
        duration: metadata.duration,
        source: 'Automated Scraper',
        rating: 0
      };
    } catch (error) {
      console.error('Scraping error:', error.message);
      throw error;
    }
  }
}

// ============== INITIALIZE SCRAPER ==============
const scraper = new MovieScraper();

// ============== API ENDPOINTS ==============

/**
 * POST /api/scrape
 * Scrapes a movie from a given URL and returns preview data
 */
app.post('/api/scrape', async (req, res) => {
  try {
    const { targetUrl } = req.body;

    if (!targetUrl) {
      return res.status(400).json({ error: 'targetUrl is required' });
    }

    // Validate URL format
    try {
      new URL(targetUrl);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    console.log(`[SCRAPER] Scraping URL: ${targetUrl}`);
    const movieData = await scraper.scrapeMovie(targetUrl);

    res.json({
      success: true,
      data: movieData,
      message: 'Movie scraped successfully'
    });
  } catch (error) {
    console.error('Scrape error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to scrape movie',
      details: error.message
    });
  }
});

/**
 * POST /api/movies/save
 * Saves a scraped movie to the database
 */
app.post('/api/movies/save', async (req, res) => {
  try {
    const movieData = req.body;

    if (!movieData.title || !movieData.videoUrl) {
      return res.status(400).json({
        error: 'Title and videoUrl are required'
      });
    }

    // Check for duplicates (optional)
    const existingMovie = await Movie.findOne({
      title: movieData.title,
      url: movieData.url
    });

    if (existingMovie) {
      return res.status(409).json({
        error: 'Movie already exists in database'
      });
    }

    // Create new movie document
    const movie = new Movie(movieData);
    const savedMovie = await movie.save();

    console.log(`[DATABASE] Movie saved: ${savedMovie.title}`);

    res.status(201).json({
      success: true,
      data: savedMovie,
      message: 'Movie saved to database successfully'
    });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to save movie'
    });
  }
});

/**
 * GET /api/movies
 * Fetches all movies from database with pagination and sorting
 */
app.get('/api/movies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sort = req.query.sort || '-createdAt'; // Default: newest first

    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Movie.countDocuments();

    res.json({
      success: true,
      data: movies,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movies'
    });
  }
});

/**
 * GET /api/movies/search
 * Search movies by title or genre
 */
app.get('/api/movies/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const movies = await Movie.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { genre: searchRegex }
      ]
    }).limit(20);

    res.json({
      success: true,
      data: movies,
      count: movies.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search movies'
    });
  }
});

/**
 * GET /api/movies/:id
 * Fetch a single movie by ID
 */
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movie'
    });
  }
});

/**
 * DELETE /api/movies/:id
 * Delete a movie from database
 */
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    console.log(`[DATABASE] Movie deleted: ${movie.title}`);

    res.json({
      success: true,
      message: 'Movie deleted successfully',
      data: movie
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete movie'
    });
  }
});

/**
 * PUT /api/movies/:id
 * Update a movie
 */
app.put('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    console.log(`[DATABASE] Movie updated: ${movie.title}`);

    res.json({
      success: true,
      data: movie,
      message: 'Movie updated successfully'
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update movie'
    });
  }
});

/**
 * GET /api/stats
 * Get database statistics
 */
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Movie.countDocuments();
    const recent = await Movie.findOne().sort({ createdAt: -1 });

    res.json({
      success: true,
      stats: {
        totalMovies: total,
        lastAdded: recent?.createdAt || null,
        databaseStatus: 'Connected'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats'
    });
  }
});

// ============== STATIC FILES & HOMEPAGE ==============
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============== ERROR HANDLING ==============
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// ============== SERVER START ==============
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎬 MOVIEBOX STREAMING SERVER 🎬      ║
╠════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}  ║
║  Database: ${mongoURI}  ║
║  Environment: ${process.env.NODE_ENV || 'development'}  ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
