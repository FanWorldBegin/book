// import { rankingtypes, rankingList, getwholeNovelList, } from '../config/api/index';
import {
  SET_COVER_NOVEL_LIST,
  SET_RANK_LIST_TYPE,
  SET_RANK_LIST,
  SET_WHOLE_NOVEL_LIST,
  SET_COLLECTION,
} from "./constants"

// 收藏列表
const setNovelList = list => {
  return {
    type: SET_COLLECTION,
    filter: list,
  }
}

export const setNovelListAsync = ({ pageIndex, queryCollection }) => {
  return async dispatch => {
    var res = await queryCollection({ pageIndex })
    dispatch(setNovelList(res))
  }
}
//主页novelList
const setCoverNovelList = novelList => {
  return {
    type: SET_COVER_NOVEL_LIST,
    filter: novelList,
  }
}

export const setCoverNovelListAsync = ({ novelsets }) => {
  return async dispatch => {
    var res = await novelsets(1)
    console.log(res)
    res = (res || {}).Result
    dispatch(setCoverNovelList(res))
  }
}

//小说排行种类
const rankListSort = res => {
  return {
    type: SET_RANK_LIST_TYPE,
    filter: res,
  }
}

export const setRankListSortAsync = ({ rankingtypes }) => {
  return async dispatch => {
    var res = await rankingtypes()
    res = (res || {}).Result
    dispatch(rankListSort(res))
  }
}

//查询小说排行
const rankList = res => {
  return {
    type: SET_RANK_LIST,
    filter: res,
  }
}

export const setRankListAsync = ({ pageIndex, type, rankingList }) => {
  return async dispatch => {
    var res = await rankingList({ pageIndex, type })
    dispatch(rankList(res))
  }
}

//全本小说查询
const wholeNovelList = res => {
  return {
    type: SET_WHOLE_NOVEL_LIST,
    filter: res,
  }
}

export const setWholeNovelListAsync = ({ pageIndex, getwholeNovelList }) => {
  return async dispatch => {
    var res = await getwholeNovelList({ pageIndex })
    dispatch(wholeNovelList(res))
  }
}
