import React from "react";
import { Button } from "primereact/button";
import { hideNew } from "./hideNew";
import { saveItem } from "./saveItem";

export const getItemDialogFooter = (
  type,
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
  activeTabIndex,
  setActiveTabIndex,
  dialogType,
  values
) => (
  <React.Fragment>
    <div className="mt-2">
      {userAuth.role == "admin" &&
        activeTabIndex === 0 &&
        (disabled && dialogType === "edit" ? (
          <Button type="submit" label="Изменить" icon="pi pi-pencil" onClick={() => setDisabled(false)} />
        ) : (
          <Button
            type="submit"
            label="Сохранить"
            icon="pi pi-check"
            onClick={saveItem(type, addData, updateData, data, item, setItemDialog, setItem, emptyItem, userAuth, setDisabled, values)}
          />
        ))}
      <Button
        label="Выйти"
        icon="pi pi-times"
        // className="mt-2"
        outlined
        onClick={hideNew(setItemDialog, setDisabled, setActiveTabIndex)}
      />
    </div>
  </React.Fragment>
);
