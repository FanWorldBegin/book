import React, { Component } from 'react';
import { navigate } from "gatsby";
import { setUserInfo } from '../action/index';
import { connect } from 'react-redux';
class HeaderBack extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //验证是否登陆

  }

  render() {
    const { title, path } = this.props;
    return (
      <div className='header-container'>
        <span className='back-btn' onClick={
          e=>{
            if (path == '/novelPage/') {
              this.props.query();
            }
            window.history.back();  
          }
        }>返回</span>
        <div className='title'>{ title }</div>

        <span className='back-btn left' onClick={
          e => {
            navigate("/");
          }
        }>首页</span>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  var { users } = state;
  return {
    userInfo: users.userInfo,
  };
};

export default connect(mapStateToProps, { setUserInfo })(HeaderBack);