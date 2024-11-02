import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import Preloader from "../../Common/Preloader/Preloader";
import { creactLocale } from "../../../function-helpers/addLocale";
import { locale } from "primereact/api";
import {
  getColumnFilterElement,
  getglobalFilterColumns,
} from "../Functions/Filters/getColumnFilterElement";
import { getColumnBody, imgBodyTemplate } from "../Functions/Body/getColumnBody";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { Header } from "./Header";
import { getDialog } from "./DialogsCraft/Functions/getDialog";

const TableCraft = (props) => {
  let {
    type,
    name,
    data,
    columns,
    values,
    requestData,
    addData,
    updateData,
    deleteData,
    setVisible,
    logout,
    userAuth,
    isFetching,
    validationStatus,
    beginInventory,
    requestCurrentInventory,
    hasCurrentInventory,
  } = props;

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [ItemDialog, setItemDialog] = useState(false);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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

  const [item, setItem] = useState(emptyItem);

  window.onresize = function (event) {
    getTableHeight();
  };

  useEffect(() => {
    requestData(userAuth.division);
    requestCurrentInventory(type, userAuth.division);
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

  useEffect(() => {
    if (validationStatus.inventary_number) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Данный инвентарный номер уже имеется в базе данных`,
        life: 3000,
      });
    } else if (validationStatus.qr_code) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Данный qr-code уже имеется в базе данных`,
        life: 3000,
      });
    }
  }, [validationStatus]);

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const editItem = (rowData) => {
    setItem({ ...rowData });
    setItemDialog(true);
  };

  const confirmDeleteItem = (rowData) => {
    setItem(rowData);
    setDeleteItemDialog(true);
  };

  const deleteItem = () => {
    let _item = { ...item };
    deleteData(_item.id, userAuth.division);

    toast.current.show({
      severity: "success",
      summary: "Удалено",
      detail: `${item.name} успешно удален`,
      life: 3000,
    });
    setDeleteItemDialog(false);
    setItem(emptyItem);
  };

  const deleteItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Нет"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteItemDialog}
      />
      <Button
        label="Да"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteItem}
      />
    </React.Fragment>
  );

  const initFilters = () => {
    setFilters(props.filters);
    setGlobalFilterValue(props.filters.global.value);
  };

  const editColumnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={`pi ${userAuth.role === "admin" ? "pi-pencil" : "pi-eye"}`}
          rounded
          outlined
          onClick={() => editItem(rowData)}
        />
        {userAuth.role === "admin" && <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="ml-2"
          severity="danger"
          onClick={() => confirmDeleteItem(rowData)}
        />}
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
        dataKey="id"
        header={
          <Header
            type={type}
            data={data}
            logout={logout}
            selectedItems={selectedItems}
            userAuth={userAuth}
            emptyItem={emptyItem}
            setVisible={setVisible}
            setFilters={setFilters}
            setItem={setItem}
            setItemDialog={setItemDialog}
            setGlobalFilterValue={setGlobalFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            filters={filters}
            name={name}
            globalFilterValue={globalFilterValue}
            beginInventory={beginInventory}
            hasCurrentInventory={hasCurrentInventory}
            requestCurrentInventory={requestCurrentInventory}
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
        {(name === "Мебель" || name === "Оборудование") && data.length != 0 && (
          <Column
            key={visibleColumns.qr_code}
            field={visibleColumns.qr_code}
            header={"QRCODE IMG"}
            dataType={"text"}
            style={{ minWidth: "10rem" }}
            body={imgBodyTemplate(userAuth.division)}
            bodyClassName="text-center"
          />
        )}
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
      { getDialog(
        name,
        data,
        columns,
        setItemDialog,
        ItemDialog,
        item,
        setItem,
        values,
        addData,
        updateData,
        emptyItem,
        userAuth
      ) }

      <Dialog
        visible={deleteItemDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Подтверждение"
        modal
        footer={deleteItemDialogFooter}
        onHide={hideDeleteItemDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {item && (
            <span>
              Вы уверены, что хотите удалить <b>{item.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default TableCraft;
