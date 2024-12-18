import { EmployersAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const SET_DATA = "sodfu-inventory/employers-reducer/SET_DATA";
const TOGGLE_IS_FETCHING =
  "sodfu-inventory/employers-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [
    {
      full_name: "Шиляев Анатолий Николаевич",
      department:
        "Отдел перспективного развития и новых технологий Управления информатизации",
      dn: "",
      mail: "anatoly_shilyaev@mail.ru",
      login: "anatoly_shilyaev",
      object_sid: "S-1-5-21-838275612-48375617-1548374914-4837",
      phone: "9200124721",
      title: "Главный эксперт",
    },
  ],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    department: { value: null, matchMode: FilterMatchMode.IN },
    title: { value: null, matchMode: FilterMatchMode.IN },
    city_name: { value: null, matchMode: FilterMatchMode.IN },
    login: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    mail: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    phone: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    dn: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  },
  name: "",
  message: "",
  isFetching: false,
};

const employersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data.lib,
        columns: action.data.columns,
        values: action.data.values,
        name: action.data.name,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching: isFetching,
});

export const downloadEmployers = () => {
  return async (dispatch) => {
    const data = await EmployersAPI.downloadEmpoyers();
    // console.log(data);
    // data.code !== "ECONNREFUSED" && dispatch(setData(data));
  };
};

export const requestData = () => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await EmployersAPI.getEmployers();
    dispatch(setData(data));
    dispatch(toggleIsFetching(false));
  };
};

export default employersReducer;
