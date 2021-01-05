import { gql } from "@apollo/client";

export default {
  searchRepository: gql`
    query searchRepository($keyword: String!) {
      search(type: REPOSITORY, first: 10, query: $keyword) {
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
                  id
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
};
