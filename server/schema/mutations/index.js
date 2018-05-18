const addBook = require('./addBook');
const addAuthor = require('./addAuthor');
const addQuestion = require('./addQuestion');

const mutationFields = {
    addBook,
    addAuthor,
    addQuestion,
};

module.exports = mutationFields;
