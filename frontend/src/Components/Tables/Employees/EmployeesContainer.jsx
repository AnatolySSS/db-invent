import { connect } from "react-redux";
import { compose } from "redux";
import Employees from "./Employees";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { requestData } from "../../../redux/reducers/employees-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "employees",
    data: state.employees.data,
    columns: state.employees.columns,
    values: state.employees.values,
    filters: state.employees.filters,
    name: state.employees.name,
    message: state.employees.message,
    userAuth: state.auth,
    isFetching: state.employees.isFetching,
    employees: state.employees.data,
    itData: state.itData.data,
  };
};

let mapDispatchToProps = {
  requestData,
  setVisible,
  clearState,
  logout,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthNavigate)(Employees);
