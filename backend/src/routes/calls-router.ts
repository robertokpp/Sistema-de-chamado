import { Router } from "express";
import { CallsController } from "@/controllers/calls-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const callsRouter = Router();
const callsController = new CallsController();

callsRouter.post(
  "/",
  verifyUserAuthorization(["client", "admin"]),
  callsController.create,
);

callsRouter.get(
  "/",
  verifyUserAuthorization(["client", "admin"]),
  callsController.index,
);

export { callsRouter };
