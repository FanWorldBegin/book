import { createStore as reduxCreateStore, applyMiddleware } from "redux";
import rootReducer from '../reducer/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
// import rootSaga from '../saga';

// const sagaMiddleware = createSagaMiddleware();

const createStore = () => reduxCreateStore(rootReducer, composeWithDevTools(
  // applyMiddleware(sagaMiddleware) //安装中间件
  applyMiddleware(thunk)
))

// sagaMiddleware.run(rootSaga);
export default createStore