import client from "./client";
import { gql } from "@apollo/client";

export default {
  searchRepository: function (keyword = "") {
    return client.query({
      query: gql`
        query repository {
          search(type: REPOSITORY, first: 10, query: ${keyword}) {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            nodes {
              ... on Repository {
                id
                name
                nameWithOwner
                url
                stargazerCount
                description
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                primaryLanguage {
                  name
                }
              }
            }
            repositoryCount
          }
        }
      `,
    });
  },
};
