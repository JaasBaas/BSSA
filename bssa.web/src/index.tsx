import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styleSheets/bootstrap/bootstrap.slate.min.css';
//import './styleSheets/bootstrap/greyston.min.css';
//import './styleSheets/bootstrap/darkster.min.css';
//import './styleSheets/bootstrap/lux.min.css';

//import './styleSheets/app.darkly.css';
import './styleSheets/bootstrap/darkly.css';
import './styleSheets/bootstrap/darkly.custom.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
