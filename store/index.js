import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import user from './utilities/user';
import receipt from './utilities/receipt'

const rootReducer = combineReducers({user, receipt});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;