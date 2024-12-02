import db from "../../models/_index.js";

const { adUser } = db.GLOBAL;

let adUsers = await adUser.findAll({
  // where: { division: userDivision },
  attributes: {
    exclude: ["createdAt"],
  },
});

adUsers = JSON.parse(JSON.stringify(adUsers));

export const changeUserSidToName = async (lib) => {
  for (const item of lib) {
    for (const key in item) {
      if (Array.isArray(item[key])) {
        changeUserSidToName(item[key]);
      } else {
        for (const adUser of adUsers) {
          if (item[key] === adUser.objectSid) {
            item[key] = adUser.cn;
          }
        }
      }
    }
  }
  return lib;
};
