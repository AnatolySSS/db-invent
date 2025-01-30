import React, { useState, useEffect, useRef } from "react";
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
import { getColumnFilterElement, getglobalFilterColumns } from "../Functions/Filters/getColumnFilterElement";
import { getColumnBody } from "../Functions/Body/getColumnBody";
import { getImgBodyTemplate } from "../Functions/Body/getImgBodyTemplate3";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { TableHeader } from "../../Common/TableHeader/TableHeader";
import { DialogCraft } from "./DialogsCraft/DialogCraft";
import UploadDialog from "../../Common/UploadDialog/UploadDialog";
import { TransferDialogCraft } from "./DialogsCraft/TransferDialogCraft";

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
    transferItem,
    deleteData,
    setVisible,
    logout,
    userAuth,
    isFetching,
    validationStatus,
    beginInventory,
    requestCurrentInventory,
    hasCurrentInventory,
    clearState,
    employees,
    uploadData,
  } = props;

  const [visibleColumns, setVisibleColumns] = useState([]);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [ItemDialog, setItemDialog] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [transferDialog, setTransferDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dialogType, setDialogType] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Храним отфильтрованные данные
  const [filteredValues, setFilteredValues] = useState(null); // Храним отфильтрованные данные

  const toast = useRef(null);
  const uploadToast = useRef(null);
  const userMenu = useRef(null);

  let emptyItem = {};

  values.city_name = ["Москва", "Саратов", "Санкт-Петербург", "Нижний Новгород"];

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

  useEffect(() => {
    requestData(userAuth);
    requestCurrentInventory(type, userAuth.division_id);
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
    setDialogType("edit");
    setItem({ ...rowData });
    setItemDialog(true);
  };

  const confirmDeleteItem = (rowData) => {
    setItem(rowData);
    setDeleteItemDialog(true);
  };

  const deleteItem = () => {
    let _item = { ...item };
    deleteData(_item.id, userAuth);

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
      <Button label="Нет" icon="pi pi-times" outlined onClick={hideDeleteItemDialog} />
      <Button label="Да" icon="pi pi-check" severity="danger" onClick={deleteItem} />
    </React.Fragment>
  );

  const initFilters = () => {
    setFilters(props.filters);
    setGlobalFilterValue(props.filters.global.value);
  };

  const editColumnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon={`pi pi-eye`} rounded outlined onClick={() => editItem(rowData)} />
        {userAuth.role === "admin" && (
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            className="ml-2"
            severity="danger"
            onClick={() => confirmDeleteItem(rowData)}
          />
        )}
      </React.Fragment>
    );
  };

  return isFetching ? (
    <div className="h-screen flex align-items-center justify-content-center">
      <Toast ref={toast} />
      <Toast ref={uploadToast} />
      <div className="flex flex-column">
        <Preloader />
      </div>
    </div>
  ) : (
    <div className="card">
      <Toast ref={toast} />
      <Toast ref={uploadToast} />
      <DataTable
        value={data}
        filters={filters}
        onValueChange={(filteredData) => setFilteredData(filteredData)}
        filterDisplay="menu"
        globalFilterFields={getglobalFilterColumns(visibleColumns)}
        dataKey="id"
        header={
          <TableHeader
            tableType="main"
            tableName={`${name}  (общая)`}
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
            setItem={setItem}
            setItemDialog={setItemDialog}
            setTransferDialog={setTransferDialog}
            globalFilterValue={globalFilterValue}
            setGlobalFilterValue={setGlobalFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            filters={filters}
            beginInventory={beginInventory}
            hasCurrentInventory={hasCurrentInventory}
            requestCurrentInventory={requestCurrentInventory}
            clearState={clearState}
            setDialogType={setDialogType}
            employees={employees}
            uploadData={uploadData}
            uploadToast={uploadToast}
            setUploadDialogVisible={setUploadDialogVisible}
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
        {name !== "Прочее" && data.length != 0 && (
          <Column
            key={visibleColumns.qr_code}
            field={visibleColumns.qr_code}
            header={"QRCODE IMG"}
            dataType={"text"}
            style={{ minWidth: "10rem", padding: "0.5rem" }}
            body={getImgBodyTemplate()}
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

      {/* Создание / изменение элемента */}

      <DialogCraft
        type={type}
        name={name}
        data={data}
        columns={columns}
        setItemDialog={setItemDialog}
        ItemDialog={ItemDialog}
        item={item}
        setItem={setItem}
        values={values}
        addData={addData}
        updateData={updateData}
        emptyItem={emptyItem}
        userAuth={userAuth}
        dialogType={dialogType}
        employees={employees}
      />

      {/* Удаление элемента */}

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
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
          {item && (
            <span>
              Вы уверены, что хотите удалить <b>{item.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      {/* Перемещение элементов */}

      <TransferDialogCraft
        transferDialog={transferDialog}
        setTransferDialog={setTransferDialog}
        selectedItems={selectedItems}
        employees={employees}
        userAuth={userAuth}
        transferItem={transferItem}
      />

      {/* Пакетная загрузка */}

      <UploadDialog
        uploadDialogVisible={uploadDialogVisible}
        setUploadDialogVisible={setUploadDialogVisible}
        type={type}
        data={data}
        values={values}
        uploadToast={uploadToast}
        uploadData={uploadData}
        userMenu={userMenu}
        userAuth={userAuth}
        columns={columns}
      />
    </div>
  );
};

export default TableCraft;
