import { DataAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import changeDateType from "../../function-helpers/changeDateType";

const SET_DATA = "sodfu-inventory/unmarked-data-reducer/SET_DATA";
const RESET_STATE = "sodfu-inventory/it-data-reducer/RESET_STATE";
const SET_UPLOAD_STATUS =
  "sodfu-inventory/unmarked-data-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING =
  "sodfu-inventory/unmarked-data-reducer/TOGGLE_IS_FETCHING";
const SET_VALIDATION_STATUS =
  "sodfu-inventory/unmarked-data-reducer/SET_VALIDATION_STATUS";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    type: { value: null, matchMode: FilterMatchMode.IN },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    owner: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    purchase_price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    count: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    note: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    location: { value: null, matchMode: FilterMatchMode.IN },
    measurement: { value: null, matchMode: FilterMatchMode.IN },
    updatedAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  },
  uploadedStatus: false,
  name: "",
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
        name: action.data.name,
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
const setUploadStatus = (status) => ({
  type: SET_UPLOAD_STATUS,
  uploadedStatus: status,
});
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching: isFetching,
});
const setValidationStatus = (validationStatus) => ({
  type: SET_VALIDATION_STATUS,
  validationStatus: validationStatus,
});

//Изменение формата даты со строки на объект Date (необходимо для правильной фильтрации)
const changeDateFormat = (data) => {
  data.lib = data.lib.map((v) => {
    Object.keys(v).forEach((element) => {
      if (element != "createdAt" && element != "updatedAt") {
        if (element.includes("date")) {
          if (v[element] !== null) {
            v[element] = new Date(v[element]);
            v[element] = new Date(v[element]).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "Europe/Moscow",
            });
            v[element] = changeDateType(v[element]);
            v[element] = Date.parse(v[element] + "T00:00:00");
            v[element] = new Date(v[element]);
          }
        }
      } else {
        if (v[element] != null) {
          v[element] = new Date(v[element]);
        }
      }
    });
    return v;
  });
  return data;
};

export const requestData = (userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await DataAPI.getData("unmarked", userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export const updateData = (rowData, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const message = await DataAPI.updateData("unmarked", rowData, userDivision);
    const data = await DataAPI.getData("unmarked", userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data), message.message));
  };
};

export const deleteData = (rowId, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const message = await DataAPI.deleteData("unmarked", rowId, userDivision);
    const data = await DataAPI.getData("unmarked", userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data), message.message));
  };
};

export const addData = (rowData, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const validStatus = await DataAPI.addData(
      "unmarked",
      rowData,
      userDivision
    );
    dispatch(setValidationStatus(validStatus));
    const data = await DataAPI.getData("unmarked", userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export const uploadData = (data, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await DataAPI.uploadData("unmarked", data, userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setUploadStatus(true));
  };
};

export const clearState = () => {
  return (dispatch) => {
    dispatch(resetState());
  };
};

export default unmarkedDataReducer;
