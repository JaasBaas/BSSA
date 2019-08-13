import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./app/Home";
// import { FetchData } from "./components/FetchData";
// import { Counter } from "./components/Counter";

import "./custom.css";
// import { Index } from "./components/Catalogue/Index";
import { productIndex } from "./product/productIndex";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        {/* <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
        <Route path="/Catalogue/Index" component={Index} />*/}
        <Route path="/Product/Index" component={productIndex} />
      </Layout>
    );
  }
}
