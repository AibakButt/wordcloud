import { gql } from '@apollo/client';

export const GET_WORD_CLOUD = gql`
  query GetWordCloud($length: Int!) {
    getWordCloud(length: $length) {
      word
      count
    }
  }
`;