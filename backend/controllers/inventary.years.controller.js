import db from "../models/_index.js";
// import setConnection from "../config/db-connection.js";
import changeDateType from "../changeDateType.js";
import { QueryTypes } from "sequelize";
import { getValues } from "./functions/getValues.js";

// //подключение в базе данных
// const { connection } = setConnection();

export const InventaryYearsController = {
  async getYears(request, responce) {
    let { userDivision } = request.body;
   
    try {
      const tableObj = await db.DIVISIONS[`D${userDivision}`].sequelize.getQueryInterface().showAllSchemas();

      let yearsIt = tableObj
        .map((table) => Object.values(table)[0])
        .filter((tableName) =>
          tableName.indexOf("inv_") !== -1 &&
          tableName.indexOf("it") !== -1 &&
          tableName.indexOf("furniture") == -1
            ? tableName
            : null
        )
        .map((value) => value.substr(4, 4));

      let yearsFurniture = tableObj
        .map((table) => Object.values(table)[0])
        .filter((tableName) =>
          tableName.indexOf("inv_") !== -1 &&
          tableName.indexOf("furniture") !== -1
            ? tableName
            : null
        )
        .map((value) => value.substr(4, 4));
      
      let yearsUnmarked = tableObj
        .map((table) => Object.values(table)[0])
        .filter((tableName) =>
          tableName.indexOf("inv_") !== -1 &&
          tableName.indexOf("unmarked") !== -1
            ? tableName
            : null
        )
        .map((value) => value.substr(4, 4));

        responce.json({yearsIt, yearsFurniture, yearsUnmarked});

    } catch (error) {
      console.log('_____________________InventaryYearsController_getYears____________________');
      console.log(error);
      responce.json(error);
    }
  },

  async getYearData(request, responce) {
    try {
      let { tableName, year, userDivision } = request.body;
      const {
        itLib,
        itValues,
        itColumns,
        furnitureLib,
        furnitureValues,
        furnitureColumns,
        sequelize,
      } = db.DIVISIONS[`D${userDivision}`];

      let data = {};

      switch (tableName) {
        case "it":
          data.lib = await itLib.findAll();
          data.columns = await itColumns.findAll();
          data.values = await itValues.findAll({
            attributes: ["type", "workplace_type", "serviceable", "location"],
          });
          data.name = "Оборудование";
          break;
        case "furniture":
          data.lib = await furnitureLib.findAll();
          data.columns = await furnitureColumns.findAll();
          data.values = await furnitureValues.findAll({
            attributes: ["type", "serviceable", "location"],
          });
          data.name = "Мебель";
          break;
        default:
          break;
      }

      data.lib = JSON.parse(JSON.stringify(data.lib));
      data.columns = JSON.parse(JSON.stringify(data.columns));
      data.values = JSON.parse(JSON.stringify(data.values));

      data.lib = data.lib.map((v) => {
        if (v.is_workplace === null) {
          v.is_workplace = "null";
        }
        if (v.was_deleted === null) {
          v.was_deleted = "null";
        }
        //Форматирование даты
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

      //Удаление столбцов createdAt и updatedAt
      data.columns = data.columns.filter((col) => (col.field != "createdAt" && col.field != "updatedAt"));

      data.values = getValues(data.values);

      const invData = await sequelize.query(
        `SELECT qr_code, user, scan_date, checked, location FROM inv_${year}_${tableName}`,
        { type: QueryTypes.SELECT }
      );

      let lib = [];
      invData.forEach((element, i) => {
        lib.push({...data.lib.filter(obj => obj.qr_code == element.qr_code)[0], ...element});
      });
      data.lib = [...lib];

      // let tableLibName, tableMetaName, tableValuesName;
      // let data = {};
      // switch (tableName) {
      //   case "it":
      //     tableLibName = "it_lib";
      //     tableMetaName = "it_meta";
      //     tableValuesName = "it_values";
      //     data.name = "Оборудование";
      //     break;
      //   case "furniture":
      //     tableLibName = "furniture_lib";
      //     tableMetaName = "furniture_meta";
      //     tableValuesName = "furniture_values";
      //     data.name = "Мебель";
      //     break;
      //   default:
      //     break;
      // }

      //Получение данных из таблицы инвентаризационной ведомости по году

      

      // connection.query(`SELECT qr_code, user, scan_date, checked, location FROM inv_${year}_${tableName}`,(err, rows, fields) => {
      //   if (err) throw err;
      //   data.lib = rows.map((v) => {
      //     //Соотнесение строк из ведомости по году с общей таблицей
      //     connection.query(`SELECT * FROM ${tableLibName} WHERE qr_code=${v.qr_code}`,(err2, rows2, fields2) => {
      //       if (rows2[0]) {
      //         //Добавление значений из общей таблицы
      //           Object.keys(rows2[0]).map((key, index) => {
      //             if (key != "location") {
      //               v[key] = Object.values(rows2[0])[index]
      //             }
      //           });
      //           //Изменение значения checked
      //           switch (v.checked) {
      //             case 1:
      //               v.checked = true;
      //               break;
      //             case null:
      //               v.checked = false;
      //               break;
      //             default:
      //               break;
      //           }
      //           //Изменение значения is_workplace
      //           switch (v.is_workplace) {
      //             case 1:
      //               v.is_workplace = true;
      //               break;
      //             case 0:
      //               v.is_workplace = false;
      //               break;
      //             case null:
      //               v.is_workplace = "null";
      //               break;
      //             default:
      //               break;
      //           }
      //           //Изменение значения was_deleted
      //           switch (v.was_deleted) {
      //             case 1:
      //               v.was_deleted = true;
      //               break;
      //             case 0:
      //               v.was_deleted = false;
      //               break;
      //             case null:
      //               v.was_deleted = "null";
      //               break;
      //             default:
      //               break;
      //           }
      //           //Форматирование даты
      //           Object.keys(v).forEach((element) => {
      //             if (element.includes("date")) {
      //               if (v[element] !== null) {
      //                 v[element] = new Date(v[element]).toLocaleString(
      //                   "ru-RU",
      //                   {
      //                     day: "2-digit",
      //                     month: "2-digit",
      //                     year: "numeric",
      //                     timeZone: "Europe/Moscow",
      //                   }
      //                 );
      //                 v[element] = changeDateType(v[element]);
      //                 v[element] = new Date(v[element]);
      //               }
      //             }
      //           });
      //         }
      //       })
      //     return v;
      //   });
        
      //   //Получение столбцов
      //   connection.query(`SELECT * FROM ${tableMetaName}`,(err, rows, fields) => {
      //       data.columns = Object.values(JSON.parse(JSON.stringify(rows)));
      //       data.columns = data.columns.map((v) => {
      //         if (v.showFilterMenu == 1) {
      //           v.showFilterMenu = true;
      //         } else {
      //           v.showFilterMenu = false;
      //         }
      //         return v;
      //       });
            // data.columns.splice(1, 0, {
            //   id: 21,
            //   field: "checked",
            //   header: "Проверено",
            //   width: "4rem",
            //   showFilterMenu: false,
            //   dataType: "boolean",
            //   dbFieldType: "boolean",
            //   editingType: "checkbox",
            // });
            // data.columns.splice(2, 0, {
            //   id: 22,
            //   field: "user",
            //   header: "Оператор",
            //   width: "18rem",
            //   showFilterMenu: true,
            //   dataType: "text",
            //   dbFieldType: "text",
            //   editingType: "input",
            // });
            // data.columns.splice(3, 0, {
            //   id: 23,
            //   field: "scan_date",
            //   header: "Дата сканирования",
            //   width: "12rem",
            //   showFilterMenu: true,
            //   dataType: "date",
            //   dbFieldType: "date",
            //   editingType: "date",
            // });

            // //Удаление столбцов createdAt и updatedAt
            // data.columns = data.columns.filter((col) => (col.field != "createdAt" && col.field != "updatedAt"));

      //       let workplace_type = "";
      //       if (tableName == "it") {
      //         workplace_type = ", workplace_type ";
      //       }
      //       //Получение значений для списков
      //       connection.query(`SELECT type, serviceable, location ${workplace_type}FROM ${tableValuesName}`,(err, rows, fields) => {
      //           data.values = Object.values(JSON.parse(JSON.stringify(rows)));
      //           data.values = data.values.map((v) => {
      //             if (v.showFilterMenu == 1) {
      //               v.showFilterMenu = true;
      //             } else {
      //               v.showFilterMenu = false;
      //             }
      //             return v;
      //           });
      //           responce.json(data);
      //         }
      //       );
      //     }
      //   );
      // });
      responce.json(data);
    } catch (error) {
      console.log('_____________________InventaryYearsController_getYearData____________________');
      console.log(error);
      responce.json(error);
    }
  },
};