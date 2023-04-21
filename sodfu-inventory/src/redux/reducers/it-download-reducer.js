import { DataAPI } from "../../api/api";

const IT_DOWNLOAD_DATA = "sodfu-inventory/it-download-reducer/IT_DOWNLOAD_DATA";

let initialState = {
  uploadedStatus: false,
};

const itDownloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case IT_DOWNLOAD_DATA:
      return {
        ...state,
        uploadedStatus: action.uploadedStatus,
      };
    default:
      return state;
  }
};

const setUploadedStatus = (status) => ({ type: IT_DOWNLOAD_DATA, uploadedStatus: status });

export const uploadItData = (data) => {
  return (dispatch) => {
    DataAPI.uploadItData(data).then((data) => {
      dispatch(setUploadedStatus(true));
    });
  };
};

export default itDownloadReducer;
