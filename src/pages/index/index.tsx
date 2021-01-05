import "./index.scss";
import React, { ReactNode, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import GraphQL from "../../api";
import Star from "../../components/Star";
import { Input } from "antd";
import debounce from "lodash/debounce";

const SEARCH_INPUT_DELAY = 800;

export default function Index() {
  const [history, setHistory] = useState<Array<String>>([]);
  const [getRepositories, { called, loading, data }] = useLazyQuery(GraphQL.searchRepository);

  const searchHandler = debounce((e) => {
    const keyword = e.target.value;
    if (keyword) {
      // 请求数据
      getRepositories({ variables: { keyword: keyword } });
      // 设置搜索历史
      const arr = history.filter((item) => item !== keyword);
      arr.unshift(keyword);
      if (arr.length > 10) {
        arr.pop();
      }
      setHistory(arr);
    }
  }, SEARCH_INPUT_DELAY);

  let repositoryList = [];
  let content: ReactNode = <div />;
  if (called) {
    if (loading) {
      content = <div className="text-center">Loading...</div>;
    } else {
      repositoryList = data.search.nodes;
      if (repositoryList.length === 0) {
        content = <NoData />;
      } else {
        content = <RepositoryList data={repositoryList} />;
      }
    }
  } else {
    content = <NoData />;
  }

  return (
    <div className="page page-index">
      <div className="page-index-container">
        <div>
          <Input className="search-input" onInput={searchHandler} placeholder="请输入搜索关键字" />
        </div>
        {history.length > 0 && (
          <div className="list-history">
            <div className="header">历史记录</div>
            <div className="body">
              {history.map((item, index) => (
                <span key={index} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="list-search-result">
          <div className="header">搜索结果</div>
          <div className="body">{content}</div>
        </div>
      </div>
    </div>
  );
}

function NoData() {
  return <div className="no-data">空</div>;
}

function RepositoryList(props) {
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
