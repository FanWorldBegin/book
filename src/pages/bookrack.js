import React, { Component } from "react";
import HeaderBack from "../component/header-back";
import { connect } from "react-redux";
import { setNovelListAsync, setUserInfo } from "../action/index";
import { NovelListCollection } from "../component/novel-list-collection";
import { navigate } from "gatsby";
import { ItemSort } from "../component/item-sort";

class Booktrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pageIndex: 1,
    };
  }
  componentDidMount() {
    //验证是否登陆
    if (localStorage.getItem("userInfo")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.ID) {
        this.props.setUserInfo(userInfo);
      }
    }
    setTimeout(e => {
      const { userInfo } = this.props;
      console.log(userInfo);
      console.log("是否登陆");
      console.log(userInfo);
      if (!userInfo.Token) {
        navigate("/login");
      } else {
        this.query();
      }
    });
  }

  query = async () => {
    this.setState({
      loading: true,
    });
    const { API = {} } = this.props;
    if (API.queryCollection) {
      await this.props.setNovelListAsync({
        pageIndex: 1,
        queryCollection: API.queryCollection,
      });
      this.setState({
        loading: false,
      });
    }
  };

  //下一页
  pageIndexAdd = total => {
    this.setState((state, props) => ({
      pageIndex:
        state.pageIndex < Math.ceil(total / 20)
          ? state.pageIndex + 1
          : Math.ceil(total / 20),
    }));
  };

  //上一页
  pageIndexMinus = () => {
    this.setState((state, props) => ({
      pageIndex: state.pageIndex > 1 ? state.pageIndex - 1 : 1,
    }));
  };

  //尾页
  pageIndexEnd = total => {
    this.setState({
      pageIndex: Math.ceil(total / 20),
    });
  }

  delCollection = async ID => {
    const { userInfo = {}, API = {} } = this.props;
    if (userInfo.Token) {
      await API.delCollection({ ID });
    } else {
      navigate("/login/");
    }
  }

  render() {
    let { loading, pageIndex } = this.state;
    const { novelCollectionList, novelCollectionTotal } = this.props;
    return (
      <div className="booktrack-container">
        <HeaderBack title="我的书架" {...this.props} />
        <ItemSort />
        <div className="main-title">我的书架-会员中心</div>
        {loading ? (
          <img className="loading" src={require("../assets/loading.svg")} />
        ) : (
          <div className="collection-items">
            <NovelListCollection
              rankList={novelCollectionList}
              total={novelCollectionTotal}
              query={this.query}
              pageIndex={pageIndex}
              pageIndexAdd={this.pageIndexAdd}
              pageIndexMinus={this.pageIndexMinus}
              pageIndexEnd={this.pageIndexEnd}/>
          </div>
        )}
      </div>
    );
  }
}

//在reducer 中创建counter 的reducer
const mapStateToProps = state => {
  const { novelList, users } = state;
  return {
    novelCollectionList: novelList.novelCollectionList,
    novelCollectionTotal: novelList.novelCollectionTotal,
    userInfo: users.userInfo,
  };
};

export default connect(
  mapStateToProps,
  { setNovelListAsync, setUserInfo }
)(Booktrack);
