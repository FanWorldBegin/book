import {combineReducers} from 'redux';

import users from  './user';
import novelList from './novel-list'

export default combineReducers({
  users,
  novelList,
})