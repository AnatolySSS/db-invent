import { connect } from "react-redux";
import { compose } from "redux";
import ADUsersCraft from "./ADUsersCraft";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "adusers",
    data: state.adUsers.data,
    columns: state.adUsers.columns,
    values: state.adUsers.values,
    filters: state.adUsers.filters,
    name: state.adUsers.name,
    message: state.adUsers.message,
    userAuth: state.auth,
    isFetching: state.adUsers.isFetching,
    adUsers: state.adUsers.data,
  };
};

let mapDispatchToProps = {
  setVisible,
  clearState,
  logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(ADUsersCraft);
