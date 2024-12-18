import { getRequestData, getAddData, getUpdateData, getTransferItem, getDeleteData, getUploadData } from "./functions/function-helpers";
import { DataFilters } from "./filters/data.filter";

const SET_DATA = "sodfu-inventory/it-data-reducer/SET_DATA";
const RESET_STATE = "sodfu-inventory/it-data-reducer/RESET_STATE";
const SET_UPLOAD_STATUS = "sodfu-inventory/it-data-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING = "sodfu-inventory/it-data-reducer/TOGGLE_IS_FETCHING";
const SET_VALIDATION_STATUS = "sodfu-inventory/it-data-reducer/SET_VALIDATION_STATUS";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: DataFilters,
  uploadedStatus: false,
  name: "Оборудование",
  message: "",
  isFetching: false,
  validationStatus: {},
};

const itDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: action.data.columns,
        data: action.data.lib,
        values: action.data.values,
        filters: { ...state.filters },
        message: action.message,
      };
    case SET_UPLOAD_STATUS:
      return {
        ...state,
        uploadedStatus: action.uploadedStatus,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_VALIDATION_STATUS:
      return {
        ...state,
        validationStatus: { ...action.validationStatus },
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
const resetState = () => ({ type: RESET_STATE });
const setUploadStatus = (status) => ({ type: SET_UPLOAD_STATUS, uploadedStatus: status });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
const setValidationStatus = (validationStatus) => ({ type: SET_VALIDATION_STATUS, validationStatus: validationStatus });

export const requestData = getRequestData("it", toggleIsFetching, setData);
export const addData = getAddData("it", toggleIsFetching, setData, setValidationStatus);
export const updateData = getUpdateData("it", toggleIsFetching, setData);
export const transferItem = getTransferItem("it", toggleIsFetching, setData);
export const deleteData = getDeleteData("it", toggleIsFetching, setData);
export const uploadData = getUploadData(toggleIsFetching, setUploadStatus);

export const clearState = () => {
  return (dispatch) => {
    dispatch(resetState());
  };
};

export default itDataReducer;
