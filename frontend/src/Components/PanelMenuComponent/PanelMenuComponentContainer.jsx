import { connect } from "react-redux";
import PanelMenuComponent from "./PanelMenuComponent";
import { requestYears } from "../../redux/reducers/panel-menu-reducer";

let mapStateToProps = (state) => {
  return {
    tables: state.panelMenu.tables,
    yearsIt: state.panelMenu.yearsIt,
    yearsFurniture: state.panelMenu.yearsFurniture,
    yearsUnmarked: state.panelMenu.yearsUnmarked,
    yearsAssets: state.panelMenu.yearsAssets,
    userDivision: state.auth.division_id,
    userAuth: state.auth,
  };
};

let mapDispatchToProps = {
  requestYears,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelMenuComponent);
