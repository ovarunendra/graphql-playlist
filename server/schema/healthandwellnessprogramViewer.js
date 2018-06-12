const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = graphql;

const { PostType } = require('./types');
const Post = require('../models/post');

const BASE_URL = 'http://healthandwellnessprogram.us';

const HealthandwellnessprogramViewerType = new GraphQLObjectType({
  name: 'HealthandwellnessprogramViewer',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      args: {
        page: { type: GraphQLInt, defaultValue: 1 }
      },
      resolve(parent, args) {
        const { page } = args;
        return Post.find({}, {}, { skip: (page - 1) * 10, limit: 10 });
      }
    }
  })
});

module.exports = HealthandwellnessprogramViewerType;
