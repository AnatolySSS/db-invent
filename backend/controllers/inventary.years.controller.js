import Sequelize, { Op } from "sequelize";
import db from "../models/_index.js";
import { getValues } from "./functions/getValues.js";

export const InventaryYearsController = {
  async beginInventory(request, responce) {
    try {
      let { type, userDivision } = request.body;
      const { lib, inv } = db.GLOBAL;

      let currentInvData = await inv.findOne({
        where: { class_type: type, division_id: userDivision, year: new Date().getFullYear() },
        raw: true,
      });

      if (currentInvData === null) {
        let data = (
          await lib.findAll({
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
            where: { class_type: type, division_id: userDivision },
          })
        ).map((record) => record.get({ plain: true }));

        for (const obj of data) {
          obj.checked = false;
          obj.year = new Date().getFullYear();
          await inv.create(obj);
        }
        responce.json({
          message: `Инвентаризация инициирована`,
        });
      } else {
        responce.json({
          message: `Инвентаризация в текущем году уже была инициирована`,
        });
      }
    } catch (error) {
      console.log("_____________________InventoryController_beginInventory____________________");
      console.log(error);
      responce.json(error);
    }
  },

  async getYears(request, responce) {
    try {
      let { userDivision } = request.body;
      const { lib, inv } = db.GLOBAL;

      let libData = await lib.findAll({ attributes: ["class_type"], where: { division_id: userDivision }, raw: true });
      let yearsData = await inv.findAll({
        attributes: ["class_type", "year"],
        where: { division_id: userDivision },
        raw: true,
      });

      let tables = [...new Set(libData.map((obj) => obj.class_type))];

      let yearsIt = [...new Set(yearsData.filter((obj) => obj.class_type === "it").map((obj) => obj.year))];
      let yearsFurniture = [
        ...new Set(yearsData.filter((obj) => obj.class_type === "furniture").map((obj) => obj.year)),
      ];
      let yearsUnmarked = [...new Set(yearsData.filter((obj) => obj.class_type === "unmarked").map((obj) => obj.year))];
      let yearsAssets = [...new Set(yearsData.filter((obj) => obj.class_type === "assets").map((obj) => obj.year))];

      responce.json({ tables, yearsIt, yearsFurniture, yearsUnmarked, yearsAssets });
    } catch (error) {
      console.log("_____________________InventaryYearsController_getYears____________________");
      console.log(error);
      responce.json(error);
    }
  },

  async getYearData(request, responce) {
    try {
      let { type, year, userAuth } = request.body;
      const { inv, vals, itCols, furnitureCols, unmarkedCols, assetsCols, employee } = db.GLOBAL;

      let data = {};

      switch (type) {
        case "it":
          data.columns = await itCols.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "division_1", "division_2", "division_3", "division_4"],
            },
            where: { [`division_${userAuth.division_id}`]: true },
            raw: true,
          });
          data.name = "Оборудование";
          break;

        case "furniture":
          data.columns = await furnitureCols.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "division_1", "division_2", "division_3", "division_4"],
            },
            where: { [`division_${userAuth.division_id}`]: true },
            raw: true,
          });
          data.name = "Мебель";
          break;

        case "unmarked":
          data.columns = await unmarkedCols.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "division_1", "division_2", "division_3", "division_4"],
            },
            where: { [`division_${userAuth.division_id}`]: true },
            raw: true,
          });
          data.name = "Прочее";
          break;

        case "assets":
          data.columns = await assetsCols.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "division_1", "division_2", "division_3", "division_4"],
            },
            where: { [`division_${userAuth.division_id}`]: true },
            raw: true,
          });
          data.name = "Основные средства";
          break;
        default:
          break;
      }

      data.columns.splice(1, 0, {
        id: data.columns.length + 1,
        field: "checked",
        header: "Проверено",
        width: "4rem",
        showFilterMenu: false,
        editingType: "checkbox",
        dbFieldType: "boolean",
        dataType: "boolean",
      });
      data.columns.splice(2, 0, {
        id: data.columns.length + 1,
        field: "inv_user",
        header: "Оператор",
        width: "18rem",
        showFilterMenu: false,
        editingType: "dropdown",
        dbFieldType: "text",
        dataType: "text",
      });
      data.columns.splice(3, 0, {
        id: data.columns.length + 1,
        field: "scan_date",
        header: "Дата сканирования",
        width: "12rem",
        showFilterMenu: true,
        editingType: "date",
        dbFieldType: "date",
        dataType: "date",
      });
      data.columns.splice(4, 0, {
        id: data.columns.length + 1,
        field: "invent_note",
        header: "Комментарий",
        width: "12rem",
        showFilterMenu: true,
        editingType: "date",
        dbFieldType: "date",
        dataType: "date",
      });

      //Удаление столбцов createdAt и updatedAt
      // data.columns = data.columns.filter((col) => col.field != "createdAt" && col.field != "updatedAt");
      data.values = await vals.findAll({
        attributes: [
          [`locations_${userAuth.division_id}`, "location"],
          [`${type}_type`, "type"],
          "workplace_type",
          "serviceable",
          "office",
          "measurement",
        ],
        raw: true,
      });
      data.values = getValues(data.values);

      // const whereObj =
      //   userAuth.access_type === "limited"
      //     ? { year: year, division_id: userAuth.division_id, class_type: type }
      //     : { year: year, class_type: type };
      const whereObj = { year: year, division_id: { [Op.in]: userAuth.access_type }, class_type: type };

      data.lib = await inv.findAll({
        attributes: {
          include: [
            [Sequelize.col("employee_inv.full_name"), "employee"],
            [Sequelize.col("financially_responsible_person_inv.full_name"), "financially_responsible_person"],
            [Sequelize.col("inv_user_inv.full_name"), "inv_user"],
            [Sequelize.col("val.city_name"), "city_name"],
          ],
          exclude: ["createdAt"],
        },
        where: whereObj,
        include: [
          {
            model: employee,
            as: "employee_inv",
            attributes: [],
          },
          {
            model: employee,
            as: "financially_responsible_person_inv",
            attributes: [],
          },
          {
            model: employee,
            as: "inv_user_inv",
            attributes: [],
          },
          {
            model: vals,
            attributes: [],
          },
        ],
        raw: true,
      });

      data.lib = JSON.parse(JSON.stringify(data.lib));

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach((columnObg) => {
            if (columnObg.dbFieldType == "boolean" && columnObg.field == libKey) {
              switch (libObg[libKey]) {
                case null:
                  libObg[libKey] = "null";
                  break;
                case 1:
                  libObg[libKey] = "true";
                  break;
                case 0:
                  libObg[libKey] = "false";
                  break;
                default:
                  break;
              }
            }
          });
        }
        return libObg;
      });

      responce.json(data);
    } catch (error) {
      console.log("_____________________InventaryYearsController_getYearData____________________");
      console.log(error);
      responce.json(error);
    }
  },

  async requestCurrentInventory(request, responce) {
    try {
      let { type, userDivision } = request.body;
      const { inv } = db.GLOBAL;

      let currentInvData = await inv.findOne({
        where: { class_type: type, division_id: userDivision, year: new Date().getFullYear() },
        raw: true,
      });

      responce.json({
        hasCurrentInventory: currentInvData !== null ? true : false,
      });
    } catch (error) {
      console.log("_____________________InventoryController_requestCurrentInventory____________________");
      console.log(error);
      responce.json(error);
    }
  },
};
