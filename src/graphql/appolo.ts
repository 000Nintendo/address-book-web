import { ApolloClient, InMemoryCache } from "@apollo/client";

const appoloClient = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache(),
});

export default appoloClient;