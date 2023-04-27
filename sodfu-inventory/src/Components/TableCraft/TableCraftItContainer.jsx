import { connect } from "react-redux";
import TableCraft from "./TableCraft";
import { requestData, updateData } from "../../redux/reducers/it-data-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";

let mapStateToProps = (state) => {

  return {
    data: state.itData.data,
    columns: state.itData.columns,
    values: state.itData.values,
    filters: state.itData.filters,
    name: state.itData.name,
  };
};

let mapDispatchToProps =  {
    requestData,
    updateData,
    setVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)