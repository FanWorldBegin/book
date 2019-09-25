import React, { Component } from 'react';
import HeaderBack from '../component/header-back';
import { connect } from 'react-redux';
import { setNovelListAsync } from '../action/index';
class Booktrack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    
    console.log(this.props.setNovelListAsync({ pageIndex: 1}))
  }



  render() {
    return (
      <div className="booktrack-container">
        <HeaderBack title='我的书架'  />
      </div>
    )
  }
}

//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  const { novelList } = state; 
  return {
    novelCollectionList: novelList.novelCollectionList,
  }
}

export default connect(mapStateToProps, { setNovelListAsync})(Booktrack)