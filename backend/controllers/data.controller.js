import db from "../models/_index.js";
import { getValues } from "./functions/getValues.js";

export const DataController = {
  async getData(request, responce) {
    try {
      let { type, userDivision } = request.body;

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
      } = db.DIVISIONS[`D${userDivision}`];
      let data = {};

      switch (type) {
        case "it":
          data.lib = await itLib.findAll();
          data.columns = await itColumns.findAll();
          data.values = await itValues.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          });
          data.name = "Оборудование";
          break;

        case "furniture":
          data.lib = await furnitureLib.findAll();
          data.columns = await furnitureColumns.findAll();
          data.values = await furnitureValues.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          });
          data.name = "Мебель";
          break;

        case "unmarked":
          data.lib = await unmarkedLib.findAll();
          data.columns = await unmarkedColumns.findAll();
          data.values = await unmarkedValues.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          });
          data.name = "Прочее";
          break;

        default:
          break;
      }

      data.lib = JSON.parse(JSON.stringify(data.lib));
      data.columns = JSON.parse(JSON.stringify(data.columns));
      data.values = JSON.parse(JSON.stringify(data.values));

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach(columnObg => {
            if (columnObg.dbFieldType == "boolean" && columnObg.field == libKey) {
              libObg[libKey] = libObg[libKey] === null ? libObg[libKey] === "null" : libObg[libKey];
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
      const { itLib, furnitureLib, unmarkedLib } = db.DIVISIONS[`D${userDivision}`];
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
      const { itLib, furnitureLib, unmarkedLib } = db.DIVISIONS[`D${userDivision}`];
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
        default:
          break;
      }
      
      for (const key in rowData) {
        if (rowData[key] === "null") {
          rowData[key] = null;
        }
      }

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

  async deleteData(request, responce) {
    try {
      let { type, rowId, userDivision } = request.body;
      const { itLib, furnitureLib, unmarkedLib } = db.DIVISIONS[`D${userDivision}`];
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
      } = db.DIVISIONS[`D${userDivision}`];

      switch (type) {
        case "it":
          for (const obj of data.lib) await itLib.create(obj);
          for (const obj of data.values) await itValues.create(obj);
          for (const obj of data.meta) await itColumns.create(obj);
          break;

        case "furniture":
          for (const obj of data.lib) await furnitureLib.create(obj);
          for (const obj of data.values) await furnitureValues.create(obj);
          for (const obj of data.meta) await furnitureColumns.create(obj);
          break;

        case "unmarked":
          for (const obj of data.lib) await unmarkedLib.create(obj);
          for (const obj of data.values) await unmarkedValues.create(obj);
          for (const obj of data.meta) await unmarkedColumns.create(obj);
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