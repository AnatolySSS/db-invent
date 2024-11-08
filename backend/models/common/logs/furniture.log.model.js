import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`logFurniture`, getObj(Sequelize), {
    tableName: `furniture_log`,
  });
};
