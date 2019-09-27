import {
  SET_CATEGORY_LIST,
  CATE_LIST_PAGING_ADD,
  CATE_LIST_PAGING_MINUS,
} from "../action/constants"

// if (localStorage.getItem('store')) {
//   initialState = JSON.parse(localStorage.getItem('store'));
// }
const intialState = {
  rankListType: [], //排行类型
  rankList: [], //排行
  categoryList: [], //小说分类列表
  categoryTotal: 0, //小说分类列表长度
  catePagingIndex: 1,
}

const novelSort = (state = intialState, action = {}) => {
  switch (action.type) {
    case SET_CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryList: (action.filter || {}).Result,
        categoryTotal: (action.filter || {}).Count,
      })
    }
    case CATE_LIST_PAGING_ADD: {
      if (state.catePagingIndex < action.filter) {
        return Object.assign({}, state, {
          catePagingIndex: state.catePagingIndex + 1,
        })
      }
    }
    case CATE_LIST_PAGING_MINUS: {
      if (state.catePagingIndex > 1) {
        return Object.assign({}, state, {
          catePagingIndex: state.catePagingIndex - 1,
        })
      }
    }
    default:
      return state
  }
}

export default novelSort
