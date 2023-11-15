import { networkInterfaces } from "os";
import { createConnection, createPool } from "mysql2";
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const setConnection = () => {

  //Получение пути к текущей папке для настроки .env
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  console.log(__dirname);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  let currentIP = results["en0"] || results["eth0"];
  currentIP = currentIP.toString();

  let connection;
  let PORT;
  //В зависимости от IP адреса необходимо подключаться к различным портам и с разными настройками базы данных
  switch (currentIP) {
    case "10.205.24.14":
      console.log("Это sodfu");
      PORT = 3005;
      //Подключение к базе данных sodfu
      connection = createPool({
        connectionLimit : 10,
        host: process.env.DB_SODFU_HOST,
        port: process.env.DB_SODFU_PORT,
        database: process.env.DB_SODFU_DB,
        user: process.env.DB_SODFU_USER,
        password: process.env.DB_SODFU_PASSWORD,
      });
      break;

    default:
      PORT = 3005;
      //Подключение к localhost
      connection = createPool({
        connectionLimit : 10,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DB,
        user:process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      break;
  }

  connection.getConnection(function (error) {
    if (error) {
      return console.error("Ошибка " + error.message);
    } else {
      console.log("Подключение прошло успешно");
    }
  });
  return { PORT, connection };
};

export default setConnection;
