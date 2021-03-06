const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  difficulty: String,
  category: Number,
  question: String,
  correctAnswer: String,
  options: [String],
});

module.exports = mongoose.model('Question', questionSchema);
