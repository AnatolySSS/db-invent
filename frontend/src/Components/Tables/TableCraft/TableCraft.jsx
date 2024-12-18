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
import { getColumnFilterElement, getglobalFilterColumns } from "../Functions/Filters/getColumnFilterElement";
import { getColumnBody } from "../Functions/Body/getColumnBody";
import { getImgBodyTemplate } from "../Functions/Body/getImgBodyTemplate3";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { TableHeader } from "../../Common/TableHeader/TableHeader";
import { DialogCraft } from "./DialogsCraft/DialogCraft";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";

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
  } = props;

  const [visibleColumns, setVisibleColumns] = useState([]);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [ItemDialog, setItemDialog] = useState(false);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [transferDialog, setTransferDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dialogType, setDialogType] = useState("");
  const toast = useRef(null);
  let emptyItem = {};
  let emptyTransferedItem = {
    employee_name: "",
    employee_id: "",
    date: "",
    note: "",
  };

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
  const [transferedItem, setTransferItem] = useState(emptyTransferedItem);

  useEffect(() => {
    requestData(userAuth);
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

  const hideTransferDialog = () => {
    setTransferItem(emptyTransferedItem);
    setTransferDialog(false);
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
      <Button label="Нет" icon="pi pi-times" outlined onClick={hideDeleteItemDialog} />
      <Button label="Да" icon="pi pi-check" severity="danger" onClick={deleteItem} />
    </React.Fragment>
  );

  const handletransferItem = () => {
    transferedItem.changedUserId = userAuth.employee_id;
    transferedItem.employee_id = filteredEmployees[0].employee_id;

    console.log(selectedItems);
    console.log(transferedItem);

    transferItem(selectedItems, transferedItem, userAuth.division);
    setTransferItem(emptyTransferedItem);
    setTransferDialog(false);
  };

  const transferDialogFooter = (
    <React.Fragment>
      <Button label="Переместить" icon="pi pi-check" onClick={handletransferItem} />
      <Button label="Выйти" icon="pi pi-times" outlined onClick={hideTransferDialog} />
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
          // icon={`pi ${userAuth.role === "admin" ? "pi-pencil" : "pi-eye"}`}
          icon={`pi pi-eye`}
          rounded
          outlined
          onClick={() => editItem(rowData)}
        />
        {userAuth.role === "admin" && (
          <Button icon="pi pi-trash" rounded outlined className="ml-2" severity="danger" onClick={() => confirmDeleteItem(rowData)} />
        )}
      </React.Fragment>
    );
  };

  // const [employeeNames, setEmployeeNames] = useState([]);
  // const [employeeIds, setEmployeeIds] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const employeesFullNames = employees.map((user) => user.full_name);

  const searchEmployees = (event) => {
    // setEmployeeNames(employeesFullNames.filter((item) => item.toLowerCase().includes(event.query.toLowerCase())));
    setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(event.query.toLowerCase())));
  };
  // useEffect(() => {
  //   console.log(filteredEmployees);
  // }, [filteredEmployees]);

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
          <TableHeader
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
            setTransferDialog={setTransferDialog}
            setGlobalFilterValue={setGlobalFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            filters={filters}
            tableName={`${name}  (общая)`}
            globalFilterValue={globalFilterValue}
            beginInventory={beginInventory}
            hasCurrentInventory={hasCurrentInventory}
            requestCurrentInventory={requestCurrentInventory}
            clearState={clearState}
            userMenuType="main"
            setDialogType={setDialogType}
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
        employeesFullNames={employeesFullNames}
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
      <Dialog
        visible={transferDialog}
        className="p-fluid"
        style={{ width: "48rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        closable={false} //для скрытия крестика в header dialog
        header="Перемещение"
        modal
        footer={transferDialogFooter}
        onHide={hideTransferDialog}
      >
        <div className="grid">
          <div className="col-8">
            <label htmlFor="name">ФИО</label>
            <AutoComplete
              id="name"
              value={transferedItem.employee_name || ""}
              suggestions={[...filteredEmployees.map((e) => e.full_name)]}
              completeMethod={searchEmployees}
              onChange={(e) => setTransferItem({ ...transferedItem, employee_name: e.target.value })}
              onSelect={(e) => setFilteredEmployees(employees.filter((item) => item.full_name.toLowerCase().includes(e.value.toLowerCase())))}
              forceSelection
              autoFocus={true}
            />
            {/* <InputText
              id="name"
              value={transferedItem.employee_name || ""}
              onChange={(e) =>
                setTransferItem({ ...transferedItem, employee_name: e.target.value })
              }
              autoFocus={true}
            /> */}
          </div>
          <div className="col-4">
            <label htmlFor="date">Дата перемещения</label>
            <Calendar
              id="date"
              value={transferedItem.date || null}
              onChange={(e) =>
                setTransferItem({
                  ...transferedItem,
                  date: e.target.value,
                })
              }
              dateFormat="dd.mm.yy"
              mask="99.99.9999"
            />
          </div>
          <div className="col-12">
            <label htmlFor="note">Основание</label>
            <InputTextarea
              id="note"
              aria-describedby="name"
              value={transferedItem.note || ""}
              onChange={(e) => setTransferItem({ ...transferedItem, note: e.target.value })}
              autoResize
              rows={3}
              cols={20}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TableCraft;
