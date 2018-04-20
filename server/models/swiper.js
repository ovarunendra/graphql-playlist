const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const swiperSchema = new Schema({
  imageUri: String
});

module.exports = mongoose.model('Swiper', swiperSchema);
