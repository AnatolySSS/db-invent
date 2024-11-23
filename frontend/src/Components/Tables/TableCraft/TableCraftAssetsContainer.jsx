import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./TableCraft";
import {
  requestData,
  addData,
  updateData,
  deleteData,
} from "../../../redux/reducers/assets-data-reducer";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { beginInventory } from "../../../redux/reducers/panel-menu-reducer";
import { requestCurrentInventory } from "../../../redux/reducers/year-inventory-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "assets",
    data: state.assetsData.data,
    columns: state.assetsData.columns,
    values: state.assetsData.values,
    filters: state.assetsData.filters,
    name: state.assetsData.name,
    message: state.assetsData.message,
    userAuth: state.auth,
    isFetching: state.assetsData.isFetching,
    validationStatus: state.assetsData.validationStatus,
    hasCurrentInventory: state.yearInventory.hasCurrentInventory,
    adUsers: state.adUsers.data,
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(TableCraft);
