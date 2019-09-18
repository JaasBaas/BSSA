import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from 'reactstrap';
import { Layout } from "./app/Layout";
import { Route } from "react-router";
import { Home } from "./app/Home";
import { ProductSearch } from "./Product/ProductSearch";
import { ProductEditPage } from './Product/ProductEditPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/Product/Search" component={ProductSearch} />
        <Route exact path="/Product/Edit/:id" component={ProductEditPage} />
      </Layout>
    </div>
  );
}

export default App;
