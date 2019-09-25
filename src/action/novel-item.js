import { getNovelDetail, searchChapters, searchChapterDetail, searchChapterNext } from '../config/api/index';
import { SET_NIVEL_DETAIL, SET_NOVEL_CHAPTER, SET_CHAPTER_DETAIL } from './constants';





//获取小说详情
const novelDetail = (novel) => {
  return {
    type: SET_NIVEL_DETAIL,
    filter: novel
  }  
}


export const setNovelDetailAsync = (ID) => {
  return async (dispatch) =>{
    var res = await getNovelDetail(ID);
    res = (res || {}).Result;
    dispatch(novelDetail(res))
  }
}


//获取小说章节列表
const novelChapter = (res) => {
  return {
    type: SET_NOVEL_CHAPTER,
    filter: res
  }
}

export const setNovelChapterAsync = (ID) => {
  return async (dispatch) => {
    var res = await searchChapters(ID);
    res = (res || {}).Result;
    dispatch(novelChapter(res))
  }
}

//获取小说章节列表
const chapterDetail = (res) => {
  return {
    type: SET_CHAPTER_DETAIL,
    filter: res
  }
}

export const setChapterDetailAsync = (ID) => {
  return async (dispatch) => {
    var res = await searchChapterDetail(ID);
    res = (res || {}).Result;
    dispatch(chapterDetail(res))
  }
}


//获取上一章或下一章小说内容
export const getNewChapterAsync = ({ ID, Flag }) => {
  return async (dispatch) => {
    var res = await searchChapterNext({ ID, Flag });
    res = (res || {}).Result;
    //判断是否存在章节
    if (res.ID != 0) {
      dispatch(chapterDetail(res))
    }
  }
}

