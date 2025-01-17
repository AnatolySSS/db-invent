import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// import { getDbConfig } from "./config/getDbConfig.js";
import router from "./router.js";
import { EmployeesController } from "./controllers/employees.controller.js";
// import * as dotenv from "dotenv";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = __dirname.replace("backend", "frontend");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(dirname, "build")));
app.use("/", router);

app.get("/*", (request, responce) => {
  responce.sendFile(path.join(dirname, "build", "index.html"));
});

//Загрузка сотрудников из AD (каждые 30 минут)
setInterval(async () => {
  await EmployeesController.downloadEmployees();
}, 30 * 60000);

// const { PORT } = getDbConfig();
const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`Server is starting on PORT ${PORT}`);
});
