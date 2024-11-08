import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import styles from "./DescriptionCraft.module.css";
import { getDropdownOptions } from "../Functions/getDropdownOptions";

export const DescriptionUnmarked = (props) => {
  const { columns, item, disabled, setItem, values } = props;

  //Переменная для массива наименований столбцов,
  //чтобы показывать только релевантные столбцы для конкретного филиала
  let currentColumns = columns.map((column) => column.field);

  return (
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
            rows={3}
            cols={20}
            disabled={disabled}
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
            disabled={disabled}
          />
        </div>
      )}
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
            disabled={disabled}
          />
        </div>
      )}
      {currentColumns.includes("count") && (
        <div className="col-4">
          <label htmlFor="count" className={styles.label}>
            Количество
          </label>
          <InputNumber
            id="count"
            value={item.count || ""}
            options={getDropdownOptions("count", values)}
            onChange={(e) => setItem({ ...item, count: e.value })}
            placeholder={item.count || ""}
            showButtons
            buttonLayout="horizontal"
            step={1}
            min={0}
            disabled={disabled}
          />
        </div>
      )}
      {currentColumns.includes("measurement") && (
        <div className="col-4">
          <label htmlFor="measurement" className={styles.label}>
            Единица измерения
          </label>
          <Dropdown
            id="measurement"
            value={item.measurement || ""}
            options={getDropdownOptions("measurement", values)}
            onChange={(e) => setItem({ ...item, measurement: e.target.value })}
            placeholder={item.measurement || ""}
            disabled={disabled}
          />
        </div>
      )}
      {currentColumns.includes("purchase_price") && (
        <div className="col-4">
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
            disabled={disabled}
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
            rows={3}
            cols={20}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};
