import db from "../models/index.js";
const CurrentYearInventaryIt = db.currentYearInventaryIt
const CurrentYearInventaryFurniture = db.currentYearInventaryFurniture
const PreviousYearInventaryIt = db.previousYearInventaryIt
const PreviousYearInventaryFurniture = db.previousYearInventaryFurniture
const libDataIt = db.libDataIt
const valuesDataIt = db.valuesDataIt
const libDataFurniture = db.libDataFurniture
import setConnection from "../config/db-connection.js";
import changeDateType from "../changeDateType.js";
import { longHexNumber } from "docx";

//подключение в базе данных
const { connection } = setConnection();

export const InventaryController = {
  async hasCurrentYearInventary(request, responce) {
    try {
      const currentYear = new Date().getFullYear()
      const [resultsIt] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_it'`);
      const [resultsFurniture] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_furniture'`);
      const locations_from_db = await valuesDataIt.findAll({attributes: ['location'], raw : true})
      let locations = locations_from_db.map(value => value.location)
      let resultCodeIt, messageIt, resultCodeFurniture, messageFurniture

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

  async beginInventary(request, responce) {
    try {
      let { tableName } = request.body;
      const currentYear = new Date().getFullYear()

      const [results] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_${tableName}'`);
      
      if (results.length == 0) {
        let basicInventaryData
        connection.query(
          `SELECT qr_code, name FROM ${tableName}_lib`,
          (err, rows, fields) => {
            basicInventaryData = Object.values(JSON.parse(JSON.stringify(rows)));
          }
        );
        switch (tableName) {
          case "it":
            await CurrentYearInventaryIt[currentYear].sync()
            await basicInventaryData.forEach(element => {
              CurrentYearInventaryIt[currentYear].create({ qr_code: element.qr_code, name: element.name });
            });
            const CurrentYearInventaryItNew = await CurrentYearInventaryIt[currentYear].findAll({ raw: true });
            responce.json({
              tableName: tableName,
              message: `Таблица ${tableName} за ${currentYear} год создана`,
              CurrentYearInventaryItNew,
            });
            break;
          case "furniture":
            console.log('here');
            await CurrentYearInventaryFurniture[currentYear].sync()
            await basicInventaryData.forEach(element => {
              CurrentYearInventaryFurniture[currentYear].create({ qr_code: element.qr_code, name: element.name });
            });
            const CurrentYearInventaryFurnitureNew = await CurrentYearInventaryIt[currentYear].findAll({ raw: true });
            responce.json({
              tableName: tableName,
              message: `Таблица ${tableName} за ${currentYear} год создана`,
              CurrentYearInventaryFurnitureNew,
            });
            break;
          default:
            break;
        }
      } else {
        responce.json({
          tableName: tableName,
          message: `Таблица ${tableName} за ${currentYear} год уже создана`,
        });
      }
    } catch (error) {
      responce.json(error);
    }
  },

  async findQRCode(request, responce) {
    try {
      let { userName, tableName, roomNumber, qrCode } = request.body;
      const currentYear = new Date().getFullYear()
      let itemName
      switch (tableName) {
        case "it":
          await CurrentYearInventaryIt[currentYear].update({ checked: true }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryIt[currentYear].update({ user: userName }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryIt[currentYear].update({ location: roomNumber }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryIt[currentYear].update({ scan_date: new Date() }, {
            where: {
              qr_code: qrCode
            }
          });

          itemName = await CurrentYearInventaryIt[currentYear].findOne({ where: { qr_code: qrCode } })
          responce.json({
            tableName: tableName,
            message: `${itemName.name} инвентаризован в таблице ${tableName} за ${currentYear} год`,
            name: itemName.name
          });
          break;
        case "furniture":
          await CurrentYearInventaryFurniture[currentYear].update({ checked: true }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryFurniture[currentYear].update({ user: userName }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryFurniture[currentYear].update({ location: roomNumber }, {
            where: {
              qr_code: qrCode
            }
          });
          await CurrentYearInventaryFurniture[currentYear].update({ scan_date: new Date() }, {
            where: {
              qr_code: qrCode
            }
          });

          itemName = await CurrentYearInventaryFurniture[currentYear].findOne({ where: { qr_code: qrCode } })
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
      if (results_it.length == 0 && results_furniture.length == 0) {
        it = await libDataIt.findAll({ where: { location: roomNumber } })
        furniture = await libDataFurniture.findAll({ where: { location: roomNumber } })
      //Если инвентаризации ранее проводились, то данные запрашиваются из предыдущих инвентаризаций
      } else {
        it = await PreviousYearInventaryIt.findAll({ where: { location: roomNumber } })
        furniture = await PreviousYearInventaryFurniture.findAll({ where: { location: roomNumber } })
      }

      it_status = await CurrentYearInventaryIt[currentYear].findAll({
        attributes: ["qr_code", "checked"],
        where: { location: roomNumber },
      });
      furniture_status = await CurrentYearInventaryFurniture[currentYear].findAll({
        attributes: ["qr_code", "checked"],
        where: { location: roomNumber },
      });
      it_status = it_status.map(it => it.dataValues)
      furniture_status = furniture_status.map(it => it.dataValues)

      //Форматирование данных по оборудованию
      it = it.map(it => it.dataValues).map(v => {
        //Присвоение статусов проверки текущего года
        it_status.forEach(it_status => {
          if (v.qr_code == it_status.qr_code) {
            v.checked = it_status.checked
          }
        });
        //Изменение значения checked
        switch (v.checked) {
          case 1:
            v.checked = true;
            break;
          case null:
            v.checked = false;
            break;
          default:
            break;
        }
        //Форматирование даты
        Object.keys(v).forEach((element) => {
          if (element.includes("date")) {
            if (v[element] !== null) {
              v[element] = new Date(v[element]).toLocaleString(
                "ru-RU",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "Europe/Moscow",
                }
              );
              v[element] = changeDateType(v[element]);
              v[element] = new Date(v[element]);
            }
          }
        })
        return v;
      })

      //Форматирование данных по мебели
      furniture = furniture.map(furniture => furniture.dataValues).map(v => {
        //Присвоение статусов проверки текущего года
        furniture_status.forEach(furniture_status => {
          if (v.qr_code == furniture_status.qr_code) {
            v.checked = furniture_status.checked
          }
        });
        //Изменение значения checked
        switch (v.checked) {
          case 1:
            v.checked = true;
            break;
          case null:
            v.checked = false;
            break;
          default:
            break;
        }
        //Форматирование даты
        Object.keys(v).forEach((element) => {
          if (element.includes("date")) {
            if (v[element] !== null) {
              v[element] = new Date(v[element]).toLocaleString(
                "ru-RU",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "Europe/Moscow",
                }
              );
              v[element] = changeDateType(v[element]);
              v[element] = new Date(v[element]);
            }
          }
        })
        return v;
      })

      responce.json({
        message: `Объекты найдены`,
        object: { it, furniture },
      });
      
    } catch (error) {
      
    }
  },

  async getLocations(request, responce) {
    try {
      
      const currentYear = new Date().getFullYear()
      let it, furniture, it_status, furniture_status, checked_it = 0, checked_furniture = 0

      //Получение списка помещений
      let locations = await valuesDataIt.findAll({attributes: ['location'], raw : true})
      // locations = locations.map(location => location.location)

      //Проверяется наличие предыдущих инвентаризаций
      const [results_it] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear - 1}_it'`);
      const [results_furniture] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear - 1}_furniture'`);

      //Если ранее инвентаризации не проводились, то данные запрашиваются из основных таблиц
      if (results_it.length == 0 && results_furniture.length == 0) {
        it = await libDataIt.findAll()
        furniture = await libDataFurniture.findAll()
      //Если инвентаризации ранее проводились, то данные запрашиваются из предыдущих инвентаризаций
      } else {
        it = await PreviousYearInventaryIt.findAll()
        furniture = await PreviousYearInventaryFurniture.findAll()
      }

      it_status = await CurrentYearInventaryIt[currentYear].findAll({
        attributes: ["qr_code", "checked"],
      });
      furniture_status = await CurrentYearInventaryFurniture[currentYear].findAll({
        attributes: ["qr_code", "checked"],
      });
      it_status = it_status.map(it => it.dataValues)
      furniture_status = furniture_status.map(it => it.dataValues)

      //Форматирование данных по оборудованию
      it = it.map(it => it.dataValues).map(v => {
        //Присвоение статусов проверки текущего года
        it_status.forEach(it_status => {
          if (v.qr_code == it_status.qr_code) {
            v.checked = it_status.checked
          }
        });
        //Изменение значения checked
        switch (v.checked) {
          case 1:
            v.checked = true;
            break;
          case null:
            v.checked = false;
            break;
          default:
            break;
        }
        //Форматирование даты
        Object.keys(v).forEach((element) => {
          if (element.includes("date")) {
            if (v[element] !== null) {
              v[element] = new Date(v[element]).toLocaleString(
                "ru-RU",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "Europe/Moscow",
                }
              );
              v[element] = changeDateType(v[element]);
              v[element] = new Date(v[element]);
            }
          }
        })
        return v;
      })

      //Форматирование данных по мебели
      furniture = furniture.map(furniture => furniture.dataValues).map(v => {
        //Присвоение статусов проверки текущего года
        furniture_status.forEach(furniture_status => {
          if (v.qr_code == furniture_status.qr_code) {
            v.checked = furniture_status.checked
          }
        });
        //Изменение значения checked
        switch (v.checked) {
          case 1:
            v.checked = true;
            break;
          case null:
            v.checked = false;
            break;
          default:
            break;
        }
        //Форматирование даты
        Object.keys(v).forEach((element) => {
          if (element.includes("date")) {
            if (v[element] !== null) {
              v[element] = new Date(v[element]).toLocaleString(
                "ru-RU",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "Europe/Moscow",
                }
              );
              v[element] = changeDateType(v[element]);
              v[element] = new Date(v[element]);
            }
          }
        })
        return v;
      })

      //Формирование массива объектов инвентаризации по кабинетам
      locations.forEach((location) => {
        location.it = it.filter(it => it.location == location.location)
        location.furniture = furniture.filter(furniture => furniture.location == location.location)
      });

      //Получение количества инвентаризированных объектов
      locations.forEach((location) => {
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