import React, { useEffect } from "react";
import App from './app';
import '../styles/index.scss';

import { Helmet } from "react-helmet";

export default (props) => {
  return (
    <div style={{ color: `teal` }}>
      <Helmet>
        <title>小说阅读</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Helmet>
      <App  {...props}/>
    </div>
  );
};

