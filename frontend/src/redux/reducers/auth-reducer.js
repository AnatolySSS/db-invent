import { AuthAPI } from "../../api/api";
import { downloadEmployees, requestData } from "./employees-reducer";
const SET_AUTH = "sodfu-inventory/authReducer/IS_AUTH";
const SET_MESSAGE = "sodfu-inventory/authReducer/SET_MESSAGE";

let initialState = {
  employee_id: "",
  login: "",
  fullName: "",
  isAuth: false,
  role: "",
  access_type: "",
  division: null,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.data,
      };
    case SET_MESSAGE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

const setAuth = (employee_id, login, fullName, isAuth, role, access_type, division, message) => ({
  type: SET_AUTH,
  data: { employee_id, login, fullName, isAuth, role, access_type, division, message },
});

const setMessage = (message) => ({ type: SET_MESSAGE, data: { message } });

export const getAuthUserData = () => {
  return async (dispatch) => {
    const data = await AuthAPI.me();
    switch (data.resultCode) {
      case 0:
        let { employee_id, login, full_name, role, access_type, division_id } = data.currentUser;
        await dispatch(setAuth(employee_id, login, full_name, true, role, access_type, division_id, data.message));
        await dispatch(downloadEmployees());
        await dispatch(requestData());
        break;
      case 1:
        dispatch(setMessage(data.message));
        break;
      default:
        dispatch(setMessage(data.message));
        break;
    }
  };
};

export const login = (login, password) => (dispatch) => {
  AuthAPI.login(login, password).then((data) => {
    switch (data.resultCode) {
      case 0:
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(getAuthUserData());
        break;
      case 1:
        dispatch(setMessage(data.message));
        break;
      case 2:
        dispatch(setMessage(data.message));
        break;
      default:
        break;
    }
  });
};

export const logout = () => (dispatch) => {
  AuthAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuth(null, null, false, null));
      localStorage.removeItem("accessToken");
    }
  });
};

export default authReducer;
