import "./index.scss";
import React, { ReactNode, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import GraphQL from "../../api";
import { RepositoryList, NoData } from "../../components";
import { Input } from "antd";
import debounce from "lodash/debounce";
import { Repository } from "../../interfaces";

const SEARCH_INPUT_DELAY = 800;

let IsFirstRender = true;

export default function Index() {
  const [history, setHistory] = useState<Array<String>>([]);
  const [getRepositories, { called, loading, data, error }] = useLazyQuery(GraphQL.searchRepository);

  const searchHandler = debounce((e) => {
    const keyword = e.target.value;
    if (keyword) {
      // 请求仓库数据
      getRepositories({ variables: { keyword: keyword } });
      // 设置搜索历史，保留10个
      const arr = history.filter((item) => item !== keyword);
      arr.unshift(keyword);
      if (arr.length > 10) {
        arr.pop();
      }
      setHistory(arr);
    }
  }, SEARCH_INPUT_DELAY);

  let repositories: Array<Repository> = [];
  let content: ReactNode = <div />;
  if (called) {
    IsFirstRender = false;
    if (loading) {
      content = <div className="text-center">Loading...</div>;
    } else if (error) {
      content = <div className="text-center">服务器开小差了</div>;
    } else if (data) {
      repositories = data.search.nodes;
      if (repositories.length === 0) {
        content = <NoData />;
      } else {
        content = <RepositoryList data={repositories} />;
      }
    }
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
        {!IsFirstRender && (
          <div className="list-search-result">
            <div className="header">搜索结果</div>
            <div className="body">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
}
