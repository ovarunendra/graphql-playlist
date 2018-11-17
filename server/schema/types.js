const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const CategoryType = require('./categoryScalar');
const DifficultyType = require('./difficultyScalar');
const Book = require('../models/book');
const Author = require('../models/author');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const QuestionType = new GraphQLObjectType({
  name: 'QuestionType',
  fields: () => ({
    id: { type: GraphQLID },
    difficulty: { type: DifficultyType },
    category: { type: CategoryType },
    question: { type: GraphQLString },
    correctAnswer: { type: GraphQLString },
    incorrectAnswers: { type: new GraphQLList(GraphQLString) },
    options: {
      type: new GraphQLList(GraphQLString),
      resolve(parent, args) {
        const { incorrectAnswers, correctAnswer } = parent;
        const options = incorrectAnswers.concat(correctAnswer);
        return options.sort((a, b) => 0.5 - Math.random());
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    excerpt: { type: GraphQLString },
    imageUri: { type: GraphQLString },
  }),
});

const TalkType = new GraphQLObjectType({
  name: 'TalkType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    imageUri: { type: GraphQLString },
    URL: { type: GraphQLString },
  }),
});

module.exports = { AuthorType, BookType, QuestionType, PostType, TalkType };
