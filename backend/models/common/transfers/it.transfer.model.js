import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`transferIt`, getObj(Sequelize), {
    tableName: `it_transfer`,
  });
};
