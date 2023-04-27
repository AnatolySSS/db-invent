import { connect } from "react-redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData } from "../../redux/reducers/furniture-data-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";

let mapStateToProps = (state) => {

  return {
    data: state.furnitureData.data,
    columns: state.furnitureData.columns,
    values: state.furnitureData.values,
    filters: state.furnitureData.filters,
    name: state.furnitureData.name,
  };
};

let mapDispatchToProps =  {
    requestData,
    addData,
    updateData,
    setVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)