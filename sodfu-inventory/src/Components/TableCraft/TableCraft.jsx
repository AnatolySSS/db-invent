import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { classNames } from 'primereact/utils';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Calendar } from 'primereact/calendar';
import changeDateType from './../../function-helpers/changeDateType'

const TableCraft = (props) => {
  let { data, columns, values, requestData, updateData, setVisible } = props;
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  let location, type, serviceable, workplace_type, globalFilterColumns
  
  if (values) {
    location = values.map(obj => obj.location).filter(obj => obj !== null)
    type = values.map(obj => obj.type).filter(obj => obj !== null)
    serviceable = values.map(obj => obj.serviceable).filter(obj => obj !== null)
    workplace_type = values.map(obj => obj.workplace_type).filter(obj => obj !== null)
    globalFilterColumns = visibleColumns.map(obj => obj.field)
  }

  // if (data) {
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < Object.keys(data[i]).length; j++) {
  //       if (Object.values(data[i])[j] == null) {
  //         data[i][Object.keys(data[i])[j]] = "нет данных"
  //       } 
  //     } 
  //   }
  // }
  
  let dataWasReceived = false
  if (columns.length !== 0) {
    dataWasReceived = true
  }
  useEffect(() => {
    requestData();
    initFilters();
  }, []);

  useEffect(() => {
    setVisibleColumns(columns)
  }, [dataWasReceived]);

  const getSeverity = (value) => {
    switch (value) {
      case "Исправно":
        return "success";

      case "Не исправно":
        return "danger";

      default:
        return null;
    }
  };

  const getColumnBody = (col) => {
    switch (col.editingType) {
      case "dropdown":
        switch (col.field) {
          case "serviceable":
            return dropdownBodyTemplate("serviceable");
          case "location":
            return dropdownBodyTemplate("location");
          case "type":
            return dropdownBodyTemplate("type");
          case "workplace_type":
            return dropdownBodyTemplate("workplace_type");
          default:
            break;
        }

      case "checkbox":
        switch (col.field) {
          case "is_workplace":
            return checkboxBodyTemplate("is_workplace");
          case "was_deleted":
            return checkboxBodyTemplate("was_deleted");
          default:
            break;
        }
      case "inputCurrency":
        switch (col.field) {
          case "purchase_price":
            return priceBodyTemplate;
          default:
            break;
        }

      case "date":
        switch (col.field) {
          case "purchase_date":
            return dateBodyTemplate("purchase_date");
          case "release_date":
            return dateBodyTemplate("release_date");
          case "incoming_date":
            return dateBodyTemplate("incoming_date");
          case "last_setup_date":
            return dateBodyTemplate("last_setup_date");
          default:
            break;
        }

      default:
        return null;
    }
  };

  const getColumnFilterElement = (col) => {
    switch (col.editingType) {
      case "dropdown":
        switch (col.field) {
          case "serviceable":
            return dropdownFilterTemplate(serviceable);
          case "location":
            return dropdownFilterTemplate(location);
          case "type":
            return dropdownFilterTemplate(type);
            case "workplace_type":
            return dropdownFilterTemplate(workplace_type);
          default:
            break;
        }

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

  const getColumnEditor = (col) => {
    switch (col.editingType) {
      case "dropdown":
        return (options) => dropdownEditor(options);

      case "checkbox":
        return (options) => checkboxEditor(options);

      case "inputCurrency":
        return (options) => priceEditor(options);

      case "date":
        return (options) => dateEditor(options);

      default:
        return (options) => textEditor(options);
    }
  };

  const getDropdownOptions = (col) => {
    switch (col) {
      case "serviceable":
        return serviceable;

      case "location":
        return location;

      case "type":
        return type;

      case "workplace_type":
        return workplace_type;

      default:
        return type;
    }
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "data");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const clearFilter = () => {
    requestData();
    initFilters();
};

  const initFilters = () => {
    setFilters(props.filters);
    setGlobalFilterValue('');
};

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onRowEditComplete = (e) => {
    let _products = [...data];
    let { newData, index } = e;

    _products[index] = newData;

    Object.keys(newData).forEach(element => {
      if (element.includes("date")) {
        if (newData[element] !== null) {
          newData[element] = formatDate(newData[element])
          newData[element] = changeDateType(newData[element])
        }
      }
    })

    updateData(newData, newData.id);
  };

  const formatDate = (date) => {
    date ?
    date = new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Moscow",
    }) :  date = null
    return date
  }

  //EDITORS
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value || ''}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const dropdownEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={getDropdownOptions(options.field)}
        onChange={(e) => options.editorCallback(e.value)}
        // placeholder={`Select ${options.field}`}
        placeholder={options.value}
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const checkboxEditor = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="RUB"
        locale="ru-RU"
      />
    );
  };

  const dateEditor = (options) => {
    return (
      <Calendar
        value={formatDate(options.value)}
        onChange={(e) => options.editorCallback(e.value)}
        dateFormat="dd.mm.yy"
        placeholder={formatDate(options.value)}
        mask="99.99.9999"
      />
    );
  };

  //ItemTemplates
  const dropdownItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  //BodyTemplates
  const dropdownBodyTemplate = (dropdownType) => {
    return (rowData) => {
      return (
        <Tag
          value={rowData[dropdownType]}
          severity={getSeverity(rowData[dropdownType])}
        ></Tag>
      );
    };
  }

  const checkboxBodyTemplate = (checkboxType) => {
    return (rowData) => {
      return (
        <i
          className={classNames("pi", {
            "true-icon text-green-500 pi-check-circle": rowData[checkboxType],
            "false-icon text-red-500 pi-times-circle": !rowData[checkboxType],
          })}
        ></i>
      );
    };
  }

  const dateBodyTemplate = (dateType) => {
    return (rowData) => {
      return formatDate(rowData[dateType])
    };
  }

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(rowData.purchase_price);
  };

  //FilterTemplates
  const dropdownFilterTemplate = (dropdownType) => {
    return (options) => {
      return (
          <MultiSelect
            value={options.value}
            options={dropdownType}
            itemTemplate={dropdownItemTemplate}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Select One"
            className="p-column-filter"
            showClear
          />
      );
    };
  };

  const checkboxFilterTemplate = (options) => {
    return (
      <div className="flex align-items-center gap-2">
        <label htmlFor="verified-filter" className="font-bold">
          Check
        </label>
        <TriStateCheckbox
          inputid="verified-filter"
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
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
        placeholder="dd.mm.yyyy"
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

  const renderHeader = () => {
    return (
      <div className="flex align-content-center">
        <div className="flex align-items-center col-fixed">
          <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
        </div>
        <div className="col flex justify-content-between align-content-center">
          <div className="flex align-items-center justify-content-center">
            <MultiSelect
              value={visibleColumns}
              options={columns}
              optionLabel="header"
              onChange={onColumnToggle}
              className="w-full sm:w-20rem"
              display="chip"
            />
          </div>

          <div className="flex align-items-center justify-content-center">
            <h2>{props.name}</h2>
          </div>
          <div className="flex align-items-center justify-content-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search..."
              />
            </span>
            <div className="col-fixed">
              <Button
                className="ml-2"
                type="button"
                icon="pi pi-file-excel"
                severity="success"
                rounded
                onClick={exportExcel}
                data-pr-tooltip="XLS"
              />
            </div>
            <div className="flex align-items-center justify-content-center">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                outlined
                onClick={clearFilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={data}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={globalFilterColumns}
        dataKey="id"
        header={header}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        stripedRows
        removableSort
        scrollable
        scrollHeight="600px"
        style={{ minWidth: "50rem" }}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
      >
        {visibleColumns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
            filter
            filterField={col.field}
            dataType={col.dataType}
            filterElement={getColumnFilterElement(col)}
            showFilterMatchModes={col.showFilterMenu}
            style={{ minWidth: col.width}}
            body={getColumnBody(col)}
            // bodyClassName={col.dataType == "boolean" ? "text-center" : ""}
            editor={col.field !== "id" ? getColumnEditor(col) : null}
          />
        ))}
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default TableCraft;
