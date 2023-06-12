import { InventoryAPI } from "../../api/api";

const SET_YEARS = "sodfu-inventory/panelMenuReducer/SET_YEARS";

let initialState = {
  yearsIt: [],
  yearsFurniture: [],
};

const panelMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YEARS:
      return {
        ...state,
        yearsIt: action.yearsIt,
        yearsFurniture: action.yearsFurniture,
      };
    default:
      return state;
  }
};

export const setYears = (years) => ({ type: SET_YEARS, yearsIt: years.yearsIt, yearsFurniture: years.yearsFurniture });

export const requestYears = () => {
  return (dispatch) => {
    InventoryAPI.getYears("years").then((data) => {
      dispatch(setYears(data));
    });
  };
};

export default panelMenuReducer;
