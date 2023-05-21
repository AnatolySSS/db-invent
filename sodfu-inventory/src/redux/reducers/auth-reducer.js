import { AuthAPI } from "../../api/api";
const SET_AUTH = "sodfu-inventory/authReducer/IS_AUTH";
const SET_MESSAGE = "sodfu-inventory/authReducer/IS_AUTH";

let initialState = {
  login: "",
  fullName: "",
  isAuth: false,
  role: "",
  message: ""
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

const setAuth = (login, fullName, isAuth, role, message) => ({ type: SET_AUTH, data: {login, fullName, isAuth, role, message} });

const setMessage = (message) => ({ type: SET_MESSAGE, data: {message} })

export const getAuthUserData = () => {
  return (dispatch) => {
    return AuthAPI.me().then((data) => {
      switch (data.resultCode) {
        case 0:
          console.log(data.user);
          let { login, full_name, role } = data.user;
          dispatch(setAuth(login, full_name, true, role, data.message));
          console.log(data.message);
          break;
        case 1:
          dispatch(setMessage(data.message));
          console.log(data.message);
          break;
        default:
          dispatch(setMessage(data.message));
          console.log(data);
          break;
      }
    });
  };
};

export const login = (login, password) => (dispatch) => {
  AuthAPI.login(login, password).then((data) => {
    switch (data.resultCode) {
      case 0:
        localStorage.setItem('accessToken', data.accessToken)
        dispatch(getAuthUserData());
        console.log(data.message);
        console.log(data.user);
        break;
      case 1:
        dispatch(setMessage(data.message));
        console.log(data.message);
        break;
      case 2:
        dispatch(setMessage(data.message));
        console.log(data.message);
        break;
      default:
        break;
    }
  });
};

export const logout = () => (dispatch) => {
  AuthAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      console.log(data.message);
      dispatch(setAuth(null, null, false, null));
      localStorage.removeItem('accessToken')
    }
  });
};

export default authReducer;
