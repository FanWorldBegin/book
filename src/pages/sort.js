import React, { Component } from 'react';
import { Header } from '../component/header';
import { ItemSort } from '../component/item-sort';
import { connect } from 'react-redux';
import { setCategoryListAsync, } from '../action/index';
import { NovelList } from '../component/novel-list';
import { categories } from '../config/req-filter';
class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      queryType: 1,
      loading: true,
    };
    
  }

  componentDidMount() {
    this.query({
      queryType: 1, 
      pageIndex: 1,
    });
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
    let { active, queryType, loading } = this.state;
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
                  pagingIndex={catePagingIndex}
                  loading={loading}
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
    catePagingIndex: novelSort.catePagingIndex,
  }
}

export default connect(mapStateToProps, { setCategoryListAsync})(Sort);