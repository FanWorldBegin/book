import React, { Component } from 'react';
import { HeaderBack } from '../component/header-back';
export default class NovellistItem extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    const { novelList, detail } = this.props;
    console.log(this.props)
    return (
      <div className='novel-container'>
        <HeaderBack/>
        显示小说
        {this.props.location.state.ID}
      </div>
    )
  }
}