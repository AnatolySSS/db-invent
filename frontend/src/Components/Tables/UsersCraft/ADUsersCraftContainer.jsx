import { connect } from "react-redux";
import { compose } from "redux";
import ADUsersCraft from "./ADUsersCraft";
import { requestData } from "../../../redux/reducers/ad-users-reducer";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "users",
    data: state.adUsers.data,
    columns: state.adUsers.columns,
    values: state.usersData.values,
    filters: state.usersData.filters,
    name: state.usersData.name,
    message: state.usersData.message,
    userAuth: state.auth,
    isFetching: state.usersData.isFetching,
    adUsers: state.adUsers.data,
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
)(ADUsersCraft);
