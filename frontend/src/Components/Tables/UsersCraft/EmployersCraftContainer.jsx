import { connect } from "react-redux";
import { compose } from "redux";
import EmployersCraft from "./EmployersCraft";
import { clearState } from "../../../redux/reducers/it-data-reducer";
import { setVisible } from "../../../redux/reducers/side-bar-reducer";
import { logout } from "../../../redux/reducers/auth-reducer";
import { requestData } from "../../../redux/reducers/employers-reducer";
import { withAuthNavigate } from "../../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    type: "employers",
    data: state.employers.data,
    columns: state.employers.columns,
    values: state.employers.values,
    filters: state.employers.filters,
    name: state.employers.name,
    message: state.employers.message,
    userAuth: state.auth,
    isFetching: state.employers.isFetching,
    employers: state.employers.data,
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
)(EmployersCraft);
