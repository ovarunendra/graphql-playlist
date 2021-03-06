import { gql } from 'apollo-boost';

const addTalkMutation = gql`
  mutation(
    $title: String!
    $author: String!
    $imageUri: String!
    $URL: String!
  ) {
    addTalk(title: $title, author: $author, imageUri: $imageUri, URL: $URL) {
      id
    }
  }
`;

export { addTalkMutation };
