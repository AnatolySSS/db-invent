import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { getImgBodyTemplate } from "../../../Functions/Body/getImgBodyTemplate3";
import { saveItem } from "../Functions/saveItem";
import { TextAreaFieldComponent } from "../FormFieldComponents/TextAreaFieldComponent";
import { InputFieldComponent } from "../FormFieldComponents/InputFieldComponent";
import { DropdownFieldComponent } from "../FormFieldComponents/DropdownFieldComponent";
import { AutoCompleteFieldComponent } from "../FormFieldComponents/AutoCompleteFieldComponent";
import { InputPriceFieldComponent } from "../FormFieldComponents/InputPriceFieldComponent";
import { InputCountFieldComponent } from "../FormFieldComponents/InputCountFieldComponent";

export const DescriptionUnmarked = (props) => {
  const {
    type,
    data,
    columns,
    item,
    disabled,
    setItem,
    values,
    addData,
    updateData,
    employees,
    dialogType,
    formButtonRef,
    userAuth,
    emptyItem,
    setItemDialog,
    setDisabled,
    toast,
  } = props;

  const [filteredFinanciallyResponsiblePerson, setFilteredFinanciallyResponsiblePerson] = useState([]);

  //Переменная для массива наименований столбцов,
  //чтобы показывать только релевантные столбцы для конкретного филиала
  let currentColumns = columns.map((column) => {
    return {
      field: column.field,
      header: column.header,
    };
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    type: Yup.string().required("Обязательное поле"),
    serviceable:
      currentColumns.map((col) => col.field).includes("serviceable") && Yup.string().required("Обязательное поле"),
    location: currentColumns.map((col) => col.field).includes("location") && Yup.string().required("Обязательное поле"),
    financially_responsible_person: Yup.string().required("Обязательное поле"),
  });

  const searchFilteredFinanciallyResponsiblePerson = (event) => {
    setFilteredFinanciallyResponsiblePerson(
      employees.filter((item) => item.full_name.toLowerCase().includes(event.query.toLowerCase()))
    );
  };

  //Присваивание для вспомогательной переменной материального ответственного лица (если оно имеется) текущего значения (из базы данных)
  useEffect(() => {
    setFilteredFinanciallyResponsiblePerson(
      employees.filter((employee) =>
        employee.full_name.toLowerCase().includes(item.financially_responsible_person?.toLowerCase())
      )
    );
  }, [item]);

  const submit = (item) => {
    let _item = { ...item };
    _item.financially_responsible_person_id = filteredFinanciallyResponsiblePerson[0].employee_id;
    saveItem(
      type,
      addData,
      updateData,
      data,
      _item,
      setItemDialog,
      setItem,
      emptyItem,
      userAuth,
      setDisabled,
      values,
      toast
    );
  };

  return (
    <Formik
      initialValues={{
        ...item,
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      innerRef={formButtonRef}
    >
      <Form>
        <div className="grid nested-grid">
          {/* Основные сведения */}

          <div className="col-9">
            <div className="grid">
              {currentColumns.map((col) => col.field).includes("name") && (
                <div className="col-12">
                  <Field
                    name="name"
                    component={TextAreaFieldComponent}
                    title={currentColumns.filter((col) => col.field === "name")[0].header}
                    rows={3}
                    dialogType={dialogType}
                    disabled={disabled}
                  />
                </div>
              )}
              {currentColumns.map((col) => col.field).includes("location") && (
                <div className="col-6">
                  <Field
                    name="location"
                    component={DropdownFieldComponent}
                    title={currentColumns.filter((col) => col.field === "location")[0].header}
                    options={getDropdownOptions("location", values)}
                    dialogType={dialogType}
                    disabled={disabled}
                  />
                </div>
              )}
              {currentColumns.map((col) => col.field).includes("type") && (
                <div className="col-6">
                  <Field
                    name="type"
                    component={DropdownFieldComponent}
                    title={currentColumns.filter((col) => col.field === "type")[0].header}
                    dialogType={dialogType}
                    disabled={disabled}
                    options={getDropdownOptions("type", values)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* QR-CODE */}

          <div className="col-3 mt-4">{getImgBodyTemplate("")(item)}</div>

          {/* Дополнительные сведения */}

          <div className="grid col-12">
            <div className="col-12">
              <h2 className="text-primary my-0">Дополнительные сведения</h2>
            </div>
            {currentColumns.map((col) => col.field).includes("financially_responsible_person") && (
              <div className="col-6">
                <Field
                  name="financially_responsible_person"
                  component={AutoCompleteFieldComponent}
                  title={currentColumns.filter((col) => col.field === "financially_responsible_person")[0].header}
                  suggestions={[...filteredFinanciallyResponsiblePerson.map((e) => e.full_name)]}
                  onSelect={(e) =>
                    setFilteredFinanciallyResponsiblePerson(
                      employees.filter((item) => item.full_name.toLowerCase().includes(e.value.toLowerCase()))
                    )
                  }
                  completeMethod={searchFilteredFinanciallyResponsiblePerson}
                  forceSelection
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("qr_code") && dialogType === "edit" && (
              <div className="col-6">
                <Field
                  name="qr_code"
                  component={InputFieldComponent}
                  title={currentColumns.filter((col) => col.field === "qr_code")[0].header}
                  dialogType={dialogType}
                  disabled={true}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("purchase_price") && (
              <div className="col-6">
                <Field
                  name="purchase_price"
                  component={InputPriceFieldComponent}
                  title={currentColumns.filter((col) => col.field === "purchase_price")[0].header}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("count") && (
              <div className="col-6">
                <Field
                  name="count"
                  component={InputCountFieldComponent}
                  title={currentColumns.filter((col) => col.field === "count")[0].header}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("measurement") && (
              <div className="col-6">
                <Field
                  name="measurement"
                  component={DropdownFieldComponent}
                  title={currentColumns.filter((col) => col.field === "measurement")[0].header}
                  dialogType={dialogType}
                  disabled={disabled}
                  options={getDropdownOptions("measurement", values)}
                />
              </div>
            )}
          </div>

          {/* Прочее */}

          <div className="grid col-12">
            <div className="col-12">
              <h2 className="text-primary my-0">Прочее</h2>
            </div>
            {currentColumns.map((col) => col.field).includes("note") && (
              <div className="col-12">
                <Field
                  name="note"
                  component={TextAreaFieldComponent}
                  title={currentColumns.filter((col) => col.field === "note")[0].header}
                  rows={1}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
          </div>
        </div>
      </Form>
    </Formik>
  );
};
