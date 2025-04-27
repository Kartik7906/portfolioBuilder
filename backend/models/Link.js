// models/Link.js
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ', // Reference to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Store the icon URL or name; can be null for shop links
    default: null, // Default to null, indicating no icon for shop links
  },
  type: {
    type: String,
    enum: ['link', 'shop'], // Specify the type of link
    required: true,
  },
  clickCount: { type: Number, default: 0 }, // Track total clicks
  shopClickCount: { type: Number, default: 0 }, // Track clicks for shop links
  linkClickCount: { type: Number, default: 0 }, // Track clicks for link type
  
}, { timestamps: true });

module.exports = mongoose.model('Link', linkSchema);