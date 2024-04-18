import db from "../models/_index.js";
import { QueryTypes } from "sequelize";
import { getValues } from "./functions/getValues.js";

export const InventaryYearsController = {
  async getYears(request, responce) {
    let { userDivision } = request.body;
   
    try {
      const tableObj = await db.DIVISIONS[`D${userDivision}`].sequelize.getQueryInterface().showAllSchemas();

      let tables = tableObj
        .map((table) => Object.values(table)[0])
        .filter((table) => table.includes("_lib"))
        .map((table) => table.replace("_lib", ""));

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

        responce.json({tables, yearsIt, yearsFurniture, yearsUnmarked});

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
        itValues,
        itColumns,
        furnitureValues,
        furnitureColumns,
        unmarkedValues,
        unmarkedColumns,
        sequelize,
      } = db.DIVISIONS[`D${userDivision}`];

      let data = {};

      data.lib = await sequelize.query(
        `SELECT * FROM inv_${year}_${tableName}`,
        { type: QueryTypes.SELECT }
      );

      data.lib = data.lib.map((v) => {
        if (v.is_workplace === null) {
          v.is_workplace = "null";
        }
        if (v.was_deleted === null) {
          v.was_deleted = "null";
        }
        return v;
      });

      switch (tableName) {
        case "it":
          data.columns = await itColumns.findAll();
          data.values = await itValues.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          });
          data.name = "Оборудование";
          break;

        case "furniture":
          data.columns = await furnitureColumns.findAll();
          data.values = await furnitureValues.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          });
          data.name = "Мебель";
          break;

        case "unmarked":
          data.columns = await unmarkedColumns.findAll();
          data.values = await unmarkedValues.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          });
          data.name = "Прочее";
          break;
        default:
          break;
      }

      data.columns = JSON.parse(JSON.stringify(data.columns));
      data.values = JSON.parse(JSON.stringify(data.values));

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
      data.columns = data.columns.filter(
        (col) => col.field != "createdAt" && col.field != "updatedAt"
      );
      data.values = getValues(data.values);

      responce.json(data);
    } catch (error) {
      console.log('_____________________InventaryYearsController_getYearData____________________');
      console.log(error);
      responce.json(error);
    }
  },
};