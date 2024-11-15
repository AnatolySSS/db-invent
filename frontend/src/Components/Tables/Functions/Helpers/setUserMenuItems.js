import { makeCommitment } from "../../../../function-helpers/makeCommitment";
import { makeQRCode } from "../../../../function-helpers/makeQRCode";
import { getUserLogo } from "./getUserLogo";
import { Avatar } from "primereact/avatar";
import { classNames } from "primereact/utils";

export const setUserMenuItems = (
  data,
  logout,
  userToast,
  transferToast,
  fullName,
  isAuth,
  login,
  division,
  role,
  selectedItems,
  clearFilter,
  openNew,
  setTransferDialog,
  clearState
) => {
  const makeLogout = (logout) => () => {
    clearFilter();
    clearState();
    logout();
  };

  const makeCommitmentHelper = () => makeCommitment(selectedItems, fullName);

  const makeQRCodeHelper = () => makeQRCode(selectedItems, division);

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

  const userMenuItems = [
    {
      command: () => {
        userToast.current.show({
          severity: "info",
          summary: "Info",
          detail: fullName,
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
              image={getUserLogo(isAuth, login)}
              className="mr-2"
              icon="pi pi-user"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">{`${fullName.split(" ")[0]} ${
                Array.from(fullName.split(" ")[1])[0]
              }.${
                Array.from(fullName.split(" ")[2])[0]
              }. (филиал №${division}) `}</span>
            </div>
          </button>
        );
      },
    },
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
    { separator: true },
    {
      label: "Выйти",
      icon: "pi pi-sign-out",
      command: makeLogout(logout),
    },
  ];

  if (role === "admin") {
    userMenuItems.splice(1, 0, {
      label: "Новое",
      icon: "pi pi-plus",
      command: openNew,
    });
    userMenuItems.splice(2, 0, {
      label: "Переместить",
      icon: "pi pi-angle-double-right",
      command: handleTransfer,
    });
  }

  return userMenuItems;
};
