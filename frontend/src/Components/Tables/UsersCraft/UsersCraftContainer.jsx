import { connect } from "react-redux";
import { compose } from "redux";
import UsersCraft from "./UsersCraft";
import {
  requestData,
  addData,
  updateData,
  deleteData,
} from "../../../redux/reducers/users-data-reducer";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "users",
    data: state.usersData.data,
    columns: state.usersData.columns,
    values: state.usersData.values,
    filters: state.usersData.filters,
    name: state.usersData.name,
    message: state.usersData.message,
    userAuth: state.auth,
    isFetching: state.usersData.isFetching,
    employees: state.employees.data,
  };
};

let mapDispatchToProps = {
  requestData,
  addData,
  updateData,
  deleteData,
  setVisible,
  clearState,
  logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(UsersCraft);
