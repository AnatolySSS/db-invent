import React, {useState} from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { getDropdownOptions } from "../Functions/getDropdownOptions";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import { multiStateCheckboxOptions } from "../../../Functions/Filters/getColumnFilterElement";
import { getItemDialogFooter } from "../Functions/getItemDialogFooter";
import styles from "./DialogCraftFurniture.module.css";

export const DialogCraftFurniture = (props) => {
  const {
    data,
    setItemDialog,
    ItemDialog,
    hideNew,
    item,
    setItem,
    values,
    addData,
    updateData,
    emptyItem,
    userAuth,
  } = props;

  const [disabled, setDisabled] = useState(true);

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
      onHide={hideNew}
    >
      <div className="grid">
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
            rows={3}
            cols={20}
            disabled={disabled}
          />
        </div>
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
            disabled={disabled}
          />
        </div>
        <div className="col-6">
          <label htmlFor="qr_code" className={styles.label}>
            QRCODE
          </label>
          <InputText
            id="qr_code"
            value={item.qr_code || ""}
            onChange={(e) => setItem({ ...item, qr_code: e.target.value })}
            disabled={disabled}
          />
        </div>
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
            disabled={disabled}
          />
        </div>
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
            disabled={disabled}
          />
        </div>
        <div className="col-6">
          <label htmlFor="serviceable" className={styles.label}>
            Состояние исправности
          </label>
          <Dropdown
            id="serviceable"
            value={item.serviceable || ""}
            options={getDropdownOptions("serviceable", values)}
            onChange={(e) => setItem({ ...item, serviceable: e.target.value })}
            placeholder={item.serviceable || ""}
            disabled={disabled}
          />
        </div>
        <div className="col-6">
          <label htmlFor="price" className={styles.label}>
            Стоимость
          </label>
          <InputNumber
            id="purchase_price"
            value={item.purchase_price || 0}
            onChange={(e) =>
              setItem({ ...item, purchase_price: e.value })
            }
            mode="currency"
            currency="RUB"
            locale="ru-RU"
            disabled={disabled}
          />
        </div>
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
            disabled={disabled}
            // mask="99.99.9999"
          />
        </div>
        <div className="col-6">
          <label htmlFor="release_date" className={styles.label}>
            Дата выпуска
          </label>
          <Calendar
            id="release_date"
            value={item.release_date || null}
            onChange={(e) => setItem({ ...item, release_date: e.target.value })}
            dateFormat="dd.mm.yy"
            placeholder={formatDate(item.release_date || null)}
            disabled={disabled}
            // mask="99.99.9999"
          />
        </div>
        <div className="col-6">
          <MultiStateCheckbox
            inputid="is_workplace"
            value={
              item.is_workplace != undefined
                ? item.is_workplace.toString()
                : null
            }
            onChange={(e) => setItem({ ...item, is_workplace: e.target.value })}
            options={multiStateCheckboxOptions}
            optionValue="value"
            disabled={disabled}
          />
          <label htmlFor="is_workplace" className="font-bold ml-2">
            Рабочее место
          </label>
        </div>
        <div className="col-6">
          <MultiStateCheckbox
            inputid="was_deleted"
            value={
              item.was_deleted != undefined ? item.was_deleted.toString() : null
            }
            onChange={(e) => setItem({ ...item, was_deleted: e.target.value })}
            options={multiStateCheckboxOptions}
            optionValue="value"
            disabled={disabled}
          />
          <label htmlFor="was_deleted" className="font-bold ml-2">
            Списано
          </label>
        </div>
        <div className="col-6">
          <label htmlFor="deleted_date" className={styles.label}>
            Дата списания
          </label>
          <Calendar
            id="deleted_date"
            value={item.deleted_date || null}
            onChange={(e) => setItem({ ...item, deleted_date: e.target.value })}
            dateFormat="dd.mm.yy"
            placeholder={formatDate(item.deleted_date || null)}
            disabled={disabled}
            // mask="99.99.9999"
          />
        </div>
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
            rows={1}
            cols={20}
            disabled={disabled}
          />
        </div>
        <div className="col-12">
          <label htmlFor="note" className={styles.label}>
            Информация
          </label>
          <InputTextarea
            id="note"
            value={item.note || ""}
            onChange={(e) => setItem({ ...item, note: e.target.value })}
            rows={3}
            cols={20}
            disabled={disabled}
          />
        </div>
      </div>
    </Dialog>
  );
};