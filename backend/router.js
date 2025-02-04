import { Router } from "express";
import { DataController } from "./controllers/data.controller.js";
import { AuthController } from "./controllers/auth.controller.js";
// import { InventaryController } from "./controllers/inventary.controller.js";
import { InventaryYearsController } from "./controllers/inventary.years.controller.js";
import { UsersController } from "./controllers/users.controller.js";
import authJwt from "./middleware/authJwt.js";
import { EmployeesController } from "./controllers/employees.controller.js";

const router = new Router();

router.post("/auth/login", AuthController.login);
router.get("/auth/logout", authJwt.verifyToken, AuthController.logout);
router.get("/auth/me", authJwt.verifyToken, AuthController.auth);

router.post("/getData", DataController.getData);
router.post("/addData", DataController.addData);
router.put("/updateData", DataController.updateData);
router.put("/transferItem", DataController.transferItem);
router.delete("/deleteData", DataController.deleteData);
router.post("/uploadData", DataController.uploadData);

router.get("/downloadEmployees", EmployeesController.downloadEmployees);
router.post("/getEmployees", EmployeesController.getEmployees);

router.post("/getUsers", UsersController.getUsers);
router.post("/addUser", UsersController.addUser);
router.put("/updateUser", UsersController.updateUser);
router.delete("/deleteUser", UsersController.deleteUser);

router.post("/beginInventory", InventaryYearsController.beginInventory);
router.post("/years", InventaryYearsController.getYears);
router.post("/getYearData", InventaryYearsController.getYearData);
router.post("/requestCurrentInventory", InventaryYearsController.requestCurrentInventory);
// router.post("/currentYearInventary", InventaryController.hasCurrentYearInventary);

// router.post("/findQRCode", InventaryController.findQRCode);
// router.post("/inventUnmarked", InventaryController.inventUnmarked);
// router.post("/checkQRCode", InventaryController.checkQRCode);
// router.post("/checkRemainsWithLocations", InventaryController.checkRemainsWithLocations);
// router.post("/checkRemainsWithoutLocations", InventaryController.checkRemainsWithoutLocations);
// router.post("/checkStatus", InventaryController.checkStatus);
// router.post("/checkStatusType", InventaryController.checkStatusType);
// router.post("/checkStatusLocations", InventaryController.checkStatusLocations);
// router.post("/getLocations", InventaryController.getLocations);

export default router;
