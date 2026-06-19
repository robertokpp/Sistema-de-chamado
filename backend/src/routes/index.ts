import { Router } from "express";
import { userRouter } from "./users-routes";
import { sessionRouter } from "./session-router";
import { callsRouter } from "./calls-router";
import { serviceRouter } from "./services-router";
import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";

const router = Router();

//Rotas publicas
router.use("/users", userRouter);
router.use("/session", sessionRouter);

// Routes private
router.use(ensureAuthenticated);
router.use("/calls", callsRouter);
router.use("/services", serviceRouter);
router.use("/user/:id", userRouter)

export { router };
