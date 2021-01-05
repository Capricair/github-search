import React from "react";
import Star from "../Star";

export default function RepositoryList(props) {
  const { data } = props;
  return (
    <ul className="list-repository">
      {data.map((repository) => {
        return (
          <li key={repository.id}>
            <div className="title">
              <a href={repository.url} target="_blank">
                {repository.nameWithOwner}
              </a>
            </div>
            <div>{repository.description}</div>
            <div>
              {repository.repositoryTopics.nodes.map((item) => {
                const topic = item.topic || {};
                return (
                  <span key={topic.id} className="tag">
                    {topic.name}
                  </span>
                );
              })}
            </div>
            <div>
              <span className="star-info">
                <Star />
                <span>{repository.stargazerCount}</span>
              </span>
              <span>{(repository.primaryLanguage || {}).name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
