import { Client } from "ldapts";
import db from "../models/_index.js";

let config = {
  url: "ldap://10.205.0.11:389",
  bindDN: "cn=gitlab,cn=Users,dc=sfurf,dc=office",
  password: "Pdfi#1khgg",
};

export const EmployersController = {
  async downloadEmpoyers(request, responce) {
    const client = new Client({
      url: config.url,
    });
    try {
      const { employer, employerColumns } = db.GLOBAL;

      await client.bind(config.bindDN, config.password);
      console.log("Успешно подключились к LDAP-серверу");

      const opts = {
        sizeLimit: 1000,
        scope: "sub",
        filter: "(&(objectClass=person)(title=*))",
        explicitBufferAttributes: ["objectSid"],
        attributes: [
          "cn",
          "telephoneNumber",
          "mail",
          "mailNickname",
          "department",
          "title",
          "objectSid",
        ],
      };

      let { searchEntries } = await client.search("dc=sfurf,dc=office", opts);

      //Изменяем пустые массивы на пустые строки
      searchEntries = searchEntries.map((entry) => {
        let obj = { ...entry };
        for (const key in obj)
          obj[key].length === 0 ? (obj[key] = "") : (obj[key] = obj[key]);
        return obj;
      });

      //Перекодировка значения objectSid (изначально приходит в бинарном формате)
      searchEntries = searchEntries.map((entry) => {
        return {
          ...entry,
          objectSid: sidToString(entry.objectSid),
        };
      });
      let data = {};
      data.lib = JSON.parse(JSON.stringify(searchEntries));
      data.columns = await employerColumns.findAll();
      data.name = "Сотрудники";

      //Удаление всех значений
      employer.destroy({
        where: {}, // условие для удаления всех записей
        truncate: true, // необязательно, но рекомендуется для быстрого удаления всех записей
      });
      //Добавление новых значений
      for (const obj of searchEntries) await employer.create(obj);

      responce.json(data);
    } catch (error) {
      console.log("__________EmployersController__downloadEmpoyers___________");
      console.log(error);
      responce.json(error);
    } finally {
      await client.unbind();
      console.log("Соединение закрыто");
    }
  },

  async getEmployers(request, responce) {
    try {
      const { employer, employerColumns } = db.GLOBAL;
      let data = {};

      data.lib = await employer.findAll({
        // where: { division: userDivision },
        attributes: {
          exclude: ["createdAt"],
        },
      });
      data.columns = await employerColumns.findAll();
      data.name = "Сотрудники";

      data.lib = JSON.parse(JSON.stringify(data.lib));
      data.columns = JSON.parse(JSON.stringify(data.columns));

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach((columnObg) => {
            if (
              columnObg.dbFieldType == "boolean" &&
              columnObg.field == libKey
            ) {
              libObg[libKey] =
                libObg[libKey] === null
                  ? libObg[libKey] === "null"
                  : libObg[libKey];
            }
          });
        }
        return libObg;
      });

      responce.json(data);
    } catch (error) {
      console.log("__________EmployersController__getEmployers___________");
      console.log(error);
      responce.json(error);
    }
  },
};

const sidToString = (base64) => {
  //Конвертируем строку base64 в Buffer, а потом его преобразуем в HEX
  const buffer = Buffer.from(base64, "base64");
  const array = buffer.toString("hex"); //010500000000000515000000e967bb98d6b7d7bf82051e6c28060000
  const G = array.toString().match(/.{1,2}/g);

  /* G array
    [
      '01', '05', '00', '00', '00',
      '00', '00', '05', '15', '00',
      '00', '00', 'e9', '67', 'bb',
      '98', 'd6', 'b7', 'd7', 'bf',
      '82', '05', '1e', '6c', '28',
      '06', '00', '00'
    ]
    */

  const BESA2 = `${G[8]}${G[9]}${G[10]}${G[11]}`;
  const BESA3 = `${G[12]}${G[13]}${G[14]}${G[15]}`;
  const BESA4 = `${G[16]}${G[17]}${G[18]}${G[19]}`;
  const BESA5 = `${G[20]}${G[21]}${G[22]}${G[23]}`;
  const BERID = `${G[24]}${G[25]}${G[26]}${G[27]}`;
  const LESA1 = `${G[2]}${G[3]}${G[4]}${G[5]}${G[6]}${G[7]}`;

  const LESA2 = `${BESA2.substr(6, 2)}${BESA2.substr(4, 2)}${BESA2.substr(
    2,
    2
  )}${BESA2.substr(0, 2)}`;
  const LESA3 = `${BESA3.substr(6, 2)}${BESA3.substr(4, 2)}${BESA3.substr(
    2,
    2
  )}${BESA3.substr(0, 2)}`;
  const LESA4 = `${BESA4.substr(6, 2)}${BESA4.substr(4, 2)}${BESA4.substr(
    2,
    2
  )}${BESA4.substr(0, 2)}`;
  const LESA5 = `${BESA5.substr(6, 2)}${BESA5.substr(4, 2)}${BESA5.substr(
    2,
    2
  )}${BESA5.substr(0, 2)}`;
  const LERID = `${BERID.substr(6, 2)}${BERID.substr(4, 2)}${BERID.substr(
    2,
    2
  )}${BERID.substr(0, 2)}`;

  const LE_SID_HEX = `${LESA1}-${LESA2}-${LESA3}-${LESA4}-${LESA5}-${LERID}`;

  const ADDR = LE_SID_HEX.split("-");

  const SID = "S-1-" + ADDR.map((x) => parseInt(x, 16)).join("-");
  return SID;
};