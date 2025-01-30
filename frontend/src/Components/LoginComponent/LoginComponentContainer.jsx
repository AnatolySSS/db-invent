import { connect } from "react-redux";
import LoginComponent from "./LoginComponent";
import { login } from "../../redux/reducers/auth-reducer";

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    fullName: state.auth.fullName,
    message: state.auth.message,
    data_type: state.auth.data_type,
  };
};

let mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
