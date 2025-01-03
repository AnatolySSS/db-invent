import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
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
import { DialogCraftEmployees } from "./DialogsCraft/Users/DialogCraftEmployees";

const EmployeesCraft = (props) => {
  let { type, name, data, columns, values, requestData, setVisible, logout, userAuth, isFetching, clearState, itData } = props;

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [ItemDialog, setItemDialog] = useState(false);
  const [item, setItem] = useState({});
  const toast = useRef(null);
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

  values.department = [...new Set(data.map((element) => element.department)?.filter((element) => element?.length !== 0 && element !== null))].sort((a, b) =>
    a.localeCompare(b)
  );
  values.department.unshift("");

  values.title = [...new Set(data.map((element) => element.title).filter((element) => element?.length !== 0 && element !== null))].sort((a, b) =>
    a.localeCompare(b)
  );
  values.title.unshift("");

  values.city_name = ["Москва", "Саратов", "Санкт-Петербург", "Нижний Новгород"];

  useEffect(() => {
    requestData(userAuth);
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
        filterDisplay="menu"
        globalFilterFields={getglobalFilterColumns(visibleColumns)}
        dataKey="employee_id"
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
            tableType="employees"
            globalFilterValue={globalFilterValue}
            clearState={clearState}
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
            filterElement={getColumnFilterElement(col, values)}
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
      <DialogCraftEmployees setItemDialog={setItemDialog} ItemDialog={ItemDialog} item={item} itData={itData} employees={data} fullName={userAuth.fullName} />
    </div>
  );
};

export default EmployeesCraft;
