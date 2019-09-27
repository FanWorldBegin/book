import React, { Component } from "react"
import Header from "../component/header"
import { ItemSort } from "../component/item-sort"
import { connect } from "react-redux"
import { setWholeNovelListAsync } from "../action/index"
import { NovelList } from "../component/novel-list"

class WholeNovel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      loading: true,
      pageIndex: 1,
    }
  }
  //下一页
  pageIndexAdd = total => {
    this.setState((state, props) => ({
      pageIndex:
        state.pageIndex < Math.ceil(total / 20)
          ? state.pageIndex + 1
          : Math.ceil(total / 20),
    }))
  }

  //上一页
  pageIndexMinus = () => {
    this.setState((state, props) => ({
      pageIndex: state.pageIndex > 1 ? state.pageIndex - 1 : 1,
    }))
  }

  //尾页
  pageIndexEnd = total => {
    this.setState({
      pageIndex: Math.ceil(total / 20),
    })
  }

  componentDidMount() {
    this.query({
      pageIndex: 1,
    })
  }

  query = async ({ pageIndex }) => {
    this.setState({
      loading: true,
    })
    const { API } = this.props
    if ((API || {}).getwholeNovelList) {
      await this.props.setWholeNovelListAsync({
        pageIndex,
        getwholeNovelList: API.getwholeNovelList,
      })
      this.setState({
        loading: false,
      })
    }
  }
  render() {
    let { pageIndex, loading } = this.state
    const { wholeNovelList = [], wholeNovelTotal = 0 } = this.props
    return (
      <div>
        <Header {...this.props} />
        <ItemSort />
        {loading ? (
          <img className="loading" src={require("../assets/loading.svg")} />
        ) : (
          <div className="whole-container">
            <NovelList
              rankList={wholeNovelList}
              total={wholeNovelTotal}
              query={this.query}
              pageIndex={pageIndex}
              pageIndexAdd={this.pageIndexAdd}
              pageIndexMinus={this.pageIndexMinus}
              pageIndexEnd={this.pageIndexEnd}
            />
          </div>
        )}
      </div>
    )
  }
}

//在reducer 中创建counter 的reducer
const mapStateToProps = state => {
  const { novelList = {} } = state
  return {
    wholeNovelList: novelList.wholeNovelList, //全本小说分类列表
    wholeNovelTotal: novelList.wholeNovelTotal,
  }
}

export default connect(
  mapStateToProps,
  { setWholeNovelListAsync }
)(WholeNovel)
