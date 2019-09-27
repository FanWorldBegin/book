import React, { Component } from 'react';
import Header from '../component/header';
import { connect } from 'react-redux';
import { ItemSort } from '../component/item-sort';
import { setCoverNovelListAsync } from '../action/index';
import NovellistItem from '../component/novellist-item';

const novelSort = [
  { index: 8, name: '封面推荐', detail: true },
  { index: 1, name: '玄幻魔法', detail: false},
  { index: 2, name: '武侠修真', detail: false},
  { index: 3, name: '都市言情', detail: false},
  { index: 4, name: '历史军事', detail: false },
  { index: 5, name: '侦探推理', detail: false },
  { index: 6, name: '网游动漫', detail: false },
  { index: 7, name: '科幻灵异', detail: false },
];

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    console.log('home');
    console.log(this.props);
    this.query();
  }

  query = async() => {
    //查询封面书籍list
    const {API={}} = this.props;
    if (API.novelsets) {
      await this.props.setCoverNovelListAsync({
        novelsets: API.novelsets,
      });
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    var { coverRecommend  = [] } = this.props.novelList;
    coverRecommend = coverRecommend.Result;
    let { loading } = this.state;
    console.log(this.props);
    return (
      <div>
        <Header {...this.props}/>
        <ItemSort/>
        <div className='home-cover-stories'>
          {
            loading ? <img className='loading' src={require('../assets/loading.svg')} /> : (
              <div className='recommend-list'>
                {
                  novelSort.map(item => {
                    return (
                      <div className='sort-item' key={item.index}>
                        <div className='list-title'>{item.name}</div>
                        <NovellistItem detail={item.detail} novelList={(coverRecommend || {})[item.index]} />
                      </div>
                    );
                  })
                }
              </div>
            )
          }

        </div>   
      </div>
    );
  }

}
//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  return {
    novelList: state.novelList,
  };
};

export default connect(mapStateToProps, { setCoverNovelListAsync })(HomePage);