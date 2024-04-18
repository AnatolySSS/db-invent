export const hideNew = (setItemDialog, setDisabled) => () => {
  setDisabled(true);
  setItemDialog(false);
};