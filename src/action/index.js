import { novelsets } from '../config/api/index';

const setCoverNovelList = (novelList) => {
  return {
    type: 'SET_COVER_NOVEL_LIST',
    filter: novelList
  }
}

export const setCoverNovelListAsync = (dispatch) => {
  return async (dispatch) => {
    var novelList = await novelsets(1);
    novelList = (novelList || {}).Result;
    dispatch(setCoverNovelList(novelList))
  }

}