import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const getCategoryQuery = gql`
  {
    quizViewer {
      categories
    }
  }
`;

const addQuestionMutation = gql`
  mutation(
    $difficulty: DifficultyType!
    $category: CategoryType!
    $question: String!
    $correctAnswer: String!
    $options: [String]!
  ) {
    addQuestion(
      difficulty: $difficulty
      category: $category
      question: $question
      correctAnswer: $correctAnswer
      options: $options
    ) {
      id
    }
  }
`;

export {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
  getBookQuery,
  getCategoryQuery,
  addQuestionMutation,
};
