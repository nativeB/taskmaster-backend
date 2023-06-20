import { Router } from "express";
import { LoginController, RegisterController } from "../controllers/auth";

import { CreateController, UpdateController, DeleteController } from "../controllers/task";
import { validate } from "../utils";
import { check } from "express-validator";
import responses from "../utils/responses";
const router = Router();

router.post("/auth/login",
    validate([
        check("email", responses.emailIsNotValid).isEmail(),
        check("password", responses.passwordMustBeAtLeast6CharactersLong).isLength({ min: 6 }),
    ]),
LoginController.run);
router.post("/auth/register", validate([
    check("email", responses.emailIsNotValid).isEmail(),
    check("password", responses.passwordMustBeAtLeast6CharactersLong).isLength({ min: 6 }),
    check("confirmPassword", responses.passwordsDoNotMatch).custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(responses.passwordsDoNotMatch);
        }
        return true;
      }),
    check("email").normalizeEmail({ gmail_remove_dots: false }),
]), RegisterController.run);
router.post("/task", CreateController.run);
router.put("/task", UpdateController.run);
router.delete("/task", DeleteController.run);

export default router;