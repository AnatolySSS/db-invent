import { Router } from "express";
import { DataController, AuthController } from "./controller.js";

const router = new Router()

router.post("/getData", DataController.getData);
router.post("/addData", DataController.addData);
router.put("/updateData", DataController.updateData);
router.post("/uploadData", DataController.uploadData);

router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);
router.post("/auth/me", AuthController.auth);

export default router