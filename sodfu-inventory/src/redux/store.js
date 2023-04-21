import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import tableReducer from "./reducers/table-reducer";
import furnitureReducer from "./reducers/furniture-reducer";
import sideBarReducer from "./reducers/side-bar-reducer";
import itDownloadReducer from "./reducers/it-download-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    table: tableReducer,
    furniture: furnitureReducer,
    sideBar: sideBarReducer,
    itDownload: itDownloadReducer,
  });

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store