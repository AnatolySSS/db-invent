import { Sequelize } from "sequelize";
import changeDateType from "./functions/changeDateType.js";
import db from "../models/_index.js";
import formatDate from "./functions/formatDate.js";
import { getValues } from "./functions/getValues.js";

export const DataController = {
  async getData(request, responce) {
    try {
      let { type, userAuth } = request.body;
      const { division, lib, log, trans, vals, itCols, furnitureCols, unmarkedCols, assetsCols, employee } = db.GLOBAL;
      console.log(userAuth);

      let data = {};
      let columns;

      switch (type) {
        case "it":
          columns = itCols;
          break;
        case "furniture":
          columns = furnitureCols;
          break;
        case "unmarked":
          columns = unmarkedCols;
          break;
        case "assets":
          columns = assetsCols;
          break;
        default:
          break;
      }
      const whereObj = userAuth.access_type === "limited" ? { division_id: userAuth.division, class_type: type } : { class_type: type };

      data.lib = await lib.findAll({
        attributes: {
          include: [
            [Sequelize.col("employee.full_name"), "employee"],
            [Sequelize.col("financially_responsible_person.full_name"), "financially_responsible_person"],
            [Sequelize.col("division.name"), "city_name"],
          ],
          exclude: ["createdAt"],
        },
        where: whereObj,
        include: [
          {
            model: employee,
            as: "employee",
            attributes: [],
          },
          {
            model: employee,
            as: "financially_responsible_person",
            attributes: [],
          },
          {
            model: division,
            attributes: [],
          },
        ],
        raw: true,
      });

      data.columns = await columns.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "division_0", "division_1", "division_2", "division_3"],
        },
        where: { [`division_${userAuth.division}`]: true },
        raw: true,
      });

      data.values = await vals.findAll({
        attributes: [[`locations_${userAuth.division}`, "location"], [`${type}_type`, "type"], "workplace_type", "serviceable", "office", "measurement"],
        raw: true,
      });

      data.values = getValues(data.values);

      let employees = await employee.findAll({
        attributes: ["employee_id", "full_name"],
      });

      //Получение логов
      for (const lib of data.lib) {
        let logs = await log.findAll({
          attributes: {
            include: [[Sequelize.col("employee.full_name"), "changedEmployeeName"]],
            exclude: ["createdAt"],
          },
          where: { itemId: lib.id },
          include: [
            {
              model: employee,
              attributes: [],
            },
          ],
          raw: true,
        });
        //Изменение наименование столбца "changedFiled"
        lib.logs = logs
          .map((log) => {
            for (const column of data.columns) {
              if (log.changedFiled === column.field) {
                log.changedFiled = column.header;
              }
            }
            for (const employee of employees) {
              if (log.oldValue === employee.employee_id) {
                log.oldValue = employee.full_name;
              }
              if (log.newValue === employee.employee_id) {
                log.newValue = employee.full_name;
              }
            }
            return log;
          })
          //Сортировка по дате (сначала последние изменения)
          .sort((a, b) => {
            const dateA = new Date(a.changedDateTime);
            const dateB = new Date(b.changedDateTime);

            return dateB - dateA;
          });

        lib.trans = await trans.findAll({
          attributes: {
            include: [[Sequelize.col("employee.full_name"), "employee_name"]],
            exclude: ["createdAt"],
          },
          where: { itemId: lib.id },
          include: [
            {
              model: employee,
              attributes: [],
            },
          ],
          raw: true,
        });
      }

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
      console.log("__________DataController__getData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async addData(request, responce) {
    label: try {
      let { rowData } = request.body;

      const { lib, log } = db.GLOBAL;
      let data = {
        qr_code: false,
        inventary_number: false,
      };

      for (const key in rowData) {
        if (rowData[key] === "null") {
          rowData[key] = null;
        }
        if (rowData[key] === "true") {
          rowData[key] = true;
        }
        if (rowData[key] === "false") {
          rowData[key] = false;
        }
      }

      // if (type != "unmarked") {
      //   let qr_code = await table.findOne({
      //     where: { qr_code: rowData.qr_code },
      //     raw: true,
      //   });

      //   if (qr_code != null) {
      //     data.qr_code = true;
      //     responce.json(data);
      //     break label;
      //   }

      //   let inventary_number = await table.findOne({
      //     where: { inventary_number: rowData.inventary_number },
      //     raw: true,
      //   });

      //   if (inventary_number != null) {
      //     data.inventary_number = true;
      //     responce.json(data);
      //     break label;
      //   }
      // }

      const id = (await lib.create(rowData)).dataValues.id;

      //Запись логов при обновлении значений checkedValues (цикл for...of асинхронный)
      for (const key in rowData) {
        if (!nonCheckedValues.includes(key)) {
          rowData[key] = rowData[key] === true ? 1 : rowData[key];
          rowData[key] = rowData[key] === false ? 0 : rowData[key];
          if (rowData[key] !== null && rowData[key] !== 0 && rowData[key] !== "") {
            let logRow = {
              itemId: id,
              changedDateTime: new Date(rowData.changedDateTime),
              changedUserId: rowData.changedUserId,
              changedFiled: key,
              oldValue: "Создание новой записи",
              newValue: rowData[key],
            };
            await log.create(logRow);
          }
        }
      }

      responce.json(data);
    } catch (error) {
      console.log("__________DataController__addData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async updateData(request, responce) {
    try {
      let { rowData } = request.body;
      console.log("rowData");
      console.log(rowData);

      const { lib, log } = db.GLOBAL;

      for (const key in rowData) {
        if (rowData[key] === "null") {
          rowData[key] = null;
        }
        if (rowData[key] === "true") {
          rowData[key] = true;
        }
        if (rowData[key] === "false") {
          rowData[key] = false;
        }
      }

      //Проверка на обновление значений
      const originalData = await lib.findOne({
        attributes: { exclude: ["createdAt"] },
        where: { id: rowData.id },
        raw: true,
      });

      //Запись логов при обновлении значений checkedValues (цикл for...of асинхронный)
      for (const key in rowData) {
        if (!nonCheckedValues.includes(key)) {
          rowData[key] = rowData[key] === true ? 1 : rowData[key];
          rowData[key] = rowData[key] === false ? 0 : rowData[key];
          if (originalData[key] instanceof Date) {
            originalData[key] = changeDateType(formatDate(originalData[key]));
          }
          if (rowData[key] !== originalData[key]) {
            let logRow = {
              itemId: rowData.id,
              changedDateTime: new Date(rowData.changedDateTime),
              changedUserId: rowData.changedUserId,
              changedFiled: key,
              oldValue: originalData[key],
              newValue: rowData[key],
            };

            await log.create(logRow);
          }
        }
      }

      //Обновление данных
      let _id = rowData.id;
      delete rowData.id;
      await lib.update(rowData, { where: { id: _id } });

      responce.json({});
    } catch (error) {
      console.log("__________DataController__updateData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async transferItem(request, responce) {
    try {
      let { items, transferData } = request.body;

      const { lib, log, trans } = db.GLOBAL;

      for (const item of items) {
        //Проверка на обновление значений
        const originalData = await lib.findOne({
          where: { id: item.id },
          raw: true,
        });

        //Обновление данных в основной таблице
        await lib.update(
          {
            employee_id: transferData.employee_id,
            employee_setup_date: transferData.date,
          },
          { where: { id: item.id } }
        );

        //Добавление данных в таблицу перемещений
        transferData.itemId = item.id;
        await trans.create(transferData);

        //Запись логов о смене пользователя
        let logRow = {
          itemId: item.id,
          changedDateTime: new Date(),
          changedUserId: transferData.changedUserId,
          changedFiled: "employee_id",
          oldValue: originalData.employee_id,
          newValue: transferData.employee_id,
        };

        await log.create(logRow);
      }

      responce.json({});
    } catch (error) {
      console.log("__________DataController__transferItem___________");
      console.log(error);
      responce.json(error);
    }
  },

  async deleteData(request, responce) {
    try {
      let { rowId } = request.body;
      const { lib } = db.GLOBAL;

      await lib.destroy({ where: { id: rowId } });

      responce.json({ message: `Row ${rowId} was deleted from Table` });
    } catch (error) {
      console.log(error);
      responce.json(error);
    }
  },

  async uploadData(request, responce) {
    try {
      let { data } = request.body;

      const { lib } = db.GLOBAL;

      for (const obj of data.lib) await lib.create(obj);

      responce.json({
        message: `Данные загружены в количестве ${data.length} единиц`,
      });
    } catch (error) {
      console.log(error);
      responce.json(error);
    }
  },
};

const nonCheckedValues = [
  "id",
  "createdAt",
  "updatedAt",
  "changedDateTime",
  "changedUserId",
  "logs",
  "trans",
  "qr_code",
  "class_type",
  "city_name",
  "employee",
  "financially_responsible_person",
  "division_id",
];
