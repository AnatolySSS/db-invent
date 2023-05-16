import { AuthAPI } from "../../api/api";
const IS_AUTH = "sodfu-inventory/authReducer/IS_AUTH";

let initialState = {
  login: "",
  fullName: "",
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const setAuth = (login, fullName, isAuth) => ({ type: IS_AUTH, data: {login, fullName, isAuth}, });

export const getAuthUserData = (login) => {
  return (dispatch) => {
    return AuthAPI.me(login).then((data) => {
      if (data.resultCode === 0) {
        let { login, full_name } = data.user;
        dispatch(setAuth(login, full_name, true));
      }
    });
  };
};

export const login = (login, password) => (dispatch) => {
  AuthAPI.login(login, password).then((data) => {
    switch (data.resultCode) {
      case 0:
        dispatch(getAuthUserData(login));
        localStorage.setItem('user', data.user.login)
        break;
      case 1:
        console.log(data.message);
        break;
      case 2:
        console.log(data.message);
        break;
      default:
        break;
    }
  });
};

export const logout = (login) => (dispatch) => {
  AuthAPI.logout(login).then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuth(null, null, false));
      localStorage.removeItem('user')
    }
  });
};

export default authReducer;
