import { Router } from "express";
import { userRouter } from "./users-routes";
import { sessionRouter } from "./session-router";
import { clientRouter } from "./client-router";
import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";

const router = Router();

//Rotas publicas
router.use("/users", userRouter);
router.use("/session", sessionRouter);

// Routes private
router.use(ensureAuthenticated);
router.use("/client", clientRouter);

export { router };
