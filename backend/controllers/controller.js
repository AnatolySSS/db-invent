import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import setConnection from "../config/db-connection.js";
import changeDateType from "../changeDateType.js";
import { createTable, insertData, updateData } from "../db-manage.js";
import db from "../models/index.js";
const User = db.user
import authConfig from "../config/auth.config.js";

//подключение в базе данных
const { connection } = setConnection();

export const DataController = {

  getData(request, responce) {
    try {
      let { type } = request.body;
      let tableLibName, tableMetaName, tableValuesName;
      let data = {};
      switch (type) {
        case "it":
          tableLibName = "it_lib";
          tableMetaName = "it_meta";
          tableValuesName = "it_values";
          data.name = "IT оборудование";
          break;
        case "furniture":
          tableLibName = "furniture_lib";
          tableMetaName = "furniture_meta";
          tableValuesName = "furniture_values";
          data.name = "Мебель";
          break;
        default:
          break;
      }

      connection.query(`SELECT * FROM ${tableLibName}`, (err, rows, fields) => {
        if (err) throw err;
        data.lib = Object.values(JSON.parse(JSON.stringify(rows)));
        //Преобразование TINYINT в BOOLEAN
        data.lib = data.lib.map((v) => {
          switch (v.is_workplace) {
            case 1:
              v.is_workplace = true;
              break;
            case 0:
              v.is_workplace = false;
              break;
            case null:
              v.is_workplace = "null";
              break;
            default:
              break;
          }
          switch (v.was_deleted) {
            case 1:
              v.was_deleted = true;
              break;
            case 0:
              v.was_deleted = false;
              break;
            case null:
              v.was_deleted = "null";
              break;
            default:
              break;
          }

          Object.keys(v).forEach((element) => {
            if (element.includes("date")) {
              if (v[element] !== null) {
                v[element] = new Date(v[element]).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "Europe/Moscow",
                });
                v[element] = changeDateType(v[element]);
                v[element] = new Date(v[element]);
              }
            }
          });
          return v;
        });
        connection.query(
          `SELECT * FROM ${tableMetaName}`,
          (err, rows, fields) => {
            data.columns = Object.values(JSON.parse(JSON.stringify(rows)));
            data.columns = data.columns.map((v) => {
              if (v.showFilterMenu == 1) {
                v.showFilterMenu = true;
              } else {
                v.showFilterMenu = false;
              }
              return v;
            });
            let workplace_type = "";
            if (type == "it") {
              workplace_type = ", workplace_type ";
            }
            connection.query(
              `SELECT type, serviceable, location ${workplace_type}FROM ${tableValuesName}`,
              (err, rows, fields) => {
                data.values = Object.values(JSON.parse(JSON.stringify(rows)));
                data.values = data.values.map((v) => {
                  if (v.showFilterMenu == 1) {
                    v.showFilterMenu = true;
                  } else {
                    v.showFilterMenu = false;
                  }
                  return v;
                });
                responce.json(data);
              }
            );
          }
        );
      });
    } catch (error) {
      responce.json(error);
    }
  },

  addData(request, responce) {
    try {
      let { type, rowData } = request.body;
      let tableName;
      let data = {};
      switch (type) {
        case "it":
          tableName = "it_lib";
          break;
        case "furniture":
          tableName = "furniture_lib";
          break;
        default:
          break;
      }

      for (const key in rowData) {
        switch (rowData[key]) {
          case "true":
            rowData[key] = true;
            break;
          case "false":
            rowData[key] = false;
            break;
          default:
            break;
        }
      }

      // connection.query(
      //   `SELECT inventary_number FROM ${tableName} WHERE inventary_number = '${rowData.inventary_number}';`,
      //   (err, rows, fields) => {
      //     if (rows != undefined) {
      //       data.inventary_number = true
      //     }
      //   }
      // )
      // connection.query(
      //   `SELECT qr_code FROM ${tableName} WHERE qr_code = '${rowData.qr_code}';`,
      //   (err, rows, fields) => {
      //     if (rows != undefined) {
      //       data.qr_code = true
      //     }
      //   }
      // );
      
      // if (data.inventary_number || data.qr_code) {
      //   console.log("true");
      // } else {
      //   console.log("false");
      // }
      connection.query(
        insertData(tableName, rowData),
        Object.values(rowData),
        (error, result) => {
          if (error) throw error;
          console.log(`Add item to ${tableName} Table`);
          responce.json(data);
        }
      );
    } catch (error) {
      responce.json(error);
    }
  },

  updateData(request, responce) {
    try {
      let { type, rowData, rowId } = request.body;
      let tableName;

      switch (type) {
        case "it":
          tableName = "it_lib";
          break;
        case "furniture":
          tableName = "furniture_lib";
          break;
        default:
          break;
      }

      connection.query(
        updateData(tableName, rowData, rowId),
        function (error, result) {
          if (error) throw error;
          console.log(`Table ${tableName} updated`);
          responce.json({});
        }
      );
    } catch (error) {
      responce.json(error);
    }
  },

  deleteData(request, responce) {
    console.log(request.body);
    try {
      let { type, rowId } = request.body;
      let tableName;

      switch (type) {
        case "it":
          tableName = "it_lib";
          break;
        case "furniture":
          tableName = "furniture_lib";
          break;
        default:
          break;
      }

      connection.query(
        `DELETE FROM ${tableName} WHERE id = ${rowId};`,
        function (error, result) {
          if (error) throw error;
          console.log(`Row ${rowId} was deleted from Table ${tableName}`);
          responce.json({message: `Row ${rowId} was deleted from Table ${tableName}`});
        }
      );
    } catch (error) {
      responce.json(error);
    }
  },

  uploadData(request, responce) {
    try {
      let { type, data } = request.body;
      let tables = {};
      tables.data = [];
      tables.name = [];

      tables.data.push(data.meta);
      tables.data.push(data.lib);
      tables.data.push(data.values);

      switch (type) {
        case "it":
          tables.name.push("it_meta");
          tables.name.push("it_lib");
          tables.name.push("it_values");
          break;
        case "furniture":
          tables.name.push("furniture_meta");
          tables.name.push("furniture_lib");
          tables.name.push("furniture_values");
          break;
        default:
          break;
      }

      for (let i = 0; i < tables.data.length; i++) {
        //Удаление таблицы
        const queryDeleteTable = `DROP TABLE if exists ${tables.name[i]}`;
        connection.query(queryDeleteTable, (error, result) => {
          if (error) throw error;
          console.log("Table deleted");
        });

        //Создание таблицы
        connection.query(
          createTable(tables.name[i], tables.data[i], data.meta),
          (error, result) => {
            if (error) throw error;
            console.log("Table created");
          }
        );

        //Заполнение таблицы данными из файла excel
        for (let j = 0; j < tables.data[i].length; j++) {
          connection.query(
            insertData(tables.name[i], tables.data[i][j]),
            Object.values(tables.data[i][j]),
            (error, result) => {
              if (error) throw error;
            }
          );
        }
      }
      responce.json(data);
    } catch (error) {
      responce.json(error);
    }
  },

}

