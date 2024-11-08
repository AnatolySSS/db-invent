import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`columnsDataUnmarked`, getObj(Sequelize), {
    tableName: `unmarked_columns`,
  });
};
