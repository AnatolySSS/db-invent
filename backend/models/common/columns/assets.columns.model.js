import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`columnsDataAssets`, getObj(Sequelize), {
    tableName: `assets_columns`,
  });
};
