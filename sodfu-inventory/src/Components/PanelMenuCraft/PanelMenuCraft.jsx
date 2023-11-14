import React, { useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NavLink } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import { classNames } from "primereact/utils";
import { useState } from "react";

const PanelMenuCraft = (props) => {
  const { yearsIt, yearsFurniture, requestYears } = props

  useEffect(() => {
    requestYears();
  }, []);

  const items = [
    {
      label: "Общие данные",
      icon: "pi pi-fw pi-file",
      items: [
        {
          template: (item, options) => {
            return (
              <NavLink
                to="/it"
                className={classNames(
                  options.className,
                  "w-full p-link flex align-items-center"
                )}
                style={{
                  textDecoration: "none",
                  color: "#495057",
                }}
              >
                <i className="pi pi-fw pi-print mr-2"></i>
                Оборудование
              </NavLink>
            );
          },
        },
        {
          template: (item, options) => {
            return (
              <NavLink
                to="/furniture"
                className={classNames(
                  options.className,
                  "w-full p-link flex align-items-center"
                )}
                style={{
                  textDecoration: "none",
                  color: "#495057",
                }}
              >
                <i className="pi pi-fw pi-box mr-2"></i>
                Мебель
              </NavLink>
            );
          },
        },
        // {
        //   template: (item, options) => {
        //     return (
        //       <NavLink
        //         to="/charts"
        //         className={classNames(
        //           options.className,
        //           "w-full p-link flex align-items-center"
        //         )}
        //         style={{
        //           textDecoration: "none",
        //           color: "#495057",
        //         }}
        //       >
        //         <i className="pi pi-fw pi-chart-pie mr-2"></i>
        //         Графики
        //       </NavLink>
        //     );
        //   },
        // },
      ],
    },
    {
      label: "Инвентаризационные ведомости по годам",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Оборудование",
          icon: "pi pi-fw pi-print",
          items: yearsIt.map((year) => {
            return {
              template: (item, options) => {
                return (
                  <NavLink
                    to={`/it/${year}`}
                    className={classNames(
                      options.className,
                      "w-full p-link flex align-items-center pl-4"
                    )}
                    style={{
                      textDecoration: "none",
                      color: "#495057",
                    }}
                  >
                    <i className="pi pi-fw pi-calendar mr-2"></i>
                    {year}
                  </NavLink>
                );
              },
            };
          }),
        },
        {
          label: "Мебель",
          icon: "pi pi-fw pi-box",
          items: yearsFurniture.map((year) => {
            return {
              template: (item, options) => {
                return (
                  <NavLink
                    to={`/furniture/${year}`}
                    className={classNames(
                      options.className,
                      "w-full p-link flex align-items-center pl-4"
                    )}
                    style={{
                      textDecoration: "none",
                      color: "#495057",
                    }}
                  >
                    <i className="pi pi-fw pi-calendar mr-2"></i>
                    {year}
                  </NavLink>
                );
              },
            };
          }),
        },
      ],
    },
    // {
    //   label: "Загрузить данные",
    //   icon: "pi pi-fw pi-download",
    //   items: [
    //     {
    //       template: (item, options) => {
    //         return (
    //             <NavLink to="/upload"
    //               className={classNames(options.className,"w-full p-link flex align-items-center")}
    //               style={{
    //                 textDecoration: "none",
    //                 color: "#495057",
    //               }}>
    //               <i className="pi pi-fw pi-download mr-2"></i>
    //               Загрузить данные
    //             </NavLink>
    //         );
    //       },
    //     },
    //   ],
    // },
  ];

  return (
    <div className="card flex justify-content-center mt-2">
      <PanelMenu model={items} className="w-full md:w-25rem" />
    </div>
  );
};

export default PanelMenuCraft;
