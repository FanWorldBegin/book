import React, { Component } from 'react';
import { Header } from '../component/header'
export default class HomePage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Header/>
        home
      </div>
    )
  }

}
