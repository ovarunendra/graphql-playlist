const CategoryType = require('../categoryScalar');
const DifficultyType = require('../difficultyScalar');
const { QuestionType } = require('../types');
const { GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');

const Question = require('../../models/question');

const addQuestion = {
  type: QuestionType,
  args: {
    difficulty: { type: new GraphQLNonNull(DifficultyType) },
    category: { type: new GraphQLNonNull(CategoryType) },
    question: { type: new GraphQLNonNull(GraphQLString) },
    correctAnswer: { type: new GraphQLNonNull(GraphQLString) },
    options: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
  },
  resolve(parent, args) {
    const { difficulty, category, question, correctAnswer, options } = args;
    let newQuestion = new Question({
      difficulty,
      category,
      question,
      correctAnswer,
      options,
    });
    return newQuestion.save();
  },
};

module.exports = addQuestion;
