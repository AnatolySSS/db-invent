import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { classNames } from 'primereact/utils';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import changeDateType from './../../function-helpers/changeDateType'
import Preloader from "../Common/Preloader/Preloader";
import { makeCommitment } from "../../function-helpers/docx";

const TableCraft = (props) => {
  let {
    name,
    message,
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
  } = props;
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState(props.filters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [ItemDialog, setItemDialog] = useState(false);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const toast = useRef(null);
  const userMenu = useRef(null);
  let emptyItem,
    location,
    type,
    serviceable,
    workplace_type,
    globalFilterColumns;
  emptyItem = {};

  if (values) {
    // emptyItem = columns.map(obj => obj.field)
    location = values.map((obj) => obj.location).filter((obj) => obj !== null);
    type = values.map((obj) => obj.type).filter((obj) => obj !== null);
    serviceable = values
      .map((obj) => obj.serviceable)
      .filter((obj) => obj !== null);
    workplace_type = values
      .map((obj) => obj.workplace_type)
      .filter((obj) => obj !== null);
    globalFilterColumns = visibleColumns.map((obj) => obj.field);
  }
  columns.map((obj) => {
    let dataType;
    switch (obj.dataType) {
      case "text":
        dataType = null;
        break;
      case "date":
        dataType = null;
        break;
      case "boolean":
        dataType = null;
        break;
      case "numeric":
        dataType = 0;
        break;
      default:
        break;
    }
    emptyItem[obj.field] = dataType;
  });
  const [item, setItem] = useState(emptyItem);

  const openNew = () => {
    setItem(emptyItem);
    setItemDialog(true);
  };

  const hideNew = () => {
    setItemDialog(false);
  };

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const saveItem = () => {
    if (item.name.trim()) {
      let _item = { ...item };

      Object.keys(_item).forEach((element) => {
        //Изменение пустой строки на null для избежания ошибки при сохранении в базе данных
        if (_item[element] == "") {
          _item[element] = null 
        }
        if (element.includes("date")) {
          if (_item[element] !== null) {
            _item[element] = formatDate(_item[element]);
            _item[element] = changeDateType(_item[element]);
          }
        }
      });

      if (_item.id) {
        updateData(_item, _item.id);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Item Updated",
          life: 3000,
        });
      } else {
        _item.id = createId();
        addData(_item);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "New Item Created",
          life: 3000,
        });
      }
      setItemDialog(false);
      setItem(emptyItem);
    }
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
    deleteData(_item.id)
    
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: `${item.name} Deleted`,
      life: 3000,
    });
    setDeleteItemDialog(false);
    setItem(emptyItem)
  };

  const deleteItemDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteItemDialog} />
        <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteItem} />
    </React.Fragment>
);

  const createId = () => {
    return data.length + 1;
  };

  let dataWasReceived = false;
  if (columns.length !== 0) {
    dataWasReceived = true;
  }
  useEffect(() => {
    requestData();
    initFilters();
  }, []);

  useEffect(() => {
    try {
      getTableHeight()
    } catch (error) {

    }
  }, [isFetching]);

  // useEffect(() => {
  //   try {
  //     console.log(selectedItems);
  //     makeCommitment(selectedItems)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedItems]);

  useEffect(() => {
    setVisibleColumns(columns);
  }, [dataWasReceived]);

const getTableHeight = () => {
  try {
    let headerWidth = document.getElementsByClassName("p-datatable-header")[0].offsetHeight;
    let paginatorWidth = document.getElementsByClassName("p-paginator-bottom")[0].offsetHeight;
    let scrollHeight = window.innerHeight - document.documentElement.clientHeight;
    let tableHeight = window.innerHeight - headerWidth - paginatorWidth - scrollHeight;
    document.getElementsByClassName("p-datatable-wrapper")[0].style.height = `${tableHeight}px`;
    return `${tableHeight}px`
  } catch (error) {

  }
}

