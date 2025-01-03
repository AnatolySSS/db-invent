import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
} from "redux";
import itDataReducer from "./reducers/it-data-reducer";
import furnitureDataReducer from "./reducers/furniture-data-reducer";
import unmarkedDataReducer from "./reducers/unmarked-data-reducer";
import assetsDataReducer from "./reducers/assets-data-reducer";
import yearInventoryReducer from "./reducers/year-inventory-reducer";
import sideBarReducer from "./reducers/side-bar-reducer";
import panelMenuReducer from "./reducers/panel-menu-reducer";
import authReducer from "./reducers/auth-reducer";
import appReducer from "./reducers/app-reducer";
import thunkMiddleware from "redux-thunk";
import usersDataReducer from "./reducers/users-data-reducer";
import employeesReducer from "./reducers/employees-reducer";

let reducers = combineReducers({
  itData: itDataReducer,
  furnitureData: furnitureDataReducer,
  unmarkedData: unmarkedDataReducer,
  assetsData: assetsDataReducer,
  sideBar: sideBarReducer,
  panelMenu: panelMenuReducer,
  auth: authReducer,
  app: appReducer,
  yearInventory: yearInventoryReducer,
  usersData: usersDataReducer,
  employees: employeesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.state = store.getState();

export default store;
