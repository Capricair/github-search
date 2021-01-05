import "./index.scss";
import * as React from "react";
// import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client";
import GraphQL from "../../api";
import { Spin } from "antd";
// @ts-ignore
import Star from "../../components/Star";

export default function Index() {
  const { loading, error, data } = useQuery(GraphQL.searchRepository, {
    variables: { keyword: "react" },
  });

  let content = <div />;
  if (loading) {
    content = (
      <div className="text-center">
        <Spin />
      </div>
    );
  } else if (error) {
    content = <div className="text-center">{error}</div>;
  } else {
    content = (
      <ul className="list-unstyled">
        {data.search.nodes.map((repository) => {
          return (
            <li key={repository.id}>
              <div>{repository.nameWithOwner}</div>
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
                <span>
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

  return (
    <div className="page page-index">
      <div className="page-index-container">{content}</div>
    </div>
  );
}
