import { connect } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TableCraft from "./TableCraft";
import { requestData, updateData } from "../../redux/reducers/furniture-reducer";

let mapStateToProps = (state) => {

  return {
    data: state.furniture.data,
    columns: state.furniture.columns,
    filters: state.furniture.filters,
    name: state.furniture.name,
  };
};

let mapDispatchToProps =  {
    requestData,
    updateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)