import React, { useRef } from 'react';
import * as XLSX from 'xlsx'
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

const ItDownloadCraft = (props) => {
    const { uploadItData, setVisible } = props
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const invoiceUploadHandler = ({files}) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (e) => {
          let data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          let it_lib = {};
          it_lib = XLSX.utils.sheet_to_json(
            workbook.Sheets['data']
          );
          uploadItData(it_lib)
          console.log(it_lib);
          toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        };
        
    };
        
    return (
      <div className="card grid mt-5 justify-content-between">
        <Toast ref={toast}></Toast>
        <div className="col ml-5">
          <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
        </div>
        <div className="col-11 flex justify-content-center">
          <FileUpload
            className="flex"
            mode="basic"
            name="it_lib"
            url="/api/it_lib"
            accept="xlsx/*"
            maxFileSize={1000000}
            customUpload={true}
            uploadHandler={invoiceUploadHandler}
          />
        </div>
      </div>
    );
}

export default ItDownloadCraft;