import {
  USER_LOGIN_REGISTER,
  USER_LOGIN_IN,
  USER_LOGIN_OUT,
} from "../action/constants";

const intialState = {
  userInfo: {},
  registerState: {},
};
const users = (state = intialState, action = {}) => {
  switch (action.type) {
    case USER_LOGIN_REGISTER:
      return Object.assign({}, state, {
        registerState: action.filter,
      });
    case USER_LOGIN_IN:
      return Object.assign({}, state, {
        userInfo: action.filter,
      });
    case USER_LOGIN_OUT:
      console.log(action.filter);
      return Object.assign({}, state, {
        userInfo: {},
      });
    default:
      return state;
  }
};

export default users;
