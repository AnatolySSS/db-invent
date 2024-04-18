import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import { getDbConfig } from "../config/getDbConfig.js";
import getDb_D0 from "./division_0/_getDb.js";
import getDb_D1 from "./division_1/_getDb.js";
import getDb_D2 from "./division_2/_getDb.js";
import getDb_D3 from "./division_3/_getDb.js";

const { config } = getDbConfig();

let sequelize = {
  GLOBAL: null,
  DIVISIONS: {},
};

const db = {
  GLOBAL: {},
  DIVISIONS: {},
};

sequelize.GLOBAL = new Sequelize(config.GLOBAL.DB, config.GLOBAL.USER, config.GLOBAL.PASSWORD, {
  host: config.GLOBAL.HOST,
  dialect: config.GLOBAL.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

db.GLOBAL.user = userModel(sequelize.GLOBAL, Sequelize);
db.GLOBAL.user.sync();

for (const DIVISION in config.DIVISIONS) {
  sequelize.DIVISIONS[DIVISION] = 
    new Sequelize(
      config.DIVISIONS[DIVISION].DB,
      config.DIVISIONS[DIVISION].USER,
      config.DIVISIONS[DIVISION].PASSWORD,
      {
        host: config.DIVISIONS[DIVISION].HOST,
        dialect: config.DIVISIONS[DIVISION].dialect,
        operatorsAliases: 0,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      }
    )
};

db.DIVISIONS.D0 = getDb_D0(sequelize.DIVISIONS.D0, Sequelize);
db.DIVISIONS.D1 = getDb_D1(sequelize.DIVISIONS.D1, Sequelize);
db.DIVISIONS.D2 = getDb_D2(sequelize.DIVISIONS.D2, Sequelize);
db.DIVISIONS.D3 = getDb_D3(sequelize.DIVISIONS.D3, Sequelize);

export default db;