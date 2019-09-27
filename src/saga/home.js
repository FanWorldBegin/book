import { SET_COVER_NOVEL_LIST } from "../action/constants"
import { takeEvery, put, takeLatest, call, all } from "redux-saga/effects"

//生成器方法
function* setCoverNovelList() {
  //put - dispatch action
  console.log("setCoverNovelList-saga")
  yield put({ type: SET_COVER_NOVEL_LIST }, { data: ["aaa", "bbbb"] })
}
/*
  在每个 `INCREMENT_ASYNC` action 被 dispatch 时调用 
  允许并发（译注：即同时处理多个相同的 action）
*/
export function* watchIncrementAsync() {
  yield takeLatest(SET_COVER_NOVEL_LIST, setCoverNovelList)
}

export const homeSagas = [watchIncrementAsync()]
