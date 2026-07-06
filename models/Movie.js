const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a movie title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    url: {
      type: String,
      required: [true, 'Please add a source URL'],
      unique: false,
      trim: true
    },
    poster: {
      type: String,
      default: 'https://via.placeholder.com/300x450?text=No+Image',
      trim: true
    },
    videoUrl: {
      type: String,
      required: [true, 'Please add a video URL'],
      trim: true
    },
    description: {
      type: String,
      default: 'No description available',
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    genre: {
      type: [String],
      default: ['Unknown']
    },
    releaseYear: {
      type: String,
      default: 'Unknown'
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    duration: {
      type: String,
      default: 'Unknown'
    },
    source: {
      type: String,
      default: 'Manual'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'movies'
  }
);

// Index for better query performance
MovieSchema.index({ title: 1 });
MovieSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Movie', MovieSchema);
