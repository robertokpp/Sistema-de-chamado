import { Router } from "express";
import { UserController } from "@/controllers/User-controllers";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";
import { upload } from "@/configs/multer";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN", "CLIENT", "TECHNICAL"]),
  upload.single("avatar"),
  userController.upload,
);

userRouter.patch(
  "/show",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN", "CLIENT", "TECHNICAL"]),
  userController.show,
);

export { userRouter };
