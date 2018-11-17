const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const talkSchema = new Schema({
  title: String,
  author: String,
  imageUri: String,
  URL: String,
});

module.exports = mongoose.model('Talk', talkSchema);
