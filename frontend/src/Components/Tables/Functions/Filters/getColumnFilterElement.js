import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { Tag } from "primereact/tag";
import { getSeverityOptions } from "../../../../function-helpers/getSeverityOptions";

export const getglobalFilterColumns = (visibleColumns) => {
  return visibleColumns.map((obj) => obj.field);
};

export const getColumnFilterElement = (col, values) => {
  switch (col.editingType) {
    case "dropdown":
      return dropdownFilterTemplate(values[col.field]);
    case "tag":
      return tagFilterTemplate(values[col.field]);

    case "checkbox":
      return checkboxFilterTemplate;

    case "date":
      return dateFilterTemplate;

    case "inputCurrency":
      return priceFilterTemplate;

    default:
      return null;
  }
};

const dropdownFilterTemplate = (dropdownType) => {
  return (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={dropdownType}
        itemTemplate={dropdownItemTemplate}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Выбрать из списка"
        className="p-column-filter"
        display="chip"
        filter
        style={{ maxWidth: "300px" }}
      />
    );
  };
};

const tagFilterTemplate = (dropdownType) => {
  return (options) => {
    return (
      // <MultiSelect
      //   value={options.value}
      //   options={dropdownType}
      //   itemTemplate={tagItemTemplate}
      //   onChange={(e) => options.filterCallback(e.value)}
      //   placeholder="Выбрать из списка"
      //   className="p-column-filter"
      //   display="chip"
      //   filter
      //   style={{ maxWidth: "300px" }}
      // />
      <Dropdown
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
        options={dropdownType}
        placeholder="Выбрать из списка"
        valueTemplate={selectedCountryTemplate}
        itemTemplate={tagItemTemplate}
        style={{ maxWidth: "300px" }}
      />
    );
  };
};

export const multiStateCheckboxOptions = [
  { value: "true", icon: "pi pi-check" },
  { value: "false", icon: "pi pi-times" },
  { value: "null", icon: "pi pi-question" },
];

const dropdownItemTemplate = (option) => {
  return option;
};

const tagItemTemplate = (option) => {
  let severity = getSeverityOptions(option);
  return <Tag className={severity} severity={severity} value={option} />;
};

const selectedCountryTemplate = (option, props) => {
  let severity = getSeverityOptions(option);
  if (option) {
    return <Tag className={severity} severity={severity} value={option} />;
  }

  return <span>{props.placeholder}</span>;
};

const checkboxFilterTemplate = (options) => {
  return (
    <div className="flex align-items-center gap-2">
      <label htmlFor="checkbox-filter" className="font-bold">
        Выбрать
      </label>
      <MultiStateCheckbox
        inputid="checkbox-filter"
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
        options={multiStateCheckboxOptions}
        optionValue="value"
      />
    </div>
  );
};

const dateFilterTemplate = (options) => {
  return (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="dd.mm.yy"
      placeholder="дд.мм.гггг"
      mask="99.99.9999"
    />
  );
};

const priceFilterTemplate = (options) => {
  return (
    <InputNumber
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      mode="currency"
      currency="RUB"
      locale="ru-RU"
    />
  );
};
