import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux"
import itDataReducer from "./reducers/it-data-reducer";
import furnitureDataReducer from "./reducers/furniture-data-reducer";
import sideBarReducer from "./reducers/side-bar-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    itData: itDataReducer,
    furnitureData: furnitureDataReducer,
    sideBar: sideBarReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(...middleware)
//   ));

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store