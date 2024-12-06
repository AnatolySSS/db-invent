import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import Preloader from "../../Common/Preloader/Preloader";
import { creactLocale } from "../../../function-helpers/addLocale";
import { locale } from "primereact/api";
import {
  getColumnFilterElement,
  getglobalFilterColumns,
} from "../Functions/Filters/getColumnFilterElement";
import { getColumnBody } from "../Functions/Body/getColumnBody";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { TableHeader } from "../../Common/TableHeader/TableHeader";

const EmployersCraft = (props) => {
  let {
    type,
    name,
    data,
    columns,
    requestData,
    setVisible,
    logout,
    userAuth,
    isFetching,
    clearState,
  } = props;

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const toast = useRef(null);
  let emptyItem = {};
  let values = {};
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

  values.department = [
    ...new Set(
      data
        .map((element) => element.department)
        .filter((element) => element.length !== 0)
    ),
  ].sort((a, b) => a.localeCompare(b));
  values.department.unshift("");

  values.title = [
    ...new Set(
      data
        .map((element) => element.title)
        .filter((element) => element.length !== 0)
    ),
  ].sort((a, b) => a.localeCompare(b));
  values.title.unshift("");

  useEffect(() => {
    requestData();
    initFilters();
    creactLocale();
    locale("ru");
  }, []);

  useEffect(() => {
    getTableHeight();
  }, [isFetching]);

  useEffect(() => {
    setVisibleColumns(columns);
  }, [columns]);

  const initFilters = () => {
    setFilters(props.filters);
    setGlobalFilterValue(props.filters.global.value);
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
        filterDisplay="menu"
        globalFilterFields={getglobalFilterColumns(visibleColumns)}
        dataKey="object_sid"
        header={
          <TableHeader
            type={type}
            data={data}
            logout={logout}
            selectedItems={selectedItems}
            userAuth={userAuth}
            emptyItem={emptyItem}
            setVisible={setVisible}
            setFilters={setFilters}
            setGlobalFilterValue={setGlobalFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            filters={filters}
            tableName={name}
            userMenuType="employers"
            globalFilterValue={globalFilterValue}
            clearState={clearState}
          />
        }
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Показаны с {first} по {last} из {totalRecords} объектов"
        rows={10}
        rowsPerPageOptions={[3, 5, 10, 25, 50]}
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
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          frozen
          alignFrozen="left"
        />
        {visibleColumns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
            filter
            filterField={col.field}
            dataType={col.dataType}
            filterElement={getColumnFilterElement(col, values)}
            showFilterMatchModes={col.showFilterMenu}
            style={{ minWidth: col.width, textWrap: "wrap" }}
            body={getColumnBody(col)}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default EmployersCraft;
