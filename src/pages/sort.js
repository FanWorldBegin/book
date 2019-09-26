import React, { Component } from 'react';
import Header from '../component/header';
import { ItemSort } from '../component/item-sort';
import { connect } from 'react-redux';
import { setCategoryListAsync, } from '../action/index';
import { NovelList } from '../component/novel-list';
import { categories } from '../config/structure';
const pageSize= 20;
class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      queryType: 1,
      loading: true,
      pageIndex: 1,
    };
    
  }

  componentDidMount() {
    this.query({
      queryType: 1, 
      pageIndex: 1,
    });
  }
  //下一页
  pageIndexAdd = (total) => {
    this.setState((state, props) => ({
      pageIndex: state.pageIndex < Math.ceil(total / pageSize) ? state.pageIndex + 1 : Math.ceil(total / pageSize)
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
  query = async ({ queryType, pageIndex}) => {
    this.setState({
      loading: true,
    })
    await this.props.setCategoryListAsync({
      queryType,
      pageIndex
    });
    this.setState({
      loading: false,
    })
  }
  render() {
    let { active, queryType, loading, pageIndex } = this.state;
    const { categoryList = [], categoryTotal = 0, catePagingIndex, } = this.props;
    return (
      <div>
        <Header />
        <ItemSort />
        {
          loading ? <img className='loading' src={require('../assets/loading.svg')} /> : (
            <div className='sort-container'>
              <div className='sort-items'>
                {
                  categories.map((item, index) => {
                    return (
                      <div className={`sort-button ${active == index ? 'active' : ''}`} key={item.categories} onClick={
                        e => {
                          this.query({
                            queryType: item.categories,
                            pageIndex: 1,
                          });
                          this.setState({
                            active: index,
                            queryType: item.categories
                          })
                        }
                      }>{item.name}</div>
                    )
                  })
                }
              </div>
              <div className='list-items'>
                <NovelList rankList={categoryList}
                  total={categoryTotal}
                  query={this.query}
                  queryType={queryType}
                  pageIndex={pageIndex}
                  pageIndexAdd={this.pageIndexAdd}
                  pageIndexMinus={this.pageIndexMinus}
                  pageIndexEnd={this.pageIndexEnd}
                />

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
  const { novelSort = {} } = state
  return {
    categoryList: novelSort.categoryList, //小说分类列表
    categoryTotal: novelSort.categoryTotal, //小说分类列表长度
  }
}

export default connect(mapStateToProps, { setCategoryListAsync})(Sort);