import React, { Component } from 'react';
import { Header } from '../component/header';
import { ItemSort } from '../component/item-sort';
import { connect } from 'react-redux';
import { setRankListSortAsync, setRankListAsync } from '../action/index';
import { NovelList } from '../component/novel-list';
class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.props.setRankListSortAsync();
    this.props.setRankListAsync(1);
  }

  render() {
    console.log(this.props.rankListType);
    let { active } = this.state;
    console.log(active)
    const { rankListType = [], rankList=[] } = this.props;
    return (
      <div>
        <Header />
        <ItemSort />
        <div className='rank-container'>
          <div className='sort-items'>
            {
              rankListType.map((item, index) => {
                return (
                  <div className={`sort-button ${active == index ? 'active' : ''}` } key={item.ID} onClick={
                    e=>{
                      this.props.setRankListAsync(item.Sort);
                      this.setState({
                        active: index,
                      })
                    }
                  }>{item.RankingTypeName}</div>
                )
              })
            }
          </div>
          <div className='list-items'>
            <NovelList rankList={rankList}/>

          </div>

        </div>

      </div>
    )
  }

}

//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  console.log(state)
  const { novelList = {} } = state
  return {
    rankListType: novelList.rankListType, //小说排行种类
    rankList: novelList.rankList, //小说排行
  }
}

export default connect(mapStateToProps, { setRankListSortAsync, setRankListAsync })(Rank);