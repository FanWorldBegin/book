import { USER_LOGIN_REGISTER } from '../action/constants';

const intialState = {
  userInfo: {},
  registerState: {},
}
const users = (state = intialState, action={}) => {
  
  switch(action.type) {
    case USER_LOGIN_REGISTER: 
      return Object.assign({}, state, {
        registerState: action.filter
      })
    default:
      return state;
  }
}

export default users;