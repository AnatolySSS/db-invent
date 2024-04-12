export const getTableHeight = () => {
  try {
    let headerWidth = document.getElementsByClassName("p-datatable-header")[0].offsetHeight;
    let paginatorWidth = document.getElementsByClassName("p-paginator-bottom")[0].offsetHeight;
    // let scrollHeight = window.innerHeight - document.documentElement.clientHeight;
    let tableHeight = window.innerHeight - headerWidth - paginatorWidth;
    document.getElementsByClassName("p-datatable-wrapper")[0].style.height = `${tableHeight}px`;
    return `${tableHeight}px`;
  } catch (error) {}
};
