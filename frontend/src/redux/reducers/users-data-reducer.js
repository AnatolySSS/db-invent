import { UsersAPI } from "../../api/api";
import { changeDateFormat } from "./functions/changeDateFormat";
import { Filters } from "./filters/Filters";

const SET_DATA = "sodfu-inventory/users-data-reducer/SET_DATA";
const SET_UPLOAD_STATUS = "sodfu-inventory/users-data-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING = "sodfu-inventory/users-data-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: Filters.users,
  uploadedStatus: false,
  name: "Пользователи",
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

export const requestData = (userAuth) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await UsersAPI.getUsers(userAuth);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export const updateData = (userData, userAuth) => {
  console.log(userData);

  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const message = await UsersAPI.updateUser(userData);
    const data = await UsersAPI.getUsers(userAuth);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data), message.message));
  };
};

export const deleteData = (userId, userAuth) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const message = await UsersAPI.deleteUser(userId);
    const data = await UsersAPI.getUsers(userAuth);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data), message.message));
  };
};

export const addData = (userData, userAuth) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await UsersAPI.addUser(userData);
    const data = await UsersAPI.getUsers(userAuth);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export default usersDataReducer;
