import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData, deleteData } from "../../../redux/reducers/unmarked-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {

  return {
    data: state.unmarkedData.data,
    columns: state.unmarkedData.columns,
    values: state.unmarkedData.values,
    filters: state.unmarkedData.filters,
    name: state.unmarkedData.name,
    message: state.unmarkedData.message,
    userAuth: state.auth,
    isFetching: state.unmarkedData.isFetching,
    validationStatus: state.unmarkedData.validationStatus,
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