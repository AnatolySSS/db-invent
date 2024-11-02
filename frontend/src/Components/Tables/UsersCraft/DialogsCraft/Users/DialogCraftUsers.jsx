import React, {useState} from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { getItemDialogFooter } from "../Functions/getItemDialogFooter";
import styles from "./DialogCraftUsers.module.css";
import { hideNew } from "../Functions/hideNew";

export const DialogCraftUsers = (props) => {
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
        {currentColumns.includes("full_name") && <div className="col-12">
          <label htmlFor="full_name" className={styles.label}>
            ФИО пользователя
          </label>
          <InputText
            id="full_name"
            value={item.full_name || ""}
            onChange={(e) => setItem({ ...item, full_name: e.target.value })}
            autoFocus={true}
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("login") && <div className="col-8">
          <label htmlFor="login" className={styles.label}>
            Логин
          </label>
          <InputText
            id="login"
            value={item.login || ""}
            onChange={(e) =>
              setItem({ ...item, login: e.target.value })
            }
            disabled={disabled}
          />
        </div>}
        {currentColumns.includes("role") && <div className="col-4">
          <label htmlFor="role" className={styles.label}>
            Роль
          </label>
          <Dropdown
            id="role"
            value={item.role || ""}
            options={getDropdownOptions("role", values)}
            onChange={(e) => setItem({ ...item, role: e.target.value })}
            placeholder={item.role || ""}
            disabled={disabled}
          />
        </div>}
      </div>
    </Dialog>
  );
};