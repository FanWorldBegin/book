import React, { Component } from 'react';
import { Header } from '../component/header';
import { ItemSort } from '../component/item-sort';
import { connect } from 'react-redux';
import { setCategoryListAsync, } from '../action/index';
import { NovelList } from '../component/novel-list';
const categories=[
  { name: '玄幻魔法', categories:1 },
  { name: '武侠修真', categories:2 },
  { name: '都市言情', categories:3 },
  { name: '历史军事', categories:4 },
  { name: '侦探推理', categories:5 },
  { name: '网游动漫', categories:6 },
  { name: '科幻灵异', categories:7 },
]
class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      queryType: 1,
    };
    
  }

  componentDidMount() {
    console.log(this.props)
    this.props.setCategoryListAsync({
      queryType: 1,
      pageIndex: 1
    });
  }

  render() {
    let { active, queryType } = this.state;
    const { categoryList = [], categoryTotal = 0, catePagingIndex, } = this.props;
    return (
      <div>
        <Header />
        <ItemSort />
        <div className='sort-container'>
          <div className='sort-items'>
            {
              categories.map((item, index) => {
                return (
                  <div className={`sort-button ${active == index ? 'active' : ''}`} key={item.categories} onClick={
                    e => {
                      this.props.setCategoryListAsync({
                        queryType: item.categories,
                        pageIndex: 1
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
              query={this.props.setCategoryListAsync} 
              queryType={queryType}
              pagingIndex={catePagingIndex}
              />

          </div>

        </div>

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