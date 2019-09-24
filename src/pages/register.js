import React, { Component } from 'react';
import {HeaderBack} from '../component/header-back';
import { navigate } from "gatsby";
import { connect } from 'react-redux';
import { setUserRegisterAsync  } from '../action/user';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      resgisterInfo: '',
      LoginPassword:'',
      Account:'',
      email: ''
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  handleChange = (event) => {
    var type = event.target.name;
    console.log(type)
    console.log(event.target.value)
    this.setState({
      [type]: event.target.value
    });
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    var userInfo = this.state;
    console.log(userInfo)
    await this.props.setUserRegisterAsync(userInfo);
    var {registerState} = this.props;
    if (registerState.Message == 'success') {
      this.setState({
        resgisterInfo: <div className="info info-success">注册成功，即将跳转</div>
      })
      setTimeout(e=>{
        navigate(
          "/login",
        )
      }, 1000)
    }else {
      this.setState({
        Account: '',
        LoginPassword: '',
        email: '',
        resgisterInfo: <div className="info info-fail ">注册失败，请重新输入。</div>
      })
    }

  }
  render() {
    var { resgisterInfo } = this.state;
    return(
      <div className='register-container'>
        <HeaderBack title='注册'/>
        <div className='register-form' >
          <form onSubmit={this.handleSubmit}>
            <label>
              <span className='title'>账号：</span>
              <input type='text' name='Account' required="required" value={this.state.Account} onChange={this.handleChange} />
            </label>
            <label>
              <span className='title'>密码：</span>
              <input type='password' name='LoginPassword' required="required" value={this.state.LoginPassword} onChange={this.handleChange} />
            </label>
            <label>
              <span className='title'>邮箱：</span>
              <input type='email' name='email' required="required" value={this.state.email} onChange={this.handleChange} />
            </label>
            <button type="submit">注册</button>
            <button type="button" onClick={e => {
              navigate(
                "/login",
              )
            }
            }>已有账号，点击登陆</button>

            <div className='info-container'>
              {resgisterInfo}
            </div>
          </form>

        </div>
      </div>
    )
  }
}
//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  var {users = {}} = state;
  return {
    registerState: users.registerState,
  }
}


export default connect(mapStateToProps, { setUserRegisterAsync })(RegisterPage);