import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from "primereact/sidebar";
import PanelMenuCraftContainer from "../PanelMenuCraft/PanelMenuCraftContainer";

const SidebarCraft = (props) => {
  return (
    <div className="">
      <Sidebar className="flex" visible={props.visible} onHide={() => props.setVisible(false)}>
        <PanelMenuCraftContainer />
      </Sidebar>
    </div>
  );
};

export default SidebarCraft;
