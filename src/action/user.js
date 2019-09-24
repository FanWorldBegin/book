import { userRegister } from '../config/api/index';
import { USER_LOGIN_IN, USER_LOGIN_REGISTER } from './constants';

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