import { Router } from "express";
import { CallsController } from "@/controllers/calls-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const callsRouter = Router();
const callsController = new CallsController();

callsRouter.post(
  "/",
  verifyUserAuthorization(["CLIENT"]),
  callsController.create,
);

callsRouter.get(
  "/",
  verifyUserAuthorization(["CLIENT", "ADMIN", "TECHNICAL"]),
  callsController.index,
);

callsRouter.get(
  "/:id",
  verifyUserAuthorization(["CLIENT", "ADMIN", "TECHNICAL"]),
  callsController.indexUnique,
);

callsRouter.patch(
  "/:id",
  verifyUserAuthorization(["ADMIN", "TECHNICAL"]),
  callsController.updateStatus,
);

export { callsRouter };
