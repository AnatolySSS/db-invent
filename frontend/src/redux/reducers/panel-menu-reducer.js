import { InventoryAPI } from "../../api/api";

const SET_YEARS = "sodfu-inventory/panel-menu-reducer/SET_YEARS";

let initialState = {
  tables: [],
  yearsIt: [],
  yearsFurniture: [],
  yearsUnmarked: [],
  yearsAssets: [],
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
        yearsAssets: action.yearsAssets,
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
  yearsAssets: years.yearsAssets,
});

export const requestYears = (userDivision) => {
  return async (dispatch) => {
    const data = await InventoryAPI.getYears(userDivision);
    dispatch(setYears(data));
  };
};

export const beginInventory = (type, userDivision) => {
  return async (dispatch) => {
    await InventoryAPI.beginInventory(type, userDivision);
    const data = await InventoryAPI.getYears(userDivision);
    dispatch(setYears(data));
  };
};

export default panelMenuReducer;
