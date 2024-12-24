import { Sequelize } from "sequelize";

import division from "./global/division.model.js";
import user from "./global/user.model.js";
import employee from "./global/employee.model.js";

import lib from "./global/lib.model.js";
import log from "./global/log.model.js";
import trans from "./global/trans.model.js";
import vals from "./global/val.model.js";
import inv from "./global/inv.model.js";
import { Columns } from "./global/columns.model.js";

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
    idle: 10000,
  },
  logging: false,
});

db.GLOBAL.division = division(sequelize.GLOBAL, Sequelize);
db.GLOBAL.employee = employee(sequelize.GLOBAL, Sequelize);
db.GLOBAL.user = user(sequelize.GLOBAL, Sequelize);

db.GLOBAL.lib = lib(sequelize.GLOBAL, Sequelize);
db.GLOBAL.log = log(sequelize.GLOBAL, Sequelize);
db.GLOBAL.trans = trans(sequelize.GLOBAL, Sequelize);
db.GLOBAL.vals = vals(sequelize.GLOBAL, Sequelize);
db.GLOBAL.inv = inv(sequelize.GLOBAL, Sequelize);

for (const key in Columns) {
  db.GLOBAL[`${key}Cols`] = Columns[key](sequelize.GLOBAL, Sequelize);
}

//division > employee
db.GLOBAL.division.hasMany(db.GLOBAL.employee, {
  foreignKey: "division_id",
});
db.GLOBAL.employee.belongsTo(db.GLOBAL.division, {
  foreignKey: "division_id",
});

//division > lib
db.GLOBAL.division.hasMany(db.GLOBAL.lib, {
  foreignKey: "division_id",
});
db.GLOBAL.lib.belongsTo(db.GLOBAL.division, {
  foreignKey: "division_id",
});

//division > inv
db.GLOBAL.division.hasMany(db.GLOBAL.inv, {
  foreignKey: "division_id",
});
db.GLOBAL.inv.belongsTo(db.GLOBAL.division, {
  foreignKey: "division_id",
});

//employee - user
db.GLOBAL.employee.hasOne(db.GLOBAL.user, {
  foreignKey: "user_id",
});
db.GLOBAL.user.belongsTo(db.GLOBAL.employee, {
  foreignKey: "user_id",
});

//employee > lib
db.GLOBAL.employee.hasMany(db.GLOBAL.lib, {
  as: "employee",
  foreignKey: "employee_id",
});
db.GLOBAL.lib.belongsTo(db.GLOBAL.employee, {
  as: "employee",
  foreignKey: "employee_id",
});

//employee > lib
db.GLOBAL.employee.hasMany(db.GLOBAL.lib, {
  as: "financially_responsible_person",
  foreignKey: "financially_responsible_person_id",
});
db.GLOBAL.lib.belongsTo(db.GLOBAL.employee, {
  as: "financially_responsible_person",
  foreignKey: "financially_responsible_person_id",
});

//employee > inv
db.GLOBAL.employee.hasMany(db.GLOBAL.inv, {
  as: "employee_inv",
  foreignKey: "employee_id",
});
db.GLOBAL.inv.belongsTo(db.GLOBAL.employee, {
  as: "employee_inv",
  foreignKey: "employee_id",
});

//employee > inv
db.GLOBAL.employee.hasMany(db.GLOBAL.inv, {
  as: "financially_responsible_person_inv",
  foreignKey: "financially_responsible_person_id",
});
db.GLOBAL.inv.belongsTo(db.GLOBAL.employee, {
  as: "financially_responsible_person_inv",
  foreignKey: "financially_responsible_person_id",
});

//employee > inv
db.GLOBAL.employee.hasMany(db.GLOBAL.inv, {
  as: "inv_user_inv",
  foreignKey: "inv_user_id",
});
db.GLOBAL.inv.belongsTo(db.GLOBAL.employee, {
  as: "inv_user_inv",
  foreignKey: "inv_user_id",
});

//employee > log
db.GLOBAL.employee.hasMany(db.GLOBAL.log, {
  foreignKey: "changedUserId",
});
db.GLOBAL.log.belongsTo(db.GLOBAL.employee, {
  foreignKey: "changedUserId",
});

//employee > trans
db.GLOBAL.employee.hasMany(db.GLOBAL.trans, {
  foreignKey: "employee_id",
});
db.GLOBAL.trans.belongsTo(db.GLOBAL.employee, {
  foreignKey: "employee_id",
});

//lib > log
db.GLOBAL.lib.hasMany(db.GLOBAL.log, {
  foreignKey: "itemId",
});
db.GLOBAL.log.belongsTo(db.GLOBAL.lib, {
  foreignKey: "itemId",
});
//lib > trans
db.GLOBAL.lib.hasMany(db.GLOBAL.trans, {
  foreignKey: "itemId",
});
db.GLOBAL.trans.belongsTo(db.GLOBAL.lib, {
  foreignKey: "itemId",
});

for (const DIVISION in config.DIVISIONS) {
  sequelize.DIVISIONS[DIVISION] = new Sequelize(config.DIVISIONS[DIVISION].DB, config.DIVISIONS[DIVISION].USER, config.DIVISIONS[DIVISION].PASSWORD, {
    host: config.DIVISIONS[DIVISION].HOST,
    dialect: config.DIVISIONS[DIVISION].dialect,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  });
}

db.DIVISIONS.D0 = getDb_D0(sequelize.DIVISIONS.D0, Sequelize);
db.DIVISIONS.D1 = getDb_D1(sequelize.DIVISIONS.D1, Sequelize);
db.DIVISIONS.D2 = getDb_D2(sequelize.DIVISIONS.D2, Sequelize);
db.DIVISIONS.D3 = getDb_D3(sequelize.DIVISIONS.D3, Sequelize);

//синхрованизация всех моделей с базами данных
for (const key in db.GLOBAL) {
  db.GLOBAL[key].sync();
}

export default db;
