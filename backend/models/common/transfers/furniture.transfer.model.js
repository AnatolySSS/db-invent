import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`transferFurniture`, getObj(Sequelize), {
    tableName: `furniture_transfer`,
  });
};
