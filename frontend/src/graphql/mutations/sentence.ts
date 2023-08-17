import { gql } from '@apollo/client';

export const ADD_SENTENCE = gql`
  mutation AddSentence($sentence: String!) {
    addSentence(sentence: $sentence) {
      sentence
    }
  }
`
export const CLEAR_SENTENCES = gql`
  mutation ClearSentences {
    clearSentences
  }
`

