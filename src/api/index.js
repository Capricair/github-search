var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
import { gql } from "@apollo/client";
export default {
  searchRepository: gql(
    templateObject_1 ||
      (templateObject_1 = __makeTemplateObject(
        [
          "\n    query searchRepository($keyword: String!) {\n      search(type: REPOSITORY, first: 10, query: $keyword) {\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n        nodes {\n          ... on Repository {\n            id\n            name\n            nameWithOwner\n            url\n            stargazerCount\n            description\n            repositoryTopics(first: 10) {\n              nodes {\n                topic {\n                  id\n                  name\n                }\n              }\n            }\n            primaryLanguage {\n              name\n            }\n          }\n        }\n        repositoryCount\n      }\n    }\n  ",
        ],
        [
          "\n    query searchRepository($keyword: String!) {\n      search(type: REPOSITORY, first: 10, query: $keyword) {\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n        nodes {\n          ... on Repository {\n            id\n            name\n            nameWithOwner\n            url\n            stargazerCount\n            description\n            repositoryTopics(first: 10) {\n              nodes {\n                topic {\n                  id\n                  name\n                }\n              }\n            }\n            primaryLanguage {\n              name\n            }\n          }\n        }\n        repositoryCount\n      }\n    }\n  ",
        ]
      ))
  ),
};
var templateObject_1;
//# sourceMappingURL=index.js.map
