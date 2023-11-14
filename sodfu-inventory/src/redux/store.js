import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux"
import itDataReducer from "./reducers/it-data-reducer";
import furnitureDataReducer from "./reducers/furniture-data-reducer";
import yearInventoryReducer from "./reducers/year-inventory-reducer";
import sideBarReducer from "./reducers/side-bar-reducer";
import panelMenuReducer from "./reducers/panel-menu-reducer";
import authReducer from "./reducers/auth-reducer";
import appReducer from "./reducers/app-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    itData: itDataReducer,
    furnitureData: furnitureDataReducer,
    sideBar: sideBarReducer,
    panelMenu: panelMenuReducer,
    auth: authReducer,
    app: appReducer,
    yearInventory: yearInventoryReducer
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.state = store.getState()

export default store