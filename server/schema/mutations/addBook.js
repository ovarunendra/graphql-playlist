const { BookType } = require('../types');
const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const Book = require('../../models/book');

const addBook = {
  type: BookType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args){
    const { name, genre, authorId } = args;
    let book = new Book({
      name, genre, authorId
    });
    return book.save();
  }
};

module.exports = addBook;
