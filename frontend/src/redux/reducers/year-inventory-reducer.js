import { InventoryAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import changeDateType from "../../function-helpers/changeDateType";

const SET_DATA = "sodfu-inventory/year-inventory-reducer/SET_DATA";
// const RESET_STATE = "sodfu-inventory/year-data-reducer/RESET_STATE";
const SET_CURRENT_INVENTORY =
  "sodfu-inventory/year-inventory-reducer/SET_CURRENT_INVENTORY";
const TOGGLE_IS_FETCHING =
  "sodfu-inventory/year-inventory-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    inventary_number: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    qr_code: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    serial: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    type: { value: null, matchMode: FilterMatchMode.IN },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    purchase_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    purchase_price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    incoming_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    last_setup_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    ad_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    owner: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    set_with: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    workplace_type: { value: null, matchMode: FilterMatchMode.IN },
    serviceable: { value: null, matchMode: FilterMatchMode.IN },
    note: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    is_workplace: { value: null, matchMode: FilterMatchMode.EQUALS },
    location: { value: null, matchMode: FilterMatchMode.IN },
    was_deleted: { value: null, matchMode: FilterMatchMode.EQUALS },
    deleted_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    deleted_grounds: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    release_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    checked: { value: null, matchMode: FilterMatchMode.EQUALS },
    scan_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    user: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  },
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
  hasCurrentInventory: false,
};

const yearInventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: action.data.columns,
        data: action.data.lib,
        values: action.data.values,
        filters: { ...state.filters },
        name: action.data.name,
        message: action.message,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_CURRENT_INVENTORY:
      return {
        ...state,
        hasCurrentInventory: action.hasCurrentInventory,
      };
    // case RESET_STATE:
    //   return initialState;
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
// const resetState = () => ({ type: RESET_STATE });
const setCurrentInventory = (hasCurrentInventory) => ({
  type: SET_CURRENT_INVENTORY,
  hasCurrentInventory,
});
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching: isFetching,
});

//Изменение формата даты со строки на объект Date (необходимо для правильной фильтрации)
const changeDateFormat = (data) => {
  data.lib = data.lib.map((v) => {
    Object.keys(v).forEach((element) => {
      if (element.includes("date")) {
        if (v[element] !== null) {
          v[element] = new Date(v[element]);
          v[element] = new Date(v[element]).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Europe/Moscow",
          });
          v[element] = changeDateType(v[element]);
          v[element] = Date.parse(v[element] + "T00:00:00");
          v[element] = new Date(v[element]);
        }
      }
    });
    return v;
  });
  return data;
};

export const requestData = (tableName, year, userDivision) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await InventoryAPI.getData(tableName, year, userDivision);
    dispatch(toggleIsFetching(false));
    dispatch(setData(changeDateFormat(data)));
  };
};

export const requestCurrentInventory = (tableName, userDivision) => {
  return async (dispatch) => {
    const data = await InventoryAPI.requestCurrentInventory(
      tableName,
      userDivision
    );
    dispatch(setCurrentInventory(data.hasCurrentInventory));
  };
};

// export const clearState = () => {
//   return (dispatch) => {
//     dispatch(resetState());
//   };
// };

export default yearInventoryReducer;
