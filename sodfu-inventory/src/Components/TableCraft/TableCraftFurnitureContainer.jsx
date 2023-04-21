import { connect } from "react-redux";
import TableCraft from "./TableCraft";
import { requestData, updateData } from "../../redux/reducers/furniture-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";

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
    setVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)