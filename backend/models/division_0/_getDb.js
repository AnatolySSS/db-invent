import itLibModel from "./it.lib.model.js";
import itValuesModel from "./it.values.model.js";
import itColumnsModel from "./it.columns.model.js";
import furnitureLibModel from "./furniture.lib.model.js";
import furnitureValuesModel from "./furniture.values.model.js";
import furnitureColumnsModel from "./furniture.columns.model.js";
import yearInventaryIt from "./year.inventary.it.model.js";
import yearInventaryFurniture from "./year.inventary.furniture.model.js";

const getDb = (sequelize, Sequelize) => {
    const currentYear = new Date().getFullYear();

    let modelObj = {}

    modelObj.itLib = itLibModel(sequelize, Sequelize);
    modelObj.itLib.sync();
    modelObj.itValues = itValuesModel(sequelize, Sequelize);
    modelObj.itValues.sync();
    modelObj.itColumns = itColumnsModel(sequelize, Sequelize);
    modelObj.itColumns.sync();

    modelObj.furnitureLib = furnitureLibModel(sequelize, Sequelize);
    modelObj.furnitureLib.sync();
    modelObj.furnitureValues = furnitureValuesModel(sequelize, Sequelize);
    modelObj.furnitureValues.sync();
    modelObj.furnitureColumns = furnitureColumnsModel(sequelize, Sequelize);
    modelObj.furnitureColumns.sync();

    modelObj.currentYearInventaryIt = yearInventaryIt(sequelize, Sequelize, currentYear);
    modelObj.currentYearInventaryFurniture = yearInventaryFurniture(sequelize, Sequelize, currentYear);

    modelObj.sequelize = sequelize;
    modelObj.Sequelize = Sequelize;
    
    return modelObj;
}
export default getDb;