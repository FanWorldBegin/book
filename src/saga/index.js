import { all, fork } from "redux-saga/effects";
import { homeSagas } from "./home";
//必须加 yield
//yield [] 并发执行的意思，不会等待，同时进行
export default function* rootSaga() {
  yield all([...homeSagas]);
}
