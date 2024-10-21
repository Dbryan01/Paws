const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Pet', petSchema);
