import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`columnsEmployer`, getObj(Sequelize), {
    tableName: `employers_columns`,
  });
};
