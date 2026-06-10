import { Response, Request } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";

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

    const userMatched = await compare(password, user.password);

    if (!userMatched) {
      throw new AppError("User or password incorrect", 401);
    }

    return response.json(user);
  }
}

export { SessionController };
