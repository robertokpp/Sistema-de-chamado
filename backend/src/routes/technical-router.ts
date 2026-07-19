import { Router } from "express";
import { TechnicalController } from "../controllers/Technical-controller";
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

technicalRouter.patch(
  "/:id",
  verifyUserAuthorization(["ADMIN"]),
  technicalController.update,
);

technicalRouter.get(
  "/:id",
  verifyUserAuthorization(["ADMIN"]),
  technicalController.indexUnique,
);

export { technicalRouter };
