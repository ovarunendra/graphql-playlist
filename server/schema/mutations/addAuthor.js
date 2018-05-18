const { AuthorType } = require('../types');
const {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');

const Author = require('../../models/author');

const addAuthor = {
  type: AuthorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve(parent, args){
    const { name, age } = args;
    let author = new Author({
      name, age
    });
    return author.save();
  }
}

module.exports = addAuthor;