export const AuthController = {
  login(request, responce) {
    try {
      let { login, password } = request.body;
      User.findOne({ where: { login: login }, raw: true })
        .then((user) => {
          if (!user) {
            return responce.json({
              resultCode: 2,
              message: "Пользователя с данным логином не имеется в БД",
            });
          }
          var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
          );
          if (!passwordIsValid) {
            return responce.json({
              resultCode: 1,
              accessToken: null,
              message: "Неверно указан пароль",
            });
          }
          Object.keys(user).forEach((element) => {
            if (element.includes("last_logon")) {
              if (user[element] !== null) {
                user[element] = new Date(user[element]).toLocaleString(
                  "ru-RU",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    timeZone: "Europe/Moscow",
                  }
                );
                user[element] = changeDateType(user[element]);
                user[element] = new Date(user[element]);
              }
            }
          });
          User.update(
            { is_auth: 1, last_logon: new Date },
            {
              where: {
                login: login,
              },
            }
          ).then((res) => {
            const accessToken = jwt.sign({ login: user.login, role: user.role }, authConfig.secret);
            console.log(user);
            user.last_logon = new Date
            responce.json({
              resultCode: 0,
              accessToken: accessToken,
              message: "Аутентификация прошла успешно",
              user,
            });
          });
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },

  logout(request, responce) {
    try {
      let { login } = request.body;
      User.update(
        { is_auth: 0 },
        {
          where: {
            login: login,
          },
        }
      )
        .then((res) => {
          responce.json({
            resultCode: 0,
            accessToken: null,
            message: "Сессия завершена",
          });
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },

  auth(request, responce) {
    try {
      let { login } = request.body;
      User.findOne({ where: { login: login }, raw: true })
        .then((user) => {
          if (!user) return;
          if (user.is_auth == 1) {
            user.is_auth = true;
            console.log(user);
            responce.json({
              resultCode: 0,
              message: "Авторизация прошла успешно",
              user,
            });
          } else {
            user.is_auth = false;
            responce.json({
              resultCode: 1,
              message: "Пользователь не авторизован",
              user,
            });
          }
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },
};
