import { classNames } from "primereact/utils";
import { formatDate } from "../Helpers/formatDate";

export const getColumnBody = (col) => {
  switch (col.editingType) {
    case "dropdown":
      return dropdownBodyTemplate(col.field);

    case "checkbox":
      return checkboxBodyTemplate(col.field);

    case "inputCurrency":
      return priceBodyTemplate;

    case "date":
      return dateBodyTemplate(col.field);

    // case "img":
    //   return imgBodyTemplate;

    default:
      return null;
  }
};

const dropdownBodyTemplate = (dropdownType) => (rowData) =>
  rowData[dropdownType];

const checkboxBodyTemplate = (checkboxType) => (rowData) => {
  return (
    <i
      className={classNames("pi", {
        "true-icon text-green-500 pi-check-circle":
          rowData[checkboxType] === "true" ? true : false,
        "false-icon text-red-500 pi-times-circle":
          rowData[checkboxType] === "false" ? true : false,
        "text-grey-500 pi-question-circle":
          rowData[checkboxType] === "null" ? true : false,
      })}
    ></i>
  );
};

const dateBodyTemplate = (dateType) => (rowData) =>
  formatDate(rowData[dateType], dateType);

const priceBodyTemplate = (rowData) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(rowData.purchase_price);
