import changeDateType from "./functions/changeDateType.js";
import db from "../models/_index.js";
import formatDate from "./functions/formatDate.js";
import { getValues } from "./functions/getValues.js";

export const DataController = {
  async getData(request, responce) {
    try {
      let { type, userDivision } = request.body;

      const {
        itLib,
        itLog,
        itValues,
        itColumns,
        itTransfer,
        furnitureLib,
        furnitureLog,
        furnitureValues,
        furnitureColumns,
        furnitureTransfer,
        unmarkedLib,
        unmarkedLog,
        unmarkedValues,
        unmarkedColumns,
        unmarkedTransfer,
        assetsLib,
        assetsLog,
        assetsValues,
        assetsColumns,
        assetsTransfer,
      } = db.DIVISIONS[`D${userDivision}`];
      let data = {};
      let libTable, columnsTable, valuesTable, logTable, transferTable;

      switch (type) {
        case "it":
          libTable = itLib;
          columnsTable = itColumns;
          valuesTable = itValues;
          logTable = itLog;
          transferTable = itTransfer;
          data.name = "Оборудование";
          break;

        case "furniture":
          libTable = furnitureLib;
          columnsTable = furnitureColumns;
          valuesTable = furnitureValues;
          logTable = furnitureLog;
          transferTable = furnitureTransfer;
          data.name = "Мебель";
          break;

        case "unmarked":
          libTable = unmarkedLib;
          columnsTable = unmarkedColumns;
          valuesTable = unmarkedValues;
          logTable = unmarkedLog;
          transferTable = unmarkedTransfer;
          data.name = "Прочее";
          break;

        case "assets":
          libTable = assetsLib;
          columnsTable = assetsColumns;
          valuesTable = assetsValues;
          logTable = assetsLog;
          transferTable = assetsTransfer;
          data.name = "Основные средства";
          break;

        default:
          break;
      }

      data.lib = await libTable.findAll({ raw: true });
      data.columns = await columnsTable.findAll();
      data.values = await valuesTable.findAll({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      });

      // data.lib = JSON.parse(JSON.stringify(data.lib));
      data.columns = JSON.parse(JSON.stringify(data.columns));
      data.values = JSON.parse(JSON.stringify(data.values));

      //Получение логов
      for (const lib of data.lib) {
        let logs = await logTable.findAll({
          where: { itemId: lib.id },
          raw: true,
        });
        //Изменение наименование столбца "changedFiled"
        let logData = logs
          .map((log) => {
            for (const column of data.columns) {
              if (log.changedFiled === column.field) {
                log.changedFiled = column.header;
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
        lib.logs = logData;

        let transfersData = await transferTable.findAll({
          where: { itemId: lib.id },
          raw: true,
        });
        lib.transfers = transfersData;
      }

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach((columnObg) => {
            if (
              columnObg.dbFieldType == "boolean" &&
              columnObg.field == libKey
            ) {
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

      data.values = getValues(data.values);
      responce.json(data);
    } catch (error) {
      console.log("__________DataController__getData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async addData(request, responce) {
    label: try {
      let { type, rowData, userDivision } = request.body;
      const { itLib, furnitureLib, unmarkedLib, assetsLib } =
        db.DIVISIONS[`D${userDivision}`];
      let table;
      let data = {
        qr_code: false,
        inventary_number: false,
      };

      switch (type) {
        case "it":
          table = itLib;
          break;
        case "furniture":
          table = furnitureLib;
          break;
        case "unmarked":
          table = unmarkedLib;
          break;
        case "assets":
          table = assetsLib;
          break;
        default:
          break;
      }

      if (type != "unmarked") {
        let qr_code = await table.findOne({
          where: { qr_code: rowData.qr_code },
          raw: true,
        });

        if (qr_code != null) {
          data.qr_code = true;
          responce.json(data);
          break label;
        }

        let inventary_number = await table.findOne({
          where: { inventary_number: rowData.inventary_number },
          raw: true,
        });

        if (inventary_number != null) {
          data.inventary_number = true;
          responce.json(data);
          break label;
        }
      }

      await table.create(rowData);
      responce.json(data);
    } catch (error) {
      console.log("__________DataController__addData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async updateData(request, responce) {
    try {
      let { type, rowData, userDivision } = request.body;
      const {
        itLib,
        itLog,
        furnitureLib,
        furnitureLog,
        unmarkedLib,
        unmarkedLog,
        assetsLib,
        assetsLog,
      } = db.DIVISIONS[`D${userDivision}`];
      let table, tableLog;

      switch (type) {
        case "it":
          table = itLib;
          tableLog = itLog;
          break;
        case "furniture":
          table = furnitureLib;
          tableLog = furnitureLog;
          break;
        case "unmarked":
          table = unmarkedLib;
          tableLog = unmarkedLog;
          break;
        case "assets":
          table = assetsLib;
          tableLog = assetsLog;
          break;
        default:
          break;
      }

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
      const originalData = await table.findOne({
        where: { id: rowData.id },
        raw: true,
      });

      const nonCheckedValues = [
        "createdAt",
        "updatedAt",
        "changedDateTime",
        "userName",
        "logs",
      ];

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
              changedEmployeeName: rowData.userName,
              changedFiled: key,
              oldValue: originalData[key],
              newValue: rowData[key],
            };
            await tableLog.create(logRow);
          }
        }
      }

      //Обновление данных
      let _id = rowData.id;
      delete rowData.id;
      await table.update(rowData, { where: { id: _id } });

      responce.json({});
    } catch (error) {
      console.log("__________DataController__updateData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async transferItem(request, responce) {
    try {
      let { type, items, transferData, userDivision } = request.body;
      const {
        itLib,
        itLog,
        itTransfer,
        furnitureLib,
        furnitureLog,
        furnitureTransfer,
        unmarkedLib,
        unmarkedLog,
        unmarkedTransfer,
        assetsLib,
        assetsLog,
        assetsTransfer,
      } = db.DIVISIONS[`D${userDivision}`];
      let table, tableLog, tableTransfer;

      switch (type) {
        case "it":
          table = itLib;
          tableLog = itLog;
          tableTransfer = itTransfer;
          break;
        case "furniture":
          table = furnitureLib;
          tableLog = furnitureLog;
          tableTransfer = furnitureTransfer;
          break;
        case "unmarked":
          table = unmarkedLib;
          tableLog = unmarkedLog;
          tableTransfer = unmarkedTransfer;
          break;
        case "assets":
          table = assetsLib;
          tableLog = assetsLog;
          tableTransfer = assetsTransfer;
          break;
        default:
          break;
      }

      for (const item of items) {
        //Проверка на обновление значений
        const originalData = await table.findOne({
          where: { id: item.id },
          raw: true,
        });

        //Обновление данных в основной таблице
        await table.update(
          { owner: transferData.name, last_setup_date: transferData.date },
          { where: { id: item.id } }
        );

        //Добавление данных в таблицу перемещений
        transferData.itemId = item.id;
        await tableTransfer.create(transferData);

        //Запись логов о смене пользователя
        let logRow = {
          itemId: item.id,
          changedDateTime: new Date(),
          changedEmployeeName: transferData.userName,
          changedFiled: "owner",
          oldValue: originalData.owner,
          newValue: transferData.name,
        };
        console.log(logRow);

        await tableLog.create(logRow);
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
      let { type, rowId, userDivision } = request.body;
      const { itLib, furnitureLib, unmarkedLib, assetsLib } =
        db.DIVISIONS[`D${userDivision}`];
      let table;

      switch (type) {
        case "it":
          table = itLib;
          break;
        case "furniture":
          table = furnitureLib;
          break;
        case "unmarked":
          table = unmarkedLib;
          break;
        case "assets":
          table = assetsLib;
          break;
        default:
          break;
      }

      await table.destroy({ where: { id: rowId } });
      responce.json({ message: `Row ${rowId} was deleted from Table ${type}` });
    } catch (error) {
      console.log(error);
      responce.json(error);
    }
  },

  async uploadData(request, responce) {
    try {
      let { type, data, userDivision } = request.body;
      const {
        itLib,
        itValues,
        itColumns,
        furnitureLib,
        furnitureValues,
        furnitureColumns,
        unmarkedLib,
        unmarkedValues,
        unmarkedColumns,
        assetsLib,
        assetsValues,
        assetsColumns,
      } = db.DIVISIONS[`D${userDivision}`];

      switch (type) {
        case "it":
          for (const obj of data.lib) await itLib.create(obj);
          for (const obj of data.values) await itValues.create(obj);
          for (const obj of data.columns) await itColumns.create(obj);
          break;

        case "furniture":
          for (const obj of data.lib) await furnitureLib.create(obj);
          for (const obj of data.values) await furnitureValues.create(obj);
          for (const obj of data.columns) await furnitureColumns.create(obj);
          break;

        case "unmarked":
          for (const obj of data.lib) await unmarkedLib.create(obj);
          for (const obj of data.values) await unmarkedValues.create(obj);
          for (const obj of data.columns) await unmarkedColumns.create(obj);
          break;

        case "assets":
          for (const obj of data.lib) await assetsLib.create(obj);
          for (const obj of data.values) await assetsValues.create(obj);
          for (const obj of data.columns) await assetsColumns.create(obj);
          break;

        default:
          break;
      }
      responce.json(data);
    } catch (error) {
      console.log(error);
      responce.json(error);
    }
  },
};
