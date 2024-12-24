import { connect } from "react-redux";
import { compose } from "redux";
import YearInventoryCraft from "./YearInventoryCraft";
import { requestData, clearState as clearYearState, requestCurrentInventory } from "../../../redux/reducers/year-inventory-reducer";
import { clearState as clearItState } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state, ownProps) => {
  return {
    type: ownProps.type,
    data: state.yearInventory.data,
    columns: state.yearInventory.columns,
    values: state.yearInventory.values,
    filters: state.yearInventory.filters,
    name: state.yearInventory.name,
    message: state.yearInventory.message,
    userAuth: state.auth,
    hasCurrentInventory: state.yearInventory.hasCurrentInventory,
    isFetching: state.yearInventory.isFetching,
  };
};

let mapDispatchToProps = {
  requestData,
  setVisible,
  clearItState,
  clearYearState,
  requestCurrentInventory,
  logout,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthNavigate)(YearInventoryCraft);
