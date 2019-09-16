import { SET_COVER_NOVEL_LIST } from '../action/constants';

const intialState = {
  coverRecommend: [],
}

const novelList = (state = intialState, action = {}) => {

  switch (action.type) {
    case SET_COVER_NOVEL_LIST:
      console.log('set_cover_novel_list')
      return Object.assign({}, state, {
        coverRecommend: action.filter
      })
    default:
      return state;
  }
}

export default novelList;