import { getAuthUserData } from "./auth-reducer";
import { requestData } from "./ad-reducer";

const SET_INITIALIZED = "sodfu-inventory/appReducer/SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => {
  return {
    type: SET_INITIALIZED,
  };
};

export const initializeApp = () => {
  return async (dispatch) => {
    await dispatch(getAuthUserData());
    await dispatch(requestData());
    dispatch(initializedSuccess());
  };
};

export default appReducer;
