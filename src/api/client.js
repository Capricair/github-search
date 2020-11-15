import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
        "user-agent": "JS GraphQL",
        Authorization: "Bearer e8df96113267a5de54151c414b2d8830b720e9a3",
    },
});
