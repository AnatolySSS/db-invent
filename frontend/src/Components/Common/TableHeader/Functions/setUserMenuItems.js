import { makeCommitment } from "../../../../function-helpers/makeCommitment";
import { makeQRCode } from "../../../../function-helpers/makeQRCode2";
import { getUserLogo } from "../../../Tables/Functions/Helpers/getUserLogo";
import { Avatar } from "primereact/avatar";
import { classNames } from "primereact/utils";
import { getTableHeight } from "../../../Tables/Functions/Helpers/getTableHeight";
import { MdOutlineInventory } from "react-icons/md";
import { getUsers } from "./getUsers";

export const setUserMenuItems = (
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
  userMenuType,
  hasCurrentInventory,
  beginInventory,
  requestCurrentInventory,
  emptyItem,
  setItem,
  setItemDialog,
  adUsers
) => {
  const openNew = () => {
    setItem(emptyItem);
    setItemDialog(true);
  };

  const makeLogout = (logout) => () => {
    clearFilter();
    clearState();
    logout();
  };

  const makeCommitmentHelper = () =>
    makeCommitment(selectedItems, adUsers, userAuth.fullName);

  const makeQRCodeHelper = () => makeQRCode(selectedItems, userAuth.division);

  const handleTransfer = () => {
    if (selectedItems.length !== 0) {
      setTransferDialog(true);
    } else {
      transferToast.current.show({
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
  let addTypes;
  switch (userMenuType) {
    case "main":
      addTypes = [
        {
          label: "Сформировать обязательство",
          icon: "pi pi-file-word",
          command: makeCommitmentHelper,
        },
        // {
        //   label: "Сформировать QR-коды",
        //   icon: "pi pi-qrcode",
        //   command: makeQRCodeHelper,
        // },
        // {
        //   label: "Загрузить пользователей",
        //   icon: "pi pi-users",
        //   command: getUsers,
        // },
        {
          label: "Сформировать EXCEL",
          icon: "pi pi-file-excel",
          command: exportExcel,
        },
      ];

      if (userAuth.role === "admin") {
        addTypes.splice(0, 0, {
          label: "Новое",
          icon: "pi pi-plus",
          command: openNew,
        });
        addTypes.splice(1, 0, {
          label: "Переместить",
          icon: "pi pi-angle-double-right",
          command: handleTransfer,
        });
      }

      if (!hasCurrentInventory) {
        addTypes.splice(userAuth.role === "admin" ? 3 : 1, 0, {
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

      break;
    case "year":
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
              <span className="font-bold">{`${
                userAuth.fullName.split(" ")[0]
              } ${Array.from(userAuth.fullName.split(" ")[1])[0]}.${
                Array.from(userAuth.fullName.split(" ")[2])[0]
              }. (филиал №${userAuth.division}) `}</span>
            </div>
          </button>
        );
      },
      command: () => {
        userToast.current.show({
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
