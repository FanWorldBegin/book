import React, { Component } from 'react';
import { newupdatenovels } from '../config/api/index';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index';
import HomePage from './home';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

// 调试工具 
import {composeWithDevTools} from 'redux-devtools-extension';
const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(sagaMiddleware) //安装中间件
  
//   )
// )
// sagaMiddleware.run(rootSaga);
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

  render() {
    return (
      <div className='main-container'>
        <HomePage />
      </div>
    )
  }

}
