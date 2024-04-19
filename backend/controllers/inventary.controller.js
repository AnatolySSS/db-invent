import db from "../models/_index.js";
const CurrentYearInventaryIt = db.DIVISIONS.D3.currentYearInventaryIt
const CurrentYearInventaryFurniture = db.DIVISIONS.D3.currentYearInventaryFurniture
const PreviousYearInventaryIt = db.DIVISIONS.D3.previousYearInventaryIt
const PreviousYearInventaryFurniture = db.DIVISIONS.D3.previousYearInventaryFurniture
const libDataIt = db.DIVISIONS.D3.itLib
const valuesDataIt = db.DIVISIONS.D3.itValues
const libDataFurniture = db.DIVISIONS.D3.furnitureLib

export const InventaryController = {
  async hasCurrentYearInventary(request, responce) {
    try {
      
      const currentYear = new Date().getFullYear();
      const [resultsIt] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_it'`);
      const [resultsFurniture] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_furniture'`);
      const locations_from_db = await valuesDataIt.findAll({attributes: ['location'], raw : true});
      let locations = locations_from_db.map(value => value.location);
      let resultCodeIt, messageIt, resultCodeFurniture, messageFurniture;

      if (resultsIt.length == 0) {
        resultCodeIt = false;
        messageIt = "Таблица It отсутствует в базе данных";
      } else {
        resultCodeIt = true;
        messageIt = "Таблица It имеется в базе данных";
      }

      if (resultsFurniture.length == 0) {
        resultCodeFurniture = false;
        messageFurniture = "Таблица Furniture отсутствует в базе данных";
      } else {
        resultCodeFurniture = true;
        messageFurniture = "Таблица Furniture имеется в базе данных";
      }
      
      responce.json({
        resultCodeIt: resultCodeIt,
        resultCodeFurniture: resultCodeFurniture,
        messageIt: messageIt,
        messageFurniture: messageFurniture,
        locations: locations,
      });
      
    } catch (error) {
      responce.json(error);
    }
  },

  async requestCurrentInventory(request, responce) {
    try {
      let { tableName, userDivision } = request.body;
      
      const currentYear = new Date().getFullYear();
      const [hasCurrentInventory] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_${tableName}'`);
      
      responce.json({
        hasCurrentInventory: hasCurrentInventory.length != 0 ? true : false,
      });
      
    } catch (error) {
      console.log('_____________________InventoryController_requestCurrentInventory____________________');
      console.log(error);
      responce.json(error);
    }
  },

  async beginInventory(request, responce) {
    try {
      let { tableName, userDivision } = request.body;

      const currentYear = new Date().getFullYear();
      const [results] = await db.DIVISIONS[`D${userDivision}`].sequelize.query(
        `SHOW TABLES LIKE 'inv_${currentYear}_${tableName}'`
      );

      if (results.length == 0) {
        let data, inventData, dataTable, inventTable;

        switch (tableName) {
          case "it":
            dataTable = db.DIVISIONS[`D${userDivision}`].itLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryIt;
            break;
          case "furniture":
            dataTable = db.DIVISIONS[`D${userDivision}`].furnitureLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryFurniture;
            break;
          case "unmarked":
            dataTable = db.DIVISIONS[`D${userDivision}`].unmarkedLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryUnmarked;
            break;
          default:
            break;
        }
        
        data = await dataTable.findAll();
        data = JSON.parse(JSON.stringify(data));

        await inventTable.sync();
        for (const obj of data) {
          delete obj.id;
          obj.checked = false;
          await inventTable.create(obj);
        }

        responce.json({
          tableName: tableName,
          message: `Таблица ${tableName} за ${currentYear} год создана`,
          inventData,
        });
      } else {
        responce.json({
          tableName: tableName,
          message: `Таблица ${tableName} за ${currentYear} год уже создана`,
        });
      }

    } catch (error) {
      console.log('_____________________InventoryController_beginInventory____________________');
      console.log(error);
      responce.json(error);
    }
  },

  async findQRCode(request, responce) {
    try {
      let { userName, tableName, roomNumber, qrCode } = request.body;
      const currentYear = new Date().getFullYear();
      let itemName
      switch (tableName) {
        case "it":
          await CurrentYearInventaryIt.update({ checked: true }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryIt.update({ user: userName }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryIt.update({ location: roomNumber }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryIt.update({ scan_date: new Date() }, {
            where: {
              qr_code: qrCode
            }
          });

          itemName = await CurrentYearInventaryIt.findOne({ where: { qr_code: qrCode } })
          responce.json({
            tableName: tableName,
            message: `${itemName.name} инвентаризован в таблице ${tableName} за ${currentYear} год`,
            name: itemName.name
          });
          break;
        case "furniture":
          await CurrentYearInventaryFurniture.update({ checked: true }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryFurniture.update({ user: userName }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryFurniture.update({ location: roomNumber }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryFurniture.update({ scan_date: new Date() }, {
            where: {
              qr_code: qrCode
            }
          });

          itemName = await CurrentYearInventaryFurniture.findOne({ where: { qr_code: qrCode } })
          responce.json({
            tableName: tableName,
            message: `${itemName.name} инвентаризован в таблице ${tableName} за ${currentYear} год`,
            name: itemName.name
          });
          break;
        default:
          break;
      }
      
    } catch (error) {
      
    }
  },

  async checkQRCode(request, responce) {
    try {
      let { qrCode } = request.body;
      let object
      object = await libDataIt.findOne({ where: { qr_code: qrCode } })
      if (!object) {
        object = await libDataFurniture.findOne({ where: { qr_code: qrCode } })
      }
      responce.json({
        message: `Объект ${object.dataValues.name} найден`,
        object: object.dataValues,
      });
      
    } catch (error) {
      
    }
  },

  async checkRemains(request, responce) {
    try {
      const currentYear = new Date().getFullYear()
      let { roomNumber } = request.body;
      let it, furniture, it_status, furniture_status

      //Проверяется наличие предыдущих инвентаризаций
      const [results_it] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear - 1}_it'`);
      const [results_furniture] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear - 1}_furniture'`);

      //Если ранее инвентаризации не проводились, то данные запрашиваются из основных таблиц
      if (results_it.length == 0) {
        it = await libDataIt.findAll({ where: { location: roomNumber }, raw : true, })
      //Если инвентаризации ранее проводились, то данные запрашиваются из предыдущих инвентаризаций
      } else {
        it = await PreviousYearInventaryIt.findAll({ where: { location: roomNumber }, raw : true, })
      }

      if (results_furniture.length == 0) {
        furniture = await libDataFurniture.findAll({ where: { location: roomNumber }, raw : true, })
      //Если инвентаризации ранее проводились, то данные запрашиваются из предыдущих инвентаризаций
      } else {
        furniture = await PreviousYearInventaryFurniture.findAll({ where: { location: roomNumber }, raw : true, })
      }

      it_status = await CurrentYearInventaryIt.findAll({
        attributes: ["name", "qr_code", "checked", "location"], raw : true, 
        // where: { location: roomNumber },
      });
      
      furniture_status = await CurrentYearInventaryFurniture.findAll({
        attributes: ["name", "qr_code", "checked", "location"],raw : true, 
        // where: { location: roomNumber },
      });
      
      // it_status = it_status.map(it => it.dataValues)
      // furniture_status = furniture_status.map(it => it.dataValues)

      it_status = it_status.map(v => {
        it.forEach(it => {
          if (v.qr_code == it.qr_code) {
            if (v.location == null && it.location != null) {
              v.location = it.location
            }
          }
        })
        return v;
      }).filter(v => v.location == roomNumber)

      furniture_status = furniture_status.map(v => {
        furniture.forEach(furniture => {
          if (v.qr_code == furniture.qr_code) {
            if (v.location == null && furniture.location != null) {
              v.location = furniture.location
            }
          }
        })
        return v;
      }).filter(v => v.location == roomNumber)

      // //Форматирование данных по оборудованию
      // it = it.map(v => {
      //   //Присвоение статусов проверки текущего года
      //   it_status.forEach(it_status => {
      //     if (v.qr_code == it_status.qr_code) {
      //       v.checked = it_status.checked
      //       if (it_status.location != null) {
      //         v.location = it_status.location
      //       }
      //     }
      //   });
      //   //Изменение значения checked
      //   switch (v.checked) {
      //     case 1:
      //       v.checked = true;
      //       break;
      //     case null:
      //       v.checked = false;
      //       break;
      //     default:
      //       break;
      //   }
      //   //Форматирование даты
      //   Object.keys(v).forEach((element) => {
      //     if (element.includes("date")) {
      //       if (v[element] !== null) {
      //         v[element] = new Date(v[element]).toLocaleString(
      //           "ru-RU",
      //           {
      //             day: "2-digit",
      //             month: "2-digit",
      //             year: "numeric",
      //             timeZone: "Europe/Moscow",
      //           }
      //         );
      //         v[element] = changeDateType(v[element]);
      //         v[element] = new Date(v[element]);
      //       }
      //     }
      //   })
      //   return v;
      // })

      // //Форматирование данных по мебели
      // furniture = furniture.map(v => {
      //   //Присвоение статусов проверки текущего года
      //   furniture_status.forEach(furniture_status => {
      //     if (v.qr_code == furniture_status.qr_code) {
      //       v.checked = furniture_status.checked
      //       if (furniture_status.location != null) {
      //         v.location = furniture_status.location
      //       }
      //     }
      //   });
      //   //Изменение значения checked
      //   switch (v.checked) {
      //     case 1:
      //       v.checked = true;
      //       break;
      //     case null:
      //       v.checked = false;
      //       break;
      //     default:
      //       break;
      //   }
      //   //Форматирование даты
      //   Object.keys(v).forEach((element) => {
      //     if (element.includes("date")) {
      //       if (v[element] !== null) {
      //         v[element] = new Date(v[element]).toLocaleString(
      //           "ru-RU",
      //           {
      //             day: "2-digit",
      //             month: "2-digit",
      //             year: "numeric",
      //             timeZone: "Europe/Moscow",
      //           }
      //         );
      //         v[element] = changeDateType(v[element]);
      //         v[element] = new Date(v[element]);
      //       }
      //     }
      //   })
      //   return v;
      // })

      responce.json({
        message: `Объекты найдены`,
        object: { it: it_status, furniture: furniture_status },
      });
      
    } catch (error) {
      
    }
  },

  async getLocations(request, responce) {
    try {
      
      const currentYear = new Date().getFullYear()
      let it, furniture, it_status, furniture_status, checked_it = 0, checked_furniture = 0

      //Получение списка помещений
      let locations = await valuesDataIt.findAll({attributes: ['location'], raw : true, })
      // locations = locations.map(location => location.location)

      //Проверяется наличие предыдущих инвентаризаций
      const [results_it] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear - 1}_it'`);
      const [results_furniture] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear - 1}_furniture'`);

      //Если ранее инвентаризации не проводились, то данные запрашиваются из основных таблиц
      if (results_it.length == 0) {
        it = await libDataIt.findAll({ attributes: ["qr_code", "location"], raw : true, })
      //Если инвентаризации ранее проводились, то данные запрашиваются из предыдущих инвентаризаций
      } else { 
        it = await PreviousYearInventaryIt.findAll({ attributes: ["qr_code", "location"], raw : true, })
      }

      //Если ранее инвентаризации не проводились, то данные запрашиваются из основных таблиц
      if (results_furniture.length == 0) {
        furniture = await libDataFurniture.findAll({ attributes: ["qr_code", "location"], raw : true, })
      //Если инвентаризации ранее проводились, то данные запрашиваются из предыдущих инвентаризаций
      } else {
        furniture = await PreviousYearInventaryFurniture.findAll({ attributes: ["qr_code", "location"], raw : true, })
      }

      it_status = await CurrentYearInventaryIt.findAll({
        attributes: ["name", "qr_code", "checked", "location"], raw : true,
      });
      furniture_status = await CurrentYearInventaryFurniture.findAll({
        attributes: ["name", "qr_code", "checked", "location"], raw : true,
      });

      it_status = it_status.map(v => {
        it.forEach(it => {
          if (v.qr_code == it.qr_code) {
            if (v.location == null && it.location != null) {
              v.location = it.location
            }
          }
        });
        return v;
      })

      furniture_status = furniture_status.map(v => {
        furniture.forEach(furniture => {
          if (v.qr_code == furniture.qr_code) {
            if (v.location == null && furniture.location != null) {
              v.location = furniture.location
            }
          }
        });
        return v;
      })

      //Форматирование данных по оборудованию
      // it = it.map(v => {
      //   //Присвоение статусов проверки текущего года
      //   it_status.forEach(it_status => {
      //     if (v.qr_code == it_status.qr_code) {
      //       v.checked = it_status.checked
      //       if (it_status.location != null) {
      //         v.location = it_status.location
      //       }
      //     }
      //   });
      //   //Изменение значения checked
      //   switch (v.checked) {
      //     case 1:
      //       v.checked = true;
      //       break;
      //     case null:
      //       v.checked = false;
      //       break;
      //     default:
      //       break;
      //   }
      //   //Форматирование даты
      //   Object.keys(v).forEach((element) => {
      //     if (element.includes("date")) {
      //       if (v[element] !== null) {
      //         v[element] = new Date(v[element]).toLocaleString(
      //           "ru-RU",
      //           {
      //             day: "2-digit",
      //             month: "2-digit",
      //             year: "numeric",
      //             timeZone: "Europe/Moscow",
      //           }
      //         );
      //         v[element] = changeDateType(v[element]);
      //         v[element] = new Date(v[element]);
      //       }
      //     }
      //   })
      //   return v;
      // })

      //Форматирование данных по мебели
      // furniture = furniture.map(v => {
      //   //Присвоение статусов проверки текущего года
      //   furniture_status.forEach(furniture_status => {
      //     if (v.qr_code == furniture_status.qr_code) {
      //       v.checked = furniture_status.checked
      //       if (furniture_status.location != null) {
      //         v.location = furniture_status.location
      //       }
      //     }
      //   });
      //   //Изменение значения checked
      //   switch (v.checked) {
      //     case 1:
      //       v.checked = true;
      //       break;
      //     case null:
      //       v.checked = false;
      //       break;
      //     default:
      //       break;
      //   }
      //   //Форматирование даты
      //   Object.keys(v).forEach((element) => {
      //     if (element.includes("date")) {
      //       if (v[element] !== null) {
      //         v[element] = new Date(v[element]).toLocaleString(
      //           "ru-RU",
      //           {
      //             day: "2-digit",
      //             month: "2-digit",
      //             year: "numeric",
      //             timeZone: "Europe/Moscow",
      //           }
      //         );
      //         v[element] = changeDateType(v[element]);
      //         v[element] = new Date(v[element]);
      //       }
      //     }
      //   })
      //   return v;
      // })

      //Формирование массива объектов инвентаризации по кабинетам
      locations.forEach((location) => {
        location.it = it_status.filter(it => it.location == location.location)
        location.furniture = furniture_status.filter(furniture => furniture.location == location.location)
      });

      //Получение количества инвентаризированных объектов
      locations.forEach((location) => {
        console.log(location);
        location.checked_it = location.it.filter(it => it.checked == true).length
        location.checked_furniture = location.furniture.filter(furniture => furniture.checked == true).length
        checked_it = checked_it + location.checked_it
        checked_furniture = checked_furniture + location.checked_furniture
      });

      responce.json({
        message: `Объекты найдены`,
        locations,
        checked_it,
        checked_furniture,
        it_count: it_status.length,
        furniture_count: furniture_status.length,
      });
      
    } catch (error) {
      
    }
  },
};