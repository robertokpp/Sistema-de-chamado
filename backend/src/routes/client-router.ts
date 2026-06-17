import { Router } from "express";
import { ClientController } from "@/controllers/client-controller";

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post("/", clientController.create);

export { clientRouter };
