import { novelsets, rankingtypes, rankingList, getwholeNovelList } from '../config/api/index';
import { SET_COVER_NOVEL_LIST, SET_RANK_LIST_TYPE, 
  SET_RANK_LIST, SET_WHOLE_NOVEL_LIST, } from './constants';
//主页novelList
const setCoverNovelList = (novelList) => {
  return {
    type: SET_COVER_NOVEL_LIST,
    filter: novelList
  }
}

export const setCoverNovelListAsync = (dispatch) => {
  return async (dispatch) => {
    var res = await novelsets(1);
    console.log(res)
    res = (res || {}).Result;
    dispatch(setCoverNovelList(res))
  }

}

//小说排行种类
const rankListSort = (res) => {
  return {
    type: SET_RANK_LIST_TYPE,
    filter: res
  }
}

export const setRankListSortAsync = () => {
  return async (dispatch) => {
    var res = await rankingtypes();
    res = (res || {}).Result;
    dispatch(rankListSort(res))
  }

}


//查询小说排行
const rankList = (res) => {
  return {
    type: SET_RANK_LIST,
    filter: res
  }
}



export const setRankListAsync = (sort) => {
  return async (dispatch) => {
    var res = await rankingList(sort);
    res = (res || {}).Result;
    dispatch(rankList(res))
  }

}


//全本小说查询
const wholeNovelList = (res) => {
  return {
    type: SET_WHOLE_NOVEL_LIST,
    filter: res
  }
}

export const setWholeNovelListAsync = ({pageIndex}) => {
  return async (dispatch) => {
    var res = await getwholeNovelList({pageIndex});
    dispatch(wholeNovelList(res))
  }

}
