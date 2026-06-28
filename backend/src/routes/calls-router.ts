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
  verifyUserAuthorization(["ADMIN","CLIENT","TECHNICAL"]),
  callsController.index,
);


export { callsRouter };
