import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Preloader from "../../Common/Preloader/Preloader";
import { creactLocale } from "../../../function-helpers/addLocale";
import { locale } from "primereact/api";
import { getColumnFilterElement, getglobalFilterColumns } from "../Functions/Filters/getColumnFilterElement";
import { getColumnBody } from "../Functions/Body/getColumnBody";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { TableHeader } from "../../Common/TableHeader/TableHeader";
import { EmployeesDialog } from "./Dialog/EmployeesDialog";

const Employees = (props) => {
  let { type, name, data, columns, values, requestData, setVisible, logout, userAuth, isFetching, clearState, itData } =
    props;

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [ItemDialog, setItemDialog] = useState(false);
  const [item, setItem] = useState({});
  const [filteredData, setFilteredData] = useState(data); // Храним отфильтрованные данные
  const [filteredValues, setFilteredValues] = useState(values); // Храним отфильтрованные данные
  const toast = useRef(null);
  const userMenu = useRef(null);
  let emptyItem = {};

  columns.map((obj) => {
    let dataType;
    switch (obj.dataType) {
      case "numeric":
        dataType = 0;
        break;
      default:
        dataType = null;
        break;
    }
    emptyItem[obj.field] = dataType;
  });

  values.city_name = [...new Set(data.map((item) => item.city_name).filter((field) => field))].sort();
  values.full_name = [...new Set(data.map((item) => item.full_name).filter((field) => field))].sort();
  values.department = [...new Set(data.map((item) => item.department).filter((field) => field))].sort();
  values.title = [...new Set(data.map((item) => item.title).filter((field) => field))].sort();
  values.department.unshift("");
  values.title.unshift("");

  useEffect(() => {
    requestData(userAuth);
    initFilters();
    creactLocale();
    locale("ru");
  }, []);

  useEffect(() => {
    getTableHeight();
  }, [isFetching, selectedItems]);

  useEffect(() => {
    setVisibleColumns(columns);
  }, [columns]);

  useEffect(() => {
    setFilteredValues(values);
  }, [values]);

  useEffect(() => {
    let _filteredValues = {};

    for (const key in values) {
      _filteredValues[key] = [...new Set(filteredData.map((field) => field[key]).filter((field) => field))].sort();
    }
    setFilteredValues(_filteredValues);
  }, [filteredData]);

  const initFilters = () => {
    setFilters(props.filters);
    setGlobalFilterValue(props.filters.global.value);
  };

  const viewItem = (rowData) => {
    setItem({ ...rowData });
    setItemDialog(true);
  };

  const editColumnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon={"pi pi-eye"} rounded outlined onClick={() => viewItem(rowData)} />
      </React.Fragment>
    );
  };

  return isFetching ? (
    <div className="h-screen flex align-items-center justify-content-center">
      <Toast ref={toast} />
      <div className="flex flex-column">
        <Preloader />
      </div>
    </div>
  ) : (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={data}
        filters={filters}
        onValueChange={(filteredData) => setFilteredData(filteredData)}
        filterDisplay="menu"
        globalFilterFields={getglobalFilterColumns(visibleColumns)}
        dataKey="employee_id"
        header={
          <TableHeader
            tableType="employees"
            tableName={name}
            type={type}
            data={data}
            values={values}
            logout={logout}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            userAuth={userAuth}
            emptyItem={emptyItem}
            setVisible={setVisible}
            setFilters={setFilters}
            globalFilterValue={globalFilterValue}
            setGlobalFilterValue={setGlobalFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            filters={filters}
            clearState={clearState}
            userMenu={userMenu}
          />
        }
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Показаны с {first} по {last} из {totalRecords} объектов"
        rows={10}
        rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
        tableStyle={{ minWidth: "25rem" }}
        stripedRows
        removableSort
        resizableColumns
        columnResizeMode="expand"
        scrollable
        selectionMode="multiple"
        showSelectAll={true}
        selectionPageOnly={true}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        scrollHeight={getTableHeight}
        // stateStorage="session"
        // stateKey={
        //   name == "Оборудование"
        //     ? `inventory-sodfu-it-state-${userAuth.login}`
        //     : `inventory-sodfu-furniture-state-${userAuth.login}`
        // }
        style={{ maxWidth: "100vw" }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} frozen alignFrozen="left" />
        {visibleColumns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
            filter
            filterField={col.field}
            dataType={col.dataType}
            filterElement={getColumnFilterElement(col, filteredValues)}
            showFilterMatchModes={col.showFilterMenu}
            style={{ minWidth: col.width, textWrap: "wrap" }}
            body={getColumnBody(col)}
          />
        ))}
        {data.length != 0 && (
          <Column
            body={editColumnBodyTemplate}
            header={"Редактирование"}
            exportable={false}
            alignFrozen="right"
            frozen
            headerStyle={{ minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        )}
      </DataTable>
      <EmployeesDialog
        setItemDialog={setItemDialog}
        ItemDialog={ItemDialog}
        item={item}
        itData={itData}
        employees={data}
        fullName={userAuth.fullName}
      />
    </div>
  );
};

export default Employees;
