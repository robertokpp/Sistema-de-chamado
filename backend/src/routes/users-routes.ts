import { Router } from "express";
import { UserController } from "@/controllers/user-controllers";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.index);


userRouter.delete(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  userController.delete,
);
export { userRouter };
