export const saveItem = (addData, updateData, item, setItemDialog, setItem, emptyItem, userAuth, setDisabled, filteredEmployees, dialogType) => () => {
  setDisabled(true);
  let _item = { ...item };

  if (dialogType === "edit") {
    updateData(_item, userAuth);
  } else {
    _item.user_id = filteredEmployees[0]?.employee_id;
    _item.login = filteredEmployees[0]?.login;
    addData(_item, userAuth);
  }
  setItemDialog(false);
  setItem(emptyItem);
};
