import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import formatDate from "../../../function-helpers/formatDate";
import changeDateType from "../../../function-helpers/changeDateType";
import { createQRCode } from "../../../function-helpers/createQRCode";
import { getItemDialogFooter } from "../../Tables/TableCraft/DialogsCraft/Functions/getItemDialogFooter";
import { UploadTable } from "./UploadTable";
// import "./UploadDialog.css";

export default function UploadDialog(props) {
  const { data, columns, values, type, uploadDialogVisible, setUploadDialogVisible, uploadToast, uploadData, userMenu, userAuth } = props;

  const [totalSize, setTotalSize] = useState(0);
  const [jsonData, setJsonData] = useState({});
  const fileUploadRef = useRef(null);

  let type_str;
  switch (type) {
    case "it":
      type_str = "Оборудование";
      break;
    case "furniture":
      type_str = "Мебель";
      break;
    case "assets":
      type_str = "Основные средства";
      break;
    case "unmarked":
      type_str = "Прочее";
      break;

    default:
      break;
  }

  const hideNew = (setUploadDialogVisible) => () => {
    setTotalSize(0);
    setUploadDialogVisible(false);
  };

  const makeJSONDataFile = (file) => {
    let jsonDataFile = {};
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      let loadData = e.target.result;
      let _data = [...data];
      const workbook = XLSX.read(loadData, { type: "binary" });

      jsonDataFile.lib = XLSX.utils.sheet_to_json(workbook.Sheets["lib"]);
      jsonDataFile.lib = jsonDataFile.lib.map((v) => {
        Object.keys(v).forEach((element) => {
          if (element.includes("date")) {
            if (v[element] !== null) {
              v[element] = ExcelDateToJSDate(v[element]);
              v[element] = formatDate(v[element]);
              v[element] = changeDateType(v[element]);
            }
          }
        });

        v.division_id = userAuth.division_id;
        v.class_type = type;

        //Формирование qr_code если он отсутствует
        if (!v.qr_code) {
          v.qr_code = createQRCode(userAuth.division_id, type, v.type, _data, values);
        }

        _data.push(v);

        return v;
      });
    };
    return jsonDataFile;
  };

  const uploadDataHandler = async ({ files }) => {
    //Проверка на уникальность qr-кодов
    let qr_codes = jsonData.lib.map((v) => v.qr_code).filter((qr_code) => qr_code);
    if (new Set(qr_codes).size !== qr_codes.length) {
      uploadToast.current.show({
        severity: "error",
        summary: "Ошибка загрузки",
        detail: `В загружаемом файле найдены дублирующиеся qr-коды`,
        life: 5000,
      });
      setTotalSize(0);
      setUploadDialogVisible(false);
      return;
    }

    let types = jsonData.lib.map((v) => v.type).filter((qr_code) => !qr_code);
    if (types.length > 0) {
      uploadToast.current.show({
        severity: "error",
        summary: "Ошибка загрузки",
        detail: `В загружаемом файле имеются незаполненные значения типа объекта (столбец type)`,
        life: 5000,
      });
      setTotalSize(0);
      setUploadDialogVisible(false);
      return;
    }

    setTotalSize(0);
    setUploadDialogVisible(false);
    await uploadData(type, jsonData, userAuth);
    onUpload(jsonData.lib.length);
  };

  function ExcelDateToJSDate(serial) {
    let utc_days = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;
    let date_info = new Date(utc_value * 1000);

    let fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    let seconds = total_seconds % 60;

    total_seconds -= seconds;

    let hours = Math.floor(total_seconds / (60 * 60));
    let minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  const onUpload = (count) => {
    uploadToast.current.show({
      severity: "success",
      summary: "Загрузка завершена",
      detail: `Загружено ${count} единиц ТМЦ`,
    });
  };

  const getItemDialogFooter = () => (
    <React.Fragment>
      <div className="mt-2">
        <Button
          label="Выйти"
          icon="pi pi-times"
          // className="mt-2"
          outlined
          onClick={hideNew(setUploadDialogVisible)}
        />
      </div>
    </React.Fragment>
  );

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;
    const [file] = files;

    setJsonData(makeJSONDataFile(file));

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    // toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const chooseOptions = { icon: "pi pi-fw pi-file-excel", iconOnly: true, className: "w-3rem custom-choose-btn p-button-rounded p-button-outlined" };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className: "w-3rem custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = { icon: "pi pi-fw pi-times", iconOnly: true, className: "w-3rem custom-cancel-btn p-button-danger p-button-rounded p-button-outlined" };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = jsonData.lib?.length / 10 || 0;
    // const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B";

    return (
      <div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>готово для загрузки {jsonData.lib?.length || 0} ед. ТМЦ</span>
          <ProgressBar value={value} showValue={false} style={{ width: "10rem", height: "12px" }}></ProgressBar>
          <Button
            className="w-3rem custom-close-btn"
            icon="pi pi-times"
            rounded
            outlined
            severity="secondary"
            aria-label="Bookmark"
            onClick={hideNew(setUploadDialogVisible)}
          />
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <UploadTable data={jsonData.lib} columns={columns} getItemDialogFooter={getItemDialogFooter} />
      // <div className="flex justify-content-between align-items-center flex-wrap">
      //   <div className="flex align-items-center" style={{ width: "40%" }}>
      //     <img role="presentation" src={require("./../../../img/excel-logo.png")} width={80} />
      //     <span className="flex flex-column text-left ml-3">
      //       {type_str}
      //       <small>{new Date().toLocaleDateString()}</small>
      //     </span>
      //   </div>
      //   <div className="flex align-items-center">
      //     <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
      //     <Button
      //       type="button"
      //       icon="pi pi-times"
      //       className="w-3rem p-button-outlined p-button-rounded p-button-danger ml-3"
      //       onClick={() => onTemplateRemove(file, props.onRemove)}
      //     />
      //   </div>
      // </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{ fontSize: "5em", borderRadius: "50%", backgroundColor: "var(--surface-b)", color: "var(--surface-d)" }}
        ></i>
        <span style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }} className="my-5">
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  return (
    <Dialog
      visible={uploadDialogVisible}
      style={{
        height: "100%",
        width: "95%",
      }}
      headerStyle={{ padding: "0.2rem" }}
      contentStyle={{ padding: 0 }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      closable={false} //для скрытия крестика в header dialog
      modal
      className="p-fluid"
      // footer={getItemDialogFooter()}
      onHide={hideNew(setUploadDialogVisible)}
    >
      <div className="h-full">
        <Tooltip target=".custom-choose-btn" content="Выбрать" position="bottom" />
        <Tooltip target=".custom-upload-btn" content="Загрузить" position="bottom" />
        <Tooltip target=".custom-cancel-btn" content="Очистить" position="bottom" />
        <Tooltip target=".custom-close-btn" content="Закрыть" position="bottom" />

        <FileUpload
          ref={fileUploadRef}
          className="h-full"
          name="uploadData[]"
          url="/uploadData"
          multiple
          accept=".xlsx, .xls"
          maxFileSize={10000000}
          customUpload={true}
          onUpload={onTemplateUpload}
          uploadHandler={uploadDataHandler}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
        />

        {/* <FileUpload
          auto
          chooseLabel="Массовая загрузка"
          className="flex"
          mode="basic"
          // name="assetsData"
          // url="/api/assetsData"
          accept="xlsx/*"
          maxFileSize={10000000}
          customUpload={true}
          uploadHandler={uploadDataHandler(type)}
        /> */}
      </div>
    </Dialog>
  );
}
