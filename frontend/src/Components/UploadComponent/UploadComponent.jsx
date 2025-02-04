import React, { useRef } from "react";
import * as XLSX from "xlsx";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import formatDate from "../../function-helpers/formatDate";
import changeDateType from "../../function-helpers/changeDateType";
import { createQRCode } from "../../function-helpers/createQRCode";

const UploadComponent = (props) => {
  const { uploadData, setVisible, userAuth } = props;
  const toast = useRef(null);

  const onUpload = (type) => {
    toast.current.show({
      severity: "success",
      summary: "Uploaded",
      detail: `${type} File Uploaded`,
    });
  };

  function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  const uploadDataHandler = (type) => {
    return ({ files }) => {
      const [file] = files;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e) => {
        let data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        let jsonData = {};
        jsonData.lib = XLSX.utils.sheet_to_json(workbook.Sheets["lib"]);
        jsonData.columns = XLSX.utils.sheet_to_json(workbook.Sheets["meta"]);
        jsonData.values = XLSX.utils.sheet_to_json(workbook.Sheets["values"]);

        jsonData.lib = jsonData.lib.map((v) => {
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

          // console.log(type);

          if (v.qr_code !== "") {
            // v.qr_code = createQRCode(userAuth.division_id, type, v.type, data, values);
          }
          return v;
        });
        // uploadData(jsonData);
        onUpload(type);
      };
    };
  };

  return (
    <div className="card grid mt-5 justify-content-between">
      <Toast ref={toast}></Toast>
      <div className="col-fixed ml-5">
        <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
      </div>
      <div className="col flex justify-content-around">
        <FileUpload
          chooseLabel="Upload IT data"
          className="flex"
          mode="basic"
          name="itData"
          url="/api/itData"
          accept="xlsx/*"
          maxFileSize={1000000}
          customUpload={true}
          uploadHandler={uploadDataHandler("it")}
        />
        <FileUpload
          chooseLabel="Upload FURNITURE data"
          className="flex"
          mode="basic"
          name="furnitureData"
          url="/api/furnitureData"
          accept="xlsx/*"
          maxFileSize={1000000}
          customUpload={true}
          uploadHandler={uploadDataHandler("furniture")}
        />
        <FileUpload
          chooseLabel="Upload UNMARKED data"
          className="flex"
          mode="basic"
          name="unmarkedData"
          url="/api/unmarkedData"
          accept="xlsx/*"
          maxFileSize={1000000}
          customUpload={true}
          uploadHandler={uploadDataHandler("unmarked")}
        />
        <FileUpload
          chooseLabel="Upload ASSETS data"
          className="flex"
          mode="basic"
          name="assetsData"
          url="/api/assetsData"
          accept="xlsx/*"
          maxFileSize={1000000}
          customUpload={true}
          uploadHandler={uploadDataHandler("assets")}
        />
      </div>
    </div>
  );
};

export default UploadComponent;
