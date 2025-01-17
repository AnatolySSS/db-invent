import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData, transferItem, deleteData, clearState, uploadData } from "../../../redux/reducers/it-data-reducer";
import { beginInventory } from "../../../redux/reducers/panel-menu-reducer";
import { requestCurrentInventory } from "../../../redux/reducers/year-inventory-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "it",
    data: state.itData.data,
    columns: state.itData.columns,
    values: state.itData.values,
    filters: state.itData.filters,
    name: state.itData.name,
    message: state.itData.message,
    userAuth: state.auth,
    isFetching: state.itData.isFetching,
    validationStatus: state.itData.validationStatus,
    hasCurrentInventory: state.yearInventory.hasCurrentInventory,
    employees: state.employees.data,
  };
};

let mapDispatchToProps = {
  requestData,
  addData,
  updateData,
  transferItem,
  deleteData,
  setVisible,
  logout,
  beginInventory,
  requestCurrentInventory,
  clearState,
  uploadData,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthNavigate)(TableCraft);
