const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: Number,
  title: String,
  content: String,
  excerpt: String,
  imageUri: String,
});

module.exports = mongoose.model('Post', postSchema);
