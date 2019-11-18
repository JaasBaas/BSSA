import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'hookrouter';
import { Layout } from './app/Layout';
import routes from './app/routes';

const App: React.FC = () => {
  const routeResult = useRoutes(routes);

  return (
    <div className="App">
      <Layout>{routeResult}</Layout>
    </div>
  );
};

export default App;
