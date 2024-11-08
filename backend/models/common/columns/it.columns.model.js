import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`columnsDataIt`, getObj(Sequelize), {
    tableName: `it_columns`,
  });
};
