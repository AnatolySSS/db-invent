import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { multiStateCheckboxOptions } from "../../../Functions/Filters/getColumnFilterElement";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { getImgBodyTemplate } from "../../../Functions/Body/getImgBodyTemplate3";
import { saveItem } from "../Functions/saveItem";
import { TextAreaFieldComponent } from "../FormFieldComponents/TextAreaFieldComponent";
import { InputFieldComponent } from "../FormFieldComponents/InputFieldComponent";
import { DropdownFieldComponent } from "../FormFieldComponents/DropdownFieldComponent";
import { AutoCompleteFieldComponent } from "../FormFieldComponents/AutoCompleteFieldComponent";
import { InputPriceFieldComponent } from "../FormFieldComponents/InputPriceFieldComponent";
import { MultiStateCheckboxFieldComponent } from "../FormFieldComponents/MultiStateCheckboxFieldComponent";
import { CalendarFieldComponent } from "../FormFieldComponents/CalendarFieldComponent";

export const DescriptionFurniture = (props) => {
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

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredFinanciallyResponsiblePerson, setFilteredFinanciallyResponsiblePerson] = useState([]);
  const [deletedFieldsVisible, setDeletedFieldsVisible] = useState(false);

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
    deleted_date: deletedFieldsVisible && Yup.string().required("Обязательное поле"),
    deleted_grounds: deletedFieldsVisible && Yup.string().required("Обязательное поле"),
  });

  const searchFilteredEmployees = (event) => {
    setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(event.query.toLowerCase())));
  };

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
              {currentColumns.map((col) => col.field).includes("inventary_number") && (
                <div className="col-6">
                  <Field
                    name="inventary_number"
                    component={InputFieldComponent}
                    title={currentColumns.filter((col) => col.field === "inventary_number")[0].header}
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
            {currentColumns.map((col) => col.field).includes("employee") && dialogType === "edit" && (
              <div className="col-6">
                <Field
                  name="employee"
                  component={AutoCompleteFieldComponent}
                  title={currentColumns.filter((col) => col.field === "employee")[0].header}
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
            )}
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
            {currentColumns.map((col) => col.field).includes("serviceable") && (
              <div className="col-6">
                <Field
                  name="serviceable"
                  component={DropdownFieldComponent}
                  title={currentColumns.filter((col) => col.field === "serviceable")[0].header}
                  options={getDropdownOptions("serviceable", values)}
                  dialogType={dialogType}
                  disabled={disabled}
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
            {currentColumns.map((col) => col.field).includes("is_workplace") && (
              <div className="col-6 flex align-items-center">
                <Field
                  name="is_workplace"
                  component={MultiStateCheckboxFieldComponent}
                  title={currentColumns.filter((col) => col.field === "is_workplace")[0].header}
                  options={multiStateCheckboxOptions}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
          </div>

          {/* Даты */}

          <div className="grid col-12">
            <div className="col-12">
              <h2 className="text-primary my-0">Даты</h2>
            </div>
            {currentColumns.map((col) => col.field).includes("purchase_date") && (
              <div className="col-6">
                <Field
                  name="purchase_date"
                  component={CalendarFieldComponent}
                  title={currentColumns.filter((col) => col.field === "purchase_date")[0].header}
                  minDate={null}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("release_date") && (
              <div className="col-6">
                <Field
                  name="release_date"
                  component={CalendarFieldComponent}
                  title={currentColumns.filter((col) => col.field === "release_date")[0].header}
                  minDate={null}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("employee_setup_date") && dialogType === "edit" && (
              <div className="col-6">
                <Field
                  name="employee_setup_date"
                  component={CalendarFieldComponent}
                  title={currentColumns.filter((col) => col.field === "employee_setup_date")[0].header}
                  minDate={null}
                  dialogType={dialogType}
                  disabled={true}
                />
              </div>
            )}
          </div>

          {/* Списание */}

          <div className="grid col-12">
            <div className="col-12">
              <h2 className="text-primary my-0">Списание</h2>
            </div>
            {currentColumns.map((col) => col.field).includes("was_deleted") && (
              <div className="col-6 flex align-items-center">
                <Field
                  name="was_deleted"
                  onChange={() => console.log("sdf")}
                  component={MultiStateCheckboxFieldComponent}
                  title={currentColumns.filter((col) => col.field === "was_deleted")[0].header}
                  options={multiStateCheckboxOptions}
                  setDeletedFieldsVisible={setDeletedFieldsVisible}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("deleted_date") && deletedFieldsVisible && (
              <div className="col-6">
                <Field
                  name="deleted_date"
                  component={CalendarFieldComponent}
                  title={currentColumns.filter((col) => col.field === "deleted_date")[0].header}
                  minDate={null}
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.map((col) => col.field).includes("deleted_grounds") && deletedFieldsVisible && (
              <div className="col-12">
                <Field
                  name="deleted_grounds"
                  component={TextAreaFieldComponent}
                  title={currentColumns.filter((col) => col.field === "deleted_grounds")[0].header}
                  rows={1}
                  dialogType={dialogType}
                  disabled={disabled}
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
