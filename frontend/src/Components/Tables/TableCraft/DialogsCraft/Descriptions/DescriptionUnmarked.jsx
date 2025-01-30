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
  } = props;

  const [filteredFinanciallyResponsiblePerson, setFilteredFinanciallyResponsiblePerson] = useState([]);

  //Переменная для массива наименований столбцов,
  //чтобы показывать только релевантные столбцы для конкретного филиала
  let currentColumns = columns.map((column) => column.field);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    type: Yup.string().required("Обязательное поле"),
    serviceable: currentColumns.includes("serviceable") && Yup.string().required("Обязательное поле"),
    location: currentColumns.includes("location") && Yup.string().required("Обязательное поле"),
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
    saveItem(type, addData, updateData, data, _item, setItemDialog, setItem, emptyItem, userAuth, setDisabled, values);
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
              {currentColumns.includes("name") && (
                <div className="col-12">
                  <Field
                    name="name"
                    component={TextAreaFieldComponent}
                    title="Наименование"
                    rows={3}
                    dialogType={dialogType}
                    disabled={disabled}
                  />
                </div>
              )}
              {currentColumns.includes("location") && (
                <div className="col-6">
                  <Field
                    name="location"
                    component={DropdownFieldComponent}
                    title="Где установлено"
                    options={getDropdownOptions("location", values)}
                    dialogType={dialogType}
                    disabled={disabled}
                  />
                </div>
              )}
              {currentColumns.includes("type") && (
                <div className="col-6">
                  <Field
                    name="type"
                    component={DropdownFieldComponent}
                    title="Тип"
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
            {currentColumns.includes("financially_responsible_person") && (
              <div className="col-6">
                <Field
                  name="financially_responsible_person"
                  component={AutoCompleteFieldComponent}
                  title="Материально ответственное лицо"
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
            {currentColumns.includes("qr_code") && dialogType === "edit" && (
              <div className="col-6">
                <Field
                  name="qr_code"
                  component={InputFieldComponent}
                  title="QRCODE"
                  dialogType={dialogType}
                  disabled={true}
                />
              </div>
            )}
            {currentColumns.includes("purchase_price") && (
              <div className="col-6">
                <Field
                  name="purchase_price"
                  component={InputPriceFieldComponent}
                  title="Стоимость"
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.includes("count") && (
              <div className="col-6">
                <Field
                  name="count"
                  component={InputCountFieldComponent}
                  title="Количество"
                  dialogType={dialogType}
                  disabled={disabled}
                />
              </div>
            )}
            {currentColumns.includes("measurement") && (
              <div className="col-6">
                <Field
                  name="measurement"
                  component={DropdownFieldComponent}
                  title="Единица измерения"
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
            {currentColumns.includes("note") && (
              <div className="col-12">
                <Field
                  name="note"
                  component={TextAreaFieldComponent}
                  title="Информация"
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
