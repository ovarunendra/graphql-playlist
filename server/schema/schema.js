const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
var books = [
  {name: 'A', genre: 'a', id: '1'},
  {name: 'B', genre: 'b', id: '2'},
  {name: 'C', genre: 'c', id: '3'},
];

var authors = [
  {name: 'AA', age: 11, id: '1'},
  {name: 'BB', age: 22, id: '2'},
  {name: 'CC', age: 33, id: '3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args){
        // code to get data from db / other source
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID }},
      resolve(parent, args){
        return _.find(authors, {id: args.id});
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
