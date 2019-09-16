import React, { Component } from 'react';
import { Header } from '../component/header';
import { connect } from 'react-redux';
import { ItemSort } from '../component/item-sort';
import { setCoverNovelList } from '../action/index'
class HomePage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setCoverNovelList()
  }

  render() {
    return (
      <div>
        <Header/>
        <ItemSort/>
        <div className='home-cover-stories'>
          <div className='recommend-list'>
            home  
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
    user: state.user,
  }
}

export default connect(mapStateToProps, { setCoverNovelList})(HomePage);