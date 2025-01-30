import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { handleTransferItem } from "./Functions/handleTransferItem";
import { Button } from "primereact/button";
import { Field, Form, Formik } from "formik";
import { AutoCompleteFieldComponent } from "./FormFieldComponents/AutoCompleteFieldComponent";
import { CalendarFieldComponent } from "./FormFieldComponents/CalendarFieldComponent";
import { TextAreaFieldComponent } from "./FormFieldComponents/TextAreaFieldComponent";

export const TransferDialogCraft = (props) => {
  const { transferDialog, setTransferDialog, selectedItems, employees, userAuth, transferItem } = props;

  let emptyTransferedItem = {
    employee: "",
    employee_id: "",
    date: "",
    note: "",
  };

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const formButtonRef = useRef();

  const validationSchema = Yup.object().shape({
    employee: Yup.string().required("Обязательное поле"),
    date: Yup.string().required("Обязательное поле"),
  });

  const searchFilteredEmployees = (event) => {
    setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(event.query.toLowerCase())));
  };

  const hideTransferDialog = () => {
    setTransferDialog(false);
  };

  const submit = (transferedItem) => {
    transferedItem.changedUserId = userAuth.employee_id;
    transferedItem.employee_id = filteredEmployees[0].employee_id;

    handleTransferItem(transferedItem, transferItem, selectedItems, userAuth, setTransferDialog);
  };

  const transferDialogFooter = (
    <React.Fragment>
      <Button
        type="submit"
        label="Переместить"
        icon="pi pi-check"
        onClick={() => {
          if (formButtonRef.current) {
            formButtonRef.current.handleSubmit(); // Вызов handleSubmit вручную
          }
        }}
      />
      <Button label="Выйти" icon="pi pi-times" outlined onClick={hideTransferDialog} />
    </React.Fragment>
  );

  return (
    <Dialog
      visible={transferDialog}
      className="p-fluid"
      style={{ width: "48rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      closable={false} //для скрытия крестика в header dialog
      header="Перемещение"
      modal
      footer={transferDialogFooter}
      onHide={hideTransferDialog}
    >
      <Formik
        initialValues={{
          ...emptyTransferedItem,
        }}
        validationSchema={validationSchema}
        onSubmit={submit}
        innerRef={formButtonRef}
      >
        <Form>
          <div className="grid">
            <div className="col-8">
              <Field
                name="employee"
                component={AutoCompleteFieldComponent}
                title="Пользователь"
                suggestions={[...filteredEmployees.map((e) => e.full_name)]}
                onSelect={(e) =>
                  setFilteredEmployees(
                    employees.filter((item) => item.full_name.toLowerCase().includes(e.value.toLowerCase()))
                  )
                }
                completeMethod={searchFilteredEmployees}
                forceSelection
                dialogType={"edit"}
                disabled={false}
              />
            </div>
            <div className="col-4">
              <Field
                name="date"
                component={CalendarFieldComponent}
                title="Дата перемещения"
                dialogType={"edit"}
                disabled={false}
              />
            </div>
            <div className="col-12">
              <Field
                name="note"
                component={TextAreaFieldComponent}
                title="Основание"
                rows={3}
                dialogType={"edit"}
                disabled={false}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </Dialog>
  );
};
