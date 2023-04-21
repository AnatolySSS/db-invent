import { connect } from "react-redux";
import TableCraft from "./TableCraft";
import { requestData, updateData } from "../../redux/reducers/table-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";

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
    setVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)