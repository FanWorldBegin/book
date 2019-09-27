import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import rootReducer from "../reducer/index"
import { composeWithDevTools } from "redux-devtools-extension"
import { USER_LOGIN_IN } from "../action/constants"
import thunk from "redux-thunk"
// import rootSaga from '../saga';

// const sagaMiddleware = createSagaMiddleware();

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    composeWithDevTools(
      // applyMiddleware(sagaMiddleware) //安装中间件
      applyMiddleware(thunk)
    )
  )

// const userInfo = JSON.parse(localStorage.getItem('userInfo'));
// if (userInfo.ID) {
//   createStore().dispatch({
//     type: USER_LOGIN_IN,
//     filter: userInfo,
//   })
// }

// sagaMiddleware.run(rootSaga);
export default createStore
