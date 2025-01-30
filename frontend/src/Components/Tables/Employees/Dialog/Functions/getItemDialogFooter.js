import React from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { makeCommitment } from "../../../../../function-helpers/makeCommitment";

export const getItemDialogFooter = (item, fileInputRef, itOfEmployee, employees, fullName, commitmentToast) => {
  const makeCommitmentHelper = (selectedItems, employees, fullName) => {
    if (selectedItems.length == 0) {
      commitmentToast.current.show({
        severity: "info",
        summary: "Предупреждение",
        detail: `У сотрудника ${item.full_name} отсутствует выданное оборудование`,
        life: 3000,
      });
      return;
    }

    return makeCommitment(selectedItems, employees, fullName);
  };

  const items = [
    {
      label: "Скачать скан обязательства",
      icon: "pi pi-download",
      command: () => {
        console.log("Обязательство скачано");
      },
    },
    {
      label: "Загрузить скан обязательства",
      icon: "pi pi-upload",
      command: () => fileInputRef.current.click(),
    },
    {
      label: "Сформировать обязательство",
      icon: "pi pi-file-word",
      command: () => makeCommitmentHelper(itOfEmployee, employees, fullName),
    },
  ];

  return (
    <div className="flex justify-content-between">
      <div className="text-left">
        <ul className="list-none pl-0">
          <li className="mb-2">
            <i className="pi pi-phone mr-2"></i>{" "}
            {item.phone?.split(",").map((phone, index) => (
              <em key={index}>
                <a className="text-primary" href={`tel:${phone.trim()}`}>
                  {phone.trim()}
                  {index + 1 !== item.phone?.split(",").length && ", "}
                </a>
              </em>
            ))}
          </li>
          <li>
            <i className="pi pi-at mr-2"></i>{" "}
            <em>
              <a className="text-primary" href={`mailto:${item.mail}`}>
                {item.mail}
              </a>
            </em>
          </li>
        </ul>
      </div>
      <div className="fles align-content-center" style={{ position: "relative" }}>
        <Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="top" />
        <SpeedDial
          model={items}
          direction="left"
          className="speeddial-bottom-right"
          style={{ top: "calc(50% - 2rem)", right: 0 }}
        />
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept="application/pdf"
          onChange={(e) => uploadFile(e)}
        />
      </div>
    </div>
  );
};

const uploadFile = async (e) => {
  const formData = new FormData();
  formData.append("pdf", e.target.files[0]);
  console.log(formData.get("pdf"));

  // const response = await fetch("/commitments/upload", {
  //   method: "POST",
  //   body: formData,
  // });
  // const result = await response.json();
  // console.log("Uploaded File Path:", result.filePath);
};
