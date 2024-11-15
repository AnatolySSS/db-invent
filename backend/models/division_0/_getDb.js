import itLibModel from "./it.lib.model.js";
import itLogModel from "../common/logs/it.log.model.js";
import itValuesModel from "./it.values.model.js";
import itColumnsModel from "../common/columns/it.columns.model.js";
import itTransferModel from "../common/transfers/it.transfer.model.js";

import furnitureLibModel from "./furniture.lib.model.js";
import furnitureLogModel from "../common/logs/furniture.log.model.js";
import furnitureValuesModel from "./furniture.values.model.js";
import furnitureColumnsModel from "../common/columns/furniture.columns.model.js";
import furnitureTransferModel from "../common/transfers/furniture.transfer.model.js";

import yearInventaryIt from "./year.inventary.it.model.js";
import yearInventaryFurniture from "./year.inventary.furniture.model.js";

const getDb = (sequelize, Sequelize) => {
  const currentYear = new Date().getFullYear();

  let modelObj = {};

  modelObj.itLib = itLibModel(sequelize, Sequelize);
  modelObj.itLib.sync();
  modelObj.itLog = itLogModel(sequelize, Sequelize);
  modelObj.itLog.sync();
  modelObj.itValues = itValuesModel(sequelize, Sequelize);
  modelObj.itValues.sync();
  modelObj.itColumns = itColumnsModel(sequelize, Sequelize);
  modelObj.itColumns.sync();
  modelObj.itTransfer = itTransferModel(sequelize, Sequelize);
  modelObj.itTransfer.sync();

  modelObj.furnitureLib = furnitureLibModel(sequelize, Sequelize);
  modelObj.furnitureLib.sync();
  modelObj.furnitureLog = furnitureLogModel(sequelize, Sequelize);
  modelObj.furnitureLog.sync();
  modelObj.furnitureValues = furnitureValuesModel(sequelize, Sequelize);
  modelObj.furnitureValues.sync();
  modelObj.furnitureColumns = furnitureColumnsModel(sequelize, Sequelize);
  modelObj.furnitureColumns.sync();
  modelObj.furnitureTransfer = furnitureTransferModel(sequelize, Sequelize);
  modelObj.furnitureTransfer.sync();

  modelObj.currentYearInventaryIt = yearInventaryIt(
    sequelize,
    Sequelize,
    currentYear
  );
  modelObj.currentYearInventaryFurniture = yearInventaryFurniture(
    sequelize,
    Sequelize,
    currentYear
  );

  modelObj.sequelize = sequelize;
  modelObj.Sequelize = Sequelize;

  return modelObj;
};
export default getDb;
