import React, { Component } from 'react';
import { navigate } from "gatsby"
export class HeaderBack extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { title } = this.props;
    return (
      <div className='header-container'>
        <span className='back-btn' onClick={
          e=>{
            window.history.back();  
          }
        }>返回</span>
        <div className='title'>{ title }</div>

        <span className='back-btn left' onClick={
          e => {
            navigate("/")
          }
        }>首页</span>
      </div>
    )
  }

}
