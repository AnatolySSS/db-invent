import { combineReducers, legacy_createStore as createStore } from "redux"
import tableReducer from "./reducers/table-reducer";

let reducers = combineReducers({
    table: tableReducer,
  });

let store = createStore(reducers)

window.store = store

export default store