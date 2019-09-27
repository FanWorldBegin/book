import React, { Component } from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";
import { setUserInfo, setUserLogoutAsync } from "../action/index";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //验证是否登陆
    // if (localStorage.getItem('userInfo')) {
    //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //   if (userInfo.ID) {
    //     this.props.setUserInfo(userInfo);
    //   }
    // }
  }
  logout = async () => {
    const { API, setUserLogoutAsync } = this.props;
    console.log(API);
    if ((API || {}).userLogout) {
      setUserLogoutAsync({ userLogout: API.userLogout });
    }
  };
  render() {
    const { userInfo = {} } = this.props;
    console.log(this.props);
    return (
      <div className="header-container">
        <div className="title">IReader</div>
        <div className="login-container">
          {userInfo.ID ? (
            <React.Fragment>
              <Link to="/bookrack/" className="log-btn">
                会员中心
              </Link>
              <div
                onClick={e => {
                  this.logout();
                }}
                className="log-btn"
              >
                退出
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login/" className="log-btn">
                登陆
              </Link>
              <Link to="/register/" className="log-btn">
                注册
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var { users } = state;
  return {
    userInfo: users.userInfo,
  };
};

export default connect(
  mapStateToProps,
  { setUserInfo, setUserLogoutAsync }
)(Header);
