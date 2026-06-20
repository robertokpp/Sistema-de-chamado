import { ClientController } from "@/controllers/client-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.get(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  clientController.index,
);

clientRouter.delete(
  "/",
  verifyUserAuthorization(["ADMIN"]),
  clientController.delete,
);

export { clientRouter };
