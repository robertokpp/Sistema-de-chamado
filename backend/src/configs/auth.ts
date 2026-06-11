import dotenv from "dotenv"
dotenv.config()

export const authConfig = {
  jwt: {
    secret: process.env.SECRET!,
    expiresIn: "24h"
  }
}