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

export {serviceRouter}