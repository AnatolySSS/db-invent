import { DataAPI } from "../../../api/api";
import { changeDateFormat } from "./changeDateFormat";

export const getRequestData = (type, toggleIsFetching, setData) => {
  return (userAuth) => {
    return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      let data = await DataAPI.getData(type, userAuth);
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data)));
    };
  };
};

export const getAddData = (type, toggleIsFetching, setData, setValidationStatus) => {
  return (rowData, userAuth) => {
    return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      let validStatus = await DataAPI.addData(rowData);
      dispatch(setValidationStatus(validStatus));
      let data = await DataAPI.getData(type, userAuth);
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data)));
    };
  };
};

export const getUpdateData = (type, toggleIsFetching, setData) => {
  return (rowData, userAuth) => {
    return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      let message = await DataAPI.updateData(rowData);
      let data = await DataAPI.getData(type, userAuth);
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data), message.message));
    };
  };
};

export const getTransferItem = (type, toggleIsFetching, setData) => {
  return (items, transferData, userAuth) => {
    return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      let message = await DataAPI.transferItem(items, transferData);
      let data = await DataAPI.getData(type, userAuth);
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data), message.message));
    };
  };
};

export const getDeleteData = (type, toggleIsFetching, setData) => {
  return (rowId, userAuth) => {
    return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      let message = await DataAPI.deleteData(rowId);
      let data = await DataAPI.getData(type, userAuth);
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data), message.message));
    };
  };
};

export const getUploadData = (setData, toggleIsFetching, setUploadStatus) => {
  return (type, rowData, userAuth) => {
    return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      await DataAPI.uploadData(rowData);
      let data = await DataAPI.getData(type, userAuth);
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data)));
      dispatch(setUploadStatus(true));
    };
  };
};
