import { SET_NIVEL_DETAIL, SET_NOVEL_CHAPTER, SET_CHAPTER_DETAIL } from '../action/constants';

const intialState = {
  novelDetail: {},
  chapters:[],
  chapterDetail: {},
};

const novelItem = (state = intialState, action={}) => {
  switch (action.type) {

  case SET_NIVEL_DETAIL: 
    return Object.assign({}, state, {
      novelDetail: action.filter
    });
  case SET_NOVEL_CHAPTER: 
    return Object.assign({}, state, {
      chapters: action.filter
    });
  case SET_CHAPTER_DETAIL:
    console.log(action.filter);
    return Object.assign({}, state, {
      chapterDetail: action.filter
    });
  default:
    return state;
  }
};

export default novelItem;