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

export const getAuthUserData = () => {
  return (dispatch) => {
    return AuthAPI.me().then((data) => {
      switch (data.resultCode) {
        case 0:
          let { login, full_name } = data.user;
          dispatch(setAuth(login, full_name, true));
          console.log(data.message);
          break;
        case 1:
          console.log(data.message);
          break;
        default:
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

export const logout = () => (dispatch) => {
  AuthAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      console.log(data.message);
      dispatch(setAuth(null, null, false));
      localStorage.removeItem('accessToken')
    }
  });
};

export default authReducer;
