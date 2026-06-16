import { errorHandling } from "./middlewares/error-handling";
import { router } from "./routes";
import express from "express";
import "express-async-error";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandling);

export { app };
