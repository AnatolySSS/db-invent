import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataScroller } from "primereact/datascroller";
import { getItemDialogFooter } from "./Functions/getItemDialogFooter";
import { Toast } from "primereact/toast";
import { Gravatar } from "./Components/Gravatar";
import { ItemTemplate } from "./Components/ItemTemplate";

export const EmployeesDialog = (props) => {
  const { setItemDialog, ItemDialog, item, itData, employees, fullName } = props;

  const [randomSeed, setRandomSeed] = useState(null);

  const fileInputRef = useRef(null);
  const commitmentToast = useRef(null);

  const itOfEmployee = itData.filter((it) => it.employee_id === item.employee_id);

  const hideDialog = () => {
    setItemDialog(false);
  };

  useEffect(() => {
    setRandomSeed(Math.random());
  }, [item]);

  return (
    <Dialog
      visible={ItemDialog}
      style={{ height: "100%", width: "56rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      modal
      className="p-fluid"
      footer={getItemDialogFooter(item, fileInputRef, itOfEmployee, employees, fullName, commitmentToast)}
      onHide={hideDialog}
    >
      <Toast ref={commitmentToast} />
      <div className="grid nested-grid">
        <div className="col-12 grid sticky top-0 bg-white">
          <div className="col-3 flex justify-content-center align-content-center">
            <Gravatar randomSeed={randomSeed} />
          </div>
          <div className="col-9">
            <h1>{item.full_name}</h1>
            <h3 className="text-600">{item.department}</h3>
            <h4 className="text-500">{item.title}</h4>
          </div>
        </div>

        <div className="mt-3  w-full">
          <DataScroller
            value={itOfEmployee}
            itemTemplate={(product, index) => <ItemTemplate product={product} index={index} />}
            inline
            rows={itOfEmployee.length}
          />
        </div>
      </div>
    </Dialog>
  );
};
