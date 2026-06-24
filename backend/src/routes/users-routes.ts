import { Router } from "express";
import { UserController } from "@/controllers/user-controllers";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);

export { userRouter };
