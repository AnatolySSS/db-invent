export const getTableHeight = () => {
  try {
    let headerHeight =
      document.getElementsByClassName("p-datatable-header")[0].offsetHeight;
    let paginatorHeight =
      document.getElementsByClassName("p-paginator-bottom")[0].offsetHeight + 2;
    let tableHeight = window.innerHeight - headerHeight - paginatorHeight;
    document.getElementsByClassName(
      "p-datatable-wrapper"
    )[0].style.height = `${tableHeight}px`;
    // console.log(`headerHeight: ${headerHeight}`);
    // console.log(`paginatorHeight: ${paginatorHeight}`);
    // console.log(`window.innerHeight: ${window.innerHeight}`);
    // console.log(`tableHeight: ${tableHeight}`);
    // console.log("");

    return `${tableHeight}px`;
  } catch (error) {}
};
