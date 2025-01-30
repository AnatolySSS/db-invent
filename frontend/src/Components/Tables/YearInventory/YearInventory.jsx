import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Preloader from "../../Common/Preloader/Preloader";
import { creactLocale } from "../../../function-helpers/addLocale";
import { locale } from "primereact/api";
import { getColumnFilterElement, getglobalFilterColumns } from "../Functions/Filters/getColumnFilterElement";
import { getColumnBody } from "../Functions/Body/getColumnBody";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { TableHeader } from "../../Common/TableHeader/TableHeader";
import { getImgBodyTemplate } from "../Functions/Body/getImgBodyTemplate";

const YearInventory = (props) => {
  const { year } = useParams();
  let {
    name,
    data,
    columns,
    values,
    requestData,
    setVisible,
    logout,
    userAuth,
    isFetching,
    type,
    clearItState,
    clearYearState,
    hasCurrentInventory,
    requestCurrentInventory,
  } = props;

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const userMenu = useRef(null);

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
  });

  useEffect(() => {
    initFilters();
    creactLocale();
    locale("ru");
  }, []);

  useEffect(() => {
    clearYearState();
    requestData(type, year, userAuth);
    requestCurrentInventory(type, userAuth.division_id);
    initFilters();
  }, [type, year]);

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

  const filterApplyTemplate = (options) => {
    return <Button label="Принять" size="small" onClick={options.filterApplyCallback}></Button>;
  };

  return isFetching ? (
    <div className="h-screen flex align-items-center justify-content-center">
      <div className="flex flex-column">
        <Preloader />
      </div>
    </div>
  ) : (
    <div className="card">
      <DataTable
        value={data}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={getglobalFilterColumns(visibleColumns)}
        dataKey="id"
        header={
          <TableHeader
            data={data}
            logout={logout}
            userAuth={userAuth}
            setVisible={setVisible}
            setFilters={setFilters}
            setGlobalFilterValue={setGlobalFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            filters={filters}
            tableName={`${name}  (${year})`}
            tableType="year"
            globalFilterValue={globalFilterValue}
            hasCurrentInventory={hasCurrentInventory}
            clearState={clearItState}
            userMenu={userMenu}
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
        scrollHeight={getTableHeight}
        // stateStorage="session"
        // stateKey={
        //   name == "Оборудование"
        //     ? `inventory-sodfu-it-state-${userAuth.login}`
        //     : `inventory-sodfu-furniture-state-${userAuth.login}`
        // }
        style={{ maxWidth: "100vw" }}
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
            filterElement={getColumnFilterElement(col, values)}
            filterApply={col.dataType == "boolean" ? filterApplyTemplate : null}
            showFilterMatchModes={col.showFilterMenu}
            style={{ minWidth: col.width, textWrap: "wrap" }}
            body={getColumnBody(col)}
          />
        ))}
        {name !== "Прочее" && data.length != 0 && (
          <Column
            key={visibleColumns.qr_code}
            field={visibleColumns.qr_code}
            header={"QRCODE IMG"}
            dataType={"text"}
            style={{ minWidth: "10rem", padding: "0.5rem" }}
            body={getImgBodyTemplate(userAuth.division_id)}
            bodyClassName="text-center"
          />
        )}
      </DataTable>
    </div>
  );
};

export default YearInventory;
