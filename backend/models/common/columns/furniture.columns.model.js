import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`columnsDataFurniture`, getObj(Sequelize), {
    tableName: `furniture_columns`,
  });
};
