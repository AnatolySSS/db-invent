import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import yearInventaryModel from "./YearInventary.model.js";
import libDataItModel from "./libDataIt.model.js";
import valuesDataItModel from "./valuesDataIt.model.js";
import libDataFurnitureModel from "./libDataFurniture.model.js";
import setConnection from "../config/db-config.js";

const { config } = setConnection()

console.log(config);

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
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
const previousYear = currentYear - 1

db.currentYearInventaryIt = {}
db.currentYearInventaryFurniture = {}

db.currentYearInventaryIt[currentYear] = yearInventaryModel(sequelize, Sequelize, "it", currentYear)
db.currentYearInventaryFurniture[currentYear] = yearInventaryModel(sequelize, Sequelize, "furniture", currentYear)
db.previousYearInventaryIt = yearInventaryModel(sequelize, Sequelize, "it", previousYear)
db.previousYearInventaryFurniture = yearInventaryModel(sequelize, Sequelize, "furniture", previousYear)

export default db