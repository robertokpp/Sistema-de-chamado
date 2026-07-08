import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";

import { userRouter } from "./users-routes";
import { sessionRouter } from "./session-router";
import { callsRouter } from "./calls-router";
import { serviceRouter } from "./services-router";
import { technicalRouter } from "./technical-router";
import { clientRouter } from "./client-router";

const router = Router();

//Rotas publicas
router.use("/user", userRouter);
router.use("/session", sessionRouter);

// Routes private
router.use(ensureAuthenticated);
router.use("/calls", callsRouter);
router.use("/services", serviceRouter);
router.use("/technical", technicalRouter);
router.use("/client", clientRouter)


export { router };
