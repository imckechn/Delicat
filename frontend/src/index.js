import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/css/style.css"
// pages
import {Homepage} from "./components/Homepage";
import {NewListPage} from "./components/NewListPage";
import {FlyerPage} from "./components/FlyerPage";
import {LoginPage} from "./components/LoginPage";
import {RegisterPage} from "./components/RegisterPage";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={(props) => <Homepage {...props} />} />
      <Route path="/new-list" 
        render={(props) => <NewListPage {...props} />}
      />
      <Route path="/flyer" 
        render={(props) => <FlyerPage {...props} />}
      />
      <Route path="/login" 
        render={(props) => <LoginPage {...props} />}
      />
      <Route path="/register" 
        render={(props) => <RegisterPage {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
