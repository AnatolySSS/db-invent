import { InventoryAPI } from "../../api/api";

const SET_YEARS = "sodfu-inventory/panelMenuReducer/SET_YEARS";

let initialState = {
  tables: [],
  yearsIt: [],
  yearsFurniture: [],
  yearsUnmarked: [],
};

const panelMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YEARS:
      return {
        ...state,
        tables: action.tables,
        yearsIt: action.yearsIt,
        yearsFurniture: action.yearsFurniture,
        yearsUnmarked: action.yearsUnmarked,
      };
    default:
      return state;
  }
};

export const setYears = (years) => ({
  type: SET_YEARS,
  tables: years.tables,
  yearsIt: years.yearsIt,
  yearsFurniture: years.yearsFurniture,
  yearsUnmarked: years.yearsUnmarked,
});

export const requestYears = (userDivision) => {
  return async (dispatch) => {
    const data = await InventoryAPI.getYears(userDivision);
    dispatch(setYears(data));
  };
};

export const beginInventory = (tableName, userDivision) => {
  return async (dispatch) => {
    await InventoryAPI.beginInventory(tableName, userDivision);
    const data = await InventoryAPI.getYears(userDivision);
    dispatch(setYears(data));
  };
};

export default panelMenuReducer;
