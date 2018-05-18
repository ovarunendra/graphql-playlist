const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const AmazonViewerType = require('./amazonViewer');
const QuizViewerType = require('./quizViewer');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const { BookType, AuthorType } = require('./types');
const mutationFields = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args){
        // code to get data from db / other source
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID }},
      resolve(parent, args){
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({});
      }
    },
    amazonViewer: {
      type: AmazonViewerType,
      resolve(parent, args){
        return {};
      }
    },
    quizViewer: {
      type: QuizViewerType,
      resolve(parent, args){
        return {};
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => mutationFields
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
