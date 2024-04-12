import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import { multiStateCheckboxOptions } from "../../../Functions/Filters/getColumnFilterElement";
import { hideNew } from "../Functions/hideNew";
import { saveItem } from "../Functions/saveItem";
import styles from "./DialogCraftUnmarked.module.css";

export const DialogCraftUnmarked = (props) => {
  const {
    data,
    setItemDialog,
    ItemDialog,
    hideNew,
    item,
    setItem,
    values,
    addData,
    updateData,
    emptyItem,
    userAuth,
  } = props;

  return (
    <Dialog
      visible={ItemDialog}
      style={{ width: "48rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Описание предмета"
      modal
      className="p-fluid"
      footer={itemDialogFooter(
        addData,
        updateData,
        data,
        item,
        setItemDialog,
        setItem,
        emptyItem,
        userAuth
      )}
      onHide={hideNew}
    >
      <div className="grid">
        <div className="col-12">
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
          />
        </div>
        <div className="col-6">
          <label htmlFor="type" className={styles.label}>
            Тип
          </label>
          <Dropdown
            id="type"
            value={item.type || ""}
            options={getDropdownOptions("type", values)}
            onChange={(e) => setItem({ ...item, type: e.target.value })}
            placeholder={item.type || ""}
          />
        </div>
        <div className="col-6">
          <label htmlFor="location" className={styles.label}>
            Где установлено
          </label>
          <Dropdown
            id="location"
            value={item.location || ""}
            options={getDropdownOptions("location", values)}
            onChange={(e) => setItem({ ...item, location: e.target.value })}
            placeholder={item.location || ""}
          />
        </div>
        <div className="col-4">
          <label htmlFor="count" className={styles.label}>
            Количество
          </label>
          <InputNumber
            id="count"
            value={item.count || ""}
            options={getDropdownOptions("count", values)}
            onChange={(e) => setItem({ ...item, count: e.value })}
            placeholder={item.count || ""}
            showButtons
            buttonLayout="horizontal"
            step={1}
            min={0}
          />
        </div>
        <div className="col-4">
          <label htmlFor="measurement" className={styles.label}>
            Единица измерения
          </label>
          <Dropdown
            id="measurement"
            value={item.measurement || ""}
            options={getDropdownOptions("measurement", values)}
            onChange={(e) => setItem({ ...item, measurement: e.target.value })}
            placeholder={item.measurement || ""}
          />
        </div>
        <div className="col-4">
          <label htmlFor="price" className={styles.label}>
            Стоимость
          </label>
          <InputNumber
            id="purchase_price"
            value={item.purchase_price || 0}
            onChange={(e) => setItem({ ...item, purchase_price: e.value })}
            mode="currency"
            currency="RUB"
            locale="ru-RU"
          />
        </div>
        <div className="col-12">
          <label htmlFor="note" className={styles.label}>
            Информация
          </label>
          <InputTextarea
            id="note"
            value={item.note || ""}
            onChange={(e) => setItem({ ...item, note: e.target.value })}
            rows={3}
            cols={20}
          />
        </div>
      </div>
    </Dialog>
  );
};

const itemDialogFooter = (
  addData,
  updateData,
  data,
  item,
  setItemDialog,
  setItem,
  emptyItem,
  userAuth,
) => (
  <React.Fragment>
    <Button
      label="Выйти"
      icon="pi pi-times"
      outlined
      onClick={hideNew(setItemDialog)}
    />
    <Button
      type="submit"
      label="Сохранить"
      icon="pi pi-check"
      onClick={saveItem(
        addData,
        updateData,
        data,
        item,
        setItemDialog,
        setItem,
        emptyItem,
        userAuth,
      )}
    />
  </React.Fragment>
);
