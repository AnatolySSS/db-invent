import { connect } from "react-redux";
import SidebarComponent from "./SidebarComponent";
import { setVisible } from "../../redux/reducers/side-bar-reducer";

let mapStateToProps = (state) => {
  return {
    visible: state.sideBar.visible,
  };
};

let mapDispatchToProps = {
  setVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
