import { useRef } from "react";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import { getUserLogo } from "../../Tables/Functions/Helpers/getUserLogo";
import { setUserMenuItems } from "./Functions/setUserMenuItems";
import styles from "./TableHeader.module.css";

export const TableHeader = (props) => {
  const {
    setVisible,
    columns,
    filters,
    visibleColumns,
    setVisibleColumns,
    setFilters,
    setGlobalFilterValue,
    tableName,
    tableType,
    globalFilterValue,
    hasCurrentInventory,
    type,
    data,
    logout,
    selectedItems,
    userAuth,
    emptyItem,
    setItem,
    setItemDialog,
    setTransferDialog,
    beginInventory,
    requestCurrentInventory,
    clearState,
    setDialogType,
  } = props;

  const userMenu = useRef(null);
  const userToast = useRef(null);
  const transferToast = useRef(null);

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));
    setVisibleColumns(orderedSelectedColumns);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    let _filters = { ...filters };
    _filters["global"].value = null;

    setFilters(_filters);
    setGlobalFilterValue("");
  };

  const userMenuItems = setUserMenuItems(
    type,
    data,
    logout,
    userToast,
    transferToast,
    userAuth,
    selectedItems,
    clearFilter,
    setTransferDialog,
    clearState,
    tableType,
    hasCurrentInventory,
    beginInventory,
    requestCurrentInventory,
    emptyItem,
    setItem,
    setItemDialog,
    setDialogType
  );

  return (
    <div className="flex justify-content-between">
      <Toast ref={userToast} />
      <Toast ref={transferToast} />
      <Tooltip target=".inventory-status" />
      <div className="col-fixed flex">
        <div className="flex align-items-center col-fixed">
          <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
        </div>
      </div>
      <div className={classNames("col flex justify-content-between align-content-center", styles.main)}>
        <div className={"flex align-items-center justify-content-center"}>
          <MultiSelect
            value={visibleColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            maxSelectedLabels={3}
            className={styles.multiSelect}
            display="chip"
          />
          {/main|year/.test(tableType) && (
            <i
              className={`inventory-status pi ${hasCurrentInventory && "pi-spin"} pi-bitcoin ml-4 text-primary`}
              data-pr-tooltip={`Инвентаризация ${hasCurrentInventory ? "в процессе" : "не инициирована"}`}
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-3"
              style={{ fontSize: "2rem" }}
            />
          )}
        </div>
        <div className={classNames("align-items-center text-center justify-content-center min-w-max px-4", styles.name)}>
          <h2>{tableName}</h2>
        </div>
        <div className={classNames("flex align-items-center justify-content-center", styles.globalFilterGroup)}>
          <span className={classNames("p-input-icon-left", styles.globalFilter)}>
            <i className="pi pi-search" />
            <InputText value={globalFilterValue || ""} onChange={onGlobalFilterChange} placeholder="Поиск..." />
          </span>
          <div className="flex align-items-center justify-content-center">
            <Button className="ml-2" type="button" icon="pi pi-filter-slash" label="Очистить" outlined onClick={clearFilter} />
          </div>
          <div className="col-fixed flex align-items-center">
            <Menu model={userMenuItems} popup ref={userMenu} style={{ width: "max-content" }} />
            <Button className="bg-gray-50 hover:bg-gray-400 border-gray-50 px-2 py-1" onClick={(e) => userMenu.current.toggle(e)}>
              <Avatar image={getUserLogo(userAuth.isAuth, userAuth.login)} icon="pi pi-user" size="large" shape="circle" />
              <i className="pi pi-angle-down ml-2" style={{ color: "#4a4a4a" }}></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
