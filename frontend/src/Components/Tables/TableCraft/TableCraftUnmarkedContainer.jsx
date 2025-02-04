import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import { requestData, addData, updateData, deleteData, uploadData } from "../../../redux/reducers/unmarked-data-reducer";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { beginInventory } from "../../../redux/reducers/panel-menu-reducer";
import { requestCurrentInventory } from "../../../redux/reducers/year-inventory-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";
import { withDataTypeAccessNavigate } from "../../../hoc/withDataTypeAccessNavigate";

let mapStateToProps = (state) => {
  return {
    type: "unmarked",
    data: state.unmarkedData.data,
    columns: state.unmarkedData.columns,
    values: state.unmarkedData.values,
    filters: state.unmarkedData.filters,
    name: state.unmarkedData.name,
    message: state.unmarkedData.message,
    userAuth: state.auth,
    isFetching: state.unmarkedData.isFetching,
    validationStatus: state.unmarkedData.validationStatus,
    hasCurrentInventory: state.yearInventory.hasCurrentInventory,
    employees: state.employees.data,
  };
};

let mapDispatchToProps = {
  requestData,
  addData,
  updateData,
  deleteData,
  setVisible,
  logout,
  beginInventory,
  requestCurrentInventory,
  clearState,
  uploadData,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withDataTypeAccessNavigate, withAuthNavigate)(TableCraft);
