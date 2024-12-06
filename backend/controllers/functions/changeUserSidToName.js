import db from "../../models/_index.js";

const { employer } = db.GLOBAL;

let employers = await employer.findAll({
  // where: { division: userDivision },
  attributes: {
    exclude: ["createdAt"],
  },
});

employers = JSON.parse(JSON.stringify(employers));

export const changeUserSidToName = async (lib) => {
  for (const item of lib) {
    for (const key in item) {
      if (Array.isArray(item[key])) {
        changeUserSidToName(item[key]);
      } else {
        for (const employer of employers) {
          if (item[key] === employer.object_sid) {
            item[key] = employer.full_name;
          }
        }
      }
    }
  }
  return lib;
};
