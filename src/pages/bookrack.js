import React, { Component } from 'react';
import { HeaderBack } from '../component/header-back';
export default class Booktrack extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="booktrack-container">
        <HeaderBack title='我的书架'  />
      </div>
    )
  }
}