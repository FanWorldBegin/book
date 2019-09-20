import React, { Component } from 'react';
import { Header } from '../component/header';
import { ItemSort } from '../component/item-sort';
import { connect } from 'react-redux';
import { setWholeNovelListAsync } from '../action/index';
import { NovelList } from '../component/novel-list';

class WholeNovel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      loading: true,
    };

  }

  componentDidMount() {
    this.query();
  }

  query = async() => {
    this.setState({
      loading: true,
    })
    await this.props.setWholeNovelListAsync({
      pageIndex: 1
    });
    this.setState({
      loading: false,
    })
  }
  render() {
    let { active, loading  } = this.state;
    const { wholeNovelList = [], wholeNovelTotal = 0, } = this.props;
    return (
      <div>
        <Header />
        <ItemSort />
        {
          loading ? <img className='loading' src={require('../assets/loading.svg')} /> : (
            <div className='whole-container'>
              <NovelList rankList={wholeNovelList}
                total={wholeNovelTotal}
                query={this.query}
                loading={loading}
              />
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
    wholeNovelList: novelList.wholeNovelList, //全本小说分类列表
    wholeNovelTotal: novelList.wholeNovelTotal,
  }
}

export default connect(mapStateToProps, { setWholeNovelListAsync })(WholeNovel);