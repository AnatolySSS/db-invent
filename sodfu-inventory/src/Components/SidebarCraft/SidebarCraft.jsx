import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from "primereact/sidebar";
import { Button } from 'primereact/button';
import PanelMenuCraft from "../PanelMenuCraft/PanelMenuCraft";

const SidebarCraft = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="card flex justify-content-left mt-2 ml-2">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <PanelMenuCraft />
      </Sidebar>
      <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
    </div>
  );
};

export default SidebarCraft;
