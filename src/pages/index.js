import React, { useEffect } from "react"
import App from './app';
import '../styles/index.scss';
import createStore from '../state/createStore';
import { USER_LOGIN_IN } from '../action/constants';
import { Helmet } from "react-helmet"

export default (props) => {
  useEffect((props) => {
    console.log(props)

  });
  return (
    <div style={{ color: `teal` }}>
      <Helmet>
        <title>小说阅读</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Helmet>
      <App />
    </div>
  )
}

