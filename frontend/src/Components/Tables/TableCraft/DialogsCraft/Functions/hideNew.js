export const hideNew =
  (setItemDialog, setDisabled, setActiveTabIndex) => () => {
    setDisabled(true);
    setItemDialog(false);
    setActiveTabIndex(0);
  };
