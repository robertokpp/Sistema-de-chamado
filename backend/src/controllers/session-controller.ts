import { Response, Request } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authConfig } from "@/configs/auth";

dotenv.config();

class SessionController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("E-mail ou senha incorreto!", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha incorreto!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    } as any);

    const { password: _, ...userWithoutPassword } = user;

    return response.json({ user: userWithoutPassword, token });
  }
}

export { SessionController };
