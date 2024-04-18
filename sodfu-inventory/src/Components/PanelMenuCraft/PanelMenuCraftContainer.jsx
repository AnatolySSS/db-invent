import { connect } from "react-redux";
import PanelMenuCraft from "./PanelMenuCraft";
import { requestYears } from "../../redux/reducers/panel-menu-reducer";

let mapStateToProps = (state) => {

  return {
    tables: state.panelMenu.tables,
    yearsIt: state.panelMenu.yearsIt,
    yearsFurniture: state.panelMenu.yearsFurniture,
    yearsUnmarked: state.panelMenu.yearsUnmarked,
    userDivision: state.auth.division,
  };
};

let mapDispatchToProps =  {
  requestYears
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelMenuCraft)