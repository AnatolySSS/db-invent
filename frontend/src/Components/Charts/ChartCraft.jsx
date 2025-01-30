import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Chart } from "primereact/chart";

const ChartCraft = (props) => {
  const {
    name,
    message,
    itData,
    furnitureData,
    columns,
    itValues,
    furnitureValues,
    requestItData,
    requestFurnitureData,
    addData,
    updateData,
    deleteData,
    setVisible,
    logout,
    userAuth,
    isFetching,
    validationStatus,
  } = props;

  let itLocation,
    itType,
    itCountType = [],
    itCountLocation = [];
  let furnitureLocation,
    furnitureType,
    furnitureCountType = [],
    furnitureCountLocation = [];

  if (itValues.length !== 0) {
    itLocation = [...itValues.location];
    itType = [...itValues.type];
  }

  if (furnitureValues.length !== 0) {
    furnitureLocation = [...furnitureValues.location];
    furnitureType = [...furnitureValues.type];
  }

  if (itData.length !== 0) {
    for (let i = 0; i < itType.length; i++) {
      itCountType[i] = 0;
      itData.forEach((data) => {
        if (itType[i] == data.type) {
          itCountType[i]++;
        }
      });
    }
    itType = itType.filter((element, index) => itCountType[index] != 0);
    itCountType = itCountType.filter((element, index) => element != 0);
    bubbleSort(itCountType, itType);

    for (let i = 0; i < itLocation.length; i++) {
      itCountLocation[i] = 0;
      itData.forEach((data) => {
        if (itLocation[i] == data.location) {
          itCountLocation[i]++;
        }
      });
    }
    itLocation = itLocation.filter((element, index) => itCountLocation[index] != 0);
    itCountLocation = itCountLocation.filter((element, index) => element != 0);
    bubbleSort(itCountLocation, itLocation);
  }

  if (furnitureData.length !== 0) {
    for (let i = 0; i < furnitureType.length; i++) {
      furnitureCountType[i] = 0;
      furnitureData.forEach((data) => {
        if (furnitureType[i] == data.type) {
          furnitureCountType[i]++;
        }
      });
    }
    furnitureType = furnitureType.filter((element, index) => furnitureCountType[index] != 0);
    furnitureCountType = furnitureCountType.filter((element, index) => element != 0);
    bubbleSort(furnitureCountType, furnitureType);

    for (let i = 0; i < furnitureLocation.length; i++) {
      furnitureCountLocation[i] = 0;
      furnitureData.forEach((data) => {
        if (furnitureLocation[i] == data.location) {
          furnitureCountLocation[i]++;
        }
      });
    }
    furnitureLocation = furnitureLocation.filter((element, index) => furnitureCountLocation[index] != 0);
    furnitureCountLocation = furnitureCountLocation.filter((element, index) => element != 0);
    bubbleSort(furnitureCountLocation, furnitureLocation);
  }

  const [dataItType, setItTypeData] = useState({});
  const [dataItLocation, setItLocationData] = useState({});
  const [dataFurnitureType, setFurnitureTypeData] = useState({});
  const [dataFurnitureLocation, setFurnitureLocationData] = useState({});
  const [optionsType, setOptionsType] = useState({});
  const [optionsLocation, setOptionsLocation] = useState({});

  useEffect(() => {
    requestItData(userAuth);
    requestFurnitureData(userAuth);

    const documentStyle = getComputedStyle(document.documentElement);
    const itDataType = {
      labels: itType,
      datasets: [
        {
          data: itCountType,
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--grey-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--primary-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--grey-400"),
            documentStyle.getPropertyValue("--teal-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--primary-400"),
          ],
        },
      ],
    };
    const itDataLocation = {
      labels: itLocation,
      datasets: [
        {
          data: itCountLocation,
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--grey-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--primary-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--grey-400"),
            documentStyle.getPropertyValue("--teal-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--primary-400"),
          ],
        },
      ],
    };
    const furnitureDataType = {
      labels: furnitureType,
      datasets: [
        {
          data: furnitureCountType,
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--grey-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--primary-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--grey-400"),
            documentStyle.getPropertyValue("--teal-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--primary-400"),
          ],
        },
      ],
    };
    const furnitureDataLocation = {
      labels: furnitureLocation,
      datasets: [
        {
          data: furnitureCountLocation,
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--grey-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--primary-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--grey-400"),
            documentStyle.getPropertyValue("--teal-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--primary-400"),
          ],
        },
      ],
    };
    const itOptionsType = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
          position: "right",
          // maxWidth: 50,
          fullSize: false,
        },
        title: {
          display: true,
          text: "Тип",
        },
      },
    };
    const itOptionsLocation = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
          position: "right",
          // maxWidth: 50,
          fullSize: false,
        },
        title: {
          display: true,
          text: "Местоположение",
        },
      },
    };

    setItTypeData(itDataType);
    setItLocationData(itDataLocation);

    setFurnitureTypeData(furnitureDataType);
    setFurnitureLocationData(furnitureDataLocation);

    setOptionsType(itOptionsType);
    setOptionsLocation(itOptionsLocation);
  }, []);

  const makeLogout = () => {
    logout();
  };

  const getUserLogo = () => {
    try {
      return require(`../../img/${props.userAuth.isAuth ? props.userAuth.login : ""}.png`);
    } catch (error) {
      return "";
    }
  };

  const userMenuItems = [
    {
      command: () => {},
      template: (item, options) => {
        let surname = userAuth.fullName.split(" ")[0] ? userAuth.fullName.split(" ")[0] : "";
        let firstname = userAuth.fullName.split(" ")[1] ? ` ${Array.from(userAuth.fullName.split(" ")[1])[0]}.` : "";
        let middlename = userAuth.fullName.split(" ")[2] ? ` ${Array.from(userAuth.fullName.split(" ")[2])[0]}.` : "";
        let fullNameStr = `${surname}${firstname}${middlename}`;
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(options.className, "w-full p-link flex align-items-center")}
          >
            <Avatar image={getUserLogo()} className="mr-2" icon="pi pi-user" shape="circle" />
            <div className="flex flex-column align">
              <span className="font-bold">{fullNameStr}</span>
            </div>
          </button>
        );
      },
    },
    { separator: true },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: makeLogout,
    },
  ];

  return (
    <div className="h-screen card align-items-center justify-content-center">
      <div className="flex flex-wrap justify-content-between">
        <div className="flex align-items-center justify-content-center col-fixed">
          <div className="flex align-items-center col-fixed">
            <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
          </div>
        </div>
        {/* <div className="flex align-items-center justify-content-center col-fixed">
          <div className="flex align-items-center justify-content-center">
            <div className="col-fixed flex align-items-center">
              <Menu model={userMenuItems} popup ref={userMenu} style={{ width: "max-content" }} />
              <Button
                className="bg-gray-50 hover:bg-gray-400 border-gray-50 px-2 py-1"
                onClick={(e) => userMenu.current.toggle(e)}
              >
                <Avatar image={getUserLogo()} icon="pi pi-user" size="large" shape="circle" />
                <i className="pi pi-angle-down ml-2" style={{ color: "#4a4a4a" }}></i>
              </Button>
            </div>
          </div>
        </div> */}
      </div>
      <p className="text-center text-5xl text-primary">Оборудование</p>
      <div className="card flex justify-content-center">
        <Chart type="pie" data={dataItType} options={optionsType} className="w-4" />
        <Chart type="pie" data={dataItLocation} options={optionsLocation} className="w-4" />
      </div>
      {/* <p className="text-center text-5xl text-primary">Мебель</p>
      <div className="card flex justify-content-center">
        <Chart type="pie" data={dataFurnitureType} options={optionsType} className="w-full md:w-30rem" />
        <Chart type="pie" data={dataFurnitureLocation} options={optionsLocation} className="w-full md:w-30rem" />
      </div> */}
    </div>
  );
};

export default ChartCraft;

function bubbleSort(arr, arr2) {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] < arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        let temp2 = arr2[i];
        arr2[i] = arr2[i + 1];
        arr2[i + 1] = temp2;
      }
    }
  }
}
