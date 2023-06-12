import { connect } from "react-redux";
import PanelMenuCraft from "./PanelMenuCraft";
import { requestYears } from "../../redux/reducers/panel-menu-reducer";

let mapStateToProps = (state) => {

  return {
    yearsIt: state.panelMenu.yearsIt,
    yearsFurniture: state.panelMenu.yearsFurniture,
  };
};

let mapDispatchToProps =  {
  requestYears
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelMenuCraft)