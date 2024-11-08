import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`logAssets`, getObj(Sequelize), {
    tableName: `assets_log`,
  });
};
