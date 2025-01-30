import {
  getAddData,
  getDeleteData,
  getRequestData,
  getTransferItem,
  getUpdateData,
  getUploadData,
} from "./functions/function-helpers";
import { Filters } from "./filters/Filters";

const SET_DATA = "sodfu-inventory/unmarked-data-reducer/SET_DATA";
const SET_UPLOAD_STATUS = "sodfu-inventory/unmarked-data-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING = "sodfu-inventory/unmarked-data-reducer/TOGGLE_IS_FETCHING";
const SET_VALIDATION_STATUS = "sodfu-inventory/unmarked-data-reducer/SET_VALIDATION_STATUS";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: Filters.data,
  uploadedStatus: false,
  name: "Прочее",
  message: "",
  isFetching: false,
  validationStatus: {},
};

const unmarkedDataReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
const setUploadStatus = (status) => ({ type: SET_UPLOAD_STATUS, uploadedStatus: status });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
const setValidationStatus = (validationStatus) => ({ type: SET_VALIDATION_STATUS, validationStatus: validationStatus });

export const requestData = getRequestData("unmarked", toggleIsFetching, setData);
export const addData = getAddData("unmarked", toggleIsFetching, setData, setValidationStatus);
export const updateData = getUpdateData("unmarked", toggleIsFetching, setData);
export const transferItem = getTransferItem("unmarked", toggleIsFetching, setData);
export const deleteData = getDeleteData("unmarked", toggleIsFetching, setData);
export const uploadData = getUploadData(setData, toggleIsFetching, setUploadStatus);

export default unmarkedDataReducer;
