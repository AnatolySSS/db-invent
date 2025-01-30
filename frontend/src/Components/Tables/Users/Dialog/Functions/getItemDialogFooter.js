import React from "react";
import { Button } from "primereact/button";
import { hideNew } from "./hideNew";

export const getItemDialogFooter = (setItemDialog, disabled, setDisabled, dialogType, formButtonRef) => (
  <React.Fragment>
    {disabled && dialogType === "edit" ? (
      <Button type="submit" label="Изменить" icon="pi pi-pencil" onClick={() => setDisabled(false)} />
    ) : (
      <Button
        type="submit"
        label={dialogType === "edit" ? "Сохранить" : "Добавить"}
        icon="pi pi-check"
        onClick={() => {
          if (formButtonRef.current) {
            formButtonRef.current.handleSubmit(); // Вызов handleSubmit вручную
          }
        }}
      />
    )}
    <Button label="Выйти" icon="pi pi-times" outlined onClick={hideNew(setItemDialog, setDisabled)} />
  </React.Fragment>
);
