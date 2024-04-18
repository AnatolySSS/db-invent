import itLibModel from "./it.lib.model.js";
import itValuesModel from "./it.values.model.js";
import itColumnsModel from "./it.columns.model.js";
import yearInventaryModel from "./year.inventary.model.js";

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

    modelObj.currentYearInventaryIt = yearInventaryModel(sequelize, Sequelize, "it", currentYear);
    modelObj.previousYearInventaryIt = yearInventaryModel(sequelize, Sequelize, "it", previousYear);

    modelObj.sequelize = sequelize;
    modelObj.Sequelize = Sequelize;
    
    return modelObj;
}
export default getDb;