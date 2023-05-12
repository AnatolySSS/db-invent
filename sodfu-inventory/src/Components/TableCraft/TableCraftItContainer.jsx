import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData } from "../../redux/reducers/it-data-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

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
    addData,
    updateData,
    setVisible,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(TableCraft);