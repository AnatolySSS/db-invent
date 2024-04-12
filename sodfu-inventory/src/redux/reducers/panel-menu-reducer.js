import { InventoryAPI } from "../../api/api";

const SET_YEARS = "sodfu-inventory/panelMenuReducer/SET_YEARS";

let initialState = {
  yearsIt: [],
  yearsFurniture: [],
  yearsUnmarked: [],
};

const panelMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YEARS:
      return {
        ...state,
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

export default panelMenuReducer;
