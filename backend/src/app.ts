import { errorHandling } from "./middlewares/error-handling";
import { router } from "./routes";
import express from "express";
import "express-async-error";
import cors from "cors";
import path from "node:path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));
app.use(router);
app.use(errorHandling);

export { app };
