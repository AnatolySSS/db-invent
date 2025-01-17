import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { classNames } from "primereact/utils";
import { DataScroller } from "primereact/datascroller";
import { Tag } from "primereact/tag";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { makeCommitment } from "../../../../../function-helpers/makeCommitment";
import { SpeedDial } from "primereact/speeddial";

export const DialogCraftEmployees = (props) => {
  const { setItemDialog, ItemDialog, item, itData, employees, fullName } = props;

  const [file, setFile] = useState(null);

  const itOfEmployee = itData.filter((it) => it.employee_id === item.employee_id);

  const hideDialog = () => {
    setItemDialog(false);
  };

  const getItemDialogFooter = (item) => (
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
        {/* <Button label="Сформировать обязательство" icon="pi pi-file-word" onClick={() => makeCommitment(itOfEmployee, employees, fullName)} />
        <Button
          className="w-3rem custom-close-btn"
          icon="pi pi-file-word"
          rounded
          // outlined
          // severity="secondary"
          aria-label="Bookmark"
          onClick={() => makeCommitment(itOfEmployee, employees, fullName)}
        /> */}
        <Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="top" />
        <SpeedDial model={items} direction="left" className="speeddial-bottom-right" style={{ top: "calc(50% - 2rem)", right: 0 }} />
        {/* <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} /> */}
      </div>
    </div>
  );

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("/commitments/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("Uploaded File Path:", result.filePath);
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
      command: () => uploadFile,
    },
    {
      label: "Сформировать обязательство",
      icon: "pi pi-file-word",
      command: () => {
        makeCommitment(itOfEmployee, employees, fullName);
      },
    },
  ];

  const getImage = () => {
    switch (Math.floor(Math.random() * 7)) {
      case 0:
        return "https://i.ebayimg.com/images/g/5UcAAOSwq7JT0Rdx/s-l500.jpg";
      case 1:
        return "https://images.chesscomfiles.com/uploads/v1/user/12825220.7c434c2c.1200x1200o.287980812964.jpeg";
      case 2:
        return "https://lastfm.freetls.fastly.net/i/u/ar0/de105ab5a66a4bdccbfe90903cd79599.png";
      case 3:
        return "https://avatars.mds.yandex.net/i?id=06f08d606421d103e70d0074a44fc34d_l-5359509-images-thumbs&n=13";
      case 4:
        return "https://avatars.mds.yandex.net/i?id=bcec3f6690eb196adbe9569472eb61ac_l-5232308-images-thumbs&n=13";
      case 5:
        return "https://avatars.mds.yandex.net/i?id=31661f7a3824ec1155fea4c802df2d94_l-9657256-images-thumbs&n=13";
      case 6:
        return "https://i.pinimg.com/originals/f4/a7/ca/f4a7cae72d7e390f0275cba457aa950f.png";
      default:
        break;
    }
  };

  const itemTemplate = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <Tooltip target=".tag-item" />
        <div className={classNames("flex flex-column xl:flex-row xl:align-items-start p-4 gap-4", { "border-top-1 surface-border": index !== 0 })}>
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3 w-full">
              <div className="text-base font-bold text-500">{product.type}</div>
              <div className="text-base font-bold">{product.name}</div>
              <div className="flex justify-content-between w-full">
                <div className="flex flex-row gap-3">
                  {product.inventary_number && (
                    <div>
                      <Tag
                        className="tag-item text-base cursor-pointer"
                        value={product.inventary_number}
                        data-pr-tooltip="Инвентарный №"
                        data-pr-position="bottom"
                        style={{ fontSize: "2rem" }}
                      />
                    </div>
                  )}
                  {product.qr_code && (
                    <div>
                      <Tag
                        className="tag-item text-base cursor-pointer"
                        value={product.qr_code}
                        data-pr-tooltip="QR-CODE"
                        data-pr-position="bottom"
                        style={{ fontSize: "2rem" }}
                      />
                    </div>
                  )}
                  {product.serial && (
                    <div>
                      <Tag
                        className="tag-item text-base cursor-pointer"
                        value={product.serial}
                        data-pr-tooltip="Серийный №"
                        data-pr-position="bottom"
                        style={{ fontSize: "2rem" }}
                      />
                    </div>
                  )}
                  {product.employee_setup_date && (
                    <div>
                      <Tag
                        className="tag-item text-base cursor-pointer"
                        value={formatDate(product.employee_setup_date)}
                        data-pr-tooltip="Дата передачи сотруднику"
                        data-pr-position="bottom"
                        style={{ fontSize: "2rem" }}
                      />
                    </div>
                  )}
                </div>
                {product.location && (
                  <div>
                    <Tag
                      className="tag-item text-base cursor-pointer"
                      value={product.location}
                      data-pr-tooltip="Место установки"
                      data-pr-position="bottom"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                )}
              </div>
              {/* <div className="flex flex-row gap-3">
                {product.employee_setup_date && (
                  <div>
                    Дата передачи <Tag className="text-base" value={formatDate(product.employee_setup_date)} />
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      visible={ItemDialog}
      style={{ height: "100%", width: "56rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      modal
      className="p-fluid"
      footer={getItemDialogFooter(item)}
      onHide={hideDialog}
    >
      <div className="grid nested-grid">
        <div className="col-12 grid sticky top-0 bg-white">
          <div className="col-3 flex justify-content-center align-content-center">
            <Image src={getImage()} alt="Image" width="150" preview />
          </div>
          <div className="col-9">
            <h1>{item.full_name}</h1>
            <h3 className="text-600">{item.department}</h3>
            <h4 className="text-500">{item.title}</h4>
          </div>
        </div>

        <div className="mt-3  w-full">
          <DataScroller value={itOfEmployee} itemTemplate={itemTemplate} inline rows={itOfEmployee.length} />
        </div>
      </div>
    </Dialog>
  );
};
