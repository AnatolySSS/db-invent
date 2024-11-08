import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`logUnmarked`, getObj(Sequelize), {
    tableName: `unmarked_log`,
  });
};
