import db from "../models/index.js";
import setConnection from "../config/db-connection.js";
import changeDateType from "../changeDateType.js";

//подключение в базе данных
const { connection } = setConnection();

export const InventaryWebController = {
  async getYears(request, responce) {
   
    try {
      db.sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
        let yearsIt = tableObj
                        .map((table) => Object.values(table)[0])
                        .filter((tableName) => (tableName.indexOf("inv_") !== -1 && tableName.indexOf("it") !== -1 && tableName.indexOf("furniture") == -1) ? tableName : null)
                        .map((value) => value.substr(4, 4))
        let yearsFurniture = tableObj
                        .map((table) => Object.values(table)[0])
                        .filter((tableName) => (tableName.indexOf("inv_") !== -1 && tableName.indexOf("furniture") !== -1) ? tableName : null)
                        .map((value) => value.substr(4, 4))
        responce.json({yearsIt, yearsFurniture})
      })
      .catch((err) => {
          console.log('showAllSchemas ERROR',err);
      })
    } catch (error) {
      console.log(error);
      responce.json(error);
    }
  },

  async getYearData(request, responce) {
    db.sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
      console.log('// Tables in database','==========================');
      let yearsIt = tableObj
                      .map((table) => Object.values(table)[0])
                      .filter((tableName) => (tableName.indexOf("inv_") !== -1 && tableName.indexOf("it") !== -1 && tableName.indexOf("furniture") == -1) ? tableName : null)
      let yearsFurniture = tableObj
                      .map((table) => Object.values(table)[0])
                      .filter((tableName) => (tableName.indexOf("inv_") !== -1 && tableName.indexOf("furniture") !== -1) ? tableName : null)
      console.log({yearsIt, yearsFurniture});
    })
    .catch((err) => {
        console.log('showAllSchemas ERROR',err);
    })
    try {
      let { tableName, year } = request.body;
      let tableLibName, tableMetaName, tableValuesName;
      let data = {};
      switch (tableName) {
        case "it":
          tableLibName = "it_lib";
          tableMetaName = "it_meta";
          tableValuesName = "it_values";
          data.name = "Оборудование";
          break;
        case "furniture":
          tableLibName = "furniture_lib";
          tableMetaName = "furniture_meta";
          tableValuesName = "furniture_values";
          data.name = "Мебель";
          break;
        default:
          break;
      }

      connection.query(`SELECT * FROM ${tableLibName}`, (err, rows, fields) => {
        if (err) throw err;
        data.lib = Object.values(JSON.parse(JSON.stringify(rows)));
        //Преобразование TINYINT в BOOLEAN
        
        data.lib = data.lib.map((v) => {
          connection.query(`SELECT user, scan_date, checked, location FROM inv_${year}_${tableName} WHERE qr_code=${v.qr_code}` , (err, rows, fields) => {
            // console.log(rows)
            if (err) throw err;
            
            if (rows[0]) {
              v.user = rows[0].user
              v.scan_date = rows[0].scan_date
              v.location = rows[0].location
              switch (rows[0].checked) {
                case 1:
                  v.checked = true;
                  break;
                case null:
                  v.checked = false;
                  break;
                default:
                  break;
              }
            } else {
              v.checked = false
            }
            
          })
          switch (v.is_workplace) {
            case 1:
              v.is_workplace = true;
              break;
            case 0:
              v.is_workplace = false;
              break;
            case null:
              v.is_workplace = "null";
              break;
            default:
              break;
          }
          switch (v.was_deleted) {
            case 1:
              v.was_deleted = true;
              break;
            case 0:
              v.was_deleted = false;
              break;
            case null:
              v.was_deleted = "null";
              break;
            default:
              break;
          }

          Object.keys(v).forEach((element) => {
            if (element.includes("date")) {
              if (v[element] !== null) {
                v[element] = new Date(v[element]).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "Europe/Moscow",
                });
                v[element] = changeDateType(v[element]);
                v[element] = new Date(v[element]);
              }
            }
          });
          return v;
        });
        connection.query(
          `SELECT * FROM ${tableMetaName}`,
          (err, rows, fields) => {
            data.columns = Object.values(JSON.parse(JSON.stringify(rows)));
            data.columns = data.columns.map((v) => {
              if (v.showFilterMenu == 1) {
                v.showFilterMenu = true;
              } else {
                v.showFilterMenu = false;
              }
              return v;
            });
            data.columns.splice(1, 0, {
              id: 21,
              field: "checked",
              header: "Проверено",
              width: "4rem",
              showFilterMenu: false,
              dataType: "boolean",
              dbFieldType: "boolean",
              editingType: "checkbox",
            });
            data.columns.splice(2, 0, {
              id: 22,
              field: "user",
              header: "Оператор",
              width: "18rem",
              showFilterMenu: true,
              dataType: "text",
              dbFieldType: "text",
              editingType: "input",
            });
            data.columns.splice(3, 0, {
              id: 23,
              field: "scan_date",
              header: "Дата сканирования",
              width: "12rem",
              showFilterMenu: true,
              dataType: "date",
              dbFieldType: "date",
              editingType: "date",
            });
            // data.columns.push({
            //   id: 21,
            //   field: "checked",
            //   header: "Проверено",
            //   width: "4rem",
            //   showFilterMenu: false,
            //   dataType: "boolean",
            //   dbFieldType: "boolean",
            //   editingType: "checkbox",
            // })
            let workplace_type = "";
            if (tableName == "it") {
              workplace_type = ", workplace_type ";
            }
            connection.query(
              `SELECT type, serviceable, location ${workplace_type}FROM ${tableValuesName}`,
              (err, rows, fields) => {
                data.values = Object.values(JSON.parse(JSON.stringify(rows)));
                data.values = data.values.map((v) => {
                  if (v.showFilterMenu == 1) {
                    v.showFilterMenu = true;
                  } else {
                    v.showFilterMenu = false;
                  }
                  return v;
                });
                responce.json(data);
              }
            );
          }
        );
      });
    } catch (error) {
      responce.json(error);
    }
  },
};