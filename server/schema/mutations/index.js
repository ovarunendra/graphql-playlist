const addBook = require('./addBook');
const addAuthor = require('./addAuthor');
const addQuestion = require('./addQuestion');
const addTalk = require('./addTalk');

const mutationFields = {
  addBook,
  addAuthor,
  addQuestion,
  addTalk,
};

module.exports = mutationFields;
