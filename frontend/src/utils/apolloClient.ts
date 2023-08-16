import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log("backend url", process.env.NEXT_APP_BACKEND_API)

const client = new ApolloClient({
  uri: `${process.env.NEXT_APP_BACKEND_API}`,
  cache: new InMemoryCache(),
})

export default client;