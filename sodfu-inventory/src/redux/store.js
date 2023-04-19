import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import tableReducer from "./reducers/table-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    table: tableReducer,
  });

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store