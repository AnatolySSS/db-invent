import yearInventaryItModel from "./year.inventary.it.model.js";
import yearInventaryFurnitureModel from "./year.inventary.furniture.model.js";
import yearInventaryUnmarkedModel from "./year.inventary.unmarked.model.js";

const getDb = (sequelize, Sequelize) => {
  const currentYear = new Date().getFullYear();

  let modelObj = {};

  modelObj.currentYearInventaryIt = yearInventaryItModel(
    sequelize,
    Sequelize,
    currentYear
  );
  modelObj.currentYearInventaryFurniture = yearInventaryFurnitureModel(
    sequelize,
    Sequelize,
    currentYear
  );
  modelObj.currentYearInventaryUnmarked = yearInventaryUnmarkedModel(
    sequelize,
    Sequelize,
    currentYear
  );

  modelObj.sequelize = sequelize;
  modelObj.Sequelize = Sequelize;

  return modelObj;
};
export default getDb;
