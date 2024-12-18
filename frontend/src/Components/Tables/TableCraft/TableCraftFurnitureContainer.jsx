import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import {
  requestData,
  addData,
  updateData,
  deleteData,
} from "../../../redux/reducers/furniture-data-reducer";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { beginInventory } from "../../../redux/reducers/panel-menu-reducer";
import { requestCurrentInventory } from "../../../redux/reducers/year-inventory-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";
import { logout } from "../../../redux/reducers/auth-reducer";
import { memo } from "react";

let mapStateToProps = (state) => {
  return {
    type: "furniture",
    data: state.furnitureData.data,
    columns: state.furnitureData.columns,
    values: state.furnitureData.values,
    filters: state.furnitureData.filters,
    name: state.furnitureData.name,
    message: state.furnitureData.message,
    userAuth: state.auth,
    isFetching: state.furnitureData.isFetching,
    validationStatus: state.furnitureData.validationStatus,
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
};

// export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(TableCraft);