window.onresize = function (event) {
  try {
    let headerWidth = document.getElementsByClassName("p-datatable-header")[0].offsetHeight;
    let paginatorWidth = document.getElementsByClassName("p-paginator-bottom")[0].offsetHeight;
    let scrollHeight = window.innerHeight - document.documentElement.clientHeight;
    let tableHeight = window.innerHeight - headerWidth - paginatorWidth - scrollHeight;
    document.getElementsByClassName("p-datatable-wrapper")[0].style.height = `${tableHeight}px`;
  } catch (error) {

  }
};

  const getSeverity = (value) => {
    switch (value) {
      case "Исправно":
        return "success";

      case "Не исправно":
        return "danger";

      default:
        return null;
    }
  };

  const getColumnBody = (col) => {
    switch (col.editingType) {
      case "dropdown":
        switch (col.field) {
          case "serviceable":
            return dropdownBodyTemplate("serviceable");
          case "location":
            return dropdownBodyTemplate("location");
          case "type":
            return dropdownBodyTemplate("type");
          case "workplace_type":
            return dropdownBodyTemplate("workplace_type");
          default:
            break;
        }

      case "checkbox":
        switch (col.field) {
          case "is_workplace":
            return checkboxBodyTemplate("is_workplace");
          case "was_deleted":
            return checkboxBodyTemplate("was_deleted");
          default:
            break;
        }
      case "inputCurrency":
        switch (col.field) {
          case "purchase_price":
            return priceBodyTemplate;
          default:
            break;
        }

      case "date":
        switch (col.field) {
          case "purchase_date":
            return dateBodyTemplate("purchase_date");
          case "release_date":
            return dateBodyTemplate("release_date");
          case "incoming_date":
            return dateBodyTemplate("incoming_date");
          case "last_setup_date":
            return dateBodyTemplate("last_setup_date");
            case "deleted_date":
            return dateBodyTemplate("deleted_date");
          default:
            break;
        }

      default:
        return null;
    }
  };

  const getColumnFilterElement = (col) => {
    switch (col.editingType) {
      case "dropdown":
        switch (col.field) {
          case "serviceable":
            return dropdownFilterTemplate(
              serviceable.filter((obj) => obj !== "")
            );
          case "location":
            return dropdownFilterTemplate(location.filter((obj) => obj !== ""));
          case "type":
            return dropdownFilterTemplate(type.filter((obj) => obj !== ""));
          case "workplace_type":
            return dropdownFilterTemplate(
              workplace_type.filter((obj) => obj !== "")
            );
          default:
            break;
        }

      case "checkbox":
        return checkboxFilterTemplate;

      case "date":
        return dateFilterTemplate;

      case "inputCurrency":
        return priceFilterTemplate;

      default:
        return null;
    }
  };

  const getColumnEditor = (col) => {
    switch (col.editingType) {
      case "dropdown":
        return (options) => dropdownEditor(options);

      case "checkbox":
        return (options) => checkboxEditor(options);

      case "inputCurrency":
        return (options) => priceEditor(options);

      case "date":
        return (options) => dateEditor(options);

      default:
        return (options) => textEditor(options);
    }
  };

  const getDropdownOptions = (col) => {
    switch (col) {
      case "serviceable":
        if (!serviceable.includes("")) {
          serviceable.push("");
        }
        return serviceable;

      case "location":
        if (!location.includes("")) {
          location.push("");
        }
        return location;

      case "type":
        if (!type.includes("")) {
          type.push("");
        }
        return type;

      case "workplace_type":
        if (!workplace_type.includes("")) {
          workplace_type.push("");
        }
        return workplace_type;

      default:
    }
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "data");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const clearFilter = () => {
    let _filters = { ...filters };
    _filters["global"].value = "";

    console.log(_filters);
    setFilters(_filters);
    setGlobalFilterValue("");
  };

  const initFilters = () => {
    setFilters(props.filters);
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // const onRowEditComplete = (e) => {
  //   let _data = [...data];
  //   let { newData, index } = e;

  //   _data[index] = newData;

  //   Object.keys(newData).forEach((element) => {
  //     if (element.includes("date")) {
  //       if (newData[element] !== null) {
  //         newData[element] = formatDate(newData[element]);
  //         newData[element] = changeDateType(newData[element]);
  //       }
  //     }
  //   });

  //   updateData(newData, newData.id);
  // };

  const formatDate = (date) => {
    date
      ? (date = new Date(date).toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "Europe/Moscow",
        }))
      : (date = null);
    return date;
  };

  //EDITORS
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value || ""}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const dropdownEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={getDropdownOptions(options.field)}
        onChange={(e) => options.editorCallback(e.value)}
        // placeholder={`Select ${options.field}`}
        placeholder={options.value}
        itemTemplate={(option) => {
          return option; //<Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const checkboxEditor = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="RUB"
        locale="ru-RU"
      />
    );
  };

  const dateEditor = (options) => {
    return (
      <Calendar
        value={formatDate(options.value)}
        onChange={(e) => options.editorCallback(e.value)}
        dateFormat="dd.mm.yy"
        placeholder={formatDate(options.value)}
        mask="99.99.9999"
      />
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        // type="button"
        label="Apply"
        size="small"
        // icon="pi pi-check"
        onClick={options.filterApplyCallback}
        // severity="success"
      ></Button>
    );
  };

  //ItemTemplates
  const dropdownItemTemplate = (option) => {
    return option;
    // return <Tag value={option} severity={getSeverity(option)} />;
  };

  //BodyTemplates
  const dropdownBodyTemplate = (dropdownType) => {
    return (rowData) => {
      return rowData[dropdownType];
      // <Tag
      //   value={rowData[dropdownType]}
      //   severity={getSeverity(rowData[dropdownType])}
      // ></Tag>
    };
  };

  const checkboxBodyTemplate = (checkboxType) => {
    return (rowData) => {
      return (
        <i
          className={classNames("pi", {
            "true-icon text-green-500 pi-check-circle":
              rowData[checkboxType] === "null" ? false : rowData[checkboxType],
            "false-icon text-red-500 pi-times-circle":
              rowData[checkboxType] === "null" ? false : !rowData[checkboxType],
            "text-grey-500 pi-question-circle":
              rowData[checkboxType] === "null" ? true : false,
          })}
        ></i>
      );
    };
  };

  const dateBodyTemplate = (dateType) => {
    return (rowData) => {
      return formatDate(rowData[dateType]);
    };
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(rowData.purchase_price);
  };

  //FilterTemplates
  const dropdownFilterTemplate = (dropdownType) => {
    return (options) => {
      return (
        <MultiSelect
          value={options.value}
          options={dropdownType}
          itemTemplate={dropdownItemTemplate}
          onChange={(e) => options.filterCallback(e.value)}
          placeholder="Select One"
          className="p-column-filter"
          display="chip"
          filter
          showClear
        />
      );
    };
  };

  const multiStateCheckboxOptions = [
    { value: "true", icon: "pi pi-check" },
    { value: "false", icon: "pi pi-times" },
    { value: "null", icon: "pi pi-question" },
  ];

  const checkboxFilterTemplate = (options) => {
    return (
      <div className="flex align-items-center gap-2">
        <label htmlFor="checkbox-filter" className="font-bold">
          Check
        </label>
        <MultiStateCheckbox
          inputid="checkbox-filter"
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
          options={multiStateCheckboxOptions}
          optionValue="value"
        />
      </div>
    );
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="dd.mm.yy"
        placeholder="dd.mm.yyyy"
        mask="99.99.9999"
      />
    );
  };

  const priceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="RUB"
        locale="ru-RU"
      />
    );
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _item = { ...item };

    _item[`${name}`] = val;

    setItem(_item);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _item = { ...item };

    _item[`${name}`] = val;

    setItem(_item);
  };

  const getUserLogo = () => {
    try {
      return require(`../../img/${
        props.userAuth.isAuth ? props.userAuth.login : ""
      }.png`);
    } catch (error) {
      return "";
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap align-content-center justify-content-between">
        <div className="col-fixed flex">
          <div className="flex align-items-center col-fixed">
            <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
          </div>
          {/* {userAuth.role === "admin" && (
            <div className="flex align-items-center justify-content-center">
              <Button
                label="New"
                icon="pi pi-plus"
                severity="success"
                onClick={openNew}
              />
            </div>
          )} */}
        </div>
        <div className="col flex flex-wrap justify-content-between align-content-center">
          <div className="flex align-items-center justify-content-center">
            <MultiSelect
              value={visibleColumns}
              options={columns}
              optionLabel="header"
              onChange={onColumnToggle}
              className="w-full sm:w-20rem"
              display="chip"
            />
          </div>

          <div className="flex align-items-center justify-content-center min-w-max px-4">
            <h2>{`${props.name}  (общая)`}</h2>
          </div>
          <div className="flex align-items-center justify-content-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search..."
              />
            </span>
            <div className="flex align-items-center justify-content-center">
              <Button
                className="ml-2"
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                outlined
                onClick={clearFilter}
              />
            </div>
            {/* <div className="col-fixed">
              <Button
                type="button"
                icon="pi pi-file-excel"
                severity="success"
                rounded
                onClick={exportExcel}
                data-pr-tooltip="XLS"
              />
            </div> */}
            <div className="col-fixed flex align-items-center">
              <Menu model={userMenuItems} popup ref={userMenu} style={{width: "max-content"}}/>
              <Button
                className="bg-gray-50 hover:bg-gray-400 border-gray-50 px-2 py-1"
                onClick={(e) => userMenu.current.toggle(e)}
              >
                <Avatar
                  image={getUserLogo()}
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

  const makeLogout = () => {
    logout();
  };

  const makeCommitmentHelper = () => makeCommitment(selectedItems)

  const userMenuItems = [
    {
      command: () => {
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: props.userAuth.fullName,
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
              image={getUserLogo()}
              className="mr-2"
              icon="pi pi-user"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">{`${
                props.userAuth.fullName.split(" ")[0]
              } ${Array.from(props.userAuth.fullName.split(" ")[1])[0]}.${
                Array.from(props.userAuth.fullName.split(" ")[2])[0]
              }.`}</span>
            </div>
          </button>
        );
      },
    },
    {
      label: "Export Commitment",
      icon: "pi pi-file-word",
      command: makeCommitmentHelper,
    },
    {
      label: "Export EXCEL",
      icon: "pi pi-file-excel",
      command: exportExcel,
    },
    { separator: true},
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: makeLogout,
    },
  ];

  if (userAuth.role === "admin") {
    userMenuItems.splice(1, 0, {
      label: "New",
      icon: "pi pi-plus",
      command: openNew,
    });
  }

  const header = renderHeader();

  const editColumnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          // className="mr-2"
          onClick={() => editItem(rowData)}
        />
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

  const itemDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideNew} />
      <Button label="Save" icon="pi pi-check" onClick={saveItem} />
    </React.Fragment>
  );

  const renderDialogCraftFurniture = () => {
    return (
      <Dialog
        visible={ItemDialog}
        style={{ width: "48rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Описание предмета"
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideNew}
      >
        {/* {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/item/${item.image}`}
            alt={item.image}
            className="product-image block m-auto pb-3"
          />
        )} */}
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Наименование
          </label>
          <InputTextarea
            id="name"
            value={item.name || ""}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            rows={3}
            cols={20}
            // className={classNames({ "p-invalid": submitted && !item.name })}
          />
          {/* {submitted && !item.name && (
            <small className="p-error">Name is required.</small>
          )} */}
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="inventary_number" className="font-bold">
                Инвентарный номер
              </label>
              <InputText
                id="inventary_number"
                value={item.inventary_number || ""}
                onChange={(e) => onInputChange(e, "inventary_number")}
                required
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="qr_code" className="font-bold">
                QRCODE
              </label>
              <InputText
                id="qr_code"
                value={item.qr_code || ""}
                onChange={(e) => onInputChange(e, "qr_code")}
                required
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="type" className="font-bold">
                Тип
              </label>
              <Dropdown
                id="type"
                value={item.type || ""}
                options={getDropdownOptions("type")}
                onChange={(e) => onInputChange(e, "type")}
                placeholder={item.type || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="location" className="font-bold">
                Где установлено
              </label>
              <Dropdown
                id="location"
                value={item.location || ""}
                options={getDropdownOptions("location")}
                onChange={(e) => onInputChange(e, "location")}
                placeholder={item.location || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="serviceable" className="font-bold">
                Состояние исправности
              </label>
              <Dropdown
                id="serviceable"
                value={item.serviceable || ""}
                options={getDropdownOptions("serviceable")}
                onChange={(e) => onInputChange(e, "serviceable")}
                placeholder={item.serviceable || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="price" className="font-bold">
                Стоимость
              </label>
              <InputNumber
                id="purchase_price"
                value={item.purchase_price || 0}
                onChange={(e) => onInputNumberChange(e, "purchase_price")}
                mode="currency"
                currency="RUB"
                locale="ru-RU"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="purchase_date" className="font-bold">
                Дата приобретения
              </label>
              <Calendar
                id="purchase_date"
                value={item.purchase_date || null}
                onChange={(e) => onInputChange(e, "purchase_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.purchase_date || null)}
                mask="99.99.9999"
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="release_date" className="font-bold">
                Дата выпуска
              </label>
              <Calendar
                id="release_date"
                value={item.release_date || null}
                onChange={(e) => onInputChange(e, "release_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.release_date || null)}
                mask="99.99.9999"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <MultiStateCheckbox
                inputid="is_workplace"
                value={
                  item.is_workplace != undefined
                    ? item.is_workplace.toString()
                    : null
                }
                onChange={(e) => onInputChange(e, "is_workplace")}
                options={multiStateCheckboxOptions}
                optionValue="value"
              />
              <span htmlFor="is_workplace" className="font-bold ml-2">
                Рабочее место
              </span>
            </div>
            <div className="field col-6 mb-0">
              <MultiStateCheckbox
                inputid="was_deleted"
                value={
                  item.was_deleted != undefined
                    ? item.was_deleted.toString()
                    : null
                }
                onChange={(e) => onInputChange(e, "was_deleted")}
                options={multiStateCheckboxOptions}
                optionValue="value"
              />
              <span htmlFor="was_deleted" className="font-bold ml-2">
                Списано
              </span>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="deleted_date" className="font-bold">
                Дата списания
              </label>
              <Calendar
                id="deleted_date"
                value={item.deleted_date || null}
                onChange={(e) => onInputChange(e, "deleted_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.deleted_date || null)}
                mask="99.99.9999"
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="deleted_grounds" className="font-bold">
                Основание для списания
              </label>
              <InputTextarea
                id="deleted_grounds"
                value={item.deleted_grounds || ""}
                onChange={(e) => onInputChange(e, "deleted_grounds")}
                required
                rows={1}
                cols={20}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label htmlFor="note" className="font-bold">
            Описание
          </label>
          <InputTextarea
            id="note"
            value={item.note || ""}
            onChange={(e) => onInputChange(e, "note")}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>
    );
  };

  const DialogCraftFurniture = renderDialogCraftFurniture();

  const renderDialogCraftIt = () => {
    return (
      <Dialog
        visible={ItemDialog}
        style={{ width: "48rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Описание предмета"
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideNew}
      >
        {/* {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/item/${item.image}`}
            alt={item.image}
            className="product-image block m-auto pb-3"
          />
        )} */}
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Наименование
          </label>
          <InputTextarea
            id="name"
            value={item.name || ""}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            rows={3}
            cols={20}
            // className={classNames({ "p-invalid": submitted && !item.name })}
          />
          {/* {submitted && !item.name && (
            <small className="p-error">Name is required.</small>
          )} */}
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="inventary_number" className="font-bold">
                Инвентарный номер
              </label>
              <InputText
                id="inventary_number"
                value={item.inventary_number || ""}
                onChange={(e) => onInputChange(e, "inventary_number")}
                required
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="qr_code" className="font-bold">
                QRCODE
              </label>
              <InputText
                id="qr_code"
                value={item.qr_code || ""}
                onChange={(e) => onInputChange(e, "qr_code")}
                required
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="serial" className="font-bold">
                Серийный номер
              </label>
              <InputText
                id="serial"
                value={item.serial || ""}
                onChange={(e) => onInputChange(e, "serial")}
                required
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="ad_name" className="font-bold">
                Имя устройства в AD
              </label>
              <InputText
                id="ad_name"
                value={item.ad_name || ""}
                onChange={(e) => onInputChange(e, "ad_name")}
                required
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="owner" className="font-bold">
                ФИО юзера
              </label>
              <InputText
                id="owner"
                value={item.owner || ""}
                onChange={(e) => onInputChange(e, "owner")}
                required
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="prev_owner" className="font-bold">
                ФИО предыдущего юзера
              </label>
              <InputText
                id="prev_owner"
                value={item.prev_owner || ""}
                onChange={(e) => onInputChange(e, "prev_owner")}
                required
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="type" className="font-bold">
                Тип
              </label>
              <Dropdown
                id="type"
                value={item.type || ""}
                options={getDropdownOptions("type")}
                onChange={(e) => onInputChange(e, "type")}
                placeholder={item.type || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="location" className="font-bold">
                Где установлено
              </label>
              <Dropdown
                id="location"
                value={item.location || ""}
                options={getDropdownOptions("location")}
                onChange={(e) => onInputChange(e, "location")}
                placeholder={item.location || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="workplace_type" className="font-bold">
                Тип рабочего места
              </label>
              <Dropdown
                id="workplace_type"
                value={item.workplace_type || ""}
                options={getDropdownOptions("workplace_type")}
                onChange={(e) => onInputChange(e, "workplace_type")}
                placeholder={item.workplace_type || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="serviceable" className="font-bold">
                Состояние исправности
              </label>
              <Dropdown
                id="serviceable"
                value={item.serviceable || ""}
                options={getDropdownOptions("serviceable")}
                onChange={(e) => onInputChange(e, "serviceable")}
                placeholder={item.serviceable || ""}
                itemTemplate={(option) => {
                  return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
                }}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="set_with" className="font-bold">
                Образует одно устройство
              </label>
              <InputText
                id="set_with"
                value={item.set_with || ""}
                onChange={(e) => onInputChange(e, "set_with")}
                required
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="price" className="font-bold">
                Стоимость
              </label>
              <InputNumber
                id="purchase_price"
                value={item.purchase_price || 0}
                onChange={(e) => onInputNumberChange(e, "purchase_price")}
                mode="currency"
                currency="RUB"
                locale="ru-RU"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="purchase_date" className="font-bold">
                Дата приобретения
              </label>
              <Calendar
                id="purchase_date"
                value={item.purchase_date || null}
                onChange={(e) => onInputChange(e, "purchase_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.purchase_date || null)}
                mask="99.99.9999"
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="release_date" className="font-bold">
                Дата выпуска
              </label>
              <Calendar
                id="release_date"
                value={item.release_date || null}
                onChange={(e) => onInputChange(e, "release_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.release_date || null)}
                mask="99.99.9999"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="incoming_date" className="font-bold">
                Дата поступления в НН
              </label>
              <Calendar
                id="incoming_date"
                value={item.incoming_date || null}
                onChange={(e) => onInputChange(e, "incoming_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.incoming_date || null)}
                mask="99.99.9999"
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="last_setup_date" className="font-bold">
                Дата установки пользователю
              </label>
              <Calendar
                id="last_setup_date"
                value={item.last_setup_date || null}
                onChange={(e) => onInputChange(e, "last_setup_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.last_setup_date || null)}
                mask="99.99.9999"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <MultiStateCheckbox
                inputid="is_workplace"
                value={
                  item.is_workplace != undefined
                    ? item.is_workplace.toString()
                    : null
                }
                onChange={(e) => onInputChange(e, "is_workplace")}
                options={multiStateCheckboxOptions}
                optionValue="value"
              />
              <span htmlFor="is_workplace" className="font-bold ml-2">
                Рабочее место
              </span>
            </div>
            <div className="field col-6 mb-0">
              <MultiStateCheckbox
                inputid="was_deleted"
                value={
                  item.was_deleted != undefined
                    ? item.was_deleted.toString()
                    : null
                }
                onChange={(e) => onInputChange(e, "was_deleted")}
                options={multiStateCheckboxOptions}
                optionValue="value"
              />
              <span htmlFor="was_deleted" className="font-bold ml-2">
                Списано
              </span>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="grid">
            <div className="field col-6 mb-0">
              <label htmlFor="deleted_date" className="font-bold">
                Дата списания
              </label>
              <Calendar
                id="deleted_date"
                value={item.deleted_date || null}
                onChange={(e) => onInputChange(e, "deleted_date")}
                dateFormat="dd.mm.yy"
                placeholder={formatDate(item.deleted_date || null)}
                mask="99.99.9999"
              />
            </div>
            <div className="field col-6 mb-0">
              <label htmlFor="deleted_grounds" className="font-bold">
                Основание для списания
              </label>
              <InputTextarea
                id="deleted_grounds"
                value={item.deleted_grounds || ""}
                onChange={(e) => onInputChange(e, "deleted_grounds")}
                required
                rows={1}
                cols={20}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label htmlFor="note" className="font-bold">
            Описание
          </label>
          <InputTextarea
            id="note"
            value={item.note || ""}
            onChange={(e) => onInputChange(e, "note")}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>
    );
  };

  const DialogCraftIt = renderDialogCraftIt();

  return (
    isFetching 
    ? <div className="h-screen flex align-items-center justify-content-center">
        <div className="flex flex-column">
          <Preloader />
        </div>
      </div>
    : <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={data}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={globalFilterColumns}
        dataKey="id"
        header={header}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
        rows={10}
        rowsPerPageOptions={[3, 5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        stripedRows
        removableSort
        scrollable
        selectionMode="multiple"
        showSelectAll={false}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        scrollHeight={getTableHeight}
        style={{ minWidth: "50rem" }}
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
            filterElement={getColumnFilterElement(col)}
            filterApply={col.dataType == "boolean" ? filterApplyTemplate : null}
            showFilterMatchModes={col.showFilterMenu}
            selectionMode={col.field == "id" ? "multiple" : null }
            style={{ minWidth: col.width }}
            body={getColumnBody(col)}
          />
        ))}
        {userAuth.role === "admin" &&
        <Column
          body={editColumnBodyTemplate}
          header={"Редактирование"}
          exportable={false}
          alignFrozen="right"
          frozen
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
          style={{ minWidth: "12rem" }}
        ></Column>}
      </DataTable>
      {name === "Мебель" ? DialogCraftFurniture : DialogCraftIt}

      <Dialog
        visible={deleteItemDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
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
              Are you sure you want to delete <b>{item.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default TableCraft;
