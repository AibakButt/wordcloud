import { gql, concatenateTypeDefs } from 'apollo-server-express';
import { sentenceTypeDefs } from './sentence.type';

const typeDefs = gql`
  ${concatenateTypeDefs([
    sentenceTypeDefs,
  ])}
`;

export default typeDefs;