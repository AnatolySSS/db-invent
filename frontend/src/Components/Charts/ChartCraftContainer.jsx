import { connect } from "react-redux";
import { compose } from "redux";
import ChartCraft from "./ChartCraft";
import { requestData as requestItData } from "../../redux/reducers/it-data-reducer";
import { requestData as requestFurnitureData } from "../../redux/reducers/furniture-data-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { logout } from "../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {

  return {
    itData: state.itData.data,
    furnitureData: state.furnitureData.data,
    columns: state.itData.columns,
    itValues: state.itData.values,
    furnitureValues: state.furnitureData.values,
    filters: state.itData.filters,
    name: state.itData.name,
    message: state.itData.message,
    userAuth: state.auth,
    isFetching: state.itData.isFetching,
    validationStatus: state.itData.validationStatus,
  };
};

let mapDispatchToProps =  {
    requestItData,
    requestFurnitureData,
    setVisible,
    logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(ChartCraft);