import { CallsServiceController } from "@/controllers/CallServiceController";
import { Router } from "express";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const callsServiceRouter = Router();
const callsServiceController = new CallsServiceController();

callsServiceRouter.post(
  "/:id",
  verifyUserAuthorization(["TECHNICAL"]),
  callsServiceController.create,
);

export { callsServiceRouter };
