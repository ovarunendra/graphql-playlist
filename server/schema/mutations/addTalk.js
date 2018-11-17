const { TalkType } = require('../types');
const { GraphQLString, GraphQLNonNull } = require('graphql');

const Talk = require('../../models/talk');

const addTalk = {
  type: TalkType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    imageUri: { type: new GraphQLNonNull(GraphQLString) },
    URL: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    const { title, author, imageUri, URL } = args;
    let newTalk = new Talk({
      title,
      author,
      imageUri,
      URL,
    });
    return newTalk.save();
  },
};

module.exports = addTalk;
