import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
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

    case "img":
      return imgBodyTemplate;

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

const getQrCodeImg = (qr_code, div) => {
  try {
    return require(`../../../../img/division_${div}/qr_code/${qr_code}.png`);
  } catch (error) {
    return require(`../../../../img/no_data.png`);
  }
};
export const imgBodyTemplate =
  (div, type = "tablerow") =>
  (rowData) => {
    let qrCodeHeight, qrCodeWidth;
    if (type == "tablerow") {
      qrCodeWidth = 60;
      div == 3 ? (qrCodeHeight = 70) : (qrCodeHeight = 60);
    } else {
      qrCodeWidth = "100%";
      qrCodeHeight = "100%";
    }
    return (
      <Image
        src={getQrCodeImg(rowData.qr_code, div)}
        zoomSrc={getQrCodeImg(rowData.qr_code, div)}
        alt="No Image"
        width={qrCodeWidth}
        height={qrCodeHeight}
        preview
      />
    );
  };
