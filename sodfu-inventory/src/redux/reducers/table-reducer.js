import { DataAPI } from "../../api/api";
import { FilterMatchMode } from "primereact/api";

const SET_DATA = "sodfu-inventory/tableReducer/SET_DATA";

let initialState = {
  columns: [],
  data: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    inventary_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    internal_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    serviceable: { value: null, matchMode: FilterMatchMode.EQUALS },
    is_capital_good: { value: null, matchMode: FilterMatchMode.EQUALS },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
  },
  name: "",
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: action.data.columns,
        data: action.data.values,
        name: action.data.name,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data: data });

export const requestData = () => {
  return (dispatch) => {
    DataAPI.getData().then((data) => {
      console.log(data);
      dispatch(setData(data));
    });
  };
};

export const updateData = (rowData, rowId) => {
  return (dispatch) => {
    DataAPI.updateData(rowData, rowId).then((data) => {
      dispatch(setData(data));
    });
  };
};

export default tableReducer;
