const {
    GraphQLScalarType,
} = require('graphql');

const CategoryType = new GraphQLScalarType({
    name: 'CategoryType',
    serialize(categoryType) {
      switch (categoryType) {
        case 'any':
          return 'Any Category';
        case 9:
          return 'General Knowledge: India';
        case 10:
          return 'General Knowledge: Teaching Aptitude';
        case 11:
          return 'General Knowledge: CTET/TET';
        case 12:
          return 'Entertainment: Music';
        case 13:
          return 'Entertainment: Musicals & Theatres';
        case 14:
          return 'Entertainment: Television';
        case 15:
          return 'Entertainment: Video Games';
        case 16:
          return 'Entertainment: Board Games';
        case 17:
          return 'Science & Nature';
        case 18:
          return 'Science: Computers';
        case 19:
          return 'Science: Mathematics';
        case 20:
          return 'Mythology';
        case 21:  
          return 'Sports';
        case 22:
          return 'Geography';
        case 23:
          return 'History';
        case 24:
          return 'Politics';
        case 25:
          return 'Art';
        case 26:  
          return 'Celebrities';
        case 27:
		      return 'Animals';
		    case 28:
          return 'Vehicles';
        case 29:
          return 'Entertainment: Comics';
        case 30:
          return 'Science: Gadgets';
        case 31:
          return 'Entertainment: Japanese Anime & Manga';
        case 32:
          return 'Entertainment: Cartoon & Animations';
      }
    },
    parseValue(value){
      return parseCategory(value);
    },
    parseLiteral(ast) {
        if (ast.kind === 'EnumValue') {
          return parseCategory(ast.value);
        }
    }
});

function parseCategory(value) {
    switch (value) {
        case 'Any Category':
          return 'any';
        case 'General Knowledge: India':
          return 9;
        case 'General Knowledge: Teaching Aptitude':
            return 10;
        case 'General Knowledge: CTET/TET':
          return 11;
        case 'Entertainment: Music':
          return 12;
        case 'Entertainment: Musicals & Theatres':
          return 13;
        case 'Entertainment: Television':
          return 14;
        case 'Entertainment: Video Games':
            return 15;
        case 'Entertainment: Board Games':
          return 16;
        case 'Science & Nature':
          return 17;
        case 'Science: Computers':
          return 18;
        case 'Science: Mathematics':
            return 19;
        case 'Mythology':
          return 20;
        case 'Sports':
          return 21;
        case 'Geography':
          return 22;
        case 'History':
            return 23;
        case 'Politics':
          return 24;
        case 'Art':
          return 25;
        case 'Celebrities':
          return 26;
        case 'Animals':
            return 27;
        case 'Vehicles':
          return 28;
        case 'Entertainment: Comics':
          return 29;
        case 'Science: Gadgets':
          return 30;
        case 'Entertainment: Japanese Anime & Manga':
            return 31;
        case 'Entertainment: Cartoon & Animations':
          return 32;
    }
}

module.exports = CategoryType;