export const saveItem =
  (
    addData,
    updateData,
    data,
    item,
    setItemDialog,
    setItem,
    emptyItem,
    userAuth,
    setDisabled,
    employees
  ) =>
  () => {
    setDisabled(true);
    let _item = { ...item };

    if (_item.object_sid) {
      updateData(_item, userAuth.division);
    } else {
      _item.object_sid = employees.filter(
        (employee) => employee.full_name === _item.full_name
      )[0].object_sid;
      addData(_item, userAuth.division);
    }
    setItemDialog(false);
    setItem(emptyItem);
  };
