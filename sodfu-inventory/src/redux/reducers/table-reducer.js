// import { AuthAPI } from "../../api/api";
// import { stopSubmit } from "redux-form";
import { ProductService } from "../../service/ProductService";
import { FilterMatchMode } from "primereact/api";

const SET_USER_DATA = "sodfu-inventory/tableReducer/SET_USER_DATA";

let initialState = {
  columns: [
    { field: "id", header: "ID", width: "12rem" },
    { field: "inventary_number", header: "Инвентарный номер", width: "18rem" },
    { field: "internal_number", header: "Внутренний номер", width: "18rem" },
    { field: "is_capital_good", header: "Основное средство", width: "18rem" },
    { field: "type", header: "Тип", width: "12rem" },
    { field: "name", header: "Наименование", width: "18rem" },
    { field: "release_date ", header: "Дата выпуска", width: "12rem" },
    { field: "date_of_purchase ", header: "Дата приобретения", width: "12rem" },
    { field: "last_check_date ", header: "Дата последней проверки", width: "12rem" },
    { field: "serviceable", header: "Состояние исправности", width: "12rem" },
  ],
  data: ProductService.getProductsData(),
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    inventary_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    internal_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    is_capital_good: { value: null, matchMode: FilterMatchMode.IN },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
  }
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};


export default tableReducer;
