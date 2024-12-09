import React, { useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavLink } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import { classNames } from "primereact/utils";
import { PiOfficeChairBold } from "react-icons/pi";

const PanelMenuCraft = (props) => {
  const {
    tables,
    yearsIt,
    yearsFurniture,
    yearsUnmarked,
    yearsAssets,
    requestYears,
    userDivision,
    userAuth,
  } = props;

  useEffect(() => {
    requestYears(userDivision);
  }, []);

  const generalMenuItems = [];
  const yearsMenuItems = [];

  if (tables.includes("it")) {
    generalMenuItems.push({
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
    });

    yearsMenuItems.push({
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
    });
  }

  if (tables.includes("furniture")) {
    generalMenuItems.push({
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
            <i className="mr-3">
              <PiOfficeChairBold />
            </i>
            Мебель
          </NavLink>
        );
      },
    });

    yearsMenuItems.push({
      label: "Мебель",
      icon: (
        <i className="mr-3">
          <PiOfficeChairBold />
        </i>
      ),
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
    });
  }

  if (tables.includes("unmarked")) {
    generalMenuItems.push({
      template: (item, options) => {
        return (
          <NavLink
            to="/unmarked"
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
            Прочее
          </NavLink>
        );
      },
    });

    yearsMenuItems.push({
      label: "Прочее",
      icon: "pi pi-fw pi-box",
      items: yearsUnmarked.map((year) => {
        return {
          template: (item, options) => {
            return (
              <NavLink
                to={`/unmarked/${year}`}
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
    });
  }

  if (tables.includes("assets")) {
    generalMenuItems.push({
      template: (item, options) => {
        return (
          <NavLink
            to="/assets"
            className={classNames(
              options.className,
              "w-full p-link flex align-items-center"
            )}
            style={{
              textDecoration: "none",
              color: "#495057",
            }}
          >
            <i className="pi pi-fw pi-building mr-2"></i>
            Основные средства
          </NavLink>
        );
      },
    });

    yearsMenuItems.push({
      label: "Основные средства",
      icon: "pi pi-fw pi-building",
      items: yearsAssets.map((year) => {
        return {
          template: (item, options) => {
            return (
              <NavLink
                to={`/assets/${year}`}
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
    });
  }

  const items = [
    {
      label: "Общие данные",
      icon: "pi pi-fw pi-file",
      items: generalMenuItems,
    },
    {
      label: "Инвентаризационные ведомости по годам",
      icon: "pi pi-fw pi-calendar",
      items: yearsMenuItems,
    },
  ];

  if (userAuth.role == "admin") {
    items.push({
      label: "Группы пользователей",
      icon: "pi pi-fw pi-users",
      items: [
        {
          template: (item, options) => {
            return (
              <NavLink
                to="/users"
                className={classNames(
                  options.className,
                  "w-full p-link flex align-items-center"
                )}
                style={{
                  textDecoration: "none",
                  color: "#495057",
                }}
              >
                <i className="pi pi-fw pi-user-edit mr-2"></i>
                Пользователи
              </NavLink>
            );
          },
        },
        {
          template: (item, options) => {
            return (
              <NavLink
                to="/employers"
                className={classNames(
                  options.className,
                  "w-full p-link flex align-items-center"
                )}
                style={{
                  textDecoration: "none",
                  color: "#495057",
                }}
              >
                <i className="pi pi-fw pi-user mr-2"></i>
                Сотрудники
              </NavLink>
            );
          },
        },
      ],
    });
  }

  // if (userDivision == 3 && userAuth.login == "user3") {
  items.push({
    label: "Загрузить данные",
    icon: "pi pi-fw pi-download",
    items: [
      {
        template: (item, options) => {
          return (
            <NavLink
              to="/upload"
              className={classNames(
                options.className,
                "w-full p-link flex align-items-center"
              )}
              style={{
                textDecoration: "none",
                color: "#495057",
              }}
            >
              <i className="pi pi-fw pi-download mr-2"></i>
              Загрузить данные
            </NavLink>
          );
        },
      },
    ],
  });
  // }

  return (
    <div className="card flex justify-content-center mt-2">
      <PanelMenu model={items} className="w-full md:w-25rem" />
    </div>
  );
};

export default PanelMenuCraft;
