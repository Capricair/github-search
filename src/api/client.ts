import { ApolloClient, InMemoryCache } from "@apollo/client";
import AccessToken from "./AccessToken";

export default new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    "user-agent": "JS GraphQL",
    Authorization: `Bearer ${AccessToken}`,
  },
});
