import {gql} from "apollo-server-express";

export const sentenceTypeDefs = gql`
  type Word {
    word: String
    count: Int
  }

  type Sentence {
    sentence: String
  }

  type Query {
    getWordCloud(length: Int): [Word]
  }

  type Mutation {
    addSentence(sentence: String!): Sentence
    clearSentences: Boolean
  }
`