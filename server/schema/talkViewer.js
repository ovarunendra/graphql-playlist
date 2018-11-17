const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLInt } = graphql;

const { TalkType } = require('./types');
const Talk = require('../models/talk');

const TalkViewerType = new GraphQLObjectType({
  name: 'TalkViewer',
  fields: () => ({
    talks: {
      type: new GraphQLList(TalkType),
      args: {
        page: { type: GraphQLInt, defaultValue: 1 },
      },
      resolve(parent, args) {
        const { page } = args;
        return Talk.find({}, {}, { skip: (page - 1) * 10, limit: 10 });
      },
    },
  }),
});

module.exports = TalkViewerType;
