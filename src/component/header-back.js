import React, { Component } from 'react';
export class HeaderBack extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='header-container'>
        <span onClick={
          e=>{
            window.history.back();  
          }
        }>返回</span>
      </div>
    )
  }

}
