import { Router } from "express";
import { LoginController, RegisterController } from "../controllers/auth";
import { CreateController, UpdateController, DeleteController } from "../controllers/task";
import { validate } from "../utils";
import { check } from "express-validator";
import {expressjwt} from "express-jwt";
import responses from "../utils/responses";
import GetTaskController from "../controllers/task/getTask";
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


//check route
router.get("/auth/check",
    expressjwt({ secret: process.env.JWT_SECRET as string, algorithms: ["HS256"] }),
    LoginController.check
);

router.post("/task", 
    expressjwt({ secret: process.env.JWT_SECRET as string, algorithms: ["HS256"] }),
    validate([
        check("title", responses.titleIsRequired).not().isEmpty(),
        check("description", responses.descriptionIsRequired).not().isEmpty(),
        check("status", responses.statusIsRequired).not().isEmpty(),
    ]), 
    CreateController.run);

router.get("/task", 
    expressjwt({ secret: process.env.JWT_SECRET as string, algorithms: ["HS256"] }), 
    GetTaskController.run);

router.put("/task/:id", 
    expressjwt({ secret: process.env.JWT_SECRET as string, algorithms: ["HS256"] }), 
    validate([
        //optional but validate if available
        check("title", responses.titleIsRequired).optional().not().isEmpty(),
        check("description", responses.descriptionIsRequired).optional().not().isEmpty(),
        check("status", responses.statusIsRequired).optional().not().isEmpty()
    ]),
    UpdateController.run);

router.delete("/task/:id", 
    expressjwt({ secret: process.env.JWT_SECRET as string, algorithms: ["HS256"] }),
    validate([
        check("id", responses.statusIsRequired).not().isEmpty()
    ]),
    DeleteController.run);

export default router;