export interface Repository {
  id: string;
  name: string;
  nameWithOwner: string;
  url: string;
  stargazerCount: number;
  description: string;
  repositoryTopics: {
    nodes: Array<RepositoryTopic>;
  };
  primaryLanguage?: {
    name: string;
  };
}

export interface RepositoryTopic {
  topic: {
    id: string;
    name: string;
  };
}
