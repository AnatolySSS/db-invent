import * as XLSX from "xlsx";
import { makeCommitment } from "../../../../function-helpers/makeCommitment";
import { makeQRCode } from "../../../../function-helpers/makeQRCodeNew";
import { getUserLogo } from "../../../Tables/Functions/Helpers/getUserLogo";
import { Avatar } from "primereact/avatar";
import { classNames } from "primereact/utils";
import { getTableHeight } from "../../../Tables/Functions/Helpers/getTableHeight";
import { MdOutlineInventory } from "react-icons/md";
import formatDate from "../../../../function-helpers/formatDate";
import changeDateType from "../../../../function-helpers/changeDateType";
import { FileUpload } from "primereact/fileupload";
import { createQRCode } from "../../../../function-helpers/createQRCode";

export const setUserMenuItems = (
  type,
  data,
  values,
  logout,
  toast,
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
  setDialogType,
  employees,
  uploadData,
  userMenu,
  setUploadDialogVisible
) => {
  const openNew = () => {
    setDialogType("create");
    setItem(emptyItem);
    setItemDialog(true);
  };

  const openUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const makeLogout = (logout) => () => {
    clearFilter();
    clearState();
    logout();
  };

  const makeCommitmentHelper = () => {
    if (selectedItems.length == 0) {
      toast.current.show({
        severity: "info",
        summary: "Предупреждение",
        detail: `Для формирования обязательства необходимо выбрать один или несколько объектов`,
        life: 3000,
      });
      return;
    }

    //Получение массива текущих пользователей
    const uniqOwners = selectedItems.map((item) => item.employee_id);
    //Проверка на совпадение пользователя (пользователь должен быть один и тот же)
    let check = true;
    for (let i = 1; i < uniqOwners.length; i++) {
      if (uniqOwners[0] !== uniqOwners[i]) {
        check = false;
        break;
      }
    }
    if (!check) {
      toast.current.show({
        severity: "info",
        summary: "Предупреждение",
        detail: "Выбранные единицы оборудования закреплены за разными сотрудниками",
        life: 3000,
      });
      return;
    }

    return makeCommitment(selectedItems, employees, userAuth.fullName);
  };

  const makeQRCodeHelper = () => makeQRCode(selectedItems);

  const handleTransfer = () => {
    if (selectedItems.length !== 0) {
      setTransferDialog(true);
    } else {
      toast.current.show({
        severity: "info",
        summary: "Предупреждение",
        detail: `Для перемещения необходимо выбрать один или несколько объектов`,
        life: 3000,
      });
    }
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
        let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  let addTypes;
  switch (tableType) {
    case "main":
      addTypes = [
        {
          label: "Сформировать обязательство",
          icon: "pi pi-file-word",
          command: makeCommitmentHelper,
        },
        {
          label: "Сформировать QR-коды",
          icon: "pi pi-qrcode",
          command: makeQRCodeHelper,
        },
        {
          label: "Сформировать EXCEL",
          icon: "pi pi-file-excel",
          command: exportExcel,
        },
      ];

      if (userAuth.role === "admin" || userAuth.role === "moder" || userAuth.role === "user") {
        addTypes.splice(0, 0, {
          label: "Переместить",
          icon: "pi pi-angle-double-right",
          command: handleTransfer,
        });
      }

      if (userAuth.role === "admin" || userAuth.role === "moder") {
        addTypes.splice(0, 0, {
          label: "Новое",
          icon: "pi pi-plus",
          command: openNew,
        });
        addTypes.splice(5, 0, { separator: true });
        addTypes.splice(6, 0, {
          label: "Массовая загрузка",
          icon: "pi pi-upload",
          command: openUploadDialog,
        });

        if (!hasCurrentInventory) {
          addTypes.splice(5, 0, {
            label: "Начать инвентаризацию",
            icon: (
              <i className="mr-2">
                <MdOutlineInventory />
              </i>
            ),
            command: async () => {
              await beginInventory(type, userAuth.division_id);
              await requestCurrentInventory(type, userAuth.division_id);
              getTableHeight();
              toast.current.show({
                severity: "success",
                summary: "Info",
                detail: "Инвентаризация инициирована",
                life: 3000,
              });
            },
          });
        }
      }

      break;
    case "year":
    case "employees":
      addTypes = [
        {
          label: "Сформировать EXCEL",
          icon: "pi pi-file-excel",
          command: exportExcel,
        },
      ];
      break;
    case "users":
      addTypes = [
        {
          label: "Добавить пользователя",
          icon: "pi pi-plus",
          command: openNew,
        },
      ];
      break;
    default:
      addTypes = [];
      break;
  }

  const userMenuItems = [
    {
      template: (item, options) => {
        let surname = userAuth.fullName.split(" ")[0] ? userAuth.fullName.split(" ")[0] : "";
        let firstname = userAuth.fullName.split(" ")[1] ? ` ${Array.from(userAuth.fullName.split(" ")[1])[0]}.` : "";
        let middlename = userAuth.fullName.split(" ")[2] ? ` ${Array.from(userAuth.fullName.split(" ")[2])[0]}.` : "";
        let fullNameStr = `${surname}${firstname}${middlename}`;
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(options.className, "w-full p-link flex align-items-center")}
          >
            <Avatar
              image={getUserLogo(userAuth.isAuth, userAuth.login)}
              className="mr-2"
              icon="pi pi-user"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">{fullNameStr}</span>
            </div>
          </button>
        );
      },
      command: () => {
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: userAuth.fullName,
          life: 3000,
        });
      },
    },
    { separator: true },
    {
      label: "Выйти",
      icon: "pi pi-sign-out",
      command: makeLogout(logout),
    },
  ];

  userMenuItems.splice(1, 0, ...addTypes);

  return userMenuItems;
};
