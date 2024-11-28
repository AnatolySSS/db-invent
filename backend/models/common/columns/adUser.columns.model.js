import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`adColumnsUser`, getObj(Sequelize), {
    tableName: `ad_users_columns`,
  });
};
