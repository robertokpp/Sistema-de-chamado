import { Router } from "express";
import { ServiceController } from "@/controllers/services-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  serviceController.create,
);

serviceRouter.get(
  "/",
  verifyUserAuthorization(["ADMIN", "CLIENT"]),
  serviceController.index,
);

serviceRouter.patch(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  serviceController.active,
);

export { serviceRouter };
