import { Router } from "express";
import { UserController } from "@/controllers/user-controllers";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);

export { userRouter };
