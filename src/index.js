import "./style/index.scss";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { ApolloProvider } from "@apollo/client";
import client from "./api/client";
var Index = lazy(function () {
  return import("./pages/index");
});
var Routes = React.createElement(
  ApolloProvider,
  { client: client },
  React.createElement(
    Suspense,
    { fallback: React.createElement(Loading, null) },
    React.createElement(Router, null, React.createElement(Route, { path: "/", exact: true, component: Index }))
  )
);
ReactDOM.render(Routes, document.getElementById("app"));
if (module.hot) {
  module.hot.accept();
}
//# sourceMappingURL=index.js.map
