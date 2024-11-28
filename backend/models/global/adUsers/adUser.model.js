export default (sequelize, Sequelize) => {
  const adUser = sequelize.define(
    "adUsers",
    {
      cn: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      dn: {
        type: Sequelize.STRING,
      },
      mail: {
        type: Sequelize.STRING,
      },
      mailNickname: {
        type: Sequelize.STRING,
      },
      objectSid: {
        type: Sequelize.STRING,
      },
      telephoneNumber: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: `ad_users`,
    }
  );

  return adUser;
};
