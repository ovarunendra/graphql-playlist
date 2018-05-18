const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = graphql;

const DifficultyType = require('./difficultyScalar');
const CategoryType = require('./categoryScalar');
const { QuestionType } = require('./types');
const Question = require('../models/question');

const QuizViewerType = new GraphQLObjectType({
  name: 'QuizViewer',
  fields: () => ({
    questions: {
      type: new GraphQLList(QuestionType),
      args: {
        difficulty: { type: new GraphQLNonNull(DifficultyType) },
        category: { type: new GraphQLNonNull(CategoryType) }
      },
      resolve(parent, args){
        const { difficulty, category } = args;
        return Question.find({difficulty, category});
      }
    },
    difficulties: {
    	type: new GraphQLList(DifficultyType),
    	resolve(parent, args){
	        return [ 'easy', 'medium', 'hard' ];
	    }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args){
          return Array.from({length: 24}, (x,i) => i+9);
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addQuestion: {
      type: QuestionType,
      args: {
        difficulty: { type: new GraphQLNonNull(DifficultyType) },
        category: { type: new GraphQLNonNull(CategoryType) },
        question: { type: new GraphQLNonNull(GraphQLString) },
        correctAnswer: { type: new GraphQLNonNull(GraphQLString) },
        incorrectAnswers: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve(parent, args){
        const { difficulty, category, question, correctAnswer, incorrectAnswers } = args;
        let newQuestion = new Question({
          difficulty, category, question, correctAnswer, incorrectAnswers
        });
        return newQuestion.save();
      }
    }
  }
});

module.exports = QuizViewerType;