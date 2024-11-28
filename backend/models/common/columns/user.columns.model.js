import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`columnsUser`, getObj(Sequelize), {
    tableName: `users_columns`,
  });
};
