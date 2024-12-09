import React from "react";
import { Button } from "primereact/button";
import { hideNew } from "./hideNew";
import { saveItem } from "./saveItem";

export const getItemDialogFooter = (
  addData,
  updateData,
  data,
  item,
  setItemDialog,
  setItem,
  emptyItem,
  userAuth,
  disabled,
  setDisabled,
  employers,
  dialogType
) => (
  <React.Fragment>
    {userAuth.role == "admin" &&
      (disabled && dialogType === "edit" ? (
        <Button
          type="submit"
          label="Изменить"
          icon="pi pi-pencil"
          onClick={() => setDisabled(false)}
        />
      ) : (
        <Button
          type="submit"
          label={dialogType === "edit" ? "Сохранить" : "Добавить"}
          icon="pi pi-check"
          onClick={saveItem(
            addData,
            updateData,
            data,
            item,
            setItemDialog,
            setItem,
            emptyItem,
            userAuth,
            setDisabled,
            employers
          )}
        />
      ))}
    <Button
      label="Выйти"
      icon="pi pi-times"
      outlined
      onClick={hideNew(setItemDialog, setDisabled)}
    />
  </React.Fragment>
);
