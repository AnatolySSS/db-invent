import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import currentYearInventaryModel from "./currentYearInventary.model.js";
import libDataItModel from "./libDataIt.model.js";
import valuesDataItModel from "./valuesDataIt.model.js";
import libDataFurnitureModel from "./libDataFurniture.model.js";
import setConnection from "../config/db-config.js";

const { config } = setConnection()

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize)
db.user.sync()
db.libDataIt = libDataItModel(sequelize, Sequelize)
db.libDataIt.sync()
db.valuesDataIt = valuesDataItModel(sequelize, Sequelize)
db.valuesDataIt.sync()
db.libDataFurniture = libDataFurnitureModel(sequelize, Sequelize)
db.libDataFurniture.sync()

const currentYear = new Date().getFullYear()

db.currentYearInventaryIt = {}
db.currentYearInventaryFurniture = {}
db.currentYearInventaryIt[currentYear] = currentYearInventaryModel(sequelize, Sequelize, "it", currentYear)
db.currentYearInventaryFurniture[currentYear] = currentYearInventaryModel(sequelize, Sequelize, "furniture", currentYear)

export default db