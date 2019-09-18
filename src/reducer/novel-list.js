import { SET_COVER_NOVEL_LIST, SET_RANK_LIST_TYPE,
  SET_RANK_LIST, SET_WHOLE_NOVEL_LIST,
} from '../action/constants';

const intialState = {
  coverRecommend: [],
  rankListType: [], //排行类型
  rankList: [], //排行
  wholeNovelList:[], //全本小说
  wholeNovelTotal: 0,
}

const novelList = (state = intialState, action = {}) => {

  switch (action.type) {
    case SET_COVER_NOVEL_LIST:
      console.log('set_cover_novel_list')
      console.log(action)
      return Object.assign({}, state, {
        coverRecommend: action.filter
      })
    case SET_RANK_LIST_TYPE:
      return Object.assign({}, state, {
        rankListType: action.filter
      })
    case SET_RANK_LIST: {
      return Object.assign({}, state, {
        rankList: action.filter
      })
    }
    case SET_WHOLE_NOVEL_LIST: {
      return Object.assign({}, state, {
        wholeNovelList: (action.filter || {}).Result,
        wholeNovelTotal: (action.filter || {}).Count,
      })
    }
    default:
      return state;
  }
}

export default novelList;