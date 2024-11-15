import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`transferAssets`, getObj(Sequelize), {
    tableName: `assets_transfer`,
  });
};
