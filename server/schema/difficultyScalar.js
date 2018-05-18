const {
    GraphQLScalarType,
} = require('graphql');

const DifficultyType = new GraphQLScalarType({
    name: 'DifficultyType',
    serialize(difficultyType) {
      switch (difficultyType) {
        case 'easy':
          return 'Easy';
        case 'medium':
          return 'Medium';
        case 'hard':
            return 'Hard';
      }
    },
    parseValue(value){
      return parseDifficulty(value);
    },
    parseLiteral(ast) {
        if (ast.kind === 'EnumValue') {
          return parseDifficulty(ast.value);
        }
    }
});

function parseDifficulty(value) {
    switch (value) {
        case 'Easy':
          return 'easy';
        case 'Medium':
          return 'medium';
        case 'Hard':
            return 'hard';
    }
}

module.exports = DifficultyType;