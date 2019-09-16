import React, { Component } from 'react';
import { Link } from "react-router-dom";
export class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='itemize-container'>
        <Link to="/users/" className='itemize-item'>首页</Link>
        <Link to="/users/" className='itemize-item'>分类</Link>
        <Link to="/users/" className='itemize-item'>全本</Link>
        <Link to="/users/" className='itemize-item'>排行</Link>
        <Link to="/users/" className='itemize-item'>书架</Link>
      </div>
    )
  }

}
