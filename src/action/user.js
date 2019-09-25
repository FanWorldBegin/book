import { userRegister, userLogin, userLogout } from '../config/api/index';
import { USER_LOGIN_IN, USER_LOGIN_REGISTER, USER_LOGIN_OUT } from './constants';

//用户注册
const setUserRegister = (res) => {
  return {
    type: USER_LOGIN_REGISTER,
    filter: res,
  }
}

export const setUserRegisterAsync = (userInfo) => {
  return async (dispatch) => {
    var res = await userRegister(userInfo);
    dispatch(setUserRegister(res))
    console.log(res)
  }
}

//用户登录

export const setUserInfo = (res) => {
  return {
    type: USER_LOGIN_IN,
    filter: res,
  }
}

export const setUserInfoAsync = (userInfo) => {
  return async (dispatch) => {
    var res = await userLogin(userInfo);
    dispatch(setUserInfo(res));
    localStorage.setItem('userInfo', JSON.stringify(res));
  }
}

//用户登出
export const setUserLogout = (res) => {
  return {
    type: USER_LOGIN_OUT,
    filter: res,
  }
}

export const setUserLogoutAsync = () => {
  return async (dispatch) => {
    var res = await userLogout();
    dispatch(setUserLogout(res));
    localStorage.removeItem('userInfo');
  }
}