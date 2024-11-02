import React, {useState} from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import { getItemDialogFooter } from "../Functions/getItemDialogFooter";
import styles from "./DialogCraftAssets.module.css";
import { hideNew } from "../Functions/hideNew";

export const DialogCraftAssets = (props) => {
  const {
    data,
    columns,
    setItemDialog,
    ItemDialog,
    item,
    setItem,
    values,
    addData,
    updateData,
    emptyItem,
    userAuth,
  } = props;

  const [disabled, setDisabled] = useState(true);

  //Переменная для массива наименований столбцов,
  //чтобы показывать только релевантные столбцы для конкретного филиала
  let currentColumns = columns.map(column => column.field)

  return (
    <Dialog
      visible={ItemDialog}
      style={{ width: "48rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Описание предмета"
      modal
      className="p-fluid"
      footer={getItemDialogFooter(
        addData,
        updateData,
        data,
        item,
        setItemDialog,
        setItem,
        emptyItem,
        userAuth,
        disabled,
        setDisabled,
      )}
      onHide={hideNew(setItemDialog, setDisabled)}
    >
      <div className="grid">
        {currentColumns.includes("name") && <div className="col-12">
          <label htmlFor="name" className={styles.label}>
            Наименование
          </label>
          <InputTextarea
            id="name"
            aria-describedby="name-help"
            value={item.name || ""}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            autoFocus={true}
            rows={3}
            cols={20}
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("inventary_number") && <div className="col-6">
          <label htmlFor="inventary_number" className={styles.label}>
            Инвентарный номер
          </label>
          <InputText
            id="inventary_number"
            value={item.inventary_number || ""}
            onChange={(e) =>
              setItem({ ...item, inventary_number: e.target.value })
            }
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("qr_code") && <div className="col-6">
          <label htmlFor="qr_code" className={styles.label}>
            QRCODE
          </label>
          <InputText
            id="qr_code"
            value={item.qr_code || ""}
            onChange={(e) => setItem({ ...item, qr_code: e.target.value })}
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("serial") && <div className="col-6">
          <label htmlFor="serial" className={styles.label}>
            Серийный номер
          </label>
          <InputText
            id="serial"
            value={item.serial || ""}
            onChange={(e) => setItem({ ...item, serial: e.target.value })}
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("owner") && <div className="col-6">
          <label htmlFor="owner" className={styles.label}>
            ФИО юзера
          </label>
          <InputText
            id="owner"
            value={item.owner || ""}
            onChange={(e) => setItem({ ...item, owner: e.target.value })}
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("type") && <div className="col-6">
          <label htmlFor="type" className={styles.label}>
            Тип
          </label>
          <Dropdown
            id="type"
            value={item.type || ""}
            options={getDropdownOptions("type", values)}
            onChange={(e) => setItem({ ...item, type: e.target.value })}
            placeholder={item.type || ""}
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("purchase_price") && <div className="col-6">
          <label htmlFor="purchase_price" className={styles.label}>
            Стоимость
          </label>
          <InputNumber
            id="purchase_price"
            value={item.purchase_price || 0}
            onChange={(e) => setItem({ ...item, purchase_price: e.value })}
            mode="currency"
            currency="RUB"
            locale="ru-RU"
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("purchase_date") && <div className="col-6">
          <label htmlFor="purchase_date" className={styles.label}>
            Дата приобретения
          </label>
          <Calendar
            id="purchase_date"
            value={item.purchase_date || null}
            onChange={(e) =>
              setItem({ ...item, purchase_date: e.target.value })
            }
            dateFormat="dd.mm.yy"
            placeholder={formatDate(item.purchase_date || null)}
            disabled={disabled}
            // mask="99.99.9999"
          />
        </div>}
        {currentColumns.includes("note") && <div className="col-12">
          <label htmlFor="note" className={styles.label}>
            Информация
          </label>
          <InputTextarea
            id="note"
            value={item.note || ""}
            onChange={(e) => setItem({ ...item, note: e.target.value })}
            rows={3}
            cols={20}
            disabled={disabled}
          />
        </div>}
      </div>
    </Dialog>
  );
};