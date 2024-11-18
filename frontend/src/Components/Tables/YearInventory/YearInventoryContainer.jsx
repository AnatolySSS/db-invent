import { connect } from "react-redux";
import { compose } from "redux";
import YearInventoryCraft from "./YearInventoryCraft";
import {
  requestData,
  clearState,
} from "../../../redux/reducers/year-inventory-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state, ownProps) => {
  return {
    tableName: ownProps.tableName,
    data: state.yearInventory.data,
    columns: state.yearInventory.columns,
    values: state.yearInventory.values,
    filters: state.yearInventory.filters,
    name: state.yearInventory.name,
    message: state.yearInventory.message,
    userAuth: state.auth,
    isFetching: state.yearInventory.isFetching,
  };
};

let mapDispatchToProps = {
  requestData,
  setVisible,
  clearState,
  logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(YearInventoryCraft);
