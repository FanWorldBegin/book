import React, { Component } from 'react';
import { newupdatenovels } from '../config/api/index';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { routeConfig } from "../config/route-config";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducer/index';
import HomePage from './home';
// 调试工具 
import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(
  rootReducer,
  composeWithDevTools()
)

export default class MainEntry extends Component {
  
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.query();
  }

  query = async () => {
    var queryReturn = await newupdatenovels();
    console.log(queryReturn)
  }
    handleRoutes = route => {
    const { path, exact } = route;
    const obj = { path: path };
    if (exact) obj["exact"] = true;
    return (
      <Route
        key={path}
        {...obj}
        render={props => {
          return (
            <route.component
              {...props}
              {...this.props}
            />
          );
        }}
      />
    );
  };
  render() {
    return (
      <div className='main-container'>
        <Router>
         <div>
            {routeConfig.map((route, idx) => this.handleRoutes(route))}
         </div>
            <Route exact path="/" render={() => (
              <Redirect to="/home" />
            )} />
        </Router>
      </div>
    )
  }

}
