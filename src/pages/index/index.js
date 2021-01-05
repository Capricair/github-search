import "./index.scss";
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import GraphQL from "../../api";
import Star from "../../components/Star";
import { Input } from "antd";
import debounce from "lodash/debounce";
export default function Index() {
  var _a = useState([]),
    history = _a[0],
    setHistory = _a[1];
  var _b = useLazyQuery(GraphQL.searchRepository),
    getRepositories = _b[0],
    _c = _b[1],
    called = _c.called,
    loading = _c.loading,
    data = _c.data;
  var searchHandler = debounce(function (e) {
    var keyword = e.target.value;
    if (keyword) {
      // 请求数据
      getRepositories({ variables: { keyword: keyword } });
      // 设置搜索历史
      var arr = history.filter(function (item) {
        return item !== keyword;
      });
      arr.unshift(keyword);
      if (arr.length > 10) {
        arr.pop();
      }
      setHistory(arr);
    }
  }, 500);
  var repositoryList = [];
  var content = React.createElement("div", null);
  if (called) {
    if (loading) {
      content = React.createElement("div", { className: "text-center" }, "Loading...");
    } else {
      repositoryList = data.search.nodes;
      if (repositoryList.length === 0) {
        content = React.createElement(NoData, null);
      } else {
        content = React.createElement(RepositoryList, { data: repositoryList });
      }
    }
  } else {
    content = React.createElement(NoData, null);
  }
  return React.createElement(
    "div",
    { className: "page page-index" },
    React.createElement(
      "div",
      { className: "page-index-container" },
      React.createElement(
        "div",
        null,
        React.createElement(Input, { className: "search-input", onInput: searchHandler })
      ),
      history.length > 0 &&
        React.createElement(
          "div",
          { className: "list-history" },
          React.createElement("div", { className: "header" }, "\u5386\u53F2\u8BB0\u5F55"),
          React.createElement(
            "div",
            { className: "body" },
            history.map(function (item, index) {
              return React.createElement("span", { key: index, className: "tag" }, item);
            })
          )
        ),
      React.createElement(
        "div",
        { className: "list-search-result" },
        React.createElement("div", { className: "header" }, "\u641C\u7D22\u7ED3\u679C"),
        React.createElement("div", { className: "body" }, content)
      )
    )
  );
}
function NoData() {
  return React.createElement("div", { className: "no-data" }, "\u7A7A");
}
function RepositoryList(props) {
  var data = props.data;
  return React.createElement(
    "ul",
    { className: "list-repository" },
    data.map(function (repository) {
      return React.createElement(
        "li",
        { key: repository.id },
        React.createElement(
          "div",
          { className: "title" },
          React.createElement("a", { href: repository.url, target: "_blank" }, repository.nameWithOwner)
        ),
        React.createElement("div", null, repository.description),
        React.createElement(
          "div",
          null,
          repository.repositoryTopics.nodes.map(function (item) {
            var topic = item.topic || {};
            return React.createElement("span", { key: topic.id, className: "tag" }, topic.name);
          })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            { className: "star-info" },
            React.createElement(Star, null),
            React.createElement("span", null, repository.stargazerCount)
          ),
          React.createElement("span", null, (repository.primaryLanguage || {}).name)
        )
      );
    })
  );
}
//# sourceMappingURL=index.js.map
