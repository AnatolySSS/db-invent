import { Router } from "express";
import { DataController } from "./controllers/data.controller.js";
import { AuthController } from "./controllers/user.controller.js";
import { InventaryController } from "./controllers/inventary.controller.js";
import { InventaryYearsController } from "./controllers/inventary.years.controller.js";
import authJwt from "./middleware/authJwt.js";

const router = new Router()

router.post("/getData", DataController.getData);
router.post("/addData", DataController.addData);
router.put("/updateData", DataController.updateData);
router.delete("/deleteData", DataController.deleteData);
router.post("/uploadData", DataController.uploadData);

router.post("/auth/login", AuthController.login);
router.get("/auth/logout", authJwt.verifyToken, AuthController.logout);
router.get("/auth/me", authJwt.verifyToken, AuthController.auth);

router.post("/years", InventaryYearsController.getYears);
router.post("/getYearData", InventaryYearsController.getYearData);

router.get("/currentYearInventary", InventaryController.hasCurrentYearInventary);
router.post("/requestCurrentInventory", InventaryController.requestCurrentInventory);
router.post("/beginInventory", InventaryController.beginInventory);
router.post("/findQRCode", InventaryController.findQRCode);
router.post("/checkQRCode", InventaryController.checkQRCode);
router.post("/checkRemains", InventaryController.checkRemains);
router.get("/getLocations", InventaryController.getLocations);

export default router