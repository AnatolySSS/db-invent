export default (sequelize, Sequelize) =>
  sequelize.define("employee", {
    employee_id: {
      type: Sequelize.STRING(50),
      unique: true,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    division_id: {
      type: Sequelize.INTEGER,
    },
    login: {
      type: Sequelize.STRING(30),
    },
    mail: {
      type: Sequelize.STRING(50),
    },
    phone: {
      type: Sequelize.STRING,
    },
    dn: {
      type: Sequelize.STRING,
    },
    is_present: {
      type: Sequelize.BOOLEAN,
    },
  });
