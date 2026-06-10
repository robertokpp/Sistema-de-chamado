import { SessionController } from "@/controllers/session-controller";
import { Router } from "express";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("/", sessionController.create);

export { sessionRouter };
