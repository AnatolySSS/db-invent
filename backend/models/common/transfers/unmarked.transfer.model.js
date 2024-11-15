import { getObj } from "./getObj.js";

export default (sequelize, Sequelize) => {
  return sequelize.define(`transferUnmarked`, getObj(Sequelize), {
    tableName: `unmarked_transfer`,
  });
};
