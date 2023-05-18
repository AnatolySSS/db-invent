import { Router } from "express";
import { DataController, AuthController } from "./controllers/controller.js";
import authJwt from "./middleware/authJwt.js";

const router = new Router()

router.post("/getData", DataController.getData);
router.post("/addData", DataController.addData);
router.put("/updateData", DataController.updateData);
router.post("/uploadData", DataController.uploadData);

router.post("/auth/login", AuthController.login);
router.post("/auth/logout", authJwt.verifyToken, AuthController.logout);
router.get("/auth/me", authJwt.verifyToken, AuthController.auth);

export default router