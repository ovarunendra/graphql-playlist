const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendedSchema = new Schema({
  itemName: String,
  itemCreator: String,
  itemPrice: String,
  savings: String,
  imageUri: String,
  rating: Number,
});

module.exports = mongoose.model('Recommended', recommendedSchema);
