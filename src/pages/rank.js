import React, { Component } from 'react';
import Header  from '../component/header';
import { ItemSort } from '../component/item-sort';
import { connect } from 'react-redux';
import { setRankListSortAsync, setRankListAsync } from '../action/index';
import { NovelList } from '../component/novel-list';
import { timeout } from 'q';
class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      loading: true,
      pageIndex: 1,
      queryType: 0,
    }
  }
  //下一页
  pageIndexAdd = (total) => {
    this.setState((state, props) => ({
      pageIndex: state.pageIndex < Math.ceil(total / 20) ? state.pageIndex + 1 : Math.ceil(total / 20)
    }))
  }

  //上一页
  pageIndexMinus = () => {
    this.setState((state, props) => ({
      pageIndex: state.pageIndex > 1 ? state.pageIndex - 1 : 1
    }))
  }

  //尾页
  pageIndexEnd = (total) => {
    this.setState({
      pageIndex: Math.ceil(total / 20)
    })
  }

  componentDidMount() {
    console.log(this.props)
    this.queryListSort();
    const { queryType } = this.state;
    this.query({
      pageIndex: 1,
      type: queryType
    })
  }
  queryListSort = async () => {
    this.setState({
      loading: true,
    })
    var res = await this.props.setRankListSortAsync();
    var item = (res || [])[0];
    this.setState({
      queryType: (item || {}).Sort
    })
  }
  query = async ({ pageIndex, type}) => {

    await this.props.setRankListAsync({ pageIndex, type: type });
    this.setState({
      loading: false,
      
    })
  }

  render() {
    console.log(this.props.rankListType);
    let { active, loading, pageIndex} = this.state;
    console.log(active)
    const { rankListType = [], rankList = [], rankListTotal } = this.props;
    return (
      <div>
        <Header />
        <ItemSort />
        {
          loading ? <img className='loading' src={require('../assets/loading.svg')} /> : (
            <div className='rank-container'>
              <div className='sort-items'>
                {
                  rankListType.map((item, index) => {
                    return (
                      <div className={`sort-button ${active == index ? 'active' : ''}`} key={item.ID} onClick={
                        e => {
                          this.props.setRankListAsync({
                            pageIndex: 1,
                            type: item.Sort,
                          });
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
                <NovelList rankList={rankList} 
                  total={rankListTotal}
                  query={this.query}
                  pageIndex={pageIndex}
                  pageIndexAdd={this.pageIndexAdd}
                  pageIndexMinus={this.pageIndexMinus}
                  pageIndexEnd={this.pageIndexEnd} />

              </div>

            </div>
          )
        }

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
    rankListTotal: novelList.rankListTotal,
  }
}

export default connect(mapStateToProps, { setRankListSortAsync, setRankListAsync })(Rank);