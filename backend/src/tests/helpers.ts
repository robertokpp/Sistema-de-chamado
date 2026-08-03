import jwt from "jsonwebtoken";

type Role = "ADMIN" | "TECHNICAL" | "CLIENT";

export function authToken(role: Role, id = `${role.toLowerCase()}-id`) {
  return jwt.sign({ role }, process.env.SECRET!, {
    subject: id,
    expiresIn: "1h",
  });
}
