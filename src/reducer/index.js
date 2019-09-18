import {combineReducers} from 'redux';

import users from  './user';
import novelList from './novel-list';
import novelSort from './novel-sort';
export default combineReducers({
  users,
  novelList,
  novelSort,
})