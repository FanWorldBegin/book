import React, { Component } from 'react';
import { Link } from "gatsby"

export class ItemSort extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='itemize-container'>
        <div className='items'>
          <Link to="/home" className='itemize-item'>首页</Link>
          <Link to="/sort" className='itemize-item'>分类</Link>
          <Link to="/users" className='itemize-item'>全本</Link>
          <Link to="/users" className='itemize-item'>排行</Link>
          <Link to="/users" className='itemize-item'>书架</Link>
        </div>
      </div>
    )
  }

}
