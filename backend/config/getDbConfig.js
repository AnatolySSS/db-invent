import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as path from "path";
import { getCurrentIP } from "./getCurrentIP.js";

export const getDbConfig = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  let currentIP = getCurrentIP();
  let config;
  let PORT;

  switch (currentIP) {
    case "10.205.24.14":
      console.log("Это sodfu");
      PORT = 3010;
      //sodfu
      config = {
        GLOBAL: {
          connectionLimit : 10,
          HOST: process.env.GLOBAL_HOST,
          PORT: process.env.GLOBAL_PORT,
          DB: process.env.GLOBAL_NAME,
          USER: process.env.GLOBAL_USER,
          PASSWORD: process.env.GLOBAL_PASSWORD,
          dialect: "mysql",
        },
        DIVISIONS: {
          D0: {
            connectionLimit : 10,
            HOST: process.env.F0_HOST,
            PORT: process.env.F0_PORT,
            DB: process.env.F0_NAME,
            USER: process.env.F0_USER,
            PASSWORD: process.env.F0_PASSWORD,
            dialect: "mysql",
          },
          D1: {
            connectionLimit : 10,
            HOST: process.env.F1_HOST,
            PORT: process.env.F1_PORT,
            DB: process.env.F1_NAME,
            USER: process.env.F1_USER,
            PASSWORD: process.env.F1_PASSWORD,
            dialect: "mysql",
          },
          D2: {
            connectionLimit : 10,
            HOST: process.env.F2_HOST,
            PORT: process.env.F2_PORT,
            DB: process.env.F2_NAME,
            USER: process.env.F2_USER,
            PASSWORD: process.env.F2_PASSWORD,
            dialect: "mysql",
          },
          D3: {
            connectionLimit : 10,
            HOST: process.env.F3_HOST,
            PORT: process.env.F3_PORT,
            DB: process.env.F3_NAME,
            USER: process.env.F3_USER,
            PASSWORD: process.env.F3_PASSWORD,
            dialect: "mysql",
          },
        }
      };
      break;

    default:
      console.log("Это localhost");
      PORT = 3005;
      //localhost
      config = {
        GLOBAL: {
          connectionLimit : 10,
          HOST: process.env.GLOBAL_HOST,
          PORT: process.env.GLOBAL_PORT,
          DB: process.env.GLOBAL_NAME,
          USER: process.env.GLOBAL_USER,
          PASSWORD: process.env.GLOBAL_PASSWORD,
          dialect: "mysql",
        },
        DIVISIONS: {
          D0: {
            connectionLimit : 10,
            HOST: process.env.F0_HOST,
            PORT: process.env.F0_PORT,
            DB: process.env.F0_NAME,
            USER: process.env.F0_USER,
            PASSWORD: process.env.F0_PASSWORD,
            dialect: "mysql",
          },
          D1: {
            connectionLimit : 10,
            HOST: process.env.F1_HOST,
            PORT: process.env.F1_PORT,
            DB: process.env.F1_NAME,
            USER: process.env.F1_USER,
            PASSWORD: process.env.F1_PASSWORD,
            dialect: "mysql",
          },
          D2: {
            connectionLimit : 10,
            HOST: process.env.F2_HOST,
            PORT: process.env.F2_PORT,
            DB: process.env.F2_NAME,
            USER: process.env.F2_USER,
            PASSWORD: process.env.F2_PASSWORD,
            dialect: "mysql",
          },
          D3: {
            connectionLimit : 10,
            HOST: process.env.F3_HOST,
            PORT: process.env.F3_PORT,
            DB: process.env.F3_NAME,
            USER: process.env.F3_USER,
            PASSWORD: process.env.F3_PASSWORD,
            dialect: "mysql",
          },
        }
      };
      break;
  }

  return { PORT, config };
};
