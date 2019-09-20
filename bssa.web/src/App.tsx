import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router";

import { Layout } from "./app/Layout";
import { Home } from "./app/Home";
import { ProductSearch } from "./pages/product/productSearch";
import { ProductEditPage } from './pages/product/productEditPage';
 
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
