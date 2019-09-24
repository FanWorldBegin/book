import React, { Component } from 'react';
import { Link } from "gatsby";
import { HeaderBack } from '../component/header-back';
export class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='header-container'>
        <div className='title'>IReader</div>
        <div className='login-container'>
          <Link to='/login/' className='log-btn'>登陆</Link>
          <Link to='/register/' className='log-btn'>注册</Link>
        </div>
      </div>
    )
  }

}
