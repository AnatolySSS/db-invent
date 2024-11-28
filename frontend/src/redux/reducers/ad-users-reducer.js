import { ADAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const SET_DATA = "sodfu-inventory/ad-reducer/SET_DATA";
const TOGGLE_IS_FETCHING = "sodfu-inventory/ad-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [
    {
      cn: "Шиляев Анатолий Николаевич",
      department:
        "Отдел перспективного развития и новых технологий Управления информатизации",
      dn: "",
      mail: "anatoly_shilyaev@mail.ru",
      mailNickname: "anatoly_shilyaev",
      objectSid: "S-1-5-21-838275612-48375617-1548374914-4837",
      telephoneNumber: "9200124721",
      title: "Главный эксперт",
    },
  ],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cn: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    department: { value: null, matchMode: FilterMatchMode.IN },
    dn: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    mail: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    mailNickname: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    objectSid: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    telephoneNumber: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    title: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  },
  name: "",
  message: "",
  isFetching: false,
};

const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: action.data.columns,
        data: action.data.lib,
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

export const getDatafromAD = () => {
  return async (dispatch) => {
    const data = await ADAPI.getData();
    data.code !== "ECONNREFUSED" && dispatch(setData(data));
  };
};

export const requestData = () => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    // const data = await ADAPI.getUsers();
    // dispatch(setData(data));
    dispatch(toggleIsFetching(false));
  };
};

export default adReducer;
