import React from 'react';
import './App.css';

import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.9.0";
// pages for this product
import PresentationPage from "views/PresentationPage/PresentationPage.js";

var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/" component={PresentationPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
