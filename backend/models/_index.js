import { Sequelize } from "sequelize";
import userModel from "./global/users/user.model.js";
import userValuesModel from "./global/users/user.values.model.js";
import userColumnsModel from "./common/columns/user.columns.model.js";
import employerModel from "./global/employers/employer.model.js";
import employerColumnsModel from "./common/columns/employer.columns.model.js";
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

sequelize.GLOBAL = new Sequelize(
  config.GLOBAL.DB,
  config.GLOBAL.USER,
  config.GLOBAL.PASSWORD,
  {
    host: config.GLOBAL.HOST,
    dialect: config.GLOBAL.dialect,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);

db.GLOBAL.employer = employerModel(sequelize.GLOBAL, Sequelize);
db.GLOBAL.user = userModel(sequelize.GLOBAL, Sequelize);

db.GLOBAL.employer.hasOne(db.GLOBAL.user, {
  foreignKey: "object_sid",
  // onDelete: "CASCADE",
});

db.GLOBAL.user.belongsTo(db.GLOBAL.employer, {
  foreignKey: "object_sid",
  // onDelete: "CASCADE",
});

// db.GLOBAL.employer.sync();
// db.GLOBAL.user.sync();

db.GLOBAL.employerColumns = employerColumnsModel(sequelize.GLOBAL, Sequelize);
// db.GLOBAL.employerColumns.sync();

db.GLOBAL.userValues = userValuesModel(sequelize.GLOBAL, Sequelize);
// db.GLOBAL.userValues.sync();
db.GLOBAL.userColumns = userColumnsModel(sequelize.GLOBAL, Sequelize);
// db.GLOBAL.userColumns.sync();

for (const DIVISION in config.DIVISIONS) {
  sequelize.DIVISIONS[DIVISION] = new Sequelize(
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
      logging: false,
    }
  );
}

db.DIVISIONS.D0 = getDb_D0(sequelize.DIVISIONS.D0, Sequelize);
db.DIVISIONS.D1 = getDb_D1(sequelize.DIVISIONS.D1, Sequelize);
db.DIVISIONS.D2 = getDb_D2(sequelize.DIVISIONS.D2, Sequelize);
db.DIVISIONS.D3 = getDb_D3(sequelize.DIVISIONS.D3, Sequelize);

//синхрованизация всех моделей с базами данных
for (const key in db.GLOBAL) {
  db.GLOBAL[key].sync();
}

for (const division in db.DIVISIONS) {
  for (const model in db.DIVISIONS[division]) {
    if (model !== "sequelize" && model !== "Sequelize") {
      db.DIVISIONS[division][model].sync();
    }
  }
}

export default db;
