import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from "primereact/sidebar";
import PanelMenuCraftContainer from "../PanelMenuComponent/PanelMenuComponentContainer";

const SidebarComponent = (props) => {
  return (
    <Sidebar className="flex" visible={props.visible} onHide={() => props.setVisible(false)}>
      <PanelMenuCraftContainer />
    </Sidebar>
  );
};

export default SidebarComponent;
