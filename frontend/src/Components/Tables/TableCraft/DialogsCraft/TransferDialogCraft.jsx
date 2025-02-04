import React, { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { handleTransferItem } from "./Functions/handleTransferItem";
import { Button } from "primereact/button";
import { Field, Form, Formik } from "formik";
import { AutoCompleteFieldComponent } from "./FormFieldComponents/AutoCompleteFieldComponent";
import { CalendarFieldComponent } from "./FormFieldComponents/CalendarFieldComponent";
import { TextAreaFieldComponent } from "./FormFieldComponents/TextAreaFieldComponent";

export const TransferDialogCraft = (props) => {
  const { transferDialog, setTransferDialog, selectedItems, setSelectedItems, employees, userAuth, transferItem } =
    props;

  let emptyTransferedItem = {
    employee: "",
    employee_id: "",
    date: "",
    note: "",
  };

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [latestDate, setLatestDate] = useState(null);
  const formButtonRef = useRef();

  const validationSchema = Yup.object().shape({
    employee: Yup.string().required("Обязательное поле"),
    date: Yup.string().required("Обязательное поле"),
    note: Yup.string().required("Обязательное поле"),
  });

  //При передаче нескольких единиц оборудования, дата передачи не может быть ранее самой поздней даты передачи оборудования
  //Данный useEffect определяет самую позднюю дату передачи из выбранного оборудования и присваивает ее latestDate
  useEffect(() => {
    const employeeSetupDates = selectedItems.map((item) => item.employee_setup_date).filter((item) => item);
    const latestDateHelper = new Date(Math.max(...employeeSetupDates.map((date) => date?.getTime())));
    latestDateHelper.setDate(latestDateHelper.getDate() + 1); // добавляем 1 день, т.к. передача оборудования в один день невозможна (предполагается)
    setLatestDate(latestDateHelper);
  }, [selectedItems]);

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
    setSelectedItems([]);
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
                minDate={latestDate}
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
