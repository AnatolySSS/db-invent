import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { classNames } from 'primereact/utils';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

const TableCraft = (props) => {
  const { data, columns, requestData, updateData, setVisible } = props;
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [statuses] = useState(['ИСПРАВЕН', 'НЕ ОЧЕНЬ', 'СОВСЕМ ПЛОХ']);

  const getServiceable = (value) => {
    switch (value) {
      case "ИСПРАВЕН":
        return "success";

      case "НЕ ОЧЕНЬ":
        return "warning";

      case "СОВСЕМ ПЛОХ":
        return "danger";

      default:
        return null;
    }
  };

  const getColumnBody = (field) => {
    switch (field) {
      case "serviceable":
        return serviceableBodyTemplate;

      case "is_capital_good":
        return verifiedBodyTemplate;

      default:
        return null;
    }
  };

  const getColumnFilterElement = (field) => {
    switch (field) {
      case "serviceable":
        return serviceableRowFilterTemplate;

      case "is_capital_good":
        return verifiedRowFilterTemplate;

      default:
        return null;
    }
  };

  const getColumnEditor = (field) => {
    switch (field) {
      case "serviceable":
        return (options) => serviceableEditor(options);

      case "is_capital_good":
        return (options) => verifiedEditor(options);;

      default:
        return (options) => textEditor(options);
    }
  };

  let dataWasReceived = false
  if (columns.length !== 0) {
    dataWasReceived = true
  }
  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    setVisibleColumns(columns)
  }, [dataWasReceived]);

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

    updateData(newData, newData.id);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value || ''}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const serviceableEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getServiceable(option)}></Tag>;
        }}
      />
    );
  };

  const verifiedEditor = (options) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const serviceableItemTemplate = (option) => {
    return <Tag value={option} severity={getServiceable(option)} />;
};

  const serviceableBodyTemplate = (rowData) => {
    return <Tag value={rowData.serviceable} severity={getServiceable(rowData.serviceable)}></Tag>;
};

const verifiedBodyTemplate = (rowData) => {
  return <i className={classNames('pi', { 'true-icon text-green-500 pi-check-circle': rowData.is_capital_good, 'false-icon text-red-500 pi-times-circle': !rowData.is_capital_good })}></i>;
};

const serviceableRowFilterTemplate = (options) => {
  return (
      <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={serviceableItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
  );
};

const verifiedRowFilterTemplate = (options) => {
  return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
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
                placeholder="Keyword Search"
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
        filterDisplay="row"
        globalFilterFields={["id", "inventary_number", "internal_number"]}
        dataKey="id"
        header={header}
        paginator
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
            filterElement={getColumnFilterElement(col.field)}
            showFilterMenu={col.showFilterMenu}
            style={{ minWidth: col.width }}
            body={getColumnBody(col.field)}
            editor={getColumnEditor(col.field)}
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
