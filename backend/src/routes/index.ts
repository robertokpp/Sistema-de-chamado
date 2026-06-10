import { Router } from "express";
import { userRouter } from "./users-routes";
import { sessionRouter } from "./session-router";

const router = Router();

router.use("/users", userRouter);
router.use("/session", sessionRouter);

export { router };
