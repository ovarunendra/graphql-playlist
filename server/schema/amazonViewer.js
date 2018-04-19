const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const SWIPERS = [
  {id: "1", imageUri: "https://s3.us-east-2.amazonaws.com/ovarunendra-dev-testing-bucket/swiper_2.jpg"},
  {id: "2", imageUri: "https://s3.us-east-2.amazonaws.com/ovarunendra-dev-testing-bucket/swiper_3.jpg"},
  {id: "3", imageUri: "https://s3.us-east-2.amazonaws.com/ovarunendra-dev-testing-bucket/swiper_2.jpg"},
];

const RECOMMENDED = [
  {
    id: "1",
    itemName: "You can heal your life",
    itemCreator: "Louise Hay",
    itemPrice: "$10",
    savings: "2.5",
    imageUri: "https://s3.us-east-2.amazonaws.com/ovarunendra-dev-testing-bucket/recommended_1.jpg",
    rating: 5
  },
  {
    id: "2",
    itemName: "Uncharted 4",
    itemCreator: "Sony",
    itemPrice: "$19.99",
    savings: "17",
    imageUri: "https://s3.us-east-2.amazonaws.com/ovarunendra-dev-testing-bucket/recommended_2.jpg",
    rating: 5
  },
  {
    id: "3",
    itemName: "Ea UFC 3",
    itemCreator: "Ea Sports",
    itemPrice: "$44",
    savings: "6",
    imageUri: "https://s3.us-east-2.amazonaws.com/ovarunendra-dev-testing-bucket/recommended_3.jpg",
    rating: 3
  }
];

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
        return SWIPERS;
      }
    },
    recommended: {
      type: new GraphQLList(RecommendedType),
      resolve(parent, args){
        return RECOMMENDED;
      }
    }
  })
});

module.exports = AmazonViewerType;
