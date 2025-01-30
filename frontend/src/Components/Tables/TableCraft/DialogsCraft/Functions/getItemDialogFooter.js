import React from "react";
import { Button } from "primereact/button";
import { hideNew } from "./hideNew";

export const getItemDialogFooter = (
  setItemDialog,
  userAuth,
  disabled,
  setDisabled,
  activeTabIndex,
  setActiveTabIndex,
  dialogType,
  formButtonRef
) => {
  return (
    <React.Fragment>
      <div className="mt-2">
        {(userAuth.role == "admin" || userAuth.role == "moder") &&
          activeTabIndex === 0 &&
          (disabled && dialogType === "edit" ? (
            <Button type="submit" label="Изменить" icon="pi pi-pencil" onClick={() => setDisabled(false)} />
          ) : (
            <Button
              type="submit"
              label="Сохранить"
              icon="pi pi-check"
              onClick={() => {
                if (formButtonRef.current) {
                  formButtonRef.current.handleSubmit(); // Вызов handleSubmit вручную
                }
              }}
            />
          ))}
        <Button
          label="Выйти"
          icon="pi pi-times"
          outlined
          onClick={hideNew(setItemDialog, setDisabled, setActiveTabIndex)}
        />
      </div>
    </React.Fragment>
  );
};
