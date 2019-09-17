import React, { Component } from 'react';
import { Header } from '../component/header';
import { connect } from 'react-redux';
import { ItemSort } from '../component/item-sort';
import { setCoverNovelListAsync } from '../action/index';
import NovellistItem from '../component/novellist-item';

class HomePage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setCoverNovelListAsync()
  }

  render() {
    const { coverRecommend = [] } = this.props.novelList
    return (
      <div>
        <Header/>
        <ItemSort/>
        <div className='home-cover-stories'>
          <div className='recommend-list'>
            <NovellistItem novelList={coverRecommend} />
          </div>
        </div>   
      </div>
    )
  }

}
//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  console.log(state)
  return {
    novelList: state.novelList,
  }
}

export default connect(mapStateToProps, { setCoverNovelListAsync })(HomePage);