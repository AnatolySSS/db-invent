import { useRef } from "react";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { setUserMenuItems } from "../Functions/Helpers/setUserMenuItems";
import { getUserLogo } from "../Functions/Helpers/getUserLogo";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import styles from "./Header.module.css";
import { MdOutlineInventory } from "react-icons/md";
import { getTableHeight } from "../Functions/Helpers/getTableHeight";

export const Header = (props) => {
  const {
    type,
    data,
    logout,
    selectedItems,
    userAuth,
    emptyItem,
    setVisible,
    setFilters,
    setItem,
    setItemDialog,
    setTransferDialog,
    setGlobalFilterValue,
    visibleColumns,
    setVisibleColumns,
    columns,
    filters,
    name,
    globalFilterValue,
    beginInventory,
    hasCurrentInventory,
    requestCurrentInventory,
    clearState,
  } = props;

  const userMenu = useRef(null);
  const userToast = useRef(null);
  const transferToast = useRef(null);

  const openNew = () => {
    setItem(emptyItem);
    setItemDialog(true);
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
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
    data,
    logout,
    userToast,
    transferToast,
    userAuth.fullName,
    userAuth.isAuth,
    userAuth.login,
    userAuth.division,
    userAuth.role,
    selectedItems,
    clearFilter,
    openNew,
    setTransferDialog,
    clearState
  );

  if (!hasCurrentInventory) {
    userMenuItems.splice(userAuth.role === "admin" ? 3 : 1, 0, {
      label: "Начать инвентаризацию",
      icon: (
        <i className="mr-2">
          <MdOutlineInventory />
        </i>
      ),
      command: async () => {
        await beginInventory(type, userAuth.division);
        await requestCurrentInventory(type, userAuth.division);
        getTableHeight();
        userToast.current.show({
          severity: "success",
          summary: "Info",
          detail: "Инвентаризация инициирована",
          life: 3000,
        });
      },
    });
  }

  return (
    <div className={classNames("flex justify-content-between")}>
      <Toast ref={userToast} />
      <Toast ref={transferToast} />
      <div className="col-fixed flex">
        <div className="flex align-items-center col-fixed">
          <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
        </div>
      </div>
      <div
        className={classNames(
          "col flex justify-content-between align-content-center",
          styles.main
        )}
      >
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
        </div>
        <div
          className={classNames(
            "align-items-center text-center justify-content-center min-w-max px-4",
            styles.name
          )}
        >
          <h2>{`${name}  (общая)`}</h2>
          {hasCurrentInventory && (
            <small className="text-red-400">Инвентаризация в процессе</small>
          )}
        </div>
        <div
          className={classNames(
            "flex align-items-center justify-content-center",
            styles.globalFilterGroup
          )}
        >
          <span
            className={classNames("p-input-icon-left", styles.globalFilter)}
          >
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Поиск..."
            />
          </span>
          <div className="flex align-items-center justify-content-center">
            <Button
              className="ml-2"
              type="button"
              icon="pi pi-filter-slash"
              label="Очистить"
              outlined
              onClick={clearFilter}
            />
          </div>
          <div className="col-fixed flex align-items-center">
            <Menu
              model={userMenuItems}
              popup
              ref={userMenu}
              style={{ width: "max-content" }}
            />
            <Button
              className="bg-gray-50 hover:bg-gray-400 border-gray-50 px-2 py-1"
              onClick={(e) => userMenu.current.toggle(e)}
            >
              <Avatar
                image={getUserLogo(userAuth.isAuth, userAuth.login)}
                icon="pi pi-user"
                size="large"
                shape="circle"
              />
              <i
                className="pi pi-angle-down ml-2"
                style={{ color: "#4a4a4a" }}
              ></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
