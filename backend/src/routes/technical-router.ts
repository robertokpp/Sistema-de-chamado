import { Router } from "express";
import { TechnicalController } from "../controllers/technical-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const technicalRouter = Router();
const technicalController = new TechnicalController();

technicalRouter.post(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  technicalController.create,
);

technicalRouter.get(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  technicalController.index,
);

export { technicalRouter };
