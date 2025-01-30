export const saveItem = (
  addData,
  updateData,
  item,
  setItemDialog,
  setItem,
  emptyItem,
  userAuth,
  setDisabled,
  dialogType
) => {
  setDisabled(true);

  if (dialogType === "edit") {
    updateData(item, userAuth);
  } else {
    addData(item, userAuth);
  }
  setItemDialog(false);
  setItem(emptyItem);
};
