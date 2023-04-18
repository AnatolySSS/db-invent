import { connect } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TableCraft from "./TableCraft";

let mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.table.data,
    columns: state.table.columns,
    filters: state.table.filters,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addData: () => {
     
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft);

