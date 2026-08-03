import path from "node:path";
import { mkdirSync } from "node:fs";

export const uploadsPath = path.resolve(
  process.env.UPLOADS_DIR ?? "uploads",
);
export const avatarUploadsPath = path.join(uploadsPath, "avatar");

mkdirSync(avatarUploadsPath, { recursive: true });
