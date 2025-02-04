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
import { getTableHeight } from "../Functions/Helpers/getTableHeight";
import { TableHeader } from "../../Common/TableHeader/TableHeader";
import { UsersDialog } from "./Dialog/UsersDialog";

const Users = (props) => {
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
    clearState,
    employees,
  } = props;

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [ItemDialog, setItemDialog] = useState(false);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dialogType, setDialogType] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Храним отфильтрованные данные
  const [filteredValues, setFilteredValues] = useState(values); // Храним отфильтрованные данные
  const toast = useRef(null);
  const userMenu = useRef(null);
  let emptyItem = { full_name: "", role: "", access_type: "", data_type: "" };

  values.city_name = [...new Set(data.map((item) => item.city_name).filter((field) => field))].sort();
  values.full_name = [...new Set(data.map((item) => item.full_name).filter((field) => field))].sort();
  values.department = [...new Set(data.map((item) => item.department).filter((field) => field))].sort();
  values.title = [...new Set(data.map((item) => item.title).filter((field) => field))].sort();
  values.department.unshift("");
  values.title.unshift("");

  const [item, setItem] = useState(emptyItem);

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

  //Изменение filteredValues в случае проставления фильтров
  useEffect(() => {
    let _filteredValues = {};

    //Для столбцов с типом tag значения для выпадающего списка не берутся из массива
    const tagCols = columns.filter((col) => col.editingType === "tag").map((col) => col.field);

    for (const key in values) {
      if (!tagCols.includes(key)) {
        _filteredValues[key] = [...new Set(filteredData.map((field) => field[key]).filter((field) => field))].sort();
      } else {
        const set = new Set();
        const arr = filteredData.map((field) => field[key]).filter((field) => field);
        arr.forEach((arr) => {
          arr.forEach((el) => {
            set.add(el);
          });
        });
        _filteredValues[key] = [...set];
      }
    }

    setFilteredValues(_filteredValues);
  }, [filteredData]);

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const editItem = (rowData) => {
    setDialogType("edit");
    //Преобразование поля data_type и access_type из строки в массив объектов типа {name: "Оборудование"}
    //Необходимо для MultiSelect
    let _rowData = { ...rowData };
    _rowData.data_type = _rowData.data_type?.map((item) => {
      return { name: item };
    });
    _rowData.access_type = _rowData.access_type?.map((item) => {
      return { name: item };
    });

    setItem({ ..._rowData });
    setItemDialog(true);
  };

  const confirmDeleteItem = (rowData) => {
    setItem(rowData);
    setDeleteItemDialog(true);
  };

  const deleteItem = () => {
    let _item = { ...item };
    deleteData(_item.user_id, userAuth);

    toast.current.show({
      severity: "success",
      summary: "Удалено",
      detail: `${item.full_name} успешно удален`,
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
        <Button icon={"pi pi-pencil"} rounded outlined onClick={() => editItem(rowData)} />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="ml-2"
          severity="danger"
          onClick={() => confirmDeleteItem(rowData)}
        />
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
        onValueChange={(data) => setFilteredData(data)}
        filterDisplay="menu"
        globalFilterFields={getglobalFilterColumns(visibleColumns)}
        dataKey="user_id"
        header={
          <TableHeader
            type={type}
            data={data}
            logout={logout}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
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
            tableName={name}
            tableType="users"
            globalFilterValue={globalFilterValue}
            clearState={clearState}
            setDialogType={setDialogType}
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
      <UsersDialog
        data={data}
        setItemDialog={setItemDialog}
        ItemDialog={ItemDialog}
        item={item}
        setItem={setItem}
        values={values}
        addData={addData}
        updateData={updateData}
        emptyItem={emptyItem}
        userAuth={userAuth}
        employees={employees}
        dialogType={dialogType}
      />
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
              Вы уверены, что хотите удалить <b>{item.full_name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
