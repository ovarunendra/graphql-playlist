const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Swiper = require('../models/swiper');
const Recommended = require('../models/recommended');

const SwiperType = new GraphQLObjectType({
  name: 'Swiper',
  fields: () => ({
    id: { type: GraphQLID },
    imageUri: { type: GraphQLString },
  })
});

const RecommendedType = new GraphQLObjectType({
  name: 'Recommended',
  fields: () => ({
    id: { type: GraphQLID },
    itemName: { type: GraphQLString },
    itemCreator: { type: GraphQLString },
    itemPrice: { type: GraphQLString },
    savings: { type: GraphQLString },
    imageUri: { type: GraphQLString },
    rating: { type: GraphQLInt }
  })
});

const AmazonViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    swiper: {
      type: new GraphQLList(SwiperType),
      resolve(parent, args){
        return Swiper.find({});;
      }
    },
    recommended: {
      type: new GraphQLList(RecommendedType),
      resolve(parent, args){
        return Recommended.find({});;
      }
    }
  })
});

module.exports = AmazonViewerType;
