import { EmployeesAPI } from "../../api/api";
import { Filters } from "./filters/Filters";

const SET_DATA = "sodfu-inventory/employees-reducer/SET_DATA";
const SET_DOWNLOAD_STATUS = "sodfu-inventory/employees-reducer/SET_DOWNLOAD_STATUS";
const TOGGLE_IS_FETCHING = "sodfu-inventory/employees-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [
    {
      full_name: "Шиляев Анатолий Николаевич",
      department: "Отдел перспективного развития и новых технологий Управления информатизации",
      dn: "",
      mail: "anatoly_shilyaev@mail.ru",
      login: "anatoly_shilyaev",
      employee_id: "S-1-5-21-838275612-48375617-1548374914-4837",
      phone: "9200124721",
      title: "Главный эксперт",
    },
  ],
  values: [],
  filters: Filters.employees,
  name: "Сотрудники",
  downloadStatus: false,
  message: [],
  isFetching: false,
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data.lib,
        columns: action.data.columns,
        values: action.data.values,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_DOWNLOAD_STATUS:
      return {
        ...state,
        downloadStatus: action.downloadStatus,
        message: action.message,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });
const setDownloadStatus = (downloadStatus, message) => ({ type: SET_DOWNLOAD_STATUS, downloadStatus, message });
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching: isFetching,
});

export const downloadEmployees = () => {
  return async (dispatch) => {
    const data = await EmployeesAPI.downloadEmpoyers();
    data.downloadStatus && dispatch(setDownloadStatus(data.downloadStatus, data.message));
  };
};

export const requestData = (userAuth) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await EmployeesAPI.getEmployees(userAuth);
    dispatch(setData(data));
    dispatch(toggleIsFetching(false));
  };
};

export default employeesReducer;
