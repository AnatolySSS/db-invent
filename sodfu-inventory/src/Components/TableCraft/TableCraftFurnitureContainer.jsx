import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData, deleteData } from "../../redux/reducers/furniture-data-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { logout } from "../../redux/reducers/auth-reducer";

let mapStateToProps = (state) => {

  return {
    data: state.furnitureData.data,
    columns: state.furnitureData.columns,
    values: state.furnitureData.values,
    filters: state.furnitureData.filters,
    name: state.furnitureData.name,
    message: state.furnitureData.message,
    userAuth: state.auth,
    isFetching: state.furnitureData.isFetching,
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

// export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(TableCraft);