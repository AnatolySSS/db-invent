import { useRef } from "react";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { getUserLogo } from "../Functions/Helpers/getUserLogo";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import styles from './Header.module.css';

export const Header = (props) => {
  const {
    logout,
    userAuth,
    emptyItem,
    setVisible,
    setFilters,
    setItem,
    setItemDialog,
    setGlobalFilterValue,
    visibleColumns,
    setVisibleColumns,
    columns,
    filters,
    name,
    globalFilterValue,
  } = props;

  const userMenu = useRef(null);
  const userToast = useRef(null);

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

  const makeLogout = (logout) => () => {
    clearFilter();
    logout();
  };

  const userMenuItems = [
    {
      command: () => {
        userToast.current.show({
          severity: "info",
          summary: "Info",
          detail: userAuth.fullName,
          life: 3000,
        });
      },
      template: (item, options) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(
              options.className,
              "w-full p-link flex align-items-center"
            )}
          >
            <Avatar
              image={getUserLogo(userAuth.isAuth, userAuth.login)}
              className="mr-2"
              icon="pi pi-user"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">{`${userAuth.fullName.split(" ")[0]} ${
                Array.from(userAuth.fullName.split(" ")[1])[0]
              }.${Array.from(userAuth.fullName.split(" ")[2])[0]}. (филиал №${userAuth.division}) `}</span>
            </div>
          </button>
        );
      },
    },
    {
      label: "Добавить пользователя",
      icon: "pi pi-plus",
      command: openNew,
    },
    { separator: true },
    {
      label: "Выйти",
      icon: "pi pi-sign-out",
      command: makeLogout(logout),
    },
  ];

  return (
    <div className={classNames("flex justify-content-between")}>
      <Toast ref={userToast} />
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
        </div>
        <div className={classNames("align-items-center text-center justify-content-center min-w-max px-4", styles.name)}>
          <h2>{`${name}`}</h2>
        </div>
        <div className={classNames("flex align-items-center justify-content-center", styles.globalFilterGroup)}>
          <span className={classNames("p-input-icon-left", styles.globalFilter)}>
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
