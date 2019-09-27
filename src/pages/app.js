import React, { Component } from "react"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "../reducer/index"
import HomePage from "./home"
import createSagaMiddleware from "redux-saga"
import { navigate } from "gatsby"

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
    navigate("/home/")
  }

  render() {
    return (
      <div className="main-container">
        <HomePage />
      </div>
    )
  }
}
