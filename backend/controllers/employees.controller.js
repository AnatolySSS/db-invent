import { Op, Sequelize } from "sequelize";
import { Client } from "ldapts";
import db from "../models/_index.js";
import { getValues } from "./functions/getValues.js";

let config = {
  url: "ldap://10.205.0.11:389",
  bindDN: "cn=gitlab,cn=Users,dc=sfurf,dc=office",
  password: "Pdfi#1khgg",
};

export const EmployeesController = {
  async downloadEmployees() {
    console.log(`start EmployeesController ${new Date()}`);

    const client = new Client({
      url: config.url,
      timeout: 9999,
      connectTimeout: 9999,
    });
    try {
      const { employee } = db.GLOBAL;

      await client.bind(config.bindDN, config.password);
      console.log("Успешно подключились к LDAP-серверу");

      const opts = {
        sizeLimit: 1000,
        scope: "sub",
        filter: "(&(objectClass=person)(title=*))",
        explicitBufferAttributes: ["objectSid"],
        attributes: ["cn", "telephoneNumber", "mail", "mailNickname", "department", "title", "objectSid"],
      };

      let { searchEntries } = await client.search("dc=sfurf,dc=office", opts);

      //Изменяем пустые массивы на пустые строки
      searchEntries = searchEntries
        .filter((entry) => entry.dn.includes("OU=User Accounts"))
        .map((entry) => {
          let obj = { ...entry };
          for (const key in obj) {
            obj[key].length === 0 ? (obj[key] = "") : (obj[key] = obj[key]);
          }

          if (obj.dn.includes("Саратов")) {
            obj.division_id = 2;
          } else if (obj.dn.includes("Санкт-Петербург")) {
            obj.division_id = 3;
          } else if (obj.dn.includes("Нижний Новгород")) {
            obj.division_id = 4;
          } else {
            obj.division_id = 1;
          }

          obj.is_present = true;

          //Переименовываем наименования полей
          obj["employee_id"] = obj["objectSid"];
          obj["full_name"] = obj["cn"];
          obj["phone"] = obj["telephoneNumber"];
          obj["login"] = obj["mailNickname"];
          delete obj["objectSid"];
          delete obj["cn"];
          delete obj["telephoneNumber"];
          delete obj["mailNickname"];

          return obj;
        });

      //Перекодировка значения objectSid (изначально приходит в бинарном формате)
      searchEntries = searchEntries.map((entry) => {
        return {
          ...entry,
          employee_id: sidToString(entry.employee_id),
        };
      });
      let data = { lib: [], newEmployers: [], deletedEmployers: [], message: [], status: false };
      data.lib = JSON.parse(JSON.stringify(searchEntries));

      let currentEmployees = await employee.findAll({
        attributes: ["employee_id"],
        raw: true,
      });
      currentEmployees = currentEmployees.map((obj) => obj.employee_id);
      let newEmployees = data.lib.map((obj) => obj.employee_id);

      //Добавление только новых значений
      for (const obj of searchEntries) {
        if (!currentEmployees.includes(obj.employee_id)) {
          await employee.create(obj);
          console.log(obj.full_name + " добавлен");
          data.newEmployers.push(obj);
          data.message.push("Новые пользователи добавлены");
          data.status = true;
        }
      }
      //Отмечаем пользователей, которых уже нет в системе
      for (const currentEmployee of currentEmployees) {
        if (!newEmployees.includes(currentEmployee)) {
          await employee.update({ is_present: false }, { where: { employee_id: currentEmployee } });
          console.log(currentEmployee + " is gone");
          data.deletedEmployers.push(currentEmployee);
          data.message.push("Старые пользователи удалены");
          data.status = true;
        }
      }

      // responce.json(data);
    } catch (error) {
      console.log("__________EmployeesController__downloadEmployees___________");
      console.log(error);
      // responce.json(error);
    } finally {
      await client.unbind();
      console.log("Соединение закрыто");
    }
  },

  async getEmployees(request, responce) {
    try {
      let { userAuth } = request.body;
      const { employee, employeeCols, vals } = db.GLOBAL;
      let data = {};

      // const whereObj = userAuth.access_type === "limited" ? { division_id: userAuth.division_id } : {};
      const whereObj = { division_id: { [Op.in]: userAuth.access_type } };

      data.lib = await employee.findAll({
        where: whereObj,
        attributes: {
          include: [[Sequelize.col("val.city_name"), "city_name"]],
          exclude: ["createdAt"],
        },
        include: [
          {
            model: vals,
            attributes: [],
          },
        ],
        raw: true,
      });

      data.columns = await employeeCols.findAll({ raw: true });
      data.values = await vals.findAll({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        raw: true,
      });

      data.values = getValues(data.values);

      //Изменение null на "null" у значений типа boolean
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach((columnObg) => {
            if (columnObg.dbFieldType == "boolean" && columnObg.field == libKey) {
              switch (libObg[libKey]) {
                case null:
                  libObg[libKey] = "null";
                  break;
                case 1:
                  libObg[libKey] = "true";
                  break;
                case 0:
                  libObg[libKey] = "false";
                  break;
                default:
                  break;
              }
            }
          });
          libObg[libKey] === null ? (libObg[libKey] = "") : libObg[libKey];
        }
        return libObg;
      });

      responce.json(data);
    } catch (error) {
      console.log("__________EmployeesController__getEmployees___________");
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

  const LESA2 = `${BESA2.substr(6, 2)}${BESA2.substr(4, 2)}${BESA2.substr(2, 2)}${BESA2.substr(0, 2)}`;
  const LESA3 = `${BESA3.substr(6, 2)}${BESA3.substr(4, 2)}${BESA3.substr(2, 2)}${BESA3.substr(0, 2)}`;
  const LESA4 = `${BESA4.substr(6, 2)}${BESA4.substr(4, 2)}${BESA4.substr(2, 2)}${BESA4.substr(0, 2)}`;
  const LESA5 = `${BESA5.substr(6, 2)}${BESA5.substr(4, 2)}${BESA5.substr(2, 2)}${BESA5.substr(0, 2)}`;
  const LERID = `${BERID.substr(6, 2)}${BERID.substr(4, 2)}${BERID.substr(2, 2)}${BERID.substr(0, 2)}`;

  const LE_SID_HEX = `${LESA1}-${LESA2}-${LESA3}-${LESA4}-${LESA5}-${LERID}`;

  const ADDR = LE_SID_HEX.split("-");

  const SID = "S-1-" + ADDR.map((x) => parseInt(x, 16)).join("-");
  return SID;
};
