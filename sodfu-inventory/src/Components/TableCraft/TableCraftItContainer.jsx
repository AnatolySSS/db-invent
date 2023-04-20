import { connect } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TableCraft from "./TableCraft";
import { requestData, updateData } from "../../redux/reducers/table-reducer";

let mapStateToProps = (state) => {

  return {
    data: state.table.data,
    columns: state.table.columns,
    filters: state.table.filters,
    name: state.table.name,
  };
};

let mapDispatchToProps =  {
    requestData,
    updateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)