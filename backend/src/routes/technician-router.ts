import { Router } from "express";
import { TechnicalController } from "../controllers/technician-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const technicalRouter = Router();
const technicalController = new TechnicalController();

technicalRouter.post(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  technicalController.create,
);

export { technicalRouter };
