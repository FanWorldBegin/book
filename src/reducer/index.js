import { combineReducers } from "redux"

import users from "./user"
import novelList from "./novel-list"
import novelSort from "./novel-sort"
import novelItem from "./novel-item"
export default combineReducers({
  users,
  novelList,
  novelSort,
  novelItem,
})
