import yearInventaryFurniture from "./year.inventary.furniture.model.js";
import yearInventaryIt from "./year.inventary.it.model.js";
import yearInventaryUnmarked from "./year.inventary.unmarked.model.js";

const getDb = (sequelize, Sequelize) => {
  const currentYear = new Date().getFullYear();

  let modelObj = {};

  modelObj.currentYearInventaryIt = yearInventaryIt(sequelize, Sequelize, currentYear);
  modelObj.currentYearInventaryFurniture = yearInventaryFurniture(sequelize, Sequelize, currentYear);
  modelObj.currentYearInventaryUnmarked = yearInventaryUnmarked(sequelize, Sequelize, currentYear);

  modelObj.sequelize = sequelize;
  modelObj.Sequelize = Sequelize;

  return modelObj;
};
export default getDb;
