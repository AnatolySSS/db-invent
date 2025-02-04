import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { getDropdownOptions } from "./Functions/getDropdownOptions";
import { getItemDialogFooter } from "./Functions/getItemDialogFooter";
import styles from "./UsersDialog.module.css";
import { hideNew } from "./Functions/hideNew";
import { MultiSelect } from "primereact/multiselect";
import { saveItem } from "./Functions/saveItem";
import { AutoCompleteFieldComponent } from "../../TableCraft/DialogsCraft/FormFieldComponents/AutoCompleteFieldComponent";
import { DropdownFieldComponent } from "../../TableCraft/DialogsCraft/FormFieldComponents/DropdownFieldComponent";
import { MultiSelectFieldComponent } from "../../TableCraft/DialogsCraft/FormFieldComponents/MultiSelectFieldComponent";

export const UsersDialog = (props) => {
  const {
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

  const formButtonRef = useRef();

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Обязательное поле"),
    role: Yup.string().required("Обязательное поле"),
    data_type: Yup.array()
      .required("Обязательное поле")
      .min(1, "Необходимо выбрать хотя бы один элемент")
      .of(Yup.object().shape({ name: Yup.string().required("Обязательное поле") })),
    access_type: Yup.array()
      .required("Обязательное поле")
      .min(1, "Необходимо выбрать хотя бы один элемент")
      .of(Yup.object().shape({ name: Yup.string().required("Обязательное поле") })),
  });

  //Преобразование массива для поля data_type в объект типа {name: "Оборудование"}
  const dataTypesOptions = values.data_type?.map((item) => {
    return { name: item };
  });
  //Преобразование массива для поля access_type в объект типа {name: "Оборудование"}
  const accessTypesOptions = values.access_type?.map((item) => {
    return { name: item };
  });

  //Поиск пользователя в списке сотрудников
  const searchFilteredEmployees = (event) => {
    setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(event.query.toLowerCase())));
  };

  //Присваивание для вспомогательной переменной материального ответственного лица (если оно имеется) текущего значения (из базы данных)
  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) => employee.full_name.toLowerCase().includes(item.full_name?.toLowerCase()))
    );
  }, [item]);

  const submit = (item) => {
    let _item = { ...item };
    if (!_item.user_id) {
      _item.user_id = filteredEmployees[0]?.employee_id;
      _item.login = filteredEmployees[0]?.login;
    }
    _item.data_type = item.data_type?.map((item) => item.name).toString() || null;
    _item.access_type = item.access_type?.map((item) => item.name).toString() || null;

    saveItem(addData, updateData, _item, setItemDialog, setItem, emptyItem, userAuth, setDisabled, dialogType);
  };

  return (
    <Dialog
      visible={ItemDialog}
      style={{ width: "48rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Описание предмета"
      modal
      className="p-fluid"
      footer={getItemDialogFooter(setItemDialog, disabled, setDisabled, dialogType, formButtonRef)}
      onHide={hideNew(setItemDialog, setDisabled)}
    >
      <Formik
        initialValues={{
          ...item,
        }}
        validationSchema={validationSchema}
        onSubmit={submit}
        innerRef={formButtonRef}
      >
        <Form>
          <div className="grid">
            <div className="col-9">
              <Field
                name="full_name"
                component={AutoCompleteFieldComponent}
                title="ФИО пользователя"
                suggestions={[...filteredEmployees.map((e) => e.full_name)]}
                onSelect={(e) =>
                  setFilteredEmployees(
                    employees.filter((item) => item.full_name.toLowerCase().includes(e.value.toLowerCase()))
                  )
                }
                completeMethod={searchFilteredEmployees}
                forceSelection
                dialogType={dialogType}
                disabled={true}
              />
            </div>
            <div className="col-3">
              <Field
                name="role"
                component={DropdownFieldComponent}
                title="Роль"
                options={getDropdownOptions("role", values)}
                dialogType={dialogType}
                disabled={disabled}
              />
            </div>
            <div className="col-6">
              <Field
                name="data_type"
                component={MultiSelectFieldComponent}
                title="Типы ТМЦ"
                options={dataTypesOptions}
                dialogType={dialogType}
                disabled={disabled}
              />
            </div>
            <div className="col-6">
              <Field
                name="access_type"
                component={MultiSelectFieldComponent}
                title="Подразделения"
                options={accessTypesOptions}
                dialogType={dialogType}
                disabled={disabled}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </Dialog>
  );
};
