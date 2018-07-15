const graphql = require('graphql');
const axios = require('axios');
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
const { QuestionType, PostType } = require('./types');
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
      resolve(parent, args) {
        const { difficulty, category } = args;
        return Question.find({ category });
      }
    },
    difficulties: {
      type: new GraphQLList(DifficultyType),
      resolve(parent, args) {
        return ['easy', 'medium', 'hard'];
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return [9,10,11,33]; //Array.from({ length: 3 }, (x, i) => i + 9);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        const url = 'http://healthandwellnessprogram.us/wp-json/wp/v2/posts';
        let promises = [];
        return axios.get(url).then(response => {
          const { data } = response;
          data.forEach((post) => {
            const mediaUrl = post._links['wp:featuredmedia'][0].href;
            promises.push(axios.get(mediaUrl));
          });
          return Promise.all(promises).then(results => {
            const output = data.map((value, index) => ({
              id: value.id,
              title: value.title.rendered,
              content: value.content.rendered,
              excerpt: value.excerpt.rendered,
              imageUri: results[index].data.guid.rendered
            }));
            return output;
          })
        });
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
      resolve(parent, args) {
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