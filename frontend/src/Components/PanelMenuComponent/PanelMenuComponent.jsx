import React, { useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavLink } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import { classNames } from "primereact/utils";
import { PiOfficeChairBold } from "react-icons/pi";

const PanelMenuComponent = (props) => {
  const { tables, yearsIt, yearsFurniture, yearsUnmarked, yearsAssets, requestYears, userDivision, userAuth } = props;

  useEffect(() => {
    requestYears(userDivision);
  }, []);

  const items = [];
  const generalMenuItems = [];
  const yearsMenuItems = [];

  const data_types = {
    it: "Оборудование",
    furniture: "Мебель",
    assets: "Основные средства",
    unmarked: "Прочее",
  };

  if (tables.includes("it") && userAuth.data_type?.includes(data_types.it)) {
    generalMenuItems.push({
      template: (item, options) => {
        return (
          <NavLink
            to="/it"
            className={classNames(options.className, "w-full p-link flex align-items-center")}
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
                className={classNames(options.className, "w-full p-link flex align-items-center pl-4")}
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

  if (tables.includes("furniture") && userAuth.data_type?.includes(data_types.furniture)) {
    generalMenuItems.push({
      template: (item, options) => {
        return (
          <NavLink
            to="/furniture"
            className={classNames(options.className, "w-full p-link flex align-items-center")}
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
                className={classNames(options.className, "w-full p-link flex align-items-center pl-4")}
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

  if (tables.includes("unmarked") && userAuth.data_type?.includes(data_types.unmarked)) {
    generalMenuItems.push({
      template: (item, options) => {
        return (
          <NavLink
            to="/unmarked"
            className={classNames(options.className, "w-full p-link flex align-items-center")}
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
                className={classNames(options.className, "w-full p-link flex align-items-center pl-4")}
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

  if (tables.includes("assets") && userAuth.data_type?.includes(data_types.assets)) {
    generalMenuItems.push({
      template: (item, options) => {
        return (
          <NavLink
            to="/assets"
            className={classNames(options.className, "w-full p-link flex align-items-center")}
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
                className={classNames(options.className, "w-full p-link flex align-items-center pl-4")}
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

  if (generalMenuItems.length !== 0) {
    items.push({
      label: "Общие данные",
      icon: "pi pi-fw pi-file",
      items: generalMenuItems,
    });
  }

  if (yearsMenuItems.length !== 0) {
    items.push({
      label: "Инвентаризационные ведомости по годам",
      icon: "pi pi-fw pi-calendar",
      items: yearsMenuItems,
    });
  }

  items.push({
    label: "Группы пользователей",
    icon: "pi pi-fw pi-users",
    items: [
      {
        template: (item, options) => {
          return (
            <NavLink
              to="/employees"
              className={classNames(options.className, "w-full p-link flex align-items-center")}
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

  //Добавление страницы пользователей для роли admin
  if (userAuth.role == "admin") {
    items.forEach((item) => {
      if (item.label === "Группы пользователей") {
        item.items.push({
          template: (item, options) => {
            return (
              <NavLink
                to="/users"
                className={classNames(options.className, "w-full p-link flex align-items-center")}
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
        });
      }
    });
  }

  items.push({
    label: "Графики",
    icon: "pi pi-chart-bar",
    items: [
      {
        template: (item, options) => {
          return (
            <NavLink
              to="/charts"
              className={classNames(options.className, "w-full p-link flex align-items-center")}
              style={{
                textDecoration: "none",
                color: "#495057",
              }}
            >
              <i className="pi pi-chart-pie mr-2"></i>
              Все
            </NavLink>
          );
        },
      },
    ],
  });

  // if (userDivision == 4 && userAuth.login == "user3") {
  // items.push({
  //   label: "Загрузить данные",
  //   icon: "pi pi-fw pi-download",
  //   items: [
  //     {
  //       template: (item, options) => {
  //         return (
  //           <NavLink
  //             to="/upload"
  //             className={classNames(options.className, "w-full p-link flex align-items-center")}
  //             style={{
  //               textDecoration: "none",
  //               color: "#495057",
  //             }}
  //           >
  //             <i className="pi pi-fw pi-download mr-2"></i>
  //             Загрузить данные
  //           </NavLink>
  //         );
  //       },
  //     },
  //   ],
  // });
  // }

  return (
    <div className="card flex justify-content-center mt-2">
      <PanelMenu model={items} className="w-full md:w-25rem" />
    </div>
  );
};

export default PanelMenuComponent;
