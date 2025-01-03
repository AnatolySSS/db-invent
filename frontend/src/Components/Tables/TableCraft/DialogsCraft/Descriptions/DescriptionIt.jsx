import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import styles from "./DescriptionCraft.module.css";
import { multiStateCheckboxOptions } from "../../../Functions/Filters/getColumnFilterElement";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import { getImgBodyTemplate } from "../../../Functions/Body/getImgBodyTemplate3";

export const DescriptionIt = (props) => {
  const {
    columns,
    item,
    disabled,
    setItem,
    values,
    employeesFullNames,
    dialogType,
  } = props;

  const [UserNames, setUserNames] = useState([]);

  const search = (event) => {
    setUserNames(
      employeesFullNames.filter((item) =>
        item.toLowerCase().includes(event.query.toLowerCase())
      )
    );
  };

  //Переменная для массива наименований столбцов,
  //чтобы показывать только релевантные столбцы для конкретного филиала
  let currentColumns = columns.map((column) => column.field);

  return (
    <div className="grid nested-grid">
      <div className="col-9">
        <div className="grid">
          {currentColumns.includes("name") && (
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
                autoResize
                rows={3}
                cols={20}
                disabled={dialogType === "edit" && disabled}
              />
            </div>
          )}
          {currentColumns.includes("inventary_number") && (
            <div className="col-6">
              <label htmlFor="inventary_number" className={styles.label}>
                Инвентарный номер
              </label>
              <InputText
                id="inventary_number"
                value={item.inventary_number || ""}
                onChange={(e) =>
                  setItem({ ...item, inventary_number: e.target.value })
                }
                disabled={dialogType === "edit" && disabled}
              />
            </div>
          )}
          {currentColumns.includes("type") && (
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
                disabled={dialogType === "edit" && disabled}
              />
            </div>
          )}
        </div>
      </div>
      <div className="col-3 mt-4">{getImgBodyTemplate("")(item)}</div>
      <div className="grid col-12">
        <div className="col-12">
          <h2 className="text-primary">Дополнительные сведения</h2>
        </div>
        {currentColumns.includes("serial") && (
          <div className="col-6">
            <label htmlFor="serial" className={styles.label}>
              Серийный номер
            </label>
            <InputText
              id="serial"
              value={item.serial || ""}
              onChange={(e) => setItem({ ...item, serial: e.target.value })}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("qr_code") && dialogType === "edit" && (
          <div className="col-6">
            <label htmlFor="qr_code" className={styles.label}>
              QRCODE
            </label>
            <InputText
              id="qr_code"
              value={item.qr_code || ""}
              onChange={(e) => setItem({ ...item, qr_code: e.target.value })}
              disabled={dialogType === "edit"}
            />
          </div>
        )}
        {currentColumns.includes("ad_name") && (
          <div className="col-6">
            <label htmlFor="ad_name" className={styles.label}>
              Имя устройства в AD
            </label>
            <InputText
              id="ad_name"
              value={item.ad_name || ""}
              onChange={(e) => setItem({ ...item, ad_name: e.target.value })}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("employee") && dialogType === "edit" && (
          <div className="col-6">
            <label htmlFor="employee" className={styles.label}>
              Пользователь
            </label>
            <AutoComplete
              id="employee"
              value={item.employee || ""}
              suggestions={UserNames}
              completeMethod={search}
              onChange={(e) => setItem({ ...item, employee: e.target.value })}
              forceSelection
              disabled={true}
            />
            {/* <InputText
              id="employee"
              value={item.employee || ""}
              onChange={(e) => setItem({ ...item, employee: e.target.value })}
              disabled={dialogType === "edit" && disabled}
            /> */}
          </div>
        )}
        {/* {currentColumns.includes("prev_employee") && (
          <div className="col-6">
            <label htmlFor="prev_employee" className={styles.label}>
              ФИО предыдущего юзера
            </label>
            <InputText
              id="prev_employee"
              value={item.prev_employee || ""}
              onChange={(e) => setItem({ ...item, prev_employee: e.target.value })}
              disabled={true}
            />
          </div>
        )} */}
        {currentColumns.includes("location") && (
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
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("workplace_type") && (
          <div className="col-6">
            <label htmlFor="workplace_type" className={styles.label}>
              Тип рабочего места
            </label>
            <Dropdown
              id="workplace_type"
              value={item.workplace_type || ""}
              options={getDropdownOptions("workplace_type", values)}
              onChange={(e) =>
                setItem({ ...item, workplace_type: e.target.value })
              }
              placeholder={item.workplace_type || ""}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("serviceable") && (
          <div className="col-6">
            <label htmlFor="serviceable" className={styles.label}>
              Состояние исправности
            </label>
            <Dropdown
              id="serviceable"
              value={item.serviceable || ""}
              options={getDropdownOptions("serviceable", values)}
              onChange={(e) =>
                setItem({ ...item, serviceable: e.target.value })
              }
              placeholder={item.serviceable || ""}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("set_with") && (
          <div className="col-6">
            <label htmlFor="set_with" className={styles.label}>
              Образует одно устройство
            </label>
            <InputText
              id="set_with"
              value={item.set_with || ""}
              onChange={(e) => setItem({ ...item, set_with: e.target.value })}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("purchase_price") && (
          <div className="col-6">
            <label htmlFor="purchase_price" className={styles.label}>
              Стоимость
            </label>
            <InputNumber
              id="purchase_price"
              value={item.purchase_price || 0}
              onChange={(e) => setItem({ ...item, purchase_price: e.value })}
              mode="currency"
              currency="RUB"
              locale="ru-RU"
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
      </div>

      <div className="grid col-12">
        <div className="col-12">
          <h2 className="text-primary">Даты</h2>
        </div>
        {currentColumns.includes("purchase_date") && (
          <div className="col-6">
            <label htmlFor="purchase_date" className={styles.label}>
              Дата приобретения
            </label>
            <Calendar
              id="purchase_date"
              value={item.purchase_date || null}
              onChange={(e) =>
                setItem({ ...item, purchase_date: e.target.value })
              }
              dateFormat="dd.mm.yy"
              placeholder={formatDate(item.purchase_date || null)}
              disabled={dialogType === "edit" && disabled}
              // mask="99.99.9999"
            />
          </div>
        )}
        {currentColumns.includes("release_date") && (
          <div className="col-6">
            <label htmlFor="release_date" className={styles.label}>
              Дата выпуска
            </label>
            <Calendar
              id="release_date"
              value={item.release_date || null}
              onChange={(e) =>
                setItem({ ...item, release_date: e.target.value })
              }
              dateFormat="dd.mm.yy"
              placeholder={formatDate(item.release_date || null)}
              disabled={dialogType === "edit" && disabled}
              // mask="99.99.9999"
            />
          </div>
        )}
        {currentColumns.includes("incoming_date") && (
          <div className="col-6">
            <label htmlFor="incoming_date" className={styles.label}>
              Дата поступления в НН
            </label>
            <Calendar
              id="incoming_date"
              value={item.incoming_date || null}
              onChange={(e) =>
                setItem({ ...item, incoming_date: e.target.value })
              }
              dateFormat="dd.mm.yy"
              placeholder={formatDate(item.incoming_date || null)}
              disabled={dialogType === "edit" && disabled}
              // mask="99.99.9999"
            />
          </div>
        )}
        {currentColumns.includes("employee_setup_date") &&
          dialogType === "edit" && (
            <div className="col-6">
              <label htmlFor="employee_setup_date" className={styles.label}>
                Дата установки пользователю
              </label>
              <Calendar
                id="employee_setup_date"
                value={item.employee_setup_date || null}
                onChange={(e) =>
                  setItem({ ...item, employee_setup_date: e.target.value })
                }
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.employee_setup_date || null)}
                disabled={true}
                // mask="99.99.9999"
              />
            </div>
          )}
      </div>
      <div className="grid col-12">
        <div className="col-12">
          <h2 className="text-primary">Прочее</h2>
        </div>
        {currentColumns.includes("is_workplace") && (
          <div className="col-6">
            <MultiStateCheckbox
              inputid="is_workplace"
              value={
                item.is_workplace != undefined
                  ? item.is_workplace.toString()
                  : null
              }
              onChange={(e) =>
                setItem({ ...item, is_workplace: e.target.value })
              }
              options={multiStateCheckboxOptions}
              optionValue="value"
              disabled={dialogType === "edit" && disabled}
            />
            <label htmlFor="is_workplace" className="font-bold ml-2">
              Рабочее место
            </label>
          </div>
        )}
        {currentColumns.includes("was_deleted") && (
          <div className="col-6">
            <MultiStateCheckbox
              inputid="was_deleted"
              id="was_deleted"
              value={
                item.was_deleted != undefined
                  ? item.was_deleted.toString()
                  : null
              }
              onChange={(e) =>
                setItem({ ...item, was_deleted: e.target.value })
              }
              options={multiStateCheckboxOptions}
              optionValue="value"
              disabled={dialogType === "edit" && disabled}
            />
            <label htmlFor="was_deleted" className="font-bold ml-2">
              Списано
            </label>
          </div>
        )}
      </div>
      <div className="grid col-12">
        {currentColumns.includes("deleted_date") && (
          <div className="col-6">
            <label htmlFor="deleted_date" className={styles.label}>
              Дата списания
            </label>
            <Calendar
              id="deleted_date"
              value={item.deleted_date || null}
              onChange={(e) =>
                setItem({ ...item, deleted_date: e.target.value })
              }
              dateFormat="dd.mm.yy"
              placeholder={formatDate(item.deleted_date || null)}
              disabled={dialogType === "edit" && disabled}
              // mask="99.99.9999"
            />
          </div>
        )}
        {currentColumns.includes("deleted_grounds") && (
          <div className="col-6">
            <label htmlFor="deleted_grounds" className={styles.label}>
              Основание для списания
            </label>
            <InputTextarea
              id="deleted_grounds"
              value={item.deleted_grounds || ""}
              onChange={(e) =>
                setItem({ ...item, deleted_grounds: e.target.value })
              }
              autoResize
              rows={1}
              cols={20}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
        {currentColumns.includes("note") && (
          <div className="col-12">
            <label htmlFor="note" className={styles.label}>
              Информация
            </label>
            <InputTextarea
              id="note"
              value={item.note || ""}
              onChange={(e) => setItem({ ...item, note: e.target.value })}
              autoResize
              rows={3}
              cols={20}
              disabled={dialogType === "edit" && disabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};
