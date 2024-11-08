import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`logIt`, getObj(Sequelize), {
    tableName: `it_log`,
  });
};
