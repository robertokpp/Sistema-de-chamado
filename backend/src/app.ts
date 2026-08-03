import { errorHandling } from "./middlewares/error-handling";
import { router } from "./routes";
import express from "express";
import "express-async-error";
import cors from "cors";
import { uploadsPath } from "./configs/uploads";

const app = express();
const allowedOrigins = process.env.APP_ORIGIN?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }));
app.use(express.json());
app.use("/uploads", express.static(uploadsPath));
app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});
app.use(router);
app.use(errorHandling);

export { app };
