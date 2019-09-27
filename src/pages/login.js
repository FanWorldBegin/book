import React, { Component } from 'react';
import HeaderBack from '../component/header-back';
import { navigate } from "gatsby";
import { connect } from 'react-redux';
import { setUserInfoAsync } from '../action/user';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: '',
      Password: '',
      Username: '',
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = (event) => {
    var type = event.target.name;
    this.setState({
      [type]: event.target.value
    });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const {API={}} = this.props;
    await this.props.setUserInfoAsync({
      userInfo: {
        Password: this.state.Password,
        Username: this.state.Username,
      },
      userLogin: API.userLogin
    });
    var { userInfo } = this.props;
    if (userInfo.ID) {
      this.setState({
        loginInfo: <div className="info info-success">登录成功，即将跳转</div>
      });
      setTimeout(e => {
        navigate(
          "/",
        );
      }, 1000);
    } else {
      this.setState({
        Password: '',
        Username: '',
        loginInfo: <div className="info info-fail ">登录失败，请重新输入。</div>
      });
    }

  }
  render() {
    var { loginInfo } = this.state;
    console.log(this.props);
    return (
      <div className='register-container'>
        <HeaderBack title='登陆' />
        <div className='register-form' >
          <form onSubmit={this.handleSubmit}>
            <label>
              <span className='title'>账号：</span>
              <input type='text' name='Username' required="required" value={this.state.Username} onChange={this.handleChange} />
            </label>
            <label>
              <span className='title'>密码：</span>
              <input type='password' name='Password' required="required" value={this.state.Password} onChange={this.handleChange} />
            </label>
            <button type="submit">登陆</button>
            <button type="button" onClick={e => {
              navigate(
                "/register",
              );
            }
            }>没有账号，点击注册</button>

            <div className='info-container'>
              {loginInfo}
            </div>
          </form>

        </div>
      </div>
    );
  }
}
//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  var { users = {} } = state;
  return {
    userInfo: users.userInfo,
  };
};


export default connect(mapStateToProps, { setUserInfoAsync })(LoginPage);