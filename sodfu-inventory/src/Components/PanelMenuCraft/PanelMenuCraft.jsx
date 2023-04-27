import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavLink } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import { classNames } from "primereact/utils";

const PanelMenuCraft = (props) => {

  const items = [
    {
      label: "Показать данные",
      icon: "pi pi-fw pi-file",
      items: [
        {
          template: (item, options) => {
            return (
                <NavLink to="/it"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-print mr-2"></i>
                  Оборудование
                </NavLink>
            );
          },
        },
        {
          icon: "pi pi-fw pi-box",
          template: (item, options) => {
            return (
                <NavLink to="/furniture"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-box mr-2"></i>
                  Мебель
                </NavLink>
            );
          },
        },
      ],
    },
    {
      label: "Загрузить данные",
      icon: "pi pi-fw pi-download",
      items: [
        {
          template: (item, options) => {
            return (
                <NavLink to="/upload"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-download mr-2"></i>
                  Загрузить данные
                </NavLink>
            );
          },
        },
      ],
    },
  ];

  return (
    <div className="card flex justify-content-center mt-2">
      <PanelMenu model={items} className="w-full md:w-25rem" />
    </div>
  );
};

export default PanelMenuCraft;
