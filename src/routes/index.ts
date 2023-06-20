import { Router } from "express";
import { LoginController, RegisterController } from "../controllers/auth";

import { CreateController, UpdateController, DeleteController } from "../controllers/task";

const router = Router();

router.post("/auth/login", LoginController.run);
router.post("/auth/register", RegisterController.run);
router.post("/task", CreateController.run);
router.put("/task", UpdateController.run);
router.delete("/task", DeleteController.run);

export default router;