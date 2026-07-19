import { Router } from "express";
import { ServiceController } from "@/controllers/Services-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post(
  "/",
  verifyUserAuthorization(["ADMIN", "TECHNICAL"]),
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

serviceRouter.patch(
  "/:id",
  verifyUserAuthorization(["ADMIN"]),
  serviceController.show,
);


export { serviceRouter };
