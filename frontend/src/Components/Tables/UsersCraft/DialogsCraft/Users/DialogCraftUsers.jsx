import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { getItemDialogFooter } from "../Functions/getItemDialogFooter";
import styles from "./DialogCraftUsers.module.css";
import { hideNew } from "../Functions/hideNew";

export const DialogCraftUsers = (props) => {
  const { columns, setItemDialog, ItemDialog, item, setItem, values, addData, updateData, emptyItem, userAuth, employees, dialogType } = props;

  const [disabled, setDisabled] = useState(true);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const search = (event) => {
    setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(event.query.toLowerCase())));
  };

  //Переменная для массива наименований столбцов,
  //чтобы показывать только релевантные столбцы для конкретного филиала
  let currentColumns = columns.map((column) => column.field);

  return (
    <Dialog
      visible={ItemDialog}
      style={{ width: "48rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Описание предмета"
      modal
      className="p-fluid"
      footer={getItemDialogFooter(addData, updateData, item, setItemDialog, setItem, emptyItem, userAuth, disabled, setDisabled, filteredEmployees, dialogType)}
      onHide={hideNew(setItemDialog, setDisabled)}
    >
      <div className="grid">
        {currentColumns.includes("full_name") && (
          <div className="col-6">
            <label htmlFor="full_name" className={styles.label}>
              ФИО пользователя
            </label>
            <AutoComplete
              id="full_name"
              value={item.full_name || ""}
              suggestions={[...filteredEmployees.map((e) => e.full_name)]}
              completeMethod={search}
              onChange={(e) => setItem({ ...item, full_name: e.target.value })}
              onSelect={(e) => setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(e.value.toLowerCase())))}
              forceSelection
              disabled={dialogType === "edit"}
            />
          </div>
        )}
        {currentColumns.includes("role") && (
          <div className="col-3">
            <label htmlFor="role" className={styles.label}>
              Роль
            </label>
            <Dropdown
              id="role"
              value={item.role || ""}
              options={getDropdownOptions("role", values)}
              onChange={(e) => setItem({ ...item, role: e.target.value })}
              placeholder={item.role || ""}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("access_type") && (
          <div className="col-3">
            <label htmlFor="access_type" className={styles.label}>
              Доступ
            </label>
            <Dropdown
              id="access_type"
              value={item.access_type || ""}
              options={getDropdownOptions("access_type", values)}
              onChange={(e) => setItem({ ...item, access_type: e.target.value })}
              placeholder={item.access_type || ""}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
};
