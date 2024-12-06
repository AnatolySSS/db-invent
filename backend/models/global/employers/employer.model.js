export default (sequelize, Sequelize) => {
  const Employer = sequelize.define("employers", {
    object_sid: {
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
    division: {
      type: Sequelize.STRING,
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
  });

  return Employer;
};
