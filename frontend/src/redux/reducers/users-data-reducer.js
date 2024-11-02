import { UsersAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import changeDateType from "../../function-helpers/changeDateType";

const SET_DATA = "sodfu-inventory/users-data-reducer/SET_DATA";
const SET_UPLOAD_STATUS = "sodfu-inventory/users-data-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING = "sodfu-inventory/users-data-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    login: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    full_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    role: { value: null, matchMode: FilterMatchMode.IN },
    division: { value: null, matchMode: FilterMatchMode.IN },
    updatedAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  },
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
};

const usersDataReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });

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
  return data
};

export const requestData = (userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await UsersAPI.getUsers(userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export const updateData = (rowData, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const message = await UsersAPI.updateUser(rowData);
    const data = await UsersAPI.getUsers(userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data), message.message));
  };
};

export const deleteData = (rowId, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const message = await UsersAPI.deleteUser(rowId);
    const data = await UsersAPI.getUsers(userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data), message.message));
  };
};

export const addData = (rowData, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await UsersAPI.addUser(rowData, userDivision);
    const data = await UsersAPI.getUsers(userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export default usersDataReducer;
