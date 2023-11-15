import { networkInterfaces } from "os";
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

  let config;
  let PORT;
  //В зависимости от IP адреса необходимо подключаться к различным портам и с разными настройками базы данных
  switch (currentIP) {
    case "10.205.24.14":
      console.log("Это sodfu");
      PORT = 3005;
      //Подключение к базе данных sodfu
      config = {
        HOST: process.env.DB_SODFU_HOST,
        PORT: process.env.DB_SODFU_PORT,
        DB: process.env.DB_SODFU_DB,
        USER: process.env.DB_SODFU_USER,
        PASSWORD: process.env.DB_SODFU_PASSWORD,
        dialect: 'mysql',
      };
      break;

    default:
      console.log("Это localhost by default");
      PORT = 3005;
      //Подключение к localhost
      config = {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        DB: process.env.DB_DB,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        dialect: 'mysql',
      };
      break;
  }

  return { PORT, config };
};

export default setConnection;
