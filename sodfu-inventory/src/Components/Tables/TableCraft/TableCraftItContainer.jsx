import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData, deleteData } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {

  return {
    data: state.itData.data,
    columns: state.itData.columns,
    values: state.itData.values,
    filters: state.itData.filters,
    name: state.itData.name,
    message: state.itData.message,
    userAuth: state.auth,
    isFetching: state.itData.isFetching,
    validationStatus: state.itData.validationStatus,
  };
};

let mapDispatchToProps =  {
    requestData,
    addData,
    updateData,
    deleteData,
    setVisible,
    logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(TableCraft);