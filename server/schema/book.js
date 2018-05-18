const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
} = require('graphql');
const AuthorType = require('./author');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return Author.findById(parent.authorId);
      }
    },
  })
});

module.exports = BookType;
