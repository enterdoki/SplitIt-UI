import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import user from './utilities/user';
import receipt from './utilities/receipt'
import friend from './utilities/friend';

const rootReducer = combineReducers({user, receipt, friend});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;