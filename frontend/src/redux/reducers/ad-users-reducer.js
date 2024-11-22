import { ADAPI } from "../../api/api";

const SET_DATA = "sodfu-inventory/ad-reducer/SET_DATA";

let initialState = {
  data: [],
};

const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });

export const requestData = () => {
  return (dispatch) => {
    ADAPI.getData().then((data) => {
      dispatch(setData(data.data.searchEntries));
    });
  };
};

export default adReducer;
