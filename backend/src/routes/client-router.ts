import { Router } from "express";
import { ClientController } from "@/controllers/client-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post(
  "/",
  verifyUserAuthorization(["client","admin"]),
  clientController.create,
);

export { clientRouter };
