import itLibModel from "./it.lib.model.js";
import itValuesModel from "./it.values.model.js";
import itColumnsModel from "./it.columns.model.js";
import furnitureLibModel from "./furniture.lib.model.js";
import furnitureValuesModel from "./furniture.values.model.js";
import furnitureColumnsModel from "./furniture.columns.model.js";
import unmarkedLibModel from "./unmarked.lib.model.js";
import unmarkedValuesModel from "./unmarked.values.model.js";
import unmarkedColumnsModel from "./unmarked.columns.model.js";
import yearInventaryIt from "./year.inventary.it.model.js";
import yearInventaryFurnitureModel from "./year.inventary.furniture.model.js";
import yearInventaryUnmarkedModel from "./year.inventary.unmarked.model.js";

const getDb = (sequelize, Sequelize) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

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

    modelObj.unmarkedLib = unmarkedLibModel(sequelize, Sequelize);
    modelObj.unmarkedLib.sync();
    modelObj.unmarkedValues = unmarkedValuesModel(sequelize, Sequelize);
    modelObj.unmarkedValues.sync();
    modelObj.unmarkedColumns = unmarkedColumnsModel(sequelize, Sequelize);
    modelObj.unmarkedColumns.sync();

    modelObj.currentYearInventaryIt = yearInventaryIt(sequelize, Sequelize, currentYear);
    modelObj.currentYearInventaryFurniture = yearInventaryFurnitureModel(sequelize, Sequelize, currentYear);
    modelObj.currentYearInventaryUnmarked = yearInventaryUnmarkedModel(sequelize, Sequelize, currentYear);
    modelObj.previousYearInventaryIt = yearInventaryIt(sequelize, Sequelize, previousYear);
    modelObj.previousYearInventaryFurniture = yearInventaryFurnitureModel(sequelize, Sequelize, previousYear);

    modelObj.sequelize = sequelize;
    modelObj.Sequelize = Sequelize;
    
    return modelObj;
}
export default getDb;