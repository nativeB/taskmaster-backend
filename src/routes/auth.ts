import { Router } from "express";
import { LoginController, RegisterController } from "../controllers/auth";

const router = Router();

router.post("/auth/login", LoginController.run);
router.post("/auth/register", RegisterController.run);
export default router;