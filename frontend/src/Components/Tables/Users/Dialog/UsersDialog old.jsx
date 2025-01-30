import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { getDropdownOptions } from "./Functions/getDropdownOptions";
import { getItemDialogFooter } from "./Functions/getItemDialogFooter";
import styles from "./UsersDialog.module.css";
import { hideNew } from "./Functions/hideNew";
import { MultiSelect } from "primereact/multiselect";

export const UsersDialog = (props) => {
  const {
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
    employees,
    dialogType,
  } = props;

  const [disabled, setDisabled] = useState(true);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  //Преобразование массива для поля data_type в объект типа {name: "Оборудование"}
  const dataTypesOptions = values.data_type?.map((item) => {
    return { name: item };
  });

  //Поиск пользователя в списке сотрудников
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
      footer={getItemDialogFooter(setItemDialog, disabled, setDisabled, dialogType, formButtonRef)}
      // onHide={hideNew(setItemDialog, setDisabled)}
    >
      <div className="grid">
        {currentColumns.includes("full_name") && (
          <div className="col-9">
            <label htmlFor="full_name" className={styles.label}>
              ФИО пользователя
            </label>
            <AutoComplete
              id="full_name"
              value={item.full_name || ""}
              suggestions={[...filteredEmployees.map((e) => e.full_name)]}
              completeMethod={search}
              onChange={(e) => setItem({ ...item, full_name: e.target.value })}
              onSelect={(e) =>
                setFilteredEmployees(
                  employees.filter((item) => item.full_name.toLowerCase().includes(e.value.toLowerCase()))
                )
              }
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
        {currentColumns.includes("data_type") && (
          <div className="col-9">
            <label htmlFor="data_type" className={styles.label}>
              Типы ТМЦ
            </label>
            <MultiSelect
              id="data_type"
              value={item.data_type || ""}
              options={dataTypesOptions}
              optionLabel="name"
              onChange={(e) => setItem({ ...item, data_type: e.target.value })}
              maxSelectedLabels={3}
              className={styles.multiSelect}
              display="chip"
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
