import "./index.scss";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import GraphQL from "../../api";
import Star from "../../components/Star";
import { Input } from "antd";
import debounce from "lodash/debounce";

export default function Index() {
  const [keyword, setKeyword] = useState("");
  const { loading, error, data } = useQuery(GraphQL.searchRepository, {
    variables: { keyword: keyword },
  });

  const searchHandler = debounce((e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  }, 500);

  let content = <div />;
  if (loading) {
    content = <div className="text-center">Loading...</div>;
  } else if (error) {
    content = <div className="text-center">{error}</div>;
  } else if (data.search.nodes.length === 0) {
    content = <div className="text-center">No Data</div>;
  } else {
    content = (
      <ul className="list-repository">
        {data.search.nodes.map((repository) => {
          return (
            <li key={repository.id}>
              <div className="title">{repository.nameWithOwner}</div>
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

  return (
    <div className="page page-index">
      <div className="page-index-container">
        <div>
          <Input className="search-input" onInput={searchHandler} />
        </div>
        {content}
      </div>
    </div>
  );
}
