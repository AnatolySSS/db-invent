import { AuthAPI } from "../../api/api";
import { downloadEmployers, requestData } from "./employers-reducer";
const SET_AUTH = "sodfu-inventory/authReducer/IS_AUTH";
const SET_MESSAGE = "sodfu-inventory/authReducer/SET_MESSAGE";

let initialState = {
  login: "",
  fullName: "",
  isAuth: false,
  role: "",
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

const setAuth = (login, fullName, isAuth, role, division, message) => ({
  type: SET_AUTH,
  data: { login, fullName, isAuth, role, division, message },
});

const setMessage = (message) => ({ type: SET_MESSAGE, data: { message } });

export const getAuthUserData = () => {
  return async (dispatch) => {
    const data = await AuthAPI.me();
    switch (data.resultCode) {
      case 0:
        let { login, full_name, role, division } = data.user;
        await dispatch(
          setAuth(login, full_name, true, role, division, data.message)
        );
        break;
      case 1:
        dispatch(setMessage(data.message));
        break;
      default:
        dispatch(setMessage(data.message));
        break;
    }
    await dispatch(downloadEmployers());
    await dispatch(requestData());
  };
};

export const login = (login, password) => (dispatch) => {
  console.log(login);

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
