import { InventoryAPI } from "../../api/api";
import { changeDateFormat } from "./functions/changeDateFormat";
import { DataFilters } from "./filters/data.filter";

const SET_DATA = "sodfu-inventory/year-inventory-reducer/SET_DATA";
const RESET_STATE = "sodfu-inventory/year-inventory-reducer/RESET_STATE";
const SET_CURRENT_INVENTORY = "sodfu-inventory/year-inventory-reducer/SET_CURRENT_INVENTORY";
const TOGGLE_IS_FETCHING = "sodfu-inventory/year-inventory-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: DataFilters,
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
  hasCurrentInventory: false,
};

const yearInventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: action.data.columns,
        data: action.data.lib,
        values: action.data.values,
        filters: { ...state.filters },
        name: action.data.name,
        message: action.message,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_CURRENT_INVENTORY:
      return {
        ...state,
        hasCurrentInventory: action.hasCurrentInventory,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
const resetState = () => ({ type: RESET_STATE });
const setCurrentInventory = (hasCurrentInventory) => ({ type: SET_CURRENT_INVENTORY, hasCurrentInventory });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });

export const requestData = (tableName, year, userAuth) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await InventoryAPI.getData(tableName, year, userAuth);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export const requestCurrentInventory = (tableName, userDivision) => {
  return async (dispatch) => {
    const data = await InventoryAPI.requestCurrentInventory(tableName, userDivision);
    dispatch(setCurrentInventory(data.hasCurrentInventory));
  };
};

export const clearState = () => {
  return (dispatch) => {
    dispatch(resetState());
  };
};

export default yearInventoryReducer;
