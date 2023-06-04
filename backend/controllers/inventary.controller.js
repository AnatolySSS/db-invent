import db from "../models/index.js";
const CurrentYearInventaryIt = db.currentYearInventaryIt
const CurrentYearInventaryFurniture = db.currentYearInventaryFurniture
import setConnection from "../config/db-connection.js";

//подключение в базе данных
const { connection } = setConnection();

export const InventaryController = {
  async hasCurrentYearInventary(request, responce) {
    try {
      const currentYear = new Date().getFullYear()
      const [resultsIt] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_it'`);
      const [resultsFurniture] = await db.sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_furniture'`);
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
        messageFurniture: messageFurniture
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
  }
};
