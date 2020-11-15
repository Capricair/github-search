import "./style/index.scss";
import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loading from "./components/Loading/index";
import {ApolloProvider} from "@apollo/client";
import client from "./api/client";

const Index = lazy(()=>import("./pages/index"));
const Test = lazy(()=>import("./pages/test"));

const Routes = (
    <ApolloProvider client={client}>
        <Suspense fallback={<Loading/>}>
            <Router>
                <Route path="/" exact component={Index} />
                <Route path="/test" exact component={Test} />
            </Router>
        </Suspense>
    </ApolloProvider>
);

ReactDOM.render(Routes, document.getElementById("app"));

if (module.hot) {
    module.hot.accept();
}
