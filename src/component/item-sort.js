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
          <Link to="/home" className='itemize-item' activeClassName="active">首页</Link>
          <Link to="/sort" className='itemize-item' activeClassName="active">分类</Link>
          <Link to="/wholeNovel" className='itemize-item' activeClassName="active">全本</Link>
          <Link to="/rank" className='itemize-item' activeClassName="active">排行</Link>
          <Link to="/bookrack" className='itemize-item' activeClassName="active">书架</Link>
        </div>
      </div>
    )
  }

}
